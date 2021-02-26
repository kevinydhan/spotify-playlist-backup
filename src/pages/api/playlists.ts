import { NextApiHandler, NextApiRequest } from 'next'

import spotify from '@/controllers/spotify'
import { withAuthentication } from '@/middleware/with-authentication'
import { SpotifyPlaylistBackup } from '@/typings/spotify'

type ArrayMember<T> = T extends Array<infer Member> ? Member : T

const chunkArray = (
  arr: Array<unknown>,
  chunkSize = 100
): ArrayMember<Parameters<typeof chunkArray>[0]>[][] => {
  const result = []

  for (let i = 0; i < arr.length; i += chunkSize) {
    result.push(arr.slice(i, i + chunkSize))
  }

  return result
}

const handleRequest: NextApiHandler = async (
  req: NextApiRequest & { body?: Partial<SpotifyPlaylistBackup> },
  res
) => {
  const body = req?.body

  switch (req?.method) {
    case 'POST':
      spotify.setAccessToken(req?.session?.accessToken)

      let newPlaylist: SpotifyApi.CreatePlaylistResponse

      /**
       * Spotify will proceed to create multiple playlists with same name, so a
       * check to see whether or not a playlist with the same name already
       * exists isn't needed.
       */
      try {
        const response = await spotify.createPlaylist(body?.name, {
          description: body?.description,
          public: body?.public,
          collaborative: body?.collaborative,
        })
        newPlaylist = response.body
      } catch (err) {
        const body = err?.body
        const status = body?.error?.status || 400
        return res.status(status).send(body)
      }

      /**
       * Cases:
       * 1. The number of track uris is greater than 100.
       * 2. One or more track uris are invalid.
       */
      const chunkedUris: string[][] = chunkArray(body?.uris)

      try {
        const requests = chunkedUris.map((uris) => {
          return spotify.addTracksToPlaylist(newPlaylist?.id, uris)
        })

        await Promise.all(requests)

        return res.status(201).send({
          status: 201,
          message: 'Created new playlist',
        })
      } catch (err) {
        const body = err?.body
        const status = body?.error?.status || 400
        return res.status(status).send(body)
      }
      break

    default:
      res.status(405).send({
        error: {
          status: 405,
          message: `${req.method} method not allowed`,
        },
      })
  }
}

export default withAuthentication(handleRequest)
