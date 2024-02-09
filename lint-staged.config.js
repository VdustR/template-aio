const config = {
  "**/*.json": "sort-json",
  "**/package.json": "sort-package-json",
  "**/*": [
    "cspell lint --no-must-find-files",
    "prettier --ignore-unknown --write",
  ],
  "**/*.{ts,tsx,js,jsx,cjs}":
    "eslint --report-unused-disable-directives --fix --max-warnings=0",
  "packages/app/**/*.{ts,tsx}": () => "pnpm exec tsc -p packages/app",
};

export default config;
