import type { GetServerSideProps, NextPage } from 'next'
import { getSession } from 'next-auth/client'

import spotify from '@/controllers/spotify'
import type { PageProps } from '@/typings/pages'

interface IndexPageProps extends PageProps {
  playlists: SpotifyApi.PlaylistObjectSimplified[]
}

const downloadPlaylistBackup = async (
  playlist: SpotifyApi.PlaylistObjectSimplified
): Promise<void> => {
  const { description, collaborative, tracks } = playlist

  // const response = await fetch('/api/download', {
  //   method: 'POST',
  //   body: JSON.stringify({
  //     name: playlist.name,
  //     description,
  //     public: playlist.public,
  //     collaborative,
  //     tracks,
  //   }),
  //   headers: {
  //     'Access-Control-Expose-Headers': 'Content-Disposition',
  //   },
  // })
  // const body = await response.json()
  // console.log(typeof body)

  const data = JSON.stringify(
    {
      name: playlist.name,
      description,
      public: playlist.public,
      collaborative,
      tracks,
      createdAt: new Date().toISOString(),
    },
    null,
    2
  )
  const blob = new Blob([data], { type: 'text/json' })
  if (window?.navigator?.msSaveOrOpenBlob) {
    window.navigator.msSaveOrOpenBlob(blob, 'playlist.json')
    console.log('hi')
  } else {
    const elem = window.document.createElement('a')
    elem.href = window.URL.createObjectURL(blob)
    elem.download = 'playlist.json'
    document.body.appendChild(elem)
    elem.click()
    document.body.removeChild(elem)
  }
}

const IndexPage: NextPage<IndexPageProps> = ({ session, playlists }) => {
  if (!session) return <a href="/api/auth/signin">Log in to Spotify</a>
  return (
    <div>
      <h1>Welcome, {session?.user?.name}!</h1>
      <ul>
        {playlists.map((playlist) => (
          <li key={playlist.id}>
            {playlist.name}
            <button onClick={() => downloadPlaylistBackup(playlist)}>
              Download playlist
            </button>
          </li>
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
