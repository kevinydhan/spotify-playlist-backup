import { createStyled } from '@stitches/react'

import tokens from './tokens'

export const { styled, css } = createStyled({
  tokens,
  utils: {
    /**
     * Applies left and right margin.
     */
    marginX: () => (value) => ({
      marginLeft: value,
      marginRight: value,
    }),

    /**
     * Applies top and bottom margin.
     */
    marginY: () => (value) => ({
      marginTop: value,
      marginBottom: value,
    }),

    /**
     * Applies left and right padding.
     */
    paddingX: () => (value) => ({
      paddingLeft: value,
      paddingRight: value,
    }),

    /**
     * Applies top and bottom padding.
     */
    paddingY: () => (value) => ({
      paddingTop: value,
      paddingBottom: value,
    }),
  },
})

css.global({
  html: {
    fontFamily: '$primary',
    letterSpacing: '$primary',
  },

  body: {
    marginX: 16,
    marginY: 0,
    backgroundColor: '$background',
  },

  main: {
    paddingTop: '$pageTopPadding',
  },

  button: {
    fontFamily: '$primary',
  },

  'button, input[type="file"]': {
    cursor: 'pointer',
  },
})
