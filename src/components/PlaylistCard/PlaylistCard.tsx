import { Component } from 'react'

import spotify from '@/controllers/spotify'

interface PlaylistCardProps extends SpotifyApi.PlaylistObjectSimplified {
  accessToken: string
}

interface SpotifyPlaylistBackup {
  name: SpotifyApi.PlaylistObjectSimplified['name']
  description: SpotifyApi.PlaylistObjectSimplified['description']
  public: SpotifyApi.PlaylistObjectSimplified['public']
  collaborative: SpotifyApi.PlaylistObjectSimplified['collaborative']
  uris: SpotifyApi.PlaylistTrackObject[]
  createdAt: string
}

type GetPlaylistTrackUris = () => Promise<SpotifyApi.PlaylistTrackObject[]>
type CreateBackupData = (
  uris: SpotifyPlaylistBackup['uris']
) => SpotifyPlaylistBackup
type DownloadBackup = () => Promise<void>

class PlaylistCard extends Component<PlaylistCardProps> {
  static defaultProps = {
    buttonInnerText: 'Download backup file',
  }

  getPlaylistTrackUris: GetPlaylistTrackUris = async () => {
    const { accessToken, id } = this.props

    spotify.setAccessToken(accessToken)

    const playlistTracks = []
    let response = await spotify.getPlaylistTracks(id)

    playlistTracks.push(...response.body.items)

    while (response.body.next) {
      response = await spotify.getPlaylistTracks(id, {
        limit: response.body.limit,
        offset: response.body.offset + response.body.limit,
      })
      playlistTracks.push(...response.body.items)
    }

    return playlistTracks
      .filter((track) => !track.is_local)
      .map(({ track }) => track.uri)
  }

  createBackupData: CreateBackupData = (uris) => ({
    uris,
    name: this.props.name,
    description: this.props.description,
    public: this.props.public,
    collaborative: this.props.collaborative,
    createdAt: new Date().toISOString(),
  })

  /**
   * @see https://stackoverflow.com/a/33542499/11715889
   */
  downloadBackup: DownloadBackup = async () => {
    const uris = await this.getPlaylistTrackUris()
    const playlistDetails = this.createBackupData(uris)
    const data = JSON.stringify(playlistDetails, null, 2)
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

  render: Component['render'] = () => (
    <li>
      <span>{this.props.name}</span>
      <button onClick={this.downloadBackup}>
        {PlaylistCard.defaultProps.buttonInnerText}
      </button>
    </li>
  )
}

export default PlaylistCard