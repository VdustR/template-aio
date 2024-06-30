import "@fontsource/inter";
import "@repo/css-reset";

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import App from "./App";
import { Theme } from "./theme";

const container = document.createElement("div");
container.setAttribute("class", "my-app");
document.body.appendChild(container);

createRoot(container).render(
  <StrictMode>
    <Theme>
      <App />
    </Theme>
  </StrictMode>,
);
