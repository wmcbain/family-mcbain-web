export interface Colors {
  elements: {
    background: string;
    headline: string;
    paragraph: string;
    button: string;
    buttonText: string;
  };
  illustration: {
    stroke: string;
    main: string;
    highlight: string;
    secondary: string;
    tertiary: string;
  };
}

export interface ColorThemes {
  dark: Colors;
}

//https://www.happyhues.co/palettes/4
const colorThemes: ColorThemes = {
  dark: {
    elements: {
      background: '#16161a',
      headline: '#fffffe',
      paragraph: '#94a1b2',
      button: '#7f5af0',
      buttonText: '#fffffe',
    },
    illustration: {
      stroke: '#010101',
      main: '#fffffe',
      highlight: '#7f5af0',
      secondary: '#72757e',
      tertiary: '#2cb67d',
    },
  },
};

export default colorThemes;
