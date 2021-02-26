import { DOMAttributes, FunctionComponent, useRef, useState } from 'react'

const getFileText = (fileList: FileList): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()

    reader.addEventListener('load', ({ target }) => {
      resolve(target.result.toString())
    })
    reader.addEventListener('error', reject)
    reader.readAsText(fileList[0])
  })
}

const AddNewPlaylist: FunctionComponent = () => {
  const [newPlaylist, setNewPlaylist] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  const handleFileInputChange = async () => {
    const files = inputRef?.current?.files
    if (!files || !files?.length) return
    const data = await getFileText(files)
    setNewPlaylist(data)
  }

  const handleSubmit: DOMAttributes<HTMLFormElement>['onSubmit'] = async (
    event
  ) => {
    event.preventDefault()
    console.log(newPlaylist)
    try {
      const response = await fetch('/api/playlists', {
        method: 'POST',
        body: newPlaylist,
        headers: {
          'Content-Type': 'application/json',
        },
      })
      if (response.status === 201) {
        // clear input
        if (inputRef.current?.value) inputRef.current.value = ''
      }
      /**
       * @todo
       * - Do something with successful response
       */
    } catch (err) {
      /**
       * @todo
       * - Handle error
       */
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="playlist-backup-file-upload">
        Create playlist from backup file
        <input
          ref={inputRef}
          type="file"
          accept="application/JSON"
          style={{ cursor: 'pointer' }}
          onChange={handleFileInputChange}
        />
      </label>
      <button type="submit">Create playlist</button>
    </form>
  )
}
export default AddNewPlaylist
