---
"skott-webapp": minor
---

Introduce Groups visualization feature based on granularity configuration that can either be `module` or `group`. 

When using `group` granularity, the application does not render irrelevant features for an higher-level granularity e.g. File Explorer and File Summary are disabled.

The `granularity` of the web application rendering can't be modified through the CLI and is still `module` by default. The only way to alter that configuration is to use the [rendering API introduced in 0.34.0](https://github.com/antoine-coulon/skott/blob/00c883744ce9e0ee3ebf7e172053181ba16877ff/packages/skott/CHANGELOG.md#0340) and to provide a meta configuration with the selected granularity.


