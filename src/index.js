import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import AuthProvider from "./context/AuthContext";
//TODO: Store user in cookies
import { OverlayContextProvider } from "./context/overlay-context";
import { ThemeContextProvider } from "./context/theme-context";
ReactDOM.render(
  <React.StrictMode>
    <ThemeContextProvider>
      <OverlayContextProvider>
          <App />
      </OverlayContextProvider>
    </ThemeContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);


