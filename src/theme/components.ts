import { styled } from '@/theme/config'

export const Box = styled('div', {
  padding: 20,

  listStyle: 'none',
  border: '1px solid black',
})

export const Heading = styled('h1', {})

export const Text = styled('p', {})

export const Badge = styled('span', {
  display: 'inline-block',
  fontSize: 13,
  paddingX: 8,
  paddingY: 4,
  borderRadius: 50,
  color: 'white',
  backgroundColor: 'blue',
})

export const Button = styled('button', {
  fontSize: 13,
  lineHeight: 1,
  backgroundColor: 'transparent',
  borderRadius: '9999px',
  appearance: 'none',
  cursor: 'pointer',
})
