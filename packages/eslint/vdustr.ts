import type { Config } from "./types";
import antfu from "@antfu/eslint-config";
import { rules } from "@repo/eslint/rules";

import { merge } from "es-toolkit/compat";
import { jsonLike } from "./configs/jsonLike";
import { mdx } from "./configs/mdx";
import { prettier } from "./configs/prettier";
import { reactCompiler } from "./configs/reactCompiler";
import { sortPackageJson } from "./configs/sortPackageJson";

type Options = NonNullable<Parameters<typeof antfu>[0]> & {
  mdx?: boolean;
};

const vdustr: typeof antfu = (
  options?: Options,
  ...userConfigs: Array<Config>
) => {
  const reactEnabled: boolean = Boolean(options?.react);
  const markdownEnabled: boolean = options?.mdx ?? true;
  const defaultOptions: NonNullable<Parameters<typeof antfu>[0]> = {
    // We use `prettier`.
    stylistic: false,
    rules,
  };
  const defaultConfigs: Array<NonNullable<Parameters<typeof antfu>[1]>> = [
    sortPackageJson(),
    jsonLike(),
    ...(!reactEnabled ? [] : [reactCompiler]),
    ...(!markdownEnabled ? [] : mdx),
    prettier,
  ];
  return antfu(
    merge({}, defaultOptions, options),
    ...defaultConfigs,
    ...userConfigs,
  );
};

export { vdustr };
