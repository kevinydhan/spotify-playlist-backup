import type { PlaylistValidationError } from 'next'

import type { SpotifyPlaylistBackup } from '@/typings/spotify'

type ValidateNewPlaylistFields = (
  body: Partial<SpotifyPlaylistBackup>
) => PlaylistValidationError[]

const validateNewPlaylistFields: ValidateNewPlaylistFields = (body) => {
  const errors = []

  if (!body?.name) {
    errors.push({
      field: 'name',
      message: 'Playlist name is missing.',
    })
  }

  if (typeof body?.public !== 'boolean') {
    errors.push({
      field: 'public',
      message: 'This field must either be true or false.',
    })
  }

  if (typeof body?.collaborative !== 'boolean') {
    errors.push({
      field: 'collaborative',
      message: 'This field must either be true or false.',
    })
  }

  return errors
}

export default validateNewPlaylistFields
