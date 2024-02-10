import process from "node:process";
// eslint-disable-next-line dot-notation -- Property 'TYPE' comes from an index signature, so it must be accessed with ['TYPE'].ts(4111)
const isFormat = process.env["TYPE"] === "format";

/**
 * @type {import('lint-staged').Config}
 */
const config = isFormat
  ? {
      "**/*.json": "sort-json",
      "**/package.json": "sort-package-json",
      "**/*.{cjs,js,jsx,md,mdx,ts,tsx}":
        "eslint --report-unused-disable-directives --fix --max-warnings=0",
      "**/*.{css,js,jsx,ts,tsx}": "stylelint --fix",
      "**/*": "prettier --ignore-unknown --write",
    }
  : {
      "**/*": "cspell lint --no-must-find-files",
      "packages/app/**/*.{ts,tsx}": () => "pnpm exec tsc -p packages/app",
    };

export default config;
