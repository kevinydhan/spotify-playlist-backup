import type {
  AuthenticatedNextApiHandler,
  NextApiHandler,
  NextApiRequestWithSession,
} from 'next'
import { getSession } from 'next-auth/client'

type WithAuthentication = (
  requestHandler: AuthenticatedNextApiHandler
) => NextApiHandler

export const withAuthentication: WithAuthentication = (requestHandler) => {
  return async (req, res) => {
    const session = await getSession({ req })

    if (session) {
      const authenticatedReq = req as NextApiRequestWithSession
      authenticatedReq.session = session
      requestHandler(authenticatedReq, res)
    } else {
      res.status(401).send({
        error: {
          status: 401,
          message: 'Unauthorized',
        },
      })
    }
  }
}
