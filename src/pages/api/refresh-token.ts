import { NextApiHandler } from 'next'
import { getSession } from 'next-auth/client'

import spotify from '@/controllers/spotify'

const handleRequest: NextApiHandler = async (req, res) => {
  const session = await getSession({ req })

  if (session?.accessToken && session?.refreshToken) {
    spotify.setClientId(process.env.SPOTIFY_CLIENT_ID)
    spotify.setClientSecret(process.env.SPOTIFY_CLIENT_SECRET)
    spotify.setAccessToken(session.accessToken)
    spotify.setRefreshToken(session.refreshToken)

    const response = await spotify.refreshAccessToken()
    console.log(response.body)
    res.send(response.body)
  }

  res.end()
}

export default handleRequest
