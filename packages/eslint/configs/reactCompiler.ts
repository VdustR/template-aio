// @ts-expect-error -- no types
import reactCompilerPlugin from "eslint-plugin-react-compiler";

import type { Config } from "../types";

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
