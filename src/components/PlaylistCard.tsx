import React, { Component } from 'react'

import spotify from '@/controllers/spotify'
import { Badge, Box, Button } from '@/theme/components'
import type { SpotifyPlaylistBackup } from '@/typings/spotify'
interface PlaylistCardProps extends SpotifyApi.PlaylistObjectSimplified {
  accessToken: string
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
    <Box
      as="li"
      css={{
        display: 'grid',
        gridTemplateColumns: '75px 1fr 200px',
        columnGap: '16px',
        alignItems: 'center',
        maxWidth: 600,
      }}
    >
      <div>
        {this.props.images.length && (
          <img
            src={this.props.images[0].url}
            width={this.props.images[0].width}
            height={this.props.images[0].height}
            style={{ maxWidth: 75, maxHeight: 75 }}
          />
        )}
      </div>
      <div>
        <p style={{ margin: 0, marginBottom: '0.5em' }}>
          <span>{this.props.name}</span>
          <span> by </span>
          <span>{this.props.owner.display_name}</span>
        </p>
        <Badge>{this.props.tracks.total} songs</Badge>
      </div>
      <Button onClick={this.downloadBackup}>
        {PlaylistCard.defaultProps.buttonInnerText}
      </Button>
    </Box>
  )
}

export default PlaylistCard
