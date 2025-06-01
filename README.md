# template-aio

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

## Contributing

Contributions are welcome! Please read the [contributing guide](https://github.com/VdustR/template-aio/blob/main/CONTRIBUTING.md) for details.

## Release

1. Bump the version:

   ```sh
   pnpm version-packages
   git commit -am "build: bump version"
   ```

2. Create a pull request to merge the changes into the `main` branch.

3. After merging, publish the packages by running:

   ```sh
   git tag vX.Y.Z
   git push origin vX.Y.Z
   pnpm release
   ```

4. Finally, [draft a new release on GitHub](https://github.com/VdustR/template-aio/releases/new).

## License

[MIT](./LICENSE)

Copyright (c) 2024-2025 ViPro <vdustr@gmail.com> (<http://vdustr.dev>)
