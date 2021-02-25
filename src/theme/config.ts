import { createStyled } from '@stitches/react'

export const { styled, css } = createStyled({
  tokens: {
    colors: {},
  },

  breakpoints: {},

  utils: {
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
  body: {
    margin: 0,
  },
})
