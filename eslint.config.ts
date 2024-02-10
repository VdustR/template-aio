import antfu from "@antfu/eslint-config";
import { FlatCompat } from "@eslint/eslintrc";
import jsdoc from "eslint-plugin-jsdoc";
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
    ...jsdoc.configs["flat/recommended"],
    plugins: {},
    files: ["**/*.cjs", "**/*.js", "**/*.jsx"],
  },
  {
    files: ["**/*.ts", "**/*.tsx"],
    plugins: {
      tsdoc,
    },
    rules: {
      "tsdoc/syntax": "warn",
    },
  },
  {
    files: ["**/*.js", "**/*.jsx", "**/*.ts", "**/*.tsx"],
    plugins: {
      "simple-import-sort": simpleImportSort,
    },
    rules: {
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
