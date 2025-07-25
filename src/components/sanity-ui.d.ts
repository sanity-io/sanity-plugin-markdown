import {type Theme} from '@sanity/ui/theme'

declare module 'styled-components' {
  // eslint-disable-next-line no-unused-vars
  interface DefaultTheme extends Theme {}
}
