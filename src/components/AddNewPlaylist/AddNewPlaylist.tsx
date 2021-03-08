import {
  DOMAttributes,
  FunctionComponent,
  InputHTMLAttributes,
  useCallback,
  useRef,
  useState,
} from 'react'

import getFileText from '@/utils/get-file-text/get-file-text'

import styles from './AddNewPlaylist.module.scss'

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
    <form onSubmit={handleSubmit} className={styles.form}>
      <label htmlFor="playlist-backup-file-upload">
        Create playlist from backup file
      </label>
      <input
        className={styles.input}
        name="playlist-backup-file-upload"
        ref={inputRef}
        type="file"
        accept="application/JSON"
        onChange={handleFileInputChange}
      />
      <button type="submit">Create playlist</button>
    </form>
  )
}

export default AddNewPlaylist
