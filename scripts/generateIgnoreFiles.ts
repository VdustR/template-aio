/**
 * This script is used to generate ignore files for tools other than git and
 * each package.
 */
import { generateIgnoreFiles } from "@repo/utils/generateIgnoreFiles.js";
import path from "pathe";

const __dirname = path.dirname(new URL(import.meta.url).pathname);
const repoDirname = path.resolve(__dirname, "..");

generateIgnoreFiles({
  rootDir: repoDirname,
});
