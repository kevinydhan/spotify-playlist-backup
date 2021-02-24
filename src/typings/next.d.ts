import type { Session } from 'next-auth/client'

declare module 'next' {
  /**
   * `NextApiRequest`'s type definition was augmented because the
   * `withAuthentication` middleware for the API handlers adds additional
   * properties onto the request object.
   */
  export interface NextApiRequest {
    session?: Session
  }
}
