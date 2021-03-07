import chunkArray from './chunk-array'

test('it is a function', () => {
  expect(typeof chunkArray).toBe('function')
})

test('it returns an array', () => {
  const result = chunkArray([])
  expect(Array.isArray(result)).toBe(true)
})

test('it returns an array of arrays', () => {
  const result = chunkArray([1])
  result.forEach((element) => {
    expect(Array.isArray(element)).toBe(true)
  })
})

test(`it divides the elements equally when the total number of elements is divisible by the chunk size`, () => {
  const chunkSize = 5
  const result = chunkArray(Array(chunkSize * 5), chunkSize)

  result.forEach((element) => {
    expect(element.length).toBe(chunkSize)
  })
})

test(`it puts the remainder in the last subarray `, () => {
  const chunks = 5
  const chunkSize = 5
  const remainder = 2
  const arr = Array(chunkSize * chunks + remainder)
  const result = chunkArray(arr, chunkSize)

  result.forEach((element, i) => {
    if (i === result.length - 1) expect(element.length).toBe(remainder)
    else expect(element.length).toBe(chunkSize)
  })
})
