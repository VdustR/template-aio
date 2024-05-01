import antfu from "@antfu/eslint-config";
import { FlatCompat } from "@eslint/eslintrc";
import * as mdx from "eslint-plugin-mdx";
import simpleImportSort from "eslint-plugin-simple-import-sort";
import tsEslint from "typescript-eslint";

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
    extends: ["plugin:prettier/recommended"],
    rules: {
      /**
       * Inherit strict TypeScript rules from `typescript-eslint`.
       */
      ...Object.fromEntries(
        tsEslint.configs.strict.flatMap((config) => {
          if (!config.rules) return [];
          return Object.entries(config.rules).map(([rule, value]) => {
            const tsRule = rule.replace(/^@typescript-eslint\//, "ts/");
            return [tsRule, value];
          });
        }),
      ),
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
  }),
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
