import getFileText from './get-file-text'

test('it is defined', () => {
  expect(getFileText).toBeDefined()
})

test('it returns a promise', () => {
  const mockFileList: FileList = {
    0: new File([], ''),
    length: 1,
    item: () => mockFileList[0],
    [Symbol.iterator]: () => null,
  }

  const result = getFileText(mockFileList)
  expect(result).toBeInstanceOf(Promise)
})
