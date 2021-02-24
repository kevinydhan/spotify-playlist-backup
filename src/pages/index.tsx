import type { GetServerSideProps, NextPage } from 'next'
import { getSession } from 'next-auth/client'

import spotify from '@/controllers/spotify'
import type { PageProps } from '@/typings/pages'

interface IndexPageProps extends PageProps {
  playlists: SpotifyApi.PlaylistObjectSimplified[]
}

const downloadPlaylistBackup = async (
  playlist: SpotifyApi.PlaylistObjectSimplified,
  trackUris: SpotifyApi.TrackObjectSimplified['uri'][]
): Promise<void> => {
  console.log({ trackUris: trackUris.length })
  const playlistDetails = {
    name: playlist.name,
    description: playlist.description,
    public: playlist.public,
    collaborative: playlist.collaborative,
    uris: trackUris,
    createdAt: new Date().toISOString(),
  }
  const data = JSON.stringify(playlistDetails, null, 2)

  /**
   * @see https://stackoverflow.com/a/33542499/11715889
   */
  const blob = new Blob([data], { type: 'text/json' })
  if (window?.navigator?.msSaveOrOpenBlob) {
    window.navigator.msSaveOrOpenBlob(blob, 'playlist.json')
  } else {
    const elem = window.document.createElement('a')
    elem.href = window.URL.createObjectURL(blob)
    elem.download = 'playlist.json'
    document.body.appendChild(elem)
    elem.click()
    document.body.removeChild(elem)
  }
}

const getPlaylistTrackUris = async ({
  accessToken,
  playlistId,
}: {
  playlistId: string
  accessToken: string
}) => {
  spotify.setAccessToken(accessToken)

  const playlistTracks: SpotifyApi.PlaylistTrackObject[] = []
  let response = await spotify.getPlaylistTracks(playlistId)

  playlistTracks.push(...response.body.items)

  while (response.body.next) {
    response = await spotify.getPlaylistTracks(playlistId, {
      limit: response.body.limit,
      offset: response.body.offset + response.body.limit,
    })
    playlistTracks.push(...response.body.items)
  }

  return playlistTracks
    .filter((track) => !track.is_local)
    .map(({ track }) => track.uri)
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
            <button
              onClick={async () => {
                const trackUris = await getPlaylistTrackUris({
                  accessToken: session.accessToken,
                  playlistId: playlist.id,
                })
                await downloadPlaylistBackup(playlist, trackUris)
              }}
            >
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
