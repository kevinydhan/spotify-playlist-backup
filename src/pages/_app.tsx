import type { NextComponentType, NextPage, NextPageContext } from 'next'
import type { AppProps } from 'next/app'
import { Provider as AuthProvider } from 'next-auth/client'

import type { CommonPageProps } from '@/typings/pages'

interface ModifiedAppProps extends Omit<AppProps, 'Component' | 'pageProps'> {
  pageProps: CommonPageProps
  Component: NextComponentType<
    NextPageContext,
    CommonPageProps & Record<string, unknown>,
    Record<string, unknown>
  >
}

const App: NextPage<ModifiedAppProps> = ({ Component, pageProps }) => (
  <AuthProvider session={pageProps?.session}>
    <Component {...pageProps} />
  </AuthProvider>
)

export default App
