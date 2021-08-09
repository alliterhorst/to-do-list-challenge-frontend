import 'styled-components';
import { colors } from './colors';
import { fonts } from './fonts';
import { units } from './units';
import { navigationTheme } from './navigationTheme';

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: typeof colors;
    fonts: typeof fonts;
    units: typeof units;
    navigationTheme: typeof navigationTheme;
  }
}
