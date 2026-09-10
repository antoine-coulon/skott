---
"skott-webapp": minor
---

Grouped graph visualization in the web application. 

When a `groupBy` runtime config is provided, the app now renders the grouped graph (architecture blocks) instead of the file-level graph implicitly. Dependency highlights (direct/deep dependencies, deep dependents, circular, built-in, third-party) act on the grouped graph, and the Groups summary reflects it too.

Also in this release: the initial render no longer blocks on cycle detection.
