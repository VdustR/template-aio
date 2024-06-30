import simpleImportSortPlugin from "eslint-plugin-simple-import-sort";

import type { Config } from "../types";

const simpleImportSort: Config = {
  files: ["**/*.js", "**/*.jsx", "**/*.ts", "**/*.tsx", "**/*.mdx"],
  plugins: {
    "simple-import-sort": simpleImportSortPlugin,
  },
  rules: {
    "simple-import-sort/imports": "error",
    "simple-import-sort/exports": "error",
  },
};

export { simpleImportSort };
