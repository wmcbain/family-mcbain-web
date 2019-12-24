import { css, SerializedStyles } from "@emotion/core";

const header = css`
  font-family: Martel, serif;
  font-weight: 600;
`;

const body = css`
  font-family: Rubik, system-ui, sans-serif;
  font-weight: 500;
`;

export interface Fonts {
  h1: SerializedStyles;
  h2: SerializedStyles;
  h3: SerializedStyles;
  h4: SerializedStyles;
  body: SerializedStyles;
  body2: SerializedStyles;
  button: SerializedStyles;
  caption: SerializedStyles;
}

const fonts: Fonts = {
  h1: css`
    ${header};
    font-size: 6em;
    @media (max-width: 70em) {
      font-size: 3.8em;
    }
    @media (max-width: 50em) {
      font-size: 3em;
    }
  `,
  h2: css`
    ${header};
    font-size: 4.8em;
    @media (max-width: 70em) {
      font-size: 3.2em;
    }
    @media (max-width: 50em) {
      font-size: 2.4em;
    }
  `,
  h3: css`
    ${header};
    font-size: 3.4em;
    @media (max-width: 70em) {
      font-size: 2.3em;
    }
    @media (max-width: 50em) {
      font-size: 1.7em;
    }
  `,
  h4: css`
    ${header};
    font-size: 2.4em;
    @media (max-width: 70em) {
      font-size: 1.8em;
    }
    @media (max-width: 50em) {
      font-size: 1.4em;
    }
  `,
  body: css`
    ${body};
    font-size: 1.6em;
    @media (max-width: 70em) {
      font-size: 1.4em;
    }
    @media (max-width: 50em) {
      font-size: 1.2em;
    }
  `,
  body2: css`
    ${body};
    font-size: 1.4em;
    @media (max-width: 70em) {
      font-size: 1.2em;
    }
    @media (max-width: 50em) {
      font-size: 1em;
    }
  `,
  button: css`
    ${body};
    font-size: 1.6em;
    text-transform: uppercase;
    @media (max-width: 70em) {
      font-size: 1.4em;
    }
    @media (max-width: 50em) {
      font-size: 1.2em;
    }
  `,
  caption: css`
    ${body};
    font-size: 1.2em;
    @media (max-width: 50em) {
      font-size: 1em;
    }
  `
};

export default fonts;
