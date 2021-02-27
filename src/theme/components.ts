import { styled } from '@/theme/config'

export const Box = styled('div', {})

export const Header = styled('header', {
  position: 'fixed',
  zIndex: 9999,
  top: 0,
  left: 0,
  right: 0,
  display: 'flex',
  alignItems: 'center',
  height: '$topNavigationHeight',
  paddingX: '$pageSideSpacing',
  backgroundColor: '$background',
  boxShadow: '$boxShadowPrimary',

  variants: {
    alignX: {
      right: {
        justifyContent: 'flex-end',
      },
    },
  },
})

export const Heading = styled('h1', {})

export const Text = styled('p', {})

export const Badge = styled('span', {
  display: 'inline-block',
  fontSize: 12,
  paddingX: 8,
  paddingY: 4,
  borderRadius: 16,
  color: 'white',
  backgroundColor: 'blue',
})

export const Button = styled('button', {
  fontSize: 14,
  lineHeight: 1,
  paddingX: 12,
  paddingY: 10,
  backgroundColor: '$primary',
  color: '$white',
  border: 'none',
  borderRadius: 6,
  appearance: 'none',
  boxShadow: '$shadowPrimary',
})
