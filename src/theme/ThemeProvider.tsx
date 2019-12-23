import React, { FC, useState, useContext } from 'react';
import ThemeContext, { ThemeVariations } from './ThemeContext';
import colorThemes from './colors';
import fonts from './fonts';

const ThemeProvider: FC<{}> = props => {
  const { children } = props;
  const [theme, setNextTheme] = useState<ThemeVariations>('dark');
  const setTheme = (nextTheme: ThemeVariations) => {
    setNextTheme(nextTheme);
  };
  const colors = colorThemes[theme];
  return (
    <ThemeContext.Provider
      value={{
        colors,
        fonts,
        setTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
export default ThemeProvider;
