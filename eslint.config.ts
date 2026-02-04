import { vdustr } from "@vp-tw/eslint-config";
import oxfmtConfig from "./.oxfmtrc.json" with { type: "json" };

export default vdustr(
  {
    react: true,
    storybook: true,
    emotion: true,
    tanstackQuery: true,
  },
  {
    ignores: oxfmtConfig.ignorePatterns,
  },
);
