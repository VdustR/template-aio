import type { Config } from "./types";
import antfu, {
  GLOB_JSON,
  GLOB_JSON5,
  GLOB_JSONC,
  jsonc,
} from "@antfu/eslint-config";
import { merge } from "es-toolkit/compat";

import packageJson from "eslint-plugin-package-json/configs/recommended";
import { mdx } from "./configs/mdx";
import { prettier } from "./configs/prettier";
import { reactCompiler } from "./configs/reactCompiler";
import { rules } from "./rules";

type Options = NonNullable<Parameters<typeof antfu>[0]> & {
  mdx?: boolean;
};

const vdustr: typeof antfu = (
  options?: Options,
  ...userConfigs: Array<Config>
) => {
  const reactEnabled: boolean = Boolean(options?.react);
  const markdownEnabled: boolean = options?.mdx ?? true;
  const jsoncEnabled: boolean = Boolean(options?.jsonc ?? true);
  const defaultOptions: NonNullable<Parameters<typeof antfu>[0]> = {
    // We use `prettier`.
    stylistic: false,
    jsonc: false,
    rules,
  };
  const jsonFiles: string[] = [
    GLOB_JSON,
    GLOB_JSON5,
    GLOB_JSONC,
    "**/*.code-workspace",
  ];
  type Config = NonNullable<Parameters<typeof antfu>[1]>;
  const defaultConfigs: Array<Config> = [
    ...(!jsoncEnabled
      ? []
      : [
          (async () => {
            const result = await jsonc({
              ...(typeof options?.jsonc !== "object" ? null : options.jsonc),
              overrides: {
                "jsonc/sort-keys": "error",
              },
              files: jsonFiles,
            });
            return result.map((config) =>
              config.files
                ? {
                    ...config,
                    ignores: [
                      ...(config.ignores ?? []),
                      /**
                       * Lint `package.json` files with `eslint-plugin-package-json` instead.
                       */
                      "**/package.json",
                    ],
                  }
                : config,
            );
          })(),
          packageJson,
        ]),
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
