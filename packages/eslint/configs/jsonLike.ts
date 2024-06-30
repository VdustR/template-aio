import { jsonc } from "@antfu/eslint-config";

import type { Config } from "../types";

/**
 * Format JSON-like files which do not have `.json` extension.
 */
const jsonLike: () => Config = async () => {
  return await jsonc({
    files: ["**/*.code-workspace"],
    overrides: {
      "jsonc/sort-keys": "error",
    },
    stylistic: false,
  });
};

export { jsonLike };
