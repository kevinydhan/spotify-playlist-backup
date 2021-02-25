import type { SpotifyPlaylistBackup } from '@/typings/spotify'

export interface PlaylistCardProps extends SpotifyApi.PlaylistObjectSimplified {
  accessToken: string
}

export type GetPlaylistTrackUris = () => Promise<
  SpotifyApi.PlaylistTrackObject[]
>

export type CreateBackupData = (
  uris: SpotifyPlaylistBackup['uris']
) => SpotifyPlaylistBackup

export type DownloadBackup = () => Promise<void>
