import { fileURLToPath } from "node:url";

import { includeIgnoreFile } from "@eslint/compat";
import { vdustr } from "@repo/eslint";
import path from "pathe";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const gitignorePath = path.resolve(__dirname, ".gitignore");

export default vdustr(
  {
    react: true,
  },
  includeIgnoreFile(gitignorePath),
);
