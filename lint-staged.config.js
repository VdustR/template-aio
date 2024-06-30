import process from "node:process";

import glob from "fast-glob";

const isFormat = process.env["TYPE"] === "format";

const typescriptExtensions = ["js", "jsx", "ts", "tsx"];

const pkgs = glob.sync("packages/*", {
  absolute: false,
  onlyDirectories: true,
});

const appPkgs = ["packages/vite-react-19"];

// Make sure appPkgs are valid
appPkgs.forEach((pkg) => {
  if (!pkgs.includes(pkg)) {
    throw new Error(`"${pkg}" is not a valid package`);
  }
});

/**
 * @type {import('lint-staged').Config}
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
      ...Object.fromEntries(
        pkgs.flatMap((pkg) => {
          if (appPkgs.includes(pkg)) {
            return [
              [`${pkg}/*.config.{js,ts}`, () => `pnpm exec tsc -p ${pkg}`],
              [
                `${pkg}/src/**/*.{${typescriptExtensions.join(",")}}`,
                () => `pnpm exec tsc -p ${pkg}/src`,
              ],
            ];
          }
          return [
            [
              `${pkg}/**/*.{${typescriptExtensions.join(",")}}`,
              () => `pnpm exec tsc -p ${pkg}`,
            ],
          ];
        }),
      ),
    };

export default config;
