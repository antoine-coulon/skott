---
"skott": minor
---

Optional `groupBy` configuration is added - it is a function of `(path: string) => string | undefined` type.

If `groupBy` is provided, then `groupedGraph` will be emitted on `getStructure` call.
