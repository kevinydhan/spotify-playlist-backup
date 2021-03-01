import type { GetServerSideProps, NextPage } from 'next'
import { getSession } from 'next-auth/client'

import { AddNewPlaylist, PlaylistCard } from '@/components/index'
import spotify from '@/controllers/spotify'
import type { CommonPageProps } from '@/typings/pages'

import pageStyles from '../styles/pages/dashboard.module.scss'

interface DashboardPageProps extends CommonPageProps {
  playlists: SpotifyApi.PlaylistObjectSimplified[]
}

const DashboardPage: NextPage<DashboardPageProps> = ({
  session,
  playlists,
}) => (
  <div>
    <h1 className={pageStyles.heading}>Welcome, {session?.user?.name}!</h1>
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

export const getServerSideProps: GetServerSideProps<DashboardPageProps> = async (
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

export default DashboardPage
