import antfu from "@antfu/eslint-config";
import * as mdx from "eslint-plugin-mdx";
import simpleImportSort from "eslint-plugin-simple-import-sort";

export default antfu(
  {
    react: true,
    stylistic: false,
    jsonc: false,
    yaml: false,
    toml: false,
    markdown: false,
    rules: {
      /**
       * This rule does not integrate well with JSDoc `@link` tags. It's advised
       * to verify its behavior with TypeScript instead.
       */
      "ts/no-unused-vars": "off",

      /**
       * Disable the `sort-imports` and `import/order` rule in favor of
       * `simple-import-sort`.
       */
      "sort-imports": "off",
      "import/order": "off",
    },
  },
  {
    files: ["**/*.js", "**/*.jsx", "**/*.ts", "**/*.tsx", "**/*.mdx"],
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
