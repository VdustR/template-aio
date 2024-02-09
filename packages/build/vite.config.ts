import react from "@vitejs/plugin-react";
import escapeStringRegexp from "escape-string-regexp";
import { defineConfig } from "vite";

const includedPackages = ["@repo/app"];

const includeRegExp = new RegExp(
  `${escapeStringRegexp("/node_modules/")}(?:${includedPackages
    .map((lib) => `(${escapeStringRegexp(lib)})`)
    .join("|")})${escapeStringRegexp("/")}[^/]+(?:/[^/]+)*` +
    `.(?:js|jsx|ts|tsx)` +
    `$`,
);

export default defineConfig({
  plugins: [
    react({
      include: [includeRegExp],
    }),
  ],
});
