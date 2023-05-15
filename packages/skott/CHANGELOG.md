# skott

## 0.21.1

### Patch Changes

- 99db80d: Improve tsconfig deep alias resolution for path with glob patterns
  Produce an explicit error message when the entrypoint can not be found
  - skott-webapp@1.0.6

## 0.21.0

### Minor Changes

- a4d1873: Update the file tree traversal by taking into account Git ignored files (using .gitignore files)
- 078c319: Improve support for TypeScript path aliases resolution when the TypeScript configuration file is not located in the same place as the entrypoint or the current working directory in case of bulk analysis

### Patch Changes

- skott-webapp@1.0.6
