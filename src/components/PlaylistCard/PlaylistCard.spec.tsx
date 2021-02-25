import '@testing-library/jest-dom/extend-expect'

import { render } from '@testing-library/react'
import React from 'react'

import PlaylistCard from './PlaylistCard'
import {
  createMockPlaylist,
  createMockPlaylistImage,
} from './PlaylistCard.fixtures'

test('it is defined', () => {
  expect(PlaylistCard).toBeDefined()
})

test('it displays the name of the playlist', () => {
  const playlist = {
    name: 'Test playlist',
  }
  const props = createMockPlaylist(playlist)
  const { getByText } = render(<PlaylistCard {...props} accessToken="" />)

  getByText(playlist.name)
})

test("it displays the playlist owner's display name", () => {
  const playlist = {
    owner: {
      display_name: 'Kevin Han',
    },
  }
  const props = createMockPlaylist(playlist)
  const { getByText } = render(<PlaylistCard {...props} accessToken="" />)

  getByText(playlist.owner.display_name)
})

test('it displays the total number of songs in the playlist', () => {
  const playlist = {
    tracks: {
      total: 100,
    },
  }
  const props = createMockPlaylist(playlist)
  const { getByText } = render(<PlaylistCard {...props} accessToken="" />)

  getByText(playlist.tracks.total + ' songs')
})

test("it renders the playlist's image if exists", () => {
  const image = {
    url: 'https://examplecdn.com',
  }
  const playlistImage = createMockPlaylistImage(image)
  const props = createMockPlaylist({ images: [playlistImage] })
  const { container } = render(<PlaylistCard {...props} accessToken="" />)
  const element = container.querySelector('img')

  expect(element).toHaveAttribute('src', image.url)
})

test('it renders a button', () => {
  const props = createMockPlaylist()
  const { getByText } = render(<PlaylistCard {...props} accessToken="" />)

  getByText(PlaylistCard.defaultProps.buttonInnerText)
})
