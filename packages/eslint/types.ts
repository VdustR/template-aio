import type antfu from "@antfu/eslint-config";

type Config = NonNullable<Parameters<typeof antfu>[1]>;

export type { Config };
