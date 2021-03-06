import type { DeepPartial } from '@/typings/utils'

export type DownloadFile = (blob: Blob, fileName?: string) => void

export const downloadFile: DownloadFile = (
  blob,
  fileName = 'playlist.json'
) => {
  if (window?.navigator?.msSaveOrOpenBlob) {
    window.navigator.msSaveOrOpenBlob(blob, fileName)
  } else {
    const link = document.createElement('a')
    link.href = window.URL.createObjectURL(blob)
    link.download = fileName
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }
}

export type CreateMockPlaylistCard = (
  options?: DeepPartial<SpotifyApi.PlaylistObjectSimplified>
) => SpotifyApi.PlaylistObjectSimplified

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

export type CreateMockPlaylistImage = (
  options?: Partial<SpotifyApi.ImageObject>
) => SpotifyApi.ImageObject

export const createMockPlaylistImage: CreateMockPlaylistImage = ({
  url,
  width,
  height,
} = {}) => ({
  url: url ?? '',
  width: width ?? 0,
  height: height ?? 0,
})
