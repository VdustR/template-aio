/**
 * @type {import('prettier').Config}
 */
const config = {
  overrides: [
    {
      files: "*.json",
      options: {
        /**
         * Some libraries like `sort-json` don't work well with trailing commas
         * in JSON files. So, we should avoid them in JSON files.
         */
        trailingComma: "none",
      },
    },
  ],
};

export default config;
