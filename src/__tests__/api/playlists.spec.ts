import { PlaylistsApiEndpoint } from '@/api/playlists'

describe('PlaylistsApiEndpoint', () => {
  it('is defined', () => {
    expect(PlaylistsApiEndpoint).toBeDefined()
  })
})

describe('PlaylistsApiEndpoint.prototype.isAllowedHttpMethod', () => {
  it('is defined', () => {
    const endpoint = new PlaylistsApiEndpoint()
    expect(endpoint.isAllowedHttpMethod).toBeDefined()
  })

  it('is a function', () => {
    const endpoint = new PlaylistsApiEndpoint()
    expect(typeof endpoint.isAllowedHttpMethod).toBe('function')
  })

  it('returns a boolean', () => {
    const endpoint = new PlaylistsApiEndpoint()
    const result = endpoint.isAllowedHttpMethod('GET')
    expect(typeof result).toBe('boolean')
  })

  it("returns true when 'GET' is passed as an argument", () => {
    const endpoint = new PlaylistsApiEndpoint()
    const result = endpoint.isAllowedHttpMethod('GET')
    expect(result).toBe(true)
  })

  it("returns true when 'POST' is passed as an argument", () => {
    const endpoint = new PlaylistsApiEndpoint()
    const result = endpoint.isAllowedHttpMethod('POST')
    expect(result).toBe(true)
  })

  it("returns false when 'PUT' is passed as an argument", () => {
    const endpoint = new PlaylistsApiEndpoint()
    const result = endpoint.isAllowedHttpMethod('PUT')
    expect(result).toBe(false)
  })

  it("returns false when 'DELETE' is passed as an argument", () => {
    const endpoint = new PlaylistsApiEndpoint()
    const result = endpoint.isAllowedHttpMethod('DELETE')
    expect(result).toBe(false)
  })
})

describe('PlaylistsApiEndpoint.prototype.handleRequest', () => {
  it('is defined', () => {
    const endpoint = new PlaylistsApiEndpoint()
    expect(endpoint.handleRequest).toBeDefined()
  })

  it('is a function', () => {
    const endpoint = new PlaylistsApiEndpoint()
    expect(typeof endpoint.handleRequest).toBe('function')
  })
})
