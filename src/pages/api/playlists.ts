import { NextApiHandler } from 'next'

const handleRequest: NextApiHandler = (req, res) => {
  switch (req?.method) {
    case 'POST':
      res.send({})
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

export default handleRequest
