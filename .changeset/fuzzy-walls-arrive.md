---
"skott": minor
---

Add ignore pattern option from both CLI and API to exclude files from the analysis.

Breaking changes: test files (folders: `__tests__`, `test`, `examples`, files: `*.spec.*`, `*.test.*`) are now included by default in the analysis.
