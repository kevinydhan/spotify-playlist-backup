import type { ITokensDefinition } from '@stitches/core'

const tokens: ITokensDefinition = {
  colors: {
    $white: '#e4e5eb',
    $blue300: '#1282a2',
    $blue400: '#001f54',
    $blue600: '#034078',
    $blue900: '#0a1128',

    $dark: '#0a1128',
    $primary: '#034078',
    $secondary: '#001f54',
    $background: 'var(--colors-white)',
    $light: '#fefcfb',

    $shadowPrimary: '0.125rem 0.125rem 0.5rem 0.25rem rgba(0, 0, 0, 0.0325)',
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
