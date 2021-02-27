import type { ITokensDefinition } from '@stitches/core'

const tokens: ITokensDefinition = {
  colors: {
    $white: '#ffffff',
    $primary: '#161d6f',
    $background: '#f6f6f6',

    $shadowPrimary: '0.125rem 0.125rem 0.5rem 0.25rem rgba(0, 0, 0, 0.05)',
  },

  /**
   * `boxShadow: '$primary'` doesn't properly map to `tokens.shadows`.
   */
  shadows: {},

  fonts: {
    $primary: "'Noto Sans KR', sans-serif",
  },

  letterSpacings: {
    $primary: '0.016em',
  },

  sizes: {
    /**
     * Token values can't be numbers.
     */
    $topNavigationHeight: '60px',
  },

  space: {
    $pageSideSpacing: '16px',
  },
}

export default tokens
