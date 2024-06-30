import antfu from "@antfu/eslint-config";
import { jsonLike } from "@repo/eslint/configs/jsonLike";
import { mdx } from "@repo/eslint/configs/mdx";
import { reactCompiler } from "@repo/eslint/configs/reactCompiler";
import { simpleImportSort } from "@repo/eslint/configs/simpleImportSort";
import { sortPackageJson } from "@repo/eslint/configs/sortPackageJson";
import { rules } from "@repo/eslint/rules";

export default antfu(
  {
    react: true,
    stylistic: false,
    rules,
  },
  sortPackageJson(),
  jsonLike(),
  simpleImportSort,
  reactCompiler,
  ...mdx,
);
