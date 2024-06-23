# skott

## 0.35.1

### Patch Changes

- [`8147b70`](https://github.com/antoine-coulon/skott/commit/8147b7004e7a4ccd35e7cb01a3bfbf38ff7d9877) Thanks [@antoine-coulon](https://github.com/antoine-coulon)! - pin TypeScript version used by skott to prevent @typescript-estree from emitting warnings

- Updated dependencies []:
  - skott-webapp@2.1.1

## 0.35.0

### Minor Changes

- [#162](https://github.com/antoine-coulon/skott/pull/162) [`b13d3c9`](https://github.com/antoine-coulon/skott/commit/b13d3c915b600cd0bba3587d7be7a2942de32008) Thanks [@antoine-coulon](https://github.com/antoine-coulon)! - Allow unused files to be tracked and reported. From the CLI, `--showUnusedFiles` can be used to report unused files. From the API, a new `collectUnusedFiles` method is accessible through the graph API:

  ```js
  import skott from "skott";

  const instance = await skott();
  const unusedFiles = instance.useGraph().collectUnusedFiles();
  ```

  This version also includes a fix for a bug related to `--trackBuiltinDependencies` and `--trackThirdPartyDependencies` that were not propagated anymore (since 0.34.0) when being provided from the CLI.

- [#161](https://github.com/antoine-coulon/skott/pull/161) [`4d19c97`](https://github.com/antoine-coulon/skott/commit/4d19c973278267c1218dcc89589be1781ea9464e) Thanks [@antoine-coulon](https://github.com/antoine-coulon)! - Add support for multiple ignore patterns:
  - the CLI can now accumulate multiple ignore patterns such as `skott --ignorePattern=X --ignorePattern=Y`
  - the API configuration now takes a `ignorePatterns` property instead of a single `ignorePattern` (breaking change).

### Patch Changes

- [#163](https://github.com/antoine-coulon/skott/pull/163) [`efb106a`](https://github.com/antoine-coulon/skott/commit/efb106aee9ad319375e654b9e4f2bb224c945ae1) Thanks [@antoine-coulon](https://github.com/antoine-coulon)! - Upgrade to Effect v3

- [#159](https://github.com/antoine-coulon/skott/pull/159) [`8cb4f1c`](https://github.com/antoine-coulon/skott/commit/8cb4f1cdfef2528216b6448422b4adf0bf51e8f3) Thanks [@antoine-coulon](https://github.com/antoine-coulon)! - Fix skott performance timing in the CLI

## 0.34.0

### Minor Changes

- [#157](https://github.com/antoine-coulon/skott/pull/157) [`0871131`](https://github.com/antoine-coulon/skott/commit/0871131b9e6eb4dfb80c8899df0ae4a5fdff8cb0) Thanks [@antoine-coulon](https://github.com/antoine-coulon)! - Expose a new rendering module providing a programmatic access to terminal and web visualizations through skott's API.

  This is equivalent to use the CLI such as `skott --displayMode=webapp` but offers more flexibility for the runtime configuration which suffers from limitations when only using the CLI (some configurations are nearly impossible to represent using strings e.g. providing custom functions), this is why often authors tend to introduce runtime configuration files that CLIs can pick up automatically, thing that we want to avoid with skott, by unifying it's usage either coming from the API or CLI.

  **Using the rendering module**

  ```js
  import { defaultConfig } from "skott";
  import { Web, Terminal } from "skott/rendering";

  await Web.renderWebApplication(
    // skott runtime config
    defaultConfig,
    // application config
    {
      visualization: {
        granularity: "module",
      },
      watch: true,
      port: 1111,
      onListen: (port) => console.log(`Listening on port ${port}`),
      open: true,
      onOpenError: () => console.log(`Error when opening the browser`),
    },
  );

  await Terminal.renderTerminalApplication(defaultConfig, {
    displayMode: "graph",
    exitCodeOnCircularDependencies: 1,
    showCircularDependencies: true,
    showUnusedDependencies: true,
    watch: true,
  });
  ```

## 0.33.2

### Patch Changes

- [#152](https://github.com/antoine-coulon/skott/pull/152) [`9d43673`](https://github.com/antoine-coulon/skott/commit/9d43673a1f86766f935a7759fe5ae2e7518b2fe0) Thanks [@antoine-coulon](https://github.com/antoine-coulon)! - Remove @typescript-eslint/typescript-estree warning occurring when an incompatible version of TypeScript is found by ensuring fixed compatible versions from the manifest.

## 0.33.1

### Patch Changes

- [#150](https://github.com/antoine-coulon/skott/pull/150) [`04fe22d`](https://github.com/antoine-coulon/skott/commit/04fe22dacb585c51e597ab835f7bde274baa14ea) Thanks [@antoine-coulon](https://github.com/antoine-coulon)! - This patch fixes the eager evaluation of `cwd` default value from the config preventing [process.chdir](https://nodejs.org/api/process.html#processchdirdirectory)
  to work as expected when used before invoking skott's API.

  ```js
  process.chdir("/tmp/somewhere");

  // skott is now being executed at the root of "/tmp/somewhere"

  const instance = await skott();
  ```

  Note: regarding the generated graph relationships, this is pretty much equivalent as doing `skott({ cwd: "/tmp/somewhere" })`, even though
  node paths will be relative and won't have the same values as the later still executes skott from the script location
  and not from `/tmp/somewhere`. In other words, using `cwd` parameter will have node paths being relative to skott's script location, while using
  `process.chdir` will make skott execute the script from the provided directory.

  You can find a real example of the difference between node paths using `process.chdir` and `cwd`: https://github.com/antoine-coulon/skott/issues/149#issuecomment-1989451725
  by @mattkindy.

## 0.33.0

### Minor Changes

- [#146](https://github.com/antoine-coulon/skott/pull/146) [`5ae16c9`](https://github.com/antoine-coulon/skott/commit/5ae16c96a239e353e78c465aca0c54ed4406d3db) Thanks [@AlexandrHoroshih](https://github.com/AlexandrHoroshih)! - Adds `groupBy` API configuration option. This function allows all nodes from the graph to be grouped into a set of custom groups. If `groupBy` is provided, then `groupedGraph` will be emitted on `getStructure` call.

## 0.32.1

### Patch Changes

- [#138](https://github.com/antoine-coulon/skott/pull/138) [`4a3bd27`](https://github.com/antoine-coulon/skott/commit/4a3bd277c0b9fabcd9e028ecb0c76cdddb957f4e) Thanks [@pedrolamas](https://github.com/pedrolamas)! - Fixes high severity vulnerability in lodash.\* dependency by replacing it with lodash-es

- Updated dependencies [[`4a3bd27`](https://github.com/antoine-coulon/skott/commit/4a3bd277c0b9fabcd9e028ecb0c76cdddb957f4e)]:
  - fs-tree-structure@0.0.5
  - skott-webapp@2.1.1

## 0.32.0

### Minor Changes

- [#131](https://github.com/antoine-coulon/skott/pull/131) [`777998c`](https://github.com/antoine-coulon/skott/commit/777998c33f52909b1e596a8ba05eec601bf1a57c) Thanks [@antoine-coulon](https://github.com/antoine-coulon)! - Add watch mode through `--watch` cli option that can be used with all display modes:

  - using with `--displayMode=webapp` (default)

  Changes will fully re-render the graph with its new content. Changes are not atomic yet, meaning that even if only one file is changed, the graph is being re-rendered anyway. Note that this might be improved in the future.

  - using with `--displayMode=file-tree` or `--displayMode=graph`

  Changes will clear the terminal and output the new computed graph with other information depending on selected options (`--showCircularDependencies` etc).

  - using with `--displayMode=raw`

  Changes will clear the terminal and output the new information depending on selected options (`--showCircularDependencies`, etc). As usual with `raw` mode, the graph is not rendered.

  Few breaking changes:

  - using `--showCircularDependencies` and `--showUnusedDependencies` together with `--displayMode=webapp` will throw error. This is because these options were thought to be used in the context of cli output which is not very useful when using the `webapp`.

  Note that the web application has an option to show circular dependencies without the need for the `--showCircularDependencies` to be provided. The same for `--showUnusedDependencies` will be done in the next versions, for now showing unused dependencies is only supported using `raw`, `file-tree` or `graph` display modes.

### Patch Changes

- Updated dependencies [[`777998c`](https://github.com/antoine-coulon/skott/commit/777998c33f52909b1e596a8ba05eec601bf1a57c)]:
  - skott-webapp@2.1.0

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
