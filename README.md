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
