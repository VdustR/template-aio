import assert from "node:assert/strict";
import { mkdtemp, rm, writeFile } from "node:fs/promises";
import { createRequire } from "node:module";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { it } from "vitest";

const require = createRequire(import.meta.url);
const globRequire = createRequire(require.resolve("fast-glob"));
const matchRequire = createRequire(globRequire.resolve("micromatch"));
const braces = matchRequire("braces");

it("normal brace patterns retain compilation and expansion behavior", () => {
  assert.equal(braces.compile("a/{b,c}/d"), "a/(b|c)/d");
  assert.deepEqual(braces.expand("a/{b,c}/d"), ["a/b/d", "a/c/d"]);
  assert.deepEqual(braces.expand("{1..3}"), ["1", "2", "3"]);
  assert.doesNotThrow(() => braces(`${"{".repeat(128)}a,b${"}".repeat(128)}`));
});

it("deep brace and parenthesis patterns fail before recursive AST traversal", () => {
  for (const [open, close] of [
    ["{", "}"],
    ["(", ")"],
    ["{(", ")}"],
  ]) {
    const pattern = `${open.repeat(129)}a,b${close.repeat(129)}`;
    for (const operation of [
      braces,
      braces.parse,
      braces.compile,
      braces.expand,
      braces.stringify,
    ]) {
      assert.throws(
        () => operation(pattern),
        (error) => error instanceof SyntaxError && /nesting depth/.test(error.message),
      );
    }
  }
});

it("escaped and quoted braces remain literal", () => {
  const escaped = `${"\\{".repeat(256)}x${"\\}".repeat(256)}`;
  const quoted = `"${"{".repeat(256)}x${"}".repeat(256)}"`;
  assert.doesNotThrow(() => braces.compile(escaped));
  assert.doesNotThrow(() => braces.compile(quoted));
});

it("unclosed nested groups and a larger maxLength cannot bypass the depth bound", () => {
  assert.throws(() => braces.parse("{".repeat(129)), /nesting depth/);
  assert.throws(() => braces.parse("{".repeat(129), { maxLength: 100000 }), /nesting depth/);
});

it("the upgraded YAML reader preserves its CommonJS async and sync APIs", async () => {
  const cliRequire = createRequire(require.resolve("@changesets/cli"));
  const packagesRequire = createRequire(cliRequire.resolve("@manypkg/get-packages"));
  const readYaml = packagesRequire("read-yaml-file");
  const directory = await mkdtemp(join(tmpdir(), "yaml-reader-test-"));
  try {
    const file = join(directory, "workspace.yaml");
    await writeFile(
      file,
      "\uFEFFpackages:\n  - packages/*\nbase: &base {enabled: true}\nsettings: {<<: *base}\n",
    );
    const expected = {
      packages: ["packages/*"],
      base: { enabled: true },
      settings: { enabled: true },
    };
    assert.deepEqual(await readYaml(file), expected);
    assert.deepEqual(readYaml.sync(file), expected);
    await writeFile(file, "packages: [");
    await assert.rejects(readYaml(file));
    assert.throws(() => readYaml.sync(file));
  } finally {
    await rm(directory, { recursive: true, force: true });
  }
});
