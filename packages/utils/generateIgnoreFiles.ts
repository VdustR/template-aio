import process from "node:process";

import fastGlob from "fast-glob";
import fs from "fs-extra";
import path from "pathe";
import * as R from "remeda";
import type { O } from "ts-toolbelt";

import { gitignoreToDockerignore } from "./gitignoreToDockerignore";
import { guessEol } from "./guessEol";
import { nestIgnore } from "./nestIgnore";

interface Options {
  rootDir: string;
  target: Array<string>;
  rules: Array<string>;
  dockerignoreFiles: Array<string>;
}

const defaultOptions = {
  rootDir: process.cwd(),
  target: [
    ".stylelintignore",
    ".eslintignore",
    ".prettierignore",
    ".markdownlintignore",
    ".dockerignore",
  ],
  rules: [
    "__snapshots__",
    "/package-lock.json",
    "/pnpm-lock.yaml",
    "/yarn.lock",
    "CHANGELOG.md",
  ],
  dockerignoreFiles: [".dockerignore"],
} as const satisfies Options;

async function generateIgnoreFiles(options?: O.Partial<Options, "deep">) {
  const mergedOptions: Options = R.merge(defaultOptions, options);
  const gitignorePath = path.join(mergedOptions.rootDir, ".gitignore");
  const gitignore = await fs.readFile(gitignorePath, "utf8");
  const eol = guessEol(gitignore);
  const result =
    [
      "!.*",
      gitignore,
      `${eol}# Additional rules from "generateIgnoreFiles"`,
      ...mergedOptions.rules.map((rule) => rule),
    ].join(eol) + eol;

  const regularIgnoreFiles = mergedOptions.target.filter(
    (target) => !mergedOptions.dockerignoreFiles.includes(target),
  );
  const dockerignoreFiles = mergedOptions.target.filter(
    (target) => !regularIgnoreFiles.includes(target),
  );

  const hasDockerignore = dockerignoreFiles.length > 0;

  await (async function writeRootIgnoreFiles() {
    await Promise.all(
      regularIgnoreFiles.map(async function writeIgnoreFiles(target) {
        return fs.writeFile(
          path.join(mergedOptions.rootDir, target),
          target === ".dockerignore" ? gitignoreToDockerignore(result) : result,
        );
      }),
    );
    if (hasDockerignore) {
      const dockerignore = gitignoreToDockerignore(result);
      await Promise.all(
        dockerignoreFiles.map(async function writeIgnoreFiles(target) {
          return fs.writeFile(
            path.join(mergedOptions.rootDir, target),
            dockerignore,
          );
        }),
      );
    }
  })();

  await (async function writePackageIgnoreFiles() {
    const packagePaths = (
      await fastGlob("**/package.json", {
        cwd: mergedOptions.rootDir,
        ignore: ["**/node_modules/**", "package.json"],
      })
    ).map((packagePath) => path.dirname(packagePath));
    if (packagePaths.length === 0) return;
    for (const packagePath of packagePaths) {
      const ignore = nestIgnore(result, packagePath);
      await Promise.all(
        regularIgnoreFiles.map(async function writeIgnoreFiles(target) {
          return fs.writeFile(
            path.join(mergedOptions.rootDir, packagePath, target),
            ignore,
          );
        }),
      );
      if (hasDockerignore) {
        const dockerignore = gitignoreToDockerignore(ignore);
        await Promise.all(
          dockerignoreFiles.map(async function writeIgnoreFiles(target) {
            return fs.writeFile(
              path.join(mergedOptions.rootDir, packagePath, target),
              dockerignore,
            );
          }),
        );
      }
    }
  })();
}

export { generateIgnoreFiles };
