import type { Config } from "../types";

import * as mdxPlugin from "eslint-plugin-mdx";

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
