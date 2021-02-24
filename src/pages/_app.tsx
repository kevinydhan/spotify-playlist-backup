import type { NextPage } from 'next'
import type { AppProps } from 'next/app'
import { Provider as AuthProvider } from 'next-auth/client'

import type { PageProps } from '@/typings/pages'

interface AugmentedAppProps extends AppProps<PageProps> {
  pageProps: PageProps
}

const App: NextPage<AugmentedAppProps> = ({ Component, pageProps }) => (
  <AuthProvider session={pageProps?.session}>
    <Component {...pageProps} />
  </AuthProvider>
)

export default App
