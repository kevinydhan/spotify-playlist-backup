import type { AuthenticatedNextApiHandler, NextApiHandler } from 'next'
import { getSession } from 'next-auth/client'

type WithAuthentication = (
  requestHandler: AuthenticatedNextApiHandler
) => NextApiHandler

export const withAuthentication: WithAuthentication = (requestHandler) => {
  return async (req, res) => {
    const session = await getSession({ req })

    if (session) {
      req.session = session
      requestHandler(req, res)
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
