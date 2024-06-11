/**
 * skott's API can be used to have a programmatic access to the project's graph
 * and all the information collected through the project analysis.
 *
 * However when it comes to visualizing that information, skott provides many display
 * modes that were mostly accessible through the CLI only.
 *
 * Since 0.34.0, skott provides a way to render these display modes while being
 * in the API context, allowing to have a better control over the configuration,
 * if it's depending on any other context (environment, output of other functions, etc).
 */

import skott, { defaultConfig } from "../index.js";
// Should be imported as "skott/rendering" when being in a third-party context
import { Web, Terminal } from "../src/rendering/api.js";

async function _renderTerminalApplication() {
  await Terminal.renderTerminalApplication(defaultConfig, {
    displayMode: "graph",
    exitCodeOnCircularDependencies: 1,
    showCircularDependencies: true,
    showUnusedDependencies: true,
    watch: true
  });
}

/**
 * When it comes to web application, two options are available:
 * 1. using `renderWebApplication` that just requires the runtime configuration,
 * and manages the lifecycle of skott internally.
 * 2. using `renderStandaloneWebApplication` that takes a factory function that
 * provides the skott instance, allowing to have a better control over
 * what is injected into the skott instance. That can become especially handy
 * when using plugins for external tools that need to alter the structure of the
 * graph before rendering it. As there is no plugin system in skott (yet), this
 * is a way to achieve a similar result.
 * This is what we're using to build the [Rush](https//rushjs.io) monorepo tool
 * [skott plugin](https://github.com/antoine-coulon/krush).
 */
async function _renderWebApplication() {
  await Web.renderWebApplication(
    // skott runtime config
    defaultConfig,
    // application config
    {
      visualization: {
        granularity: "module"
      },
      watch: true,
      port: 1111,
      onListen: (port) => console.log(`Listening on port ${port}`),
      open: true,
      onOpenError: () => console.log(`Error when opening the browser`)
    }
  );
}

async function _renderStandaloneWebApplication() {
  // In that case it's just using skott, but could be anything mapping the graph
  // to a different structure, as long as it respects the expected contract.
  const factory = () => skott(defaultConfig);

  await Web.renderStandaloneWebApplication(
    // factory function
    factory,
    // application config
    {
      visualization: {
        granularity: "module"
      },
      watch: {
        cwd: process.cwd(),
        ignorePattern: "tests/**/*",
        fileExtensions: [".ts"],
        verbose: true
      },
      port: 1111,
      onListen: (port) => console.log(`Listening on port ${port}`),
      open: true,
      onOpenError: () => console.log(`Error when opening the browser`)
    }
  );
}
