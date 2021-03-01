import { createStyled } from '@stitches/react'

import breakpoints from './breakpoints'
import tokens from './tokens'

export const { styled, css } = createStyled({
  tokens,
  breakpoints,
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
