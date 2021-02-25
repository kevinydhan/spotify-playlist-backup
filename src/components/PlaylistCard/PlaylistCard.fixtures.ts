import type { DeepPartial } from '@/typings/utils'

type CreateMockPlaylistCard = (
  options?: DeepPartial<SpotifyApi.PlaylistObjectSimplified>
) => SpotifyApi.PlaylistObjectSimplified

type CreateMockPlaylistImage = (
  options?: Partial<SpotifyApi.ImageObject>
) => SpotifyApi.ImageObject

/**
 * Creates a new `SpotifyApi.PlaylistObjectSimplified` object to be used for
 * testing. If no options are passed, this function will provide default values
 * for the required fields.
 *
 * @returns - Spotify playlist object
 */
export const createMockPlaylist: CreateMockPlaylistCard = ({
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

  images: images?.length
    ? images.map((image) => createMockPlaylistImage(image))
    : [],
})

export const createMockPlaylistImage: CreateMockPlaylistImage = ({
  url,
  width,
  height,
} = {}) => ({
  url: url ?? '',
  width: width ?? 0,
  height: height ?? 0,
})
