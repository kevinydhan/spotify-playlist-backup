import 'next-auth'

declare module 'next-auth' {
  export interface User {
    id?: string
    sub?: string
    accessToken?: string
    refreshToken?: string
    expiresIn?: string
    iat?: number
    exp?: number
  }

  export interface SessionBase {
    user: User
    accessToken?: string
    refreshToken?: string
    expires: string
  }
}
