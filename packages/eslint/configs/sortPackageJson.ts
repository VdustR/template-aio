import {
  type Rules,
  sortPackageJson as originalSortPackageJson,
} from "@antfu/eslint-config";
import * as R from "remeda";

import type { Config } from "./types";

/**
 * Similar to `sortPackageJson` from `@antfu/eslint-config`, but sorts keys with
 * default order if no specific order is provided.
 */
const sortPackageJson: () => Config = async () => {
  const sortPackageJsonConfigs = await originalSortPackageJson();
  const sortPackageJsonConfig = sortPackageJsonConfigs[0];
  if (!sortPackageJsonConfig) throw new Error("No sortPackageJsonConfig");
  const ruleEntry: Extract<Rules["jsonc/sort-keys"], Array<any>> = R.pathOr(
    sortPackageJsonConfig,
    ["rules", "jsonc/sort-keys"],
    undefined,
  );
  if (!ruleEntry) throw new Error("No ruleEntry");
  return {
    ...sortPackageJsonConfig,
    name: "sort-package-json",
    rules: {
      "jsonc/sort-keys": [
        ...ruleEntry,
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
