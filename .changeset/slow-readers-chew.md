---
"skott": minor
---

Add support for multiple ignore patterns: 
- the CLI can now accumulate multiple ignore patterns such as `skott --ignorePattern=X --ignorePattern=Y`
- the API configuration now takes a `ignorePatterns` property instead of a single `ignorePattern` (breaking change).

