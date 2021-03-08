import type { PlaylistValidationError } from 'next'

import type { SpotifyPlaylistBackup } from '@/typings/spotify'

type ValidateNewPlaylistFields = (
  body: Partial<SpotifyPlaylistBackup>
) => PlaylistValidationError[]

const validateNewPlaylistFields: ValidateNewPlaylistFields = (body) => {
  const publicFieldType = typeof body?.public
  const collaborativeFieldType = typeof body?.collaborative
  const errors = []

  if (!body?.name) {
    errors.push({
      field: 'name',
      message: 'Playlist name is missing.',
    })
  }

  if (publicFieldType !== 'undefined' && publicFieldType !== 'boolean') {
    errors.push({
      field: 'public',
      message: 'This field must either be true or false.',
    })
  }

  if (
    collaborativeFieldType !== 'undefined' &&
    collaborativeFieldType !== 'boolean'
  ) {
    errors.push({
      field: 'collaborative',
      message: 'This field must either be true or false.',
    })
  }

  return errors
}

export default validateNewPlaylistFields
