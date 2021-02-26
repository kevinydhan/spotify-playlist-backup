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

      /**
       * Spotify will proceed to create multiple playlists with same name.
       */
      const newPlaylist = await spotify.createPlaylist(body?.name, {
        description: body?.description,
        public: body?.public,
        collaborative: body?.collaborative,
      })

      /**
       * Cases:
       * 1. The number of track uris is greater than 100.
       * 2. One or more track uris are invalid.
       */
      const chunkedUris = chunkArray(body.uris as string[])
      const trackAdditionResponse = await Promise.all(
        chunkedUris.map((uris) => {
          return spotify.addTracksToPlaylist(newPlaylist.body.id, uris)
        })
      )

      console.log(trackAdditionResponse)

      res.status(201).send({
        status: 201,
        message: 'Created new playlist',
      })
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
