---
"skott": minor
---

Expose a new rendering module providing a programmatic access to terminal and web visualizations through skott's API.

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
  }
);

await Terminal.renderTerminalApplication(defaultConfig, {
  displayMode: "graph",
  exitCodeOnCircularDependencies: 1,
  showCircularDependencies: true,
  showUnusedDependencies: true,
  watch: true,
});
```

