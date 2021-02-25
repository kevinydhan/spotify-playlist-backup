export interface SpotifyPlaylistBackup {
  name: SpotifyApi.PlaylistObjectSimplified['name']
  description: SpotifyApi.PlaylistObjectSimplified['description']
  public: SpotifyApi.PlaylistObjectSimplified['public']
  collaborative: SpotifyApi.PlaylistObjectSimplified['collaborative']
  uris: SpotifyApi.PlaylistTrackObject[]
  createdAt: string
}
