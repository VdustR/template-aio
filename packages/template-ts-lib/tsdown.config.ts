import type { UserConfig } from "tsdown";
import { defineConfig } from "tsdown";

const basicConfig = {
  entry: ["src/index.ts"],
  tsconfig: "tsconfig.lib.json",
  dts: true,
} as const satisfies Exclude<UserConfig, Array<any>>;

export default defineConfig([
  {
    ...basicConfig,
    unbundle: true,
  },
]);
