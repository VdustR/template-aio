import process from "node:process";

const isFormat = process.env.LINT_STAGED_TYPE === "format";

/**
 * @type {import('lint-staged').Configuration}
 */
const config = isFormat
  ? {
      "**/*.css": "stylelint --fix",
      "**/*": [
        "eslint --report-unused-disable-directives --fix --max-warnings=0 --no-error-on-unmatched-pattern --no-warn-ignored",
        "prettier --ignore-unknown --write",
      ],
    }
  : {
      "**/*": "cspell lint --no-must-find-files",
      "**/(*.{js,ts,jsx,tsx}|tsconfig.json|tsconfig.*.json)": () =>
        "pnpm run -w checkTypes",
      "**/*.{js,jsx,ts,tsx}": "vitest related --run --passWithNoTests",
    };

export default config;
