import * as mdxPlugin from "eslint-plugin-mdx";

import type { Config } from "../types";

const mdx: Array<Config> = [
  {
    ...mdxPlugin.flat,
    processor: mdxPlugin.createRemarkProcessor({
      lintCodeBlocks: true,
      languageMapper: {},
    }),
  },
  {
    ...mdxPlugin.flatCodeBlocks,
  },
];

export { mdx };
