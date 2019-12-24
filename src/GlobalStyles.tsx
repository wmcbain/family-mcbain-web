import React from "react";
import { css, Global } from "@emotion/core";
import { useTheme } from "./theme/ThemeProvider";
import reset from "./styles/reset";

const GlobalStyles = () => {
  const {
    colors: {
      elements: { background, headline, paragraph, button, buttonText }
    },
    fonts: { h1, h2, h3, h4, body, button: buttonFont }
  } = useTheme();

  const global = css`
    ${reset};
    body {
      background-color: ${background};
      font-size: 10px;
    }
    h1 {
      ${h1};
      color: ${headline};
    }
    h2 {
      ${h2};
      color: ${headline};
    }
    h3 {
      ${h3};
      color: ${headline};
    }
    h4 {
      ${h4};
      color: ${headline};
    }
    p {
      ${body};
      color: ${paragraph};
    }
    button {
      ${buttonFont};
      border-radius: 0.4em;
      border: none;
      background: ${button};
      cursor: pointer;
      padding: 0.4em 0.8em;
      color: ${buttonText};
      transition: opacity 100ms ease;

      &:hover,
      &:active,
      &:focus {
        border: none;
        outline: none;
      }

      &:hover {
        opacity: 0.9;
      }
    }
  `;

  return <Global styles={global} />;
};

export default GlobalStyles;
