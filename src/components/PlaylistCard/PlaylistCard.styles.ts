export const root = {
  display: 'grid',
  alignItems: 'center',
  gridTemplateColumns: '75px 1fr 200px',
  columnGap: 16,
  padding: 20,
  maxWidth: 600,
  backgroundColor: '$white',
  boxShadow: '$boxShadowPrimary',
  borderRadius: 16,
  listStyle: 'none',

  '& + &': {
    marginTop: 16,
  },
}
