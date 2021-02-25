import { FunctionComponent, useRef } from 'react'

import { SpotifyPlaylistBackup } from '@/typings/spotify'

const provideDefaultMissingPlaylistBackupFields = (
  data: SpotifyPlaylistBackup
) => {
  const result = {} as SpotifyPlaylistBackup
  if (!data?.name) result.name = ''
  if (!data?.description) result.description = ''
  if (!data?.public) result.public = false
  if (!data?.collaborative) result.collaborative = false
  if (!data?.uris || !Array.isArray(data.uris)) result.uris = []
  return result
}

const AddNewPlaylist: FunctionComponent = () => {
  const inputRef = useRef<HTMLInputElement>(null)

  const handleFileInputChange = () => {
    const files = inputRef?.current?.files
    if (!files || !files?.length) return

    const reader = new FileReader()

    reader.addEventListener('load', async (event) => {
      const data = JSON.parse(event.target.result as string)
    })
    reader.readAsText(files[0])
  }

  return (
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
  )
}
export default AddNewPlaylist
