# skott

## 0.24.0

### Minor Changes

- 6713bfd: Improve third-party module resolution using root `package.json` manifest file when possible otherwise fallbacking to source code heuristics.

### Patch Changes

- skott-webapp@1.0.6

## 0.23.0

### Minor Changes

- d5f21c4Add: `getWorkspace` on skott instance that returns a dictionary with all workspace manifests and dependencies listed in each one of them. Allow devDependencies to be reported when using `showUnusedDependencies` CLI flag. Raise exceptions when using the skott API and providing illegal configurations.

### Patch Changes

- skott-webapp@1.0.6

## 0.22.1

### Patch Changes

- da54fb9: Fix endless loop when resolving malformed TS path aliases.
- skott-webapp@1.0.6

## 0.22.0

### Minor Changes

- 4b22b26: Provide a verbose flag to display internal logs including caching, module resolution, module parsing

### Patch Changes

- skott-webapp@1.0.6

## 0.21.1

### Patch Changes

- 99db80d: Improve tsconfig deep alias resolution for path with glob patterns
- 4f54570: Produce an explicit error message when the entrypoint can not be found
- skott-webapp@1.0.6

## 0.21.0

### Minor Changes

- a4d1873: Update the file tree traversal by taking into account Git ignored files (using .gitignore files)
- 078c319: Improve support for TypeScript path aliases resolution when the TypeScript configuration file is not located in the same place as the entrypoint or the current working directory in case of bulk analysis

### Patch Changes

- skott-webapp@1.0.6
