import React, { Component } from 'react'

import spotify from '@/controllers/spotify'
import { downloadFile } from '@/utils/index'

import buttonStyles from '../../styles/components/button.module.scss'
import type {
  CreateBackupData,
  DownloadBackup,
  GetPlaylistTrackUris,
  PlaylistCardProps,
} from './PlaylistCard.d'
import styles from './PlaylistCard.module.scss'

class PlaylistCard extends Component<PlaylistCardProps> {
  static defaultProps = {
    buttonInnerText: 'Download backup file',
  }

  getPlaylistTrackUris: GetPlaylistTrackUris = async () => {
    const { accessToken, id } = this.props

    spotify.setAccessToken(accessToken)

    const playlistTracks: SpotifyApi.PlaylistTrackObject[] = []
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
    name: this.props?.name ?? '',
    description: this.props.description ?? '',
    public: this.props.public ?? false,
    collaborative: this.props.collaborative ?? false,
    createdAt: new Date().toISOString(),
    uris,
  })

  /**
   * @see https://stackoverflow.com/a/33542499/11715889
   */
  downloadBackup: DownloadBackup = async () => {
    const uris = await this.getPlaylistTrackUris()
    const playlistDetails = this.createBackupData(uris)
    const data = JSON.stringify(playlistDetails, null, 2)
    const blob = new Blob([data], { type: 'application/json' })
    downloadFile(blob)
  }

  render: Component['render'] = () => (
    <li className={styles.root}>
      <div>
        {this.props?.images?.length && (
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
          <span>{this.props?.name}</span>
          <span> by </span>
          <span>{this.props?.owner?.display_name}</span>
        </p>
        <span>{this.props?.tracks?.total} songs</span>
      </div>
      <button className={buttonStyles.button} onClick={this.downloadBackup}>
        {PlaylistCard.defaultProps.buttonInnerText}
      </button>
    </li>
  )
}

export default PlaylistCard
