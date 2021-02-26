import type { GetServerSideProps, NextPage } from 'next'
import {
  getProviders,
  getSession,
  SessionProvider,
  signIn,
} from 'next-auth/client'

import { AddNewPlaylist, PlaylistCard } from '@/components/index'
import spotify from '@/controllers/spotify'
import type { CommonPageProps } from '@/typings/pages'

interface IndexPageProps extends CommonPageProps {
  playlists: SpotifyApi.PlaylistObjectSimplified[]
  provider: SessionProvider
}

const IndexPage: NextPage<IndexPageProps> = ({
  session,
  playlists,
  provider,
}) => {
  if (!session) return <div>Join us!</div>

  return (
    <div>
      <h1>Welcome, {session?.user?.name}!</h1>
      <AddNewPlaylist />
      <ul style={{ padding: 0 }}>
        {playlists.map((playlist) => (
          <PlaylistCard
            key={playlist.id}
            {...playlist}
            accessToken={session?.accessToken}
          />
        ))}
      </ul>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps<IndexPageProps> = async (
  context
) => {
  const providers = await getProviders()
  const session = await getSession(context)
  const accessToken = session?.accessToken
  const result = {
    props: {
      session,
      playlists: [],
      provider: providers?.spotify,
    },
  }

  if (accessToken) {
    spotify.setAccessToken(accessToken)
    const { body } = await spotify.getUserPlaylists({
      limit: 50,
    })
    result.props.playlists = body.items
  }

  return result
}

export default IndexPage
