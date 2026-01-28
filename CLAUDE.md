# template-aio

This is a **boilerplate monorepo** template for starting new projects.

## Changesets

Since this repo serves as a boilerplate/template, **all changesets should trigger a version bump** on `@vdustr/template-aio-ts-lib` (even for toolchain or config changes) to ensure changelog generation.

Example changeset:

```md
---
"@vdustr/template-aio-ts-lib": patch
---

Your change description here
```

Use `patch` for most changes. Use `minor` for new features or significant improvements.
