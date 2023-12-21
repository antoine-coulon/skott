# skott

## 0.31.4

### Patch Changes

- [#128](https://github.com/antoine-coulon/skott/pull/128) [`8c76a8c`](https://github.com/antoine-coulon/skott/commit/8c76a8c6592216245f96efed36765c1d62d06cc2) Thanks [@antoine-coulon](https://github.com/antoine-coulon)! - Fix Windows compatibility for TypeScript path alias resolution

- Updated dependencies [[`8c76a8c`](https://github.com/antoine-coulon/skott/commit/8c76a8c6592216245f96efed36765c1d62d06cc2)]:
  - fs-tree-structure@0.0.4
  - skott-webapp@2.0.1

## 0.31.3

### Patch Changes

- [#121](https://github.com/antoine-coulon/skott/pull/121) [`06674a0`](https://github.com/antoine-coulon/skott/commit/06674a06ad67850537d763b377c62f376dd99d4b) Thanks [@robertoyoc](https://github.com/robertoyoc)! - Resolve `index.jsx` and `index.tsx` when they are being imported from `.` and `./` declarations.

## 0.31.2

### Patch Changes

- [#118](https://github.com/antoine-coulon/skott/pull/118) [`9dcb23f`](https://github.com/antoine-coulon/skott/commit/9dcb23ff8f5176128d0c88495bbfea37020dbdf7) Thanks [@antoine-coulon](https://github.com/antoine-coulon)! - Bump most dependencies to their latest available version. Notably bumps `TypeScript` to v5 and `@typescript-eslint/typescript-estree` to v6. This version also lightens `skott` node_modules size from ~144MB to ~94MB (-50MB).

- Updated dependencies [[`9dcb23f`](https://github.com/antoine-coulon/skott/commit/9dcb23ff8f5176128d0c88495bbfea37020dbdf7)]:
  - fs-tree-structure@0.0.3

## 0.31.1

### Patch Changes

- Updated dependencies [[`2e80022`](https://github.com/antoine-coulon/skott/commit/2e80022ee988ba9997089369d4b3f30a14f3acb0)]:
  - skott-webapp@2.0.1

## 0.31.0

### Minor Changes

- [#72](https://github.com/antoine-coulon/skott/pull/72) [`1d4b302`](https://github.com/antoine-coulon/skott/commit/1d4b3021310854ccb23cbe36a4b8a053b11445b8) Thanks [@antoine-coulon](https://github.com/antoine-coulon)! - Introduce new skott web application (v2), can be used starting from skott@0.31.0
  No breaking changes introduced from a skott perspective, `skott --displayMode=webapp` is still the way to go.

### Patch Changes

- Updated dependencies [[`1d4b302`](https://github.com/antoine-coulon/skott/commit/1d4b3021310854ccb23cbe36a4b8a053b11445b8)]:
  - skott-webapp@2.0.0

## 0.30.3

### Patch Changes

- [#112](https://github.com/antoine-coulon/skott/pull/112) [`f41de8b`](https://github.com/antoine-coulon/skott/commit/f41de8b4b137084b59621fd446eed23921a38f3e) Thanks [@antoine-coulon](https://github.com/antoine-coulon)! - Use localhost instead of 127.0.0.1 to ensure a better cross platform compatibility when auto opening the web application. Thanks @HassanMojab for the hint!

## 0.30.2

### Patch Changes

- [#110](https://github.com/antoine-coulon/skott/pull/110) [`ad5e4be`](https://github.com/antoine-coulon/skott/commit/ad5e4be737f7d48ba32835be73ed81bfba333e14) Thanks [@antoine-coulon](https://github.com/antoine-coulon)! - Use cmd.exe (natively installed on WSL) instead of wslview to auto open browser when using webapp display mode

## 0.30.1

### Patch Changes

- [#108](https://github.com/antoine-coulon/skott/pull/108) [`5f1d31b`](https://github.com/antoine-coulon/skott/commit/5f1d31ba427d338bb9fee599ee2902e9f4e7cd96) Thanks [@antoine-coulon](https://github.com/antoine-coulon)! - Allow web application to be automatically opened on WSL via wslview. Better error handling when the application can't be automatically opened.

## 0.30.0

### Minor Changes

- [#105](https://github.com/antoine-coulon/skott/pull/105) [6ddda95](https://github.com/antoine-coulon/skott/commit/d50743f020af761f39b550d27bc169acd2541ef0): Improve TypeScript type-level import specifiers `import { type X }`

Before, only `import type { X }` was discarded when not tracking type-level imports. Now, both are supported and considered as type-level imports.

```ts
import { type A } from "a";
import type { B } from "b";
```

## 0.29.1

### Patch Changes

- [#103](https://github.com/antoine-coulon/skott/pull/103) [d50743f](https://github.com/antoine-coulon/skott/commit/d50743f020af761f39b550d27bc169acd2541ef0): cli: restore behavior for `--trackTypeOnlyDependencies` to allow falsy value via `--no-trackTypeOnlyDependencies` option.

```sh
skott --no-trackTypeOnlyDependencies # works
skott --trackTypeOnlyDependencies # works
```

## 0.29.0

### Minor Changes

- [#98](https://github.com/antoine-coulon/skott/pull/98) [4564e9b](https://github.com/antoine-coulon/skott/commit/4564e9b8c10b55b62361ed2b0321fb5bf11dcea5): Skott cli now use [commanderjs](https://github.com/tj/commander.js) instead of sade. Which might be a breaking change for you if you were using short aliases options since there were not all correctly applied

## 0.28.4

### Patch Changes

- [#96](https://github.com/antoine-coulon/skott/pull/96) [04db823](https://github.com/antoine-coulon/skott/commit/04db823c84d26259b34ef1d57c59ea0f76fbf9e8): fsPromises.constants is undefined for node < 18.4.0

## 0.28.3

### Patch Changes

- [#89](https://github.com/antoine-coulon/skott/pull/89) [4e2222f](https://github.com/antoine-coulon/skott/commit/4e2222f5fed686b3b38172a02fc1dd56e7da528b): Skott now read TypeScript aliases when there is a tsconfig (provided or found) even if the entrypoint itself is not a TypeScript file.

## 0.28.2

### Patch Changes

- [#81](https://github.com/antoine-coulon/skott/pull/81) [669c2ec](https://github.com/antoine-coulon/skott/commit/669c2ec324a660c17a2510579673ae4eb7ad786a): Allow TypeScript path aliases module resolution when only providing a tsconfig "baseUrl" option. Avoid propagating full error stacks currently bubbling up when using the CLI.

## 0.28.1

### Patch Changes

- 812d2a5: add error boundaries around opaque TypeScript path aliases resolution issues

## 0.28.0

### Minor Changes

- 13e6c01: Breaking changes: Remove `--staticFile` CLI option. Merge `--staticFile` CLI option with `--displayMode`, all modes related to static files now require the installation of the `@skottorg/static-file-plugin` plugin.

## 0.27.0

### Minor Changes

- c61f46f: Support third-party/remote tsconfig resolution when using `extends` parameter.

## 0.26.0

### Minor Changes

- 10fac91: Breaking Changes: move `findCircularDependencies`, `hasCircularDependencies`, `findLeaves` inside `useGraph` api encapsulation.
- 3b0342e: Expose a graph API allowing top-to-bottom and bottom-to-top traversal through the `useGraph` method attached to skott instance.

## 0.25.1

### Patch Changes

- d27c83e: Ignore files with leading dots by default when using ignore patterns

## 0.25.0

### Minor Changes

- 249c41c: Add ignore pattern option from both CLI and API to exclude files from the analysis.

  Breaking changes: test files (folders: `__tests__`, `test`, `examples`, files: `*.spec.*`, `*.test.*`) are now included by default in the analysis.

## 0.24.0

### Minor Changes

- 6713bfd: Improve third-party module resolution using root `package.json` manifest file when possible otherwise fallbacking to source code heuristics.

## 0.23.0

### Minor Changes

- d5f21c4Add: `getWorkspace` on skott instance that returns a dictionary with all workspace manifests and dependencies listed in each one of them. Allow devDependencies to be reported when using `showUnusedDependencies` CLI flag. Raise exceptions when using the skott API and providing illegal configurations.

## 0.22.1

### Patch Changes

- da54fb9: Fix endless loop when resolving malformed TS path aliases.

## 0.22.0

### Minor Changes

- 4b22b26: Provide a verbose flag to display internal logs including caching, module resolution, module parsing

## 0.21.1

### Patch Changes

- 99db80d: Improve tsconfig deep alias resolution for path with glob patterns
- 4f54570: Produce an explicit error message when the entrypoint can not be found

## 0.21.0

### Minor Changes

- a4d1873: Update the file tree traversal by taking into account Git ignored files (using .gitignore files)
- 078c319: Improve support for TypeScript path aliases resolution when the TypeScript configuration file is not located in the same place as the entrypoint or the current working directory in case of bulk analysis

### Patch Changes

- skott-webapp@1.0.6
