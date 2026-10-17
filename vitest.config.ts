import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    projects: [
      "packages/*",
      {
        test: {
          name: "dependency-security",
          include: ["scripts/dependency-security.test.mjs"],
        },
      },
      {
        test: {
          name: "typecheck-cache",
          include: ["scripts/typecheck-cache.test.mjs"],
          testTimeout: 30000,
        },
      },
    ],
  },
});
