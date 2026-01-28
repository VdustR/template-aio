import { vdustr } from "@vp-tw/eslint-config";

export default vdustr(
  {
    react: true,
    storybook: true,
    emotion: true,
    tanstackQuery: true,
  },
  {
    ignores: ["pnpm-lock.yaml", "dist/**", ".changeset/**", "CHANGELOG.md", "LICENSE"],
  },
  {
    files: ["**/package.json"],
    rules: {
      // sorted by oxfmt
      "package-json/order-properties": "off",
    },
  },
);
