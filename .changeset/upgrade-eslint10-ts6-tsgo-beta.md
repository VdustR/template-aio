---
"@vdustr/template-aio-ts-lib": major
---

BREAKING CHANGE: Upgrade core tooling and ESLint ecosystem to their latest majors.

Follows the adaptation pattern from [`vp-tw/eslint-config#35`](https://github.com/vp-tw/eslint-config/pull/35) and [`vp-tw/tsconfig#17`](https://github.com/vp-tw/tsconfig/pull/17), [`#19`](https://github.com/vp-tw/tsconfig/pull/19).

Catalog upgrades:

- `eslint`: `^9.39.2` → `^10.2.1` (drops `.eslintignore` file support; Node `^20.19.0 || ^22.13.0 || >=24` required)
- `typescript`: `^5.9.3` → `^6.0.3` (new defaults: `strict: true`, `target: es2025`, `module: esnext`, `types: []`, `noUncheckedSideEffectImports: true`)
- `@typescript/native-preview` (tsgo): `7.0.0-dev.20260128.1` → `7.0.0-dev.20260421.2` (TS 7.0 beta build)
- `@vp-tw/tsconfig`: `^4.0.0` → `^5.0.1` (Node 22 → 24 base, ES2020 → ES2022 base)
- `@vp-tw/eslint-config`: `^1.0.5` → `^2.0.0`
- `@antfu/eslint-config`: `^7.2.0` → `^8.2.0`
- `@eslint-react/eslint-plugin`: `^2.7.4` → `^4.2.3` (sub-plugins merged into a single `@eslint-react` plugin with flat rule names; vp-tw v2 internally adapts to v4 — antfu's `^3.0.0` peer warning is expected and tolerated)
- `eslint-plugin-react-refresh`: `^0.4.26` → `^0.5.2`
- `eslint-plugin-package-json`: `^0.88.2` → `^0.91.1` (new required rules: `require-repository`, `require-sideEffects`, `require-files`, `require-exports`, `require-attribution`)
- `eslint-plugin-storybook`: `^10.2.1` → `^10.3.5`
- `@tanstack/eslint-plugin-query`: `^5.91.3` → `^5.99.2`
- `@typescript-eslint/utils`: `^8.54.0` → `^8.59.0` (peer extended to TS 6)
- Add `@types/node: ^25.6.0` (TS 6 default `types: []` no longer auto-discovers `@types/*`).

Removed (unused):

- `@eslint/compat` (no `.eslintignore` to migrate; `eslint.config.ts` already used inline `ignores`).
- `eslint-plugin-react-hooks` (antfu v8 no longer registers it; `@eslint-react` v4 owns hook rules under the `react/` prefix).
- `pathe` (orphaned dependency).

Repo adaptations:

- Add `pnpm.overrides.undici-types: ^8.1.0` per `@vp-tw/eslint-config` v2's `trustPolicy: no-downgrade` guidance.
- Bump root `engines.node` to `^20.19.0 || ^22.13.0 || >=24` to match `@vp-tw/eslint-config` v2 / Vite 7.
- Bump `.nvmrc` to `v25.9.0`.
- Add `"types": ["node"]` to root `tsconfig.node.json` so `lint-staged.config.js` (uses `process.env`) keeps type-checking under TS 6's empty `types` default.
- Expand `@vdustr/template-aio-ts-lib` `package.json` to satisfy `eslint-plugin-package-json@^0.91.1` (`author`, `repository`, `sideEffects: false`, `files`, `exports` map). The `exports` map is a surface-tightening change: only `.` and `./package.json` resolve now.
- Add `undici` to `cspell.json` words; remove `pathe` (no longer used).

Downstream consumers cloning this template should:

1. Use Node.js `^20.19.0 || ^22.13.0 || >=24`.
2. Update any `eslint-disable` comments referencing removed `@eslint-react` v3 sub-plugin namespaces (`react-dom/*` → `react/dom-*`, `react-hooks/*` → `react/*`, `react-hooks-extra/*` → `react/hooks-extra-*`, `react-naming-convention/*` → `react/naming-convention-*`, `react-web-api/*` → `react/web-api-*`).
3. Add `"types": ["node"]` to any tsconfig that types files using Node globals (TS 6's new empty `types: []` default).
