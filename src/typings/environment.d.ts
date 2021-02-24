declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV?: 'development' | 'production'

    /**
     * References the base url for the application, which is used by
     * `next-auth`.
     */
    NEXTAUTH_URL: string
    JWT_SIGNING_KEY: string

    SPOTIFY_CLIENT_ID: string
    SPOTIFY_CLIENT_SECRET: string
  }
}
