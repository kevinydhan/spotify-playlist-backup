import type { AuthenticatedNextApiHandler } from 'next'

import spotify from '@/controllers/spotify'
import { withAuthentication } from '@/middleware/with-authentication'
import type { SpotifyPlaylistBackup } from '@/typings/spotify'
import chunkArray from '@/utils/chunk-array/chunk-array'

interface RequestModifiers {
  body?: Partial<SpotifyPlaylistBackup>
}

interface SuccessResponse {
  status: number
  message: string
}

interface PlaylistValidationError {
  field: keyof SpotifyPlaylistBackup
  message: string
}

type ValidateNewPlaylistFields = (
  body: RequestModifiers['body']
) => PlaylistValidationError[]

const validateNewPlaylistFields: ValidateNewPlaylistFields = (body) => {
  const errors = []

  if (!body?.name) {
    errors.push({
      field: 'name',
      message: 'Playlist name is missing.',
    })
  }

  if (typeof body?.public !== 'boolean') {
    errors.push({
      field: 'public',
      message: 'This field must either be true or false.',
    })
  }

  if (typeof body?.collaborative !== 'boolean') {
    errors.push({
      field: 'collaborative',
      message: 'This field must either be true or false.',
    })
  }

  return errors
}

const handleRequest: AuthenticatedNextApiHandler<
  RequestModifiers,
  SuccessResponse
> = async (req, res) => {
  const { body, method, session } = req

  switch (method) {
    case 'POST':
      const errors = validateNewPlaylistFields(body)
      if (errors.length) {
        return res.status(422).send({
          error: {
            status: 422,
            items: errors,
          },
        })
      }

      spotify.setAccessToken(session?.accessToken)

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
      const chunkedUris = chunkArray(body?.uris)

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
