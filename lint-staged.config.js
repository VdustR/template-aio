import process from "node:process";
// eslint-disable-next-line dot-notation -- Property 'TYPE' comes from an index signature, so it must be accessed with ['TYPE'].ts(4111)
const isFormat = process.env["TYPE"] === "format";

/**
 * @type {import('lint-staged').Config}
 */
const config = isFormat
  ? {
      "**/*.{css,js,jsx,ts,tsx}": "stylelint --fix",
      "**/*": [
        "eslint --report-unused-disable-directives --fix --max-warnings=0 --no-error-on-unmatched-pattern --no-warn-ignored",
        "prettier --ignore-unknown --write",
      ],
    }
  : {
      "**/*": "cspell lint --no-must-find-files",
      "packages/vite-react-19/src/**/*.{ts,tsx}": () =>
        "pnpm exec tsc -p packages/vite-react-19/src",
    };

export default config;
