import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { RecoilRoot } from "recoil";
import { ThemeProvider, createGlobalStyle } from "styled-components";
import { darkTheme } from "./theme";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

const GlobalStyle = createGlobalStyle`
  body {
    color: black;
    background-color: ${(props) => props.theme.bgColor};
  }
`;

root.render(
  <RecoilRoot>
    <ThemeProvider theme={darkTheme}>
      <GlobalStyle />
      <App />
    </ThemeProvider>
  </RecoilRoot>
);
