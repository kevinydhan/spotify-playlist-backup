import type { SessionProvider } from 'next-auth/client'

import type { CommonPageProps } from '@/typings/pages'

export interface TopNavigationProps extends CommonPageProps {
  provider?: SessionProvider
}
