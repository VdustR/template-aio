import antfu from "@antfu/eslint-config";
import { FlatCompat } from "@eslint/eslintrc";
import * as mdx from "eslint-plugin-mdx";
// @ts-expect-error -- no types
import simpleImportSort from "eslint-plugin-simple-import-sort";
import tsdoc from "eslint-plugin-tsdoc";

const compat = new FlatCompat();

export default antfu(
  {
    react: true,
    stylistic: false,
    jsonc: false,
    yaml: false,
    toml: false,
    markdown: false,
  },
  ...compat.config({
    extends: [
      "plugin:@typescript-eslint/strict",
      "plugin:prettier/recommended",
    ],
  }),
  {
    files: ["**/*.ts", "**/*.tsx"],
    plugins: {
      tsdoc,
      "simple-import-sort": simpleImportSort,
    },
    rules: {
      "tsdoc/syntax": "warn",
      "simple-import-sort/imports": "error",
      "simple-import-sort/exports": "error",
    },
  },
  {
    ...mdx.flat,
    processor: mdx.createRemarkProcessor({
      lintCodeBlocks: true,
      languageMapper: {},
    }),
  },
  {
    ...mdx.flatCodeBlocks,
  },
);
