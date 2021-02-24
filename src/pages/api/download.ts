import { NextApiHandler } from 'next'

const handleRequest: NextApiHandler = (req, res) => {
  const data = req.body
  const file = Buffer.from(JSON.stringify(data, null, 2))
  res.setHeader('Access-Control-Expose-Headers', 'Content-Disposition')
  res.setHeader('Content-Disposition', `attachment; filename=test.json`)
  res.setHeader('Content-Type', 'utf-8')
  res.send(file)
}

export default handleRequest
