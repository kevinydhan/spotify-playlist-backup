import type { Session } from 'next-auth/client'

/**
 * Defines the props passed by `_app.tsx`.
 */
export interface PageProps {
  session: Session
}
