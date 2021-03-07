import getFileText from './get-file-text'

const createMockFileList = (): FileList => {
  const file = new File([], '')
  const fileList = {
    0: file,
    length: 1,
    item: () => file,
    [Symbol.iterator]: () => null,
  }

  return fileList
}

test('it is defined', () => {
  expect(getFileText).toBeDefined()
})

test('it returns a promise', () => {
  const mockFileList: FileList = createMockFileList()
  const result = getFileText(mockFileList)
  expect(result).toBeInstanceOf(Promise)
})
