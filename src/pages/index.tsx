import type { GetServerSideProps, NextPage } from 'next'
import { getSession } from 'next-auth/client'

import type { PageProps } from '@/typings/pages'

interface IndexPageProps extends PageProps {
  playlists: SpotifyApi.PlaylistObjectSimplified[]
}

const IndexPage: NextPage<IndexPageProps> = ({ session }) => {
  if (!session) return <a href="/api/auth/signin">Log in to Spotify</a>
  return (
    <div>
      <h1>Welcome, {session?.user?.name}!</h1>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps<IndexPageProps> = async (
  context
) => {
  const session = await getSession(context)
  const result = {
    props: {
      session,
      playlists: [],
    },
  }

  return result
}

export default IndexPage
