import validateNewPlaylistFields from './validate-new-playlist-fields'

test('it is a function', () => {
  expect(typeof validateNewPlaylistFields).toBe('function')
})

test('it returns an array', () => {
  const result = validateNewPlaylistFields({})
  expect(Array.isArray(result)).toBe(true)
})

test("it returns an array containing an error object with the 'field' property equal to 'name' when no body.name is undefined", () => {
  const result = validateNewPlaylistFields({})
  expect(result.length).toBeGreaterThan(0)
  expect(result[0].field).toBe('name')
})

describe('body.public error object', () => {
  it(`doesn't return an error for the 'public' field if body.public is undefined`, () => {
    const result = validateNewPlaylistFields({})
    expect(result.length).toBeGreaterThan(0)
    result.forEach((error) => expect(error).not.toBe('public'))
  })

  it(`doesn't return an error for the 'public' field if body.public is equal to true`, () => {
    const result = validateNewPlaylistFields({
      public: true,
    })
    expect(result.length).toBeGreaterThan(0)
    result.forEach((error) => expect(error).not.toBe('public'))
  })

  it(`doesn't return an error for the 'public' field if body.public is equal to false`, () => {
    const result = validateNewPlaylistFields({
      public: false,
    })
    expect(result.length).toBeGreaterThan(0)
    result.forEach((error) => expect(error).not.toBe('public'))
  })

  it(`returns an error for the 'public' field if body.public is defined and not equal to a boolean`, () => {
    const result = validateNewPlaylistFields({
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      public: '',
      name: '',
    })
    expect(result.length).toBeGreaterThan(0)

    const target = result.filter((error) => error.field === 'public')
    expect(target.length).toBe(1)
  })
})

describe('body.collaborative error object', () => {
  it(`doesn't return an error for the 'collaborative' field if body.collaborative is undefined`, () => {
    const result = validateNewPlaylistFields({})
    expect(result.length).toBeGreaterThan(0)
    result.forEach((error) => expect(error).not.toBe('collaborative'))
  })

  it(`doesn't return an error for the 'collaborative' field if body.collaborative is equal to true`, () => {
    const result = validateNewPlaylistFields({
      collaborative: true,
    })
    expect(result.length).toBeGreaterThan(0)
    result.forEach((error) => expect(error).not.toBe('collaborative'))
  })

  it(`doesn't return an error for the 'collaborative' field if body.collaborative is equal to false`, () => {
    const result = validateNewPlaylistFields({
      collaborative: false,
    })
    expect(result.length).toBeGreaterThan(0)
    result.forEach((error) => expect(error).not.toBe('collaborative'))
  })

  it(`returns an error for the 'collaborative' field if body.collaborative is defined and not equal to a boolean`, () => {
    const result = validateNewPlaylistFields({
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      collaborative: '',
      name: '',
    })
    expect(result.length).toBeGreaterThan(0)

    const target = result.filter((error) => error.field === 'collaborative')
    expect(target.length).toBe(1)
  })
})
