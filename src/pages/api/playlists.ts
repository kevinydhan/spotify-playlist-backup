import {
  AuthenticatedNextApiHandler,
  NextApiHandler,
  NextApiRequest,
  NextApiRequestWithSession,
  NextApiResponse,
} from 'next'

import spotify from '@/controllers/spotify'
import { withAuthentication } from '@/middleware/with-authentication'
import type { SpotifyPlaylistBackup } from '@/typings/spotify'
import chunkArray from '@/utils/chunk-array/chunk-array'

/**
 * This interface defines the expected request object for `/api/playlists`.
 */
interface ModifiedNextApiRequest extends Omit<NextApiRequest, 'body'> {
  body?: Partial<SpotifyPlaylistBackup>
}

const handleRequest: NextApiHandler = async (
  req: ModifiedNextApiRequest,
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

type IsAllowedHttpMethod = (method: NextApiRequest['method']) => boolean

interface SendErrorOptions {
  status?: number
  message: string
}

type SendError = <GenericResponse extends NextApiResponse>(
  res: GenericResponse,
  options?: SendErrorOptions
) => void

type CreateNewSpotifyPlaylist = (
  req: NextApiRequestWithSession
) => Promise<SpotifyApi.CreatePlaylistResponse>

export class PlaylistsApiEndpoint {
  isAllowedHttpMethod: IsAllowedHttpMethod = (method) => {
    return method.toLowerCase() in this
  }

  sendError: SendError = (res, options) => {
    const status = options?.status || 500
    const message = options?.message

    res.status(status).send({
      error: { status, message },
    })
  }

  handleRequest: NextApiHandler = (req, res) => {
    if (!this.isAllowedHttpMethod(req?.method)) {
      return this.sendError(res, {
        status: 405,
        message: `${req?.method} method not allowed`,
      })
    }

    const next = this[req.method.toLowerCase()]
    next(req, res)
  }

  post: AuthenticatedNextApiHandler = (req, res) => {
    // validate req.body
    const newPlaylist = this.createNewSpotifyPlaylist(req.body)
    res.send(newPlaylist)
  }

  /**
   * Spotify will proceed to create multiple playlists with same name, so a
   * check to see whether or not a playlist with the same name already
   * exists isn't needed.
   */
  createNewSpotifyPlaylist: CreateNewSpotifyPlaylist = async (req) => {
    spotify.setAccessToken(req?.session?.accessToken)
    const { name, description, collaborative } = req.body

    try {
      const response = await spotify.createPlaylist(name, {
        description,
        collaborative,
        public: req.body.public,
      })

      return response.body
    } catch (err) {
      return err
    }
  }
}

export default withAuthentication(handleRequest)
