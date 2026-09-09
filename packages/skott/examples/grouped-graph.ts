/**
 * Visualize a GROUPED module graph in the skott web application.
 *
 * `groupBy` collapses the file-level graph into links between architecture blocks,
 * and `visualization.granularity: "group"` boots the web application straight into
 * that grouped view. You can then toggle between the module-level and grouped
 * views anytime from the "Grouped graph" panel in the sidebar.
 *
 * Rendering the grouped view keeps the visualization light on large graphs: only
 * the architecture blocks are drawn, not every underlying module.
 */

import { defaultConfig } from "../index.js";
// Should be imported as "skott/rendering" when being in a third-party context
import { Web } from "../src/rendering/api.js";

async function _renderGroupedGraph() {
  await Web.renderWebApplication(
    // skott runtime config
    {
      ...defaultConfig,
      groupBy: (path) => {
        // Group by using the returned value as the key
        if (path.includes("src/core")) return "core";
        if (path.includes("src/feature-a")) return "feature-a";

        // ... other conditions

        // if no match, the module is excluded from any group
        return undefined;
      }
    },
    // application config
    {
      visualization: {
        // "group" boots into the grouped graph (requires `groupBy`)
        granularity: "group"
      },
      watch: false,
      port: 1111,
      onListen: (port) => console.log(`Listening on port ${port}`),
      open: true,
      onOpenError: () => console.log(`Error when opening the browser`)
    }
  );
}
