export interface SpotifyPlaylistBackup {
  name: SpotifyApi.PlaylistObjectSimplified['name']
  description: SpotifyApi.PlaylistObjectSimplified['description']
  public: SpotifyApi.PlaylistObjectSimplified['public']
  collaborative: SpotifyApi.PlaylistObjectSimplified['collaborative']
  uris: SpotifyApi.PlaylistObjectSimplified['uri'][]
  createdAt: string
}

export interface AuthorizationCodeGrantResponse {
  access_token: string
  expires_in: number
  refresh_token: string
  scope: string
  token_type: string
}
