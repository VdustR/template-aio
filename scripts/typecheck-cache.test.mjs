import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { mkdir, mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import { createRequire } from "node:module";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import process from "node:process";
import { it } from "vitest";

const require = createRequire(import.meta.url);
const compiler = join(dirname(require.resolve("typescript-native/package.json")), "bin/tsc");

async function withFixture(verify) {
  const root = await mkdtemp(join(tmpdir(), "typecheck-cache-"));
  try {
    const compilerOptions = {
      target: "ES2022",
      module: "ESNext",
      moduleResolution: "Bundler",
      strict: true,
      skipLibCheck: true,
      noEmit: true,
      types: [],
      tsBuildInfoFile: "./cache/check.tsbuildinfo",
    };
    for (const project of ["app", "lib"]) {
      await mkdir(join(root, project));
      await writeFile(
        join(root, project, "tsconfig.json"),
        JSON.stringify({ compilerOptions, include: ["*.ts"] }),
      );
    }
    await writeFile(
      join(root, "tsconfig.json"),
      JSON.stringify({ files: [], references: [{ path: "./app" }, { path: "./lib" }] }),
    );
    await writeFile(join(root, "lib/index.ts"), "export const value: number = 1;\n");
    await writeFile(
      join(root, "app/index.ts"),
      'import { value } from "../lib/index";\nexport const result: number = value;\n',
    );
    function check() {
      const result = spawnSync(
        process.execPath,
        [compiler, "-b", "--noEmit", "--incremental", "--verbose"],
        { cwd: root, encoding: "utf8", timeout: 20000 },
      );
      assert.ifError(result.error);
      return { status: result.status, output: result.stdout + result.stderr };
    }
    await verify(root, check);
  } finally {
    await rm(root, { recursive: true, force: true });
  }
}

it("reuses unchanged projects and invalidates imported workspace source", async () => {
  await withFixture(async (root, check) => {
    const cold = check();
    assert.equal(cold.status, 0, cold.output);
    const cache = join(root, "app/cache/check.tsbuildinfo");
    const before = await readFile(cache, "utf8");
    const warm = check();
    assert.equal(warm.status, 0, warm.output);
    assert.equal((warm.output.match(/is up to date/g) ?? []).length, 2, warm.output);
    assert.doesNotMatch(warm.output, /Building project/);
    assert.equal(await readFile(cache, "utf8"), before);

    await writeFile(join(root, "lib/index.ts"), 'export const value: string = "changed";\n');
    for (let attempt = 0; attempt < 2; attempt += 1) {
      const changed = check();
      assert.notEqual(changed.status, 0, changed.output);
      assert.match(changed.output, /TS2322/);
      assert.match(changed.output, /app\/index.ts|app\\index.ts/);
    }
    await writeFile(join(root, "lib/index.ts"), "export const value: number = 2;\n");
    const recovered = check();
    assert.equal(recovered.status, 0, recovered.output);
  });
});

it("invalidates consumers after global declaration changes and recovers", async () => {
  await withFixture(async (root, check) => {
    const declaration = join(root, "lib/globals.d.ts");
    await writeFile(declaration, "declare function cacheInput(input: number): number;\n");
    await writeFile(
      join(root, "app/index.ts"),
      '/// <reference path="../lib/globals.d.ts" />\nexport const result = cacheInput(1);\n',
    );
    const cold = check();
    assert.equal(cold.status, 0, cold.output);
    const warm = check();
    assert.equal(warm.status, 0, warm.output);
    assert.doesNotMatch(warm.output, /Building project/);

    await writeFile(declaration, "declare function cacheInput(input: string): number;\n");
    for (let attempt = 0; attempt < 2; attempt += 1) {
      const changed = check();
      assert.notEqual(changed.status, 0, changed.output);
      assert.match(changed.output, /TS2345/);
    }
    await writeFile(declaration, "declare function cacheInput(input: number): number;\n");
    const recovered = check();
    assert.equal(recovered.status, 0, recovered.output);
  });
});
