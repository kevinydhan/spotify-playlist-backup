import type { NextApiHandler, NextApiRequest, NextApiResponse } from 'next'
import type { Session } from 'next-auth/client'

import type { SpotifyPlaylistBackup } from './spotify'
import type { Modify } from './utils'

declare module 'next' {
  export interface NextApiRequestWithSession extends NextApiRequest {
    session: Session
  }

  /**
   * Defines the shape of the error object returned from an unsuccessful
   * operation.
   */
  export interface ErrorResponse {
    error: {
      status: number
      message?: string
      /**
       * References a list of errors, usually in response to an invalid form
       * submission.
       */
      items?: unknown[]
    }
  }

  /**
   * Defines an API handler function that is wrapped with `withAuthentication`
   * middleware. This authentication middleware attaches the `Session` object to
   * the incoming `NextApiRequest` object.
   *
   * @template RequestModifiers - Types to modify on the incoming
   * `NextApiRequest` object.
   * @template SuccessResponse - Object returned from a successful operation.
   */
  export type AuthenticatedNextApiHandler<
    RequestModifiers = unknown,
    SuccessResponse = unknown
  > = (
    req: Modify<NextApiRequestWithSession, RequestModifiers>,
    res: NextApiResponse<SuccessResponse | ErrorResponse>
  ) => ReturnType<NextApiHandler>

  export interface PlaylistValidationError {
    field: keyof SpotifyPlaylistBackup
    message: string
  }
}
