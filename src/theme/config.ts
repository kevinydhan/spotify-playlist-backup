import { createStyled } from '@stitches/react'

export const { styled, css } = createStyled({
  tokens: {
    colors: {
      $background: '#ececec',
    },
    fonts: {
      $primary: "'Noto Sans KR', sans-serif",
    },
    letterSpacings: {
      $primary: '0.016em',
    },
  },

  breakpoints: {},

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

  button: {
    fontFamily: '$primary',
  },
})
