import type { Config } from "../types";
import { sortPackageJson as originalSortPackageJson } from "@antfu/eslint-config";

import { get } from "es-toolkit/compat";

/**
 * Similar to `sortPackageJson` from `@antfu/eslint-config`, but sorts keys with
 * default order if no specific order is provided.
 */
const sortPackageJson: () => Config = async () => {
  const sortPackageJsonConfigs = await originalSortPackageJson();
  const sortPackageJsonConfig = sortPackageJsonConfigs[0];
  if (!sortPackageJsonConfig) throw new Error("No sortPackageJsonConfig");
  const ruleEntry = get(sortPackageJsonConfig, ["rules", "jsonc/sort-keys"]);
  if (!ruleEntry) throw new Error("No ruleEntry");
  const rules = Array.isArray(ruleEntry) ? ruleEntry : [ruleEntry];
  return {
    ...sortPackageJsonConfig,
    name: "sort-package-json",
    rules: {
      "jsonc/sort-keys": [
        ...rules,
        /**
         * Sort keys with default order if no specific order is provided.
         */
        {
          pathPattern: ".*",
          order: { type: "asc" },
        },
      ] as typeof ruleEntry,
    },
  };
};

export { sortPackageJson };
