/**
 * @template InputArray - The input array.
 * @template Member - The elements' type.
 */
type ChunkArray = <InputArray extends Array<unknown>>(
  arr: InputArray,
  chunkSize?: number
) => InputArray[]

/**
 * @example
 * chunkArray([1,2,3,4,5], 2)
 * // Returns [[1,2],[3,4],[5]]
 *
 * @param arr - Input array
 * @param chunkSize
 */
const chunkArray: ChunkArray = (arr, chunkSize = 100) => {
  const result = []

  for (let i = 0; i < arr.length; i += chunkSize) {
    result.push(arr.slice(i, i + chunkSize))
  }

  return result
}

export default chunkArray
