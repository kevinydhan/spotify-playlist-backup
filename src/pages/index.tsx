import type { GetServerSideProps, NextPage } from 'next'
import { getSession } from 'next-auth/client'

import PlaylistCard from '@/components/PlaylistCard/PlaylistCard'
import spotify from '@/controllers/spotify'
import type { PageProps } from '@/typings/pages'

interface IndexPageProps extends PageProps {
  playlists: SpotifyApi.PlaylistObjectSimplified[]
}

const IndexPage: NextPage<IndexPageProps> = ({ session, playlists }) => {
  if (!session) return <a href="/api/auth/signin">Log in to Spotify</a>
  console.log(playlists[0])
  return (
    <div>
      <h1>Welcome, {session?.user?.name}!</h1>
      <label htmlFor="playlist-backup-file-upload">
        Create playlist from backup file
        <input
          type="file"
          accept="application/JSON"
          style={{ cursor: 'pointer' }}
          onLoad={(event) => {
            console.log(event)
          }}
        />
      </label>
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
  const session = await getSession(context)
  const accessToken = session?.accessToken
  const result = {
    props: {
      session,
      playlists: [],
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
