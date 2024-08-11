import type { TypedFlatConfigItem } from "@antfu/eslint-config";

const rules: NonNullable<TypedFlatConfigItem["rules"]> = {
  /**
   * Unified brace style.
   */
  curly: ["error", "multi-or-nest", "consistent"],

  /**
   * Sort keys in JSON files.
   */
  "jsonc/sort-keys": "error",

  /**
   * This rule does not integrate well with JSDoc `@link` tags. It's advised
   * to verify its behavior with TypeScript instead.
   */
  "no-unused-vars": "off",
  "ts/no-unused-vars": "off",
  "unused-imports/no-unused-vars": "off",
  "unused-imports/no-unused-imports-ts": "off",
  "unused-imports/no-unused-vars-ts": "off",
  "unused-imports/no-unused-imports": "off",

  /**
   * Namespaces are useful for centralizing the management of types. Just avoid
   * overusing them with runtime code.
   *
   * - References:
   *   - <https://x.com/mattpocockuk/status/1805606072167940167>
   */
  "ts/no-namespace": "off",

  /**
   * Conflicts with TypeScript's `noPropertyAccessFromIndexSignature` rule.
   */
  "dot-notation": "off",

  /**
   * Disable the `sort-imports` and `import/order` rule in favor of
   * `simple-import-sort`.
   */
  "sort-imports": "off",
  "import/order": "off",
};

export { rules };
