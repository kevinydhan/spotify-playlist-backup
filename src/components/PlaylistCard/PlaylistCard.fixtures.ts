type CreatePlaylistCardMockProps = (
  options?: Partial<SpotifyApi.PlaylistObjectSimplified>
) => SpotifyApi.PlaylistObjectSimplified

export const createProps: CreatePlaylistCardMockProps = ({
  id,
  name,
  description,
  href,
  uri,
  collaborative,
  snapshot_id,
  owner,
  tracks,
  external_urls,
  images,
  ...options
} = {}) => ({
  id: id ?? '',
  name: name ?? '',
  description: description ?? '',
  type: 'playlist',
  href: href ?? '',
  uri: uri ?? '',
  public: options.public ?? false,
  collaborative: collaborative ?? false,
  snapshot_id: snapshot_id ?? '',
  // primary_color: null,

  owner: {
    id: owner?.id ?? '',
    type: 'user',
    display_name: owner?.display_name ?? '',
    external_urls: {
      spotify: owner?.external_urls?.spotify ?? '',
    },
    href: owner?.href ?? '',
    uri: owner?.uri ?? '',
  },

  tracks: {
    href: tracks?.href ?? '',
    total: tracks?.total ?? 0,
  },

  external_urls: {
    spotify: external_urls?.spotify ?? '',
  },

  images: images ?? [],
})
