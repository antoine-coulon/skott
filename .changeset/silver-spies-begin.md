---
"skott": minor
---

Allow unused files to be tracked and reported. From the CLI, `--showUnusedFiles` can be used to report unused files. From the API, a new `collectUnusedFiles` method is accessible through the graph API:

```js
import skott from "skott";

const instance = await skott();
const unusedFiles = instance.useGraph().collectUnusedFiles();
```

This version also includes a fix for a bug related to `--trackBuiltinDependencies` and `--trackThirdPartyDependencies` that were not propagated anymore (since 0.34.0) when being provided from the CLI.