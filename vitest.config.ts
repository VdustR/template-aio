import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    projects: [
      "packages/*",
      {
        test: {
          name: "dependency-security",
          include: ["scripts/**/*.test.mjs"],
        },
      },
    ],
  },
});
