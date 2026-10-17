# 🌟 template-aio

My all-in-one template for web development.

[![Open in GitHub Codespaces](https://github.com/codespaces/badge.svg)](https://codespaces.new/VdustR/template-aio)

<a href="https://studio.firebase.google.com/import?url=https%3A%2F%2Fgithub.com%2FVdustR%2Ftemplate-aio">
  <picture>
    <source
      media="(prefers-color-scheme: dark)"
      srcset="https://cdn.firebasestudio.dev/btn/open_dark_32.svg">
    <source
      media="(prefers-color-scheme: light)"
      srcset="https://cdn.firebasestudio.dev/btn/open_light_32.svg">
    <img
      height="32"
      alt="Open in Firebase Studio"
      src="https://cdn.firebasestudio.dev/btn/open_blue_32.svg">
  </picture>
</a>

## Type checking

Run `pnpm run checkTypes` to check all projects with the pinned native TypeScript
nightly and reuse each project's build info. The `typescript-native` npm alias
keeps this compiler separate from TypeScript 6, whose JavaScript API is still
required by ESLint and declaration build tools. The workspace editor settings
point to the same native compiler. Restart the editor's TypeScript language
server after upgrading the pinned SDK.

CI restores build info after installing dependencies and saves successful checks
on `main`. The cache is scoped by platform and lockfile; the compiler validates
source and configuration changes before reusing diagnostics. Run
`pnpm run test:typecheck` to verify cross-package and global declaration changes
against the installed compiler before updating the nightly pin.

### Linting and compiler trade-offs

As of October 17, 2026, this template keeps ESLint for linting and the pinned
native TypeScript compiler for project-wide type checking. Oxfmt handles
formatting, and the library's `tsdown` build produces declarations. Oxlint is a
possible future linting choice; it is not installed or required by this template.

Oxlint supports real TypeScript compiler diagnostics through
[`--type-aware --type-check`](https://oxc.rs/docs/guide/usage/linter/type-aware.html).
The reason to retain the separate compiler is validation scope, rather than a
lack of type analysis:

- Oxlint's selected files and ignore patterns can exclude compiler diagnostics
  that a project check would report. The
  [whole-project diagnostic scope request](https://github.com/oxc-project/oxc/issues/16748)
  includes an imported-source reproduction and a proposed whole-program fix;
  that proposal does not establish complete build-mode equivalence.
- The [imported-file program assignment report](https://github.com/oxc-project/tsgolint/issues/1242)
  describes files reached through imports receiving inferred compiler options
  instead of their project's options. This is an upstream report, not a failure
  reproduced in this template.
- An isolated test with Oxlint 1.88.0 and `oxlint-tsgolint` 7.0.2004 returned
  success for a missing project reference, while the native compiler's build
  mode reported the missing configuration. A reference-existence check would
  cover that case, but not the diagnostic-scope or program-assignment cases.

These findings do not mean every monorepo needs a separate compiler command.
They mean this template has not established that Oxlint can replace its complete
project check. Lint rules can be redefined: a future migration should start from
official or widely adopted recommended configurations instead of preserving
every rule in the current shared ESLint config. JSON, YAML, and Markdown semantic
checks still need an explicit owner; formatting alone does not replace them.

| Approach                           | Benefit                                                             | Trade-off                                                                                                                |
| ---------------------------------- | ------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| Current ESLint + native TypeScript | Existing lint coverage and an independent incremental project check | Keeps separate lint and compiler commands                                                                                |
| Future Oxlint + native TypeScript  | Can adopt native lint rules while retaining the project check       | Requires new presets and explicit ownership of non-JavaScript checks; type-aware linting can duplicate compiler analysis |
| Oxlint linting + type checking     | Can share one TypeScript program for lint and compiler diagnostics  | Requires evidence that file coverage, compiler options, and project validation meet this template's needs                |

The [incremental checking update](https://github.com/VdustR/template-aio/pull/92)
changes the performance trade-off: the pinned native TypeScript
`7.1.0-dev.20261016.1` reuses unchanged checks and correctly invalidates consumers
after imported workspace source or global declaration changes in the regression
tests. The [CI cache-restore verification](https://github.com/VdustR/template-aio/actions/runs/38994887810/attempts/2)
also reported zero type instantiations on an unchanged revision. Keeping the
separate compiler therefore does not require a full check on every run. It still
adds a command and cache management, and this
does not prove a speed advantage over Oxlint or a particular benefit at larger
scales. The nightly pin also requires regression checks before upgrades; its
results must not be assumed to apply to the compiler bundled with `tsgolint`.

Before replacing the compiler command, verify missing references, imported and
ignored source coverage, shared declarations, effective compiler options, and
error recovery against the chosen Oxlint release. Keep
`pnpm run test:typecheck` as the native compiler's cache-invalidation regression
gate, and verify declaration output separately through the library build.

## 🎯 Release Library

This repository uses **[changesets/action](https://github.com/changesets/action)**, a GitHub Action that automates release management by creating a pull request with version updates and changelog entries whenever changes are pushed to the `main` branch.

To enable seamless releases, ensure GitHub Actions have sufficient permissions to write to and manage pull requests in your repository. Navigate to:

**Settings → Code and automation → Actions → General → Workflow permissions** and adjust the following:

- ✅ Select **Read and write permissions**
- ✅ Enable **Allow GitHub Actions to create and approve pull requests**

## 🤝 Contributing

Contributions are welcome! Please read the [contributing guide](https://github.com/VdustR/template-aio/blob/main/CONTRIBUTING.md) for details.

## 📜 License

[MIT](./LICENSE)

Copyright (c) 2024-2026 ViPro <vdustr@gmail.com> (<https://vdustr.github.io>)
