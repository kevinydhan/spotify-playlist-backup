type GetFileText = (fileList: FileList) => Promise<string>

const getFileText: GetFileText = (fileList) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()

    reader.addEventListener('load', ({ target }) => {
      resolve(target.result.toString())
    })
    reader.addEventListener('error', reject)
    reader.readAsText(fileList[0])
  })
}

export default getFileText
