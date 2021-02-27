import type { IBreakpoints } from '@stitches/core'

const breakpoints: IBreakpoints = {
  small0: (rule) => `@media (min-width: 320px) { ${rule} }`,

  tablet0: (rule) => `@media (min-width: 768px) { ${rule} }`,
  tablet1: (rule) => `@media (min-width: 1024px) { ${rule} }`,

  desktop0: (rule) => `@media (min-width: 1366px) { ${rule} }`,
}

export default breakpoints
