import isValidSpotifyTrackUri from '../is-valid-spotify-track-uri'

test('it is defined', () => {
  expect(isValidSpotifyTrackUri).toBeDefined()
})

test('it is a function', () => {
  expect(typeof isValidSpotifyTrackUri).toBe('function')
})

test('it returns a boolean', () => {
  const result = isValidSpotifyTrackUri()
  expect(typeof result).toBe('boolean')
})

test('it returns false for an empty string', () => {
  const result = isValidSpotifyTrackUri('')
  expect(result).toBe(false)
})

test('it returns false for a malformed track uri', () => {
  const result = isValidSpotifyTrackUri('spotify:track')
  expect(result).toBe(false)
})

test(`it returns false for a string beginning with 'spotify:track:' and ending with 22 characters and symbols`, () => {
  const uri = 'spotify:track:123456789abcdefghijKL+'
  const result = isValidSpotifyTrackUri(uri)
  expect(result).toBe(false)
})

test(`it returns true for a string beginning with 'spotify:track:' and ending with exactly 22 lowercase English characters`, () => {
  const uri = 'spotify:track:abcdefghijklmnopqrstuv'
  const result = isValidSpotifyTrackUri(uri)
  expect(result).toBe(true)
})

test(`it returns true for a string beginning with 'spotify:track:' and ending with exactly 22 uppercase English characters`, () => {
  const uri = 'spotify:track:ABCDEFGHIJKLMNOPQRSTUV'
  const result = isValidSpotifyTrackUri(uri)
  expect(result).toBe(true)
})

test(`it returns true for a string beginning with 'spotify:track:' and ending with exactly 22 digits`, () => {
  const uri = 'spotify:track:1234567890123456789012'
  const result = isValidSpotifyTrackUri(uri)
  expect(result).toBe(true)
})

test(`it returns true for a string beginning with 'spotify:track:' and ending with exactly 22 lowercase or uppercase English characters or digits`, () => {
  const uri = 'spotify:track:123456789abcdefghijklM'
  const result = isValidSpotifyTrackUri(uri)
  expect(result).toBe(true)
})

test(`it returns false for a string beginning with 'spotify:track:' and ending with more than 22 lowercase or uppercase English characters or digits`, () => {
  const uri = 'spotify:track:123456789abcdefghijklMN'
  const result = isValidSpotifyTrackUri(uri)
  expect(result).toBe(false)
})

test(`it returns false for a string beginning with 'spotify:track:' and ending with less than 22 lowercase or uppercase English characters or digits`, () => {
  const uri = 'spotify:track:123456789abcdefghijkL'
  const result = isValidSpotifyTrackUri(uri)
  expect(result).toBe(false)
})
