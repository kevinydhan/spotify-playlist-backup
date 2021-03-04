import {
  DOMAttributes,
  FunctionComponent,
  InputHTMLAttributes,
  useCallback,
  useRef,
  useState,
} from 'react'

import getFileText from '@/utils/get-file-text/get-file-text'

type HandleFileInputChange = InputHTMLAttributes<HTMLInputElement>['onChange']

type HandleSubmit = DOMAttributes<HTMLFormElement>['onSubmit']

const AddNewPlaylist: FunctionComponent = () => {
  const [newPlaylist, setNewPlaylist] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  const handleFileInputChange: HandleFileInputChange = useCallback(
    async ({ target }) => {
      const files = target.files
      if (!files || !files?.length) return
      const data = await getFileText(files)
      setNewPlaylist(data)
    },
    [setNewPlaylist]
  )

  const handleSubmit: HandleSubmit = useCallback(
    async (event) => {
      event.preventDefault()

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
    },
    [inputRef.current]
  )

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="playlist-backup-file-upload">
        Create playlist from backup file
        <input
          ref={inputRef}
          type="file"
          accept="application/JSON"
          onChange={handleFileInputChange}
        />
      </label>
      <button type="submit">Create playlist</button>
    </form>
  )
}

export default AddNewPlaylist
