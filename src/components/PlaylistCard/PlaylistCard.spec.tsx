import { render } from '@testing-library/react'
import React from 'react'

import PlaylistCard from './PlaylistCard'
import { createProps } from './PlaylistCard.fixtures'

test('it is defined', () => {
  expect(PlaylistCard).toBeDefined()
})

test('it renders a button', () => {
  const props = createProps()
  const { getByText } = render(<PlaylistCard {...props} accessToken="" />)
  getByText(PlaylistCard.defaultProps.buttonInnerText)
})
