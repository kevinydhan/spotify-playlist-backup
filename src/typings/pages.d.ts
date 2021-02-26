import type { Session, SessionProvider } from 'next-auth/client'

/**
 * Defines the props passed by `_app.tsx`.
 */
export interface CommonPageProps {
  session?: Session
  provider: SessionProvider
}
