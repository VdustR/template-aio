import antfu from "@antfu/eslint-config";
import { rules } from "@repo/eslint/rules";
import merge from "lodash/merge";

import { jsonLike } from "./configs/jsonLike";
import { lodash } from "./configs/lodash";
import { mdx } from "./configs/mdx";
import { reactCompiler } from "./configs/reactCompiler";
import { simpleImportSort } from "./configs/simpleImportSort";
import { sortPackageJson } from "./configs/sortPackageJson";
import type { Config } from "./types";

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
    lodash,
    sortPackageJson(),
    jsonLike(),
    simpleImportSort,
    ...(!reactEnabled ? [] : [reactCompiler]),
    ...(!markdownEnabled ? [] : mdx),
  ];
  return antfu(
    merge({}, defaultOptions, options),
    ...defaultConfigs,
    ...userConfigs,
  );
};

export { vdustr };
