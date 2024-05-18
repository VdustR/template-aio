import antfu, { jsonc, sortPackageJson } from "@antfu/eslint-config";
import { FlatCompat } from "@eslint/eslintrc";
import * as mdx from "eslint-plugin-mdx";
import simpleImportSort from "eslint-plugin-simple-import-sort";

const compat = new FlatCompat();

export default antfu(
  {
    react: true,
    stylistic: false,
    rules: {
      /**
       * Sort keys in JSON files.
       */
      "jsonc/sort-keys": "error",

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
  (async function generateSortPackageJsonConfigs() {
    const sortPackageJsonConfigs = await sortPackageJson();
    if (!sortPackageJsonConfigs[0])
      throw new Error("No sortPackageJsonConfigs[0]");
    const config0 = sortPackageJsonConfigs[0];
    if (!config0.rules) throw new Error("No sortPackageJsonConfigs[0].rules");
    const rule = config0.rules["jsonc/sort-keys"];
    if (!Array.isArray(rule))
      throw new Error('"jsonc/sort-keys" rule is not an array');
    if (!config0.rules["jsonc/sort-keys"])
      throw new Error('No sortPackageJsonConfigs[0].rules["jsonc/sort-keys"]');
    return sortPackageJsonConfigs.with(
      0,
      (() => {
        return {
          ...config0,
          name: "vdustr/sort/package-json",
          rules: {
            ...config0.rules,
            "jsonc/sort-keys": [
              ...rule,
              {
                pathPattern: ".*",
                order: { type: "asc" },
              },
            ] as typeof rule,
          },
        } satisfies (typeof sortPackageJsonConfigs)[number] as (typeof sortPackageJsonConfigs)[number];
      })(),
    );
  })(),
  (async function sortCodeWorkspace() {
    return await jsonc({
      files: ["**/*.code-workspace"],
      overrides: {
        "jsonc/sort-keys": "error",
      },
      stylistic: false,
    });
  })(),
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
  // Legacy config
  ...compat.config({
    overrides: [
      {
        files: ["**/*.js", "**/*.jsx", "**/*.ts", "**/*.tsx"],
        plugins: ["react-compiler"],
        rules: {
          "react-compiler/react-compiler": "error",
        },
      },
    ],
  }),
);
