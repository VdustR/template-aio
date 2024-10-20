import type { Config } from "../types";
import { defaultPluginRenaming, renameRules } from "@antfu/eslint-config";

import eslintConfigPrettier from "eslint-config-prettier";

const prettier: Config = {
  ...eslintConfigPrettier,
  rules: renameRules(eslintConfigPrettier.rules, defaultPluginRenaming),
};

export { prettier };
