import type { Config } from "../types";

// @ts-expect-error -- no types
import * as reactCompilerPlugin from "eslint-plugin-react-compiler";

const reactCompiler: Config = {
  files: ["**/*.js", "**/*.jsx", "**/*.ts", "**/*.tsx"],
  plugins: {
    "react-compiler": reactCompilerPlugin,
  },
  rules: {
    "react-compiler/react-compiler": "error",
  },
};

export { reactCompiler };
