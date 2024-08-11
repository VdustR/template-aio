import { defaultPluginRenaming, renameRules } from "@antfu/eslint-config";
import eslintConfigPrettier from "eslint-config-prettier";

import type { Config } from "../types";

const prettier: Config = {
  ...eslintConfigPrettier,
  rules: renameRules(eslintConfigPrettier.rules, defaultPluginRenaming),
};

export { prettier };
