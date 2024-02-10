import "@fontsource/inter";
import "./main.css";

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import App from "./App";
import { Theme } from "./theme";

const root = document.getElementById("root");

if (!root) {
  throw new Error("No root element");
}

createRoot(root).render(
  <StrictMode>
    <Theme>
      <App />
    </Theme>
  </StrictMode>,
);
