---
"skott": minor
---

Add watch mode through `--watch` cli option that can be used with all display modes:

- using with `--displayMode=webapp` (default)

Changes will fully re-render the graph with its new content. Changes are not atomic yet, meaning that even if only one file is changed, the graph is being re-rendered anyway. Note that this might be improved in the future.

- using with `--displayMode=file-tree` or `--displayMode=graph`

Changes will clear the terminal and output the new computed graph with other information depending on selected options (`--showCircularDependencies` etc).


- using with `--displayMode=raw`

Changes will clear the terminal and output the new information depending on selected options (`--showCircularDependencies`, etc). As usual with `raw` mode, the graph is not rendered.


Few breaking changes:

- using `--showCircularDependencies` and `--showUnusedDependencies` together with `--displayMode=webapp` will throw error. This is because these options were thought to be used in the context of cli output which is not very useful when using the `webapp`.

Note that the web application has an option to show circular dependencies without the need for the `--showCircularDependencies` to be provided. The same for `--showUnusedDependencies` will be done in the next versions, for now showing unused dependencies is only supported using `raw`, `file-tree` or `graph` display modes.
