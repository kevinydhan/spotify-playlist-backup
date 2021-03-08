import '../styles/global.scss'

import type { NextComponentType, NextPage, NextPageContext } from 'next'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import { Provider as AuthProvider } from 'next-auth/client'

import { TopNavigation } from '@/components/index'
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
    <Head>
      <title>Spotify Playlist Backup</title>
      <meta charSet="UTF-8" />
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    </Head>
    <TopNavigation
      session={pageProps?.session}
      provider={pageProps?.provider}
    />
    <main>
      <Component {...pageProps} />
    </main>
  </AuthProvider>
)

export default App
