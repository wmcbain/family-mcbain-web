import { createContext } from 'react';
import fonts, { Fonts } from './fonts';
import colorThemes, { Colors } from './colors';

export type ThemeVariations = 'dark';

interface ThemeContextValue {
  colors: Colors;
  fonts: Fonts;
  setTheme: (theme: ThemeVariations) => void;
}

const ThemeContext = createContext<ThemeContextValue>({
  colors: colorThemes.dark,
  fonts,
  setTheme: () => {
    console.error('ThemeContext not implemented');
  },
});

export default ThemeContext;
