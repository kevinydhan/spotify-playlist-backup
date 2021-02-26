export type IsValidSpotifyTrackUri = (
  uri?: SpotifyApi.TrackObjectSimplified['uri']
) => boolean

const isValidSpotifyTrackUri: IsValidSpotifyTrackUri = (uri = '') => {
  const regex = RegExp(/^spotify:track:[a-zA-Z0-9]{22}$/)
  return regex.test(uri)
}

export default isValidSpotifyTrackUri
