import type { NextApiHandler } from 'next'
import WithAuth, { Callbacks, InitOptions, SessionBase } from 'next-auth'
import Providers from 'next-auth/providers'

import spotify from '@/controllers/spotify'
import type { AuthorizationCodeGrantResponse } from '@/typings/spotify'

export const createSession: Callbacks['session'] = async (
  session: SessionBase,
  user
) => ({
  user: session.user,
  accessToken: user?.accessToken,
  refreshToken: user?.refreshToken,
  expires: user?.expiresIn,
})

interface NextAuthSpotifyOAuthAccount extends AuthorizationCodeGrantResponse {
  provider: 'spotify'
  type: 'oauth'
  id: string
  accessToken: string
  accessTokenExpires: number | null
  refreshToken: string
  idToken?: string
}
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

  pages: {
    signIn: '/login',
  },

  callbacks: {
    jwt: async (token, user, account: NextAuthSpotifyOAuthAccount) => {
      if (account) {
        /**
         * This block triggers **only** when the user successfully signs in
         * with Spotify OAuth.
         */
        const expiryDate = Date.now() + account.expires_in * 1000
        token.id = account?.id
        token.accessToken = account?.accessToken
        token.refreshToken = account?.refreshToken
        token.expiresIn = new Date(expiryDate).toISOString()
      } else if (Date.now() > new Date(token.expiresIn).getTime()) {
        /**
         * This block triggers for users that are already signed in.
         */
        spotify.setClientId(process.env.SPOTIFY_CLIENT_ID)
        spotify.setClientSecret(process.env.SPOTIFY_CLIENT_SECRET)
        spotify.setAccessToken(token?.accessToken)
        spotify.setRefreshToken(token?.refreshToken)

        const { body } = await spotify.refreshAccessToken()
        const expiryDate = Date.now() + body.expires_in * 1000
        token.accessToken = body.access_token
        token.expiresIn = new Date(expiryDate).toISOString()
      }

      return token
    },
    session: createSession,
  },

  debug: process.env.NODE_ENV !== 'production',
}

const handleAuthRequests: NextApiHandler = (req, res) => {
  return WithAuth(req, res, options)
}

export default handleAuthRequests
