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

  interface NextApiRequestWithSession extends NextApiRequest {
    session: Session
  }

  /**
   * Defines an API handler function that is wrapped with `withAuthentication`
   * middleware. This authentication middleware attaches the `Session` object to
   * the incoming `NextApiRequest` object.
   */
  type AuthenticatedNextApiHandler = <Body extends Record<string, unknown>>(
    req: NextApiRequestWithSession,
    res: NextApiResponse<Body>
  ) => ReturnType<NextApiHandler>
}
