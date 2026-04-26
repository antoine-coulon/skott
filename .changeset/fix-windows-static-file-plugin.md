---
"skott": patch
---

Fix `@skottorg/static-file-plugin` resolution on Windows by converting the resolved path to a `file://` URL using `pathToFileURL` before passing it to dynamic `import()`.
