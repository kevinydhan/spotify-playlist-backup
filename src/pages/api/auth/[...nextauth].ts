import type { NextApiHandler } from 'next'
import WithAuth, { Callbacks, InitOptions, SessionBase } from 'next-auth'
import Providers from 'next-auth/providers'

import spotify from '@/controllers/spotify'

export const createSession: Callbacks['session'] = async (
  session: SessionBase,
  user
) => ({
  user: session.user,
  accessToken: user?.accessToken,
  refreshToken: user?.refreshToken,
  expires: user?.expiresIn,
})

/**
 * __Issues:__
 * - `callbacks.jwt()` and `callbacks.session()` were defined because the
 *   Spotify access token wasn't defined in the session object by default. See
 *   this [Github issue][gh:next-auth/spotify-access-token] for more details.
 * - For the error `JWSVerificationFailed: signature verification failed`, a
 *   JWT signing key is required.
 *
 * [gh:next-auth/spotify-access-token]: https://github.com/nextauthjs/next-auth/issues/916#issuecomment-739473044
 * [gh:next-auth/jws]: https://github.com/nextauthjs/next-auth/issues/484#issuecomment-664098144
 */
const options: InitOptions = {
  providers: [
    Providers.Spotify({
      clientId: process.env.SPOTIFY_CLIENT_ID,
      clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
      scope: [
        'playlist-read-private',
        'playlist-read-collaborative',
        'playlist-modify-public',
        'playlist-modify-private',
      ].join(' '),
    }),
  ],

  jwt: {
    signingKey: process.env.JWT_SIGNING_KEY,
  },

  callbacks: {
    jwt: async (token, user, account) => {
      if (account) {
        const expiryDate = Date.now() + account?.expires_in * 1000

        token.id = account?.id
        token.accessToken = account?.accessToken
        token.refreshToken = account?.refreshToken
        token.expiresIn = new Date(expiryDate).toISOString()
      }

      const isTokenExpired = Date.now() > new Date(token.expiresIn).getTime()

      if (isTokenExpired) {
        spotify.setClientId(process.env.SPOTIFY_CLIENT_ID)
        spotify.setClientSecret(process.env.SPOTIFY_CLIENT_SECRET)
        spotify.setAccessToken(account?.accessToken)
        spotify.setRefreshToken(account?.refreshToken)

        const { body } = await spotify.refreshAccessToken()
        token.accessToken = body.access_token
      }

      return token
    },
    session: createSession,
  },
  debug: true,
}

const handleAuthRequests: NextApiHandler = (req, res) => {
  return WithAuth(req, res, options)
}

export default handleAuthRequests
