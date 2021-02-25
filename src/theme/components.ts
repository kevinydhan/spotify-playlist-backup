import { styled } from '@/theme/config'

export const Box = styled('div', {
  padding: 20,
  listStyle: 'none',
  borderRadius: 16,
  boxShadow: '0.125rem 0.125rem 0.5rem 0.25rem rgba(0, 0, 0, 0.0325)',
  backgroundColor: 'white',

  '& + &': {
    marginTop: 16,
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
  paddingX: 8,
  paddingY: 4,
  backgroundColor: 'transparent',
  borderRadius: 8,
  appearance: 'none',
  cursor: 'pointer',
})