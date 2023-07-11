<p align="center">
	<img alt="skott" src="https://user-images.githubusercontent.com/43391199/188307540-00740a8b-ad19-401b-b767-6211bfb0d26b.png" width="350">
</p>

## How to use skott

## Install

You can install skott either locally or globally
```bash
npm install skott 
// or
npm install skott -g
```

## **Embedded Web Application**

skott now embeds a new _display mode_ **"skott --displayMode=webapp"** allowing you to visualize more precisely dependencies and the links between them. Here is an overview of a subset from the graph generated for `fastify`:

<img alt="skott-webapp-fastify" src="https://user-images.githubusercontent.com/43391199/204465791-99ae71bb-67e9-4c84-8734-c9cad0b5c24d.png" />

As shown above **Third-party** and **Built-in dependencies** can be toggled when they are tracked (by providing `--trackThirdPartyDependencies` and `--trackBuiltinDependencies` to the CLI).

When `Circular dependencies` are found in the graph, they can also be toggled via the _Node visualization options_ as shown below:

<img alt="skott-webapp-with-cycles" src="https://user-images.githubusercontent.com/43391199/204466577-3b82bf6c-4ed4-436c-bd99-31aa9261fb61.png" />


## **JavaScript API**

```javascript
import skott from "skott";

const { getStructure, getWorkspace, useGraph, findUnusedDependencies } = await skott({
  /**
   * (Optional) Entrypoint of the project. If not provided, `skott` will search for all
   * supported files starting from the current working directory.
   * Defaults to `""`
   */ 
  entrypoint: "src/index.ts",
  /**
   * (Optional) Ignore pattern that applies during file traversal and module 
   * resolution. Each module matching the pattern will be discarded from the 
   * graph.
   * Defaults to `none`;
   */ 
  ignorePattern: "src/examples/**/*",
  /**
   * (Optional) Whether to run Skott using the incremental pattern. By setting "true",
   * Skott will create a `.skott/cache.json` file to only detect and re-process what
   * changed since the last analysis.
   * Defaults to `true`;
   */ 
  incremental: true,
  /**
   * (Optional) restricts file discovering when building the graph. 
   * Defaults to `[".js", ".mjs", ".cjs", ".jsx", ".ts", ".tsx"]`
   */ 
  fileExtensions: [".ts", ".tsx"],
  /**
   * (Optional) Max depth search for circular dependencies. This can be useful for 
   * performance purposes. 
   * Defaults to `POSITIVE_INFINITY`.
   */
  circularMaxDepth: 20,
  /**
   * (Optional) Sets the base directory to start the analysis from. It's useful
   * when you want to run skott from a parent directory targetting a specific sub
   * directory (in the context of monorepo for instance). Using `cwd=some-path` 
   * is equivalent to `cd some-path && skott`.
   * Defaults to `process.cwd()`.
   */
  cwd: "./",
  /**
   * (Optional) Whether the base directory of the entrypoint should be included in relative 
   * file paths. For the specified `src/index.ts` above, it would consider the 
   * root path to be `./` consequently `src/` would never appear in any file paths.
   * Note: `includeBaseDir` can only be set to "true" when there is an `entrypoint`
   * provided.
   * Defaults to `false`.
   */
  includeBaseDir: false,
  /**
   * (Optional) Whether third-party dependencies (npm) and/or builtin (Node.js core modules)
   * should be added in the graph and/or Typescript type-only import should be followed. 
   * Defaults to `thirdParty=false`, `builtin=false`, and `typeOnly=true`.
   */
  dependencyTracking: {
    thirdParty: true,
    builtin: true,
    typeOnly: true
  },
  /**
   * (Optional) Provide a custom tsconfig file to help skott resolve path aliases.
   * When extending some other tsconfig files, skott will be able to parse
   * all the way up all the path aliases referenced. 
   * Defaults to `tsconfig.json`.
   */
  tsConfigPath: "./tsconfig.json",
  /**
   * (Optional) Provide a path to the package.json that should be used to detect
   * unused third-party dependencies.
   * Defaults to `package.json`.
   */
  manifestPath: "./package.json",
  /**
   * (Optional) Provide custom dependency resolvers to take full control over the
   * content that will be added to the graph nodes.
   * Defaults to `EcmaScriptModuleResolver` which is used a standard dependency
   * resolver for ECMAScript projects.
   */
  dependencyResolvers: [new TurborepoResolver()],
  /**
   * (Optional) Enable verbose internal logging.
   * Defaults to `false`
   */
  verbose: true
});
```

## **Command line interface**

skott exposes a CLI directly using features from the core library.

When the library installed locally you can run:

**Providing an entrypoint:**

```bash
$ ./node_modules/.bin/skott src/index.js
```

When the library is installed globally:

```bash
$ skott src/index.js
```

**Note: The CLI output might be massive, so don't hesitate to pipe the stdout into a file:**
```bash
$ skott --displayMode=file-tree > skott.txt
```

**Run a global analysis from the current working directory:**

Using this command, skott will deeply search for all ".ts" and ".tsx" files starting from cwd

```bash
$ skott --fileExtensions=.ts,.tsx
```

**skott** can be used to generate static files from the project graph structure (.svg, .png, .md, .json).

**Note: this static file generator is provided via a skott plugin `@skottorg/static-file-plugin` that needs to be installed.**

```bash
$ skott src/index.js --displayMode=svg
```

For **skott** itself, the following _.svg_ file is generated:

<p>
    <img width="650" src="https://user-images.githubusercontent.com/43391199/194954752-ae888d9c-1c17-4be4-b04c-53771f840ea1.png">
</p>

On the CLI side, here are some examples of output generated:

Example targetting [Fastify](https://www.fastify.io/) using **"graph"** display mode:

<p>
    <img width="350" src="https://user-images.githubusercontent.com/43391199/188308086-49e6b0a2-8da5-48d4-b545-8e82aaecc0d1.png">
</p>

Using **"file-tree"** display mode:

<p>
    <img width="350" src="https://user-images.githubusercontent.com/43391199/188308088-97575cd8-d725-456e-82e3-c7d9ee37ea9c.png">
</p>

When asking for circular dependencies to be found (using the `--showCircularDependencies` option):

<p>
    <img width="350" src="https://user-images.githubusercontent.com/43391199/188888740-5d54e6fd-aded-493f-bf5f-e2dca06bcaa7.png">
</p>

See all the options of the CLI running:

```bash
$ skott --help
```

## API Documentation

To initialize the dependency graph, the default exported function must be used first.
Once executed, the default function returns a set of functions to retrieve some
information about the graph just built.

```javascript
import skott from "skott";

const { getStructure } = await skott({
  entrypoint: "index.js",
  // ...rest of the config
});

const { graph, files } = getStructure();
console.log(graph); // logs { "index.js": { id: "index.js", adjacentTo: [], body: {...} } };
console.log(files); // logs [ "index.js" ]
```

### Graph API

To easily consume the graph that was emitted while exploring the project, skott exposes a graph API including various methods to traverse all the nodes, collect parent and children dependencies, find circular dependencies, and more.

```javascript
import skott from "skott";

const { useGraph } = await skott();

const { 
  getFileNode,
  traverseFiles, 
  collectFilesDependencies, 
  collectFilesDependingOn, 
  findLeaves, 
  findCircularDependencies, 
  hasCircularDependencies 
} = useGraph();
```

### Graph walking

```javascript
const { useGraph } = await skott();
const { traverseFiles } = useGraph();

// Starting from any node, walking the whole graph
for(const file of traverseFiles()) {
  // SkottNode { }
}

// Starting from a specifc node, walking the graph from it
for(const file of traverseFiles({ rootFile: "index.js" })) {
  // SkottNode { }
}

// By default, skott will collect "shallow first" files in a Breadth-First fashion
// meaning the iterator will first emit direct module imports for each visited node.
// If the traversal needs to be "deep first" instead i.e. you first want to go deep
// down through the graph until meeting a leaf you might want to use "deepFirst" option
// to turn the traversal into Depth-First search.

for(const file of traverseFiles({ rootFile: "index.js", traversal: "deepFirst" })) {
  // SkottNode { }
}
```

### Search for circular dependencies

```javascript
import skott from "skott";

const { useGraph } = await skott({
  entrypoint: "index.js",
});
const { findCircularDependencies, hasCircularDependencies} = useGraph();

// Imagine that starting from "index.js" skott detects a circular dependency
// between "core.js" and "utils.js" files

console.log(findCircularDependencies()); // logs [ [ "core.js", "utils.js" ] ]
console.log(hasCircularDependencies()); // logs "true"
```

### Search for leaves (nodes with no children)

leaf.js

```javascript
console.log("I'm a leaf because I have no dependency");
```

index.js

```javascript
import skott from "skott";

const { useGraph } = await skott({
  entrypoint: "leaf.js",
});
const { findLeaves } = useGraph();

console.log(findLeaves()); // logs [ "leaf.js" ]
```

### Deeply or Shallowly search for parent or children dependencies of a given node

children.js

```javascript
export const childrenFunction = () => {};
```

parent.js

```javascript
import { childrenFunction } from "./children.js";

childrenFunction();
```

index.js

```javascript
import skott from "skott";
import { CollectLevel } from "skott/graph/traversal";

const { useGraph } = await skott({
  entrypoint: "parent.js",
});
const { collectFilesDependingOn, collectFilesDependencies } = useGraph();

// CollectLevel.Deep or CollectLevel.Shallow. In that case just one level so we can use Shallow

console.log(collectFilesDependingOn("children.js", CollectLevel.Shallow)); 
// logs [ SkottNode { id: "parent.js" } ]

console.log(collectFilesDependencies("parent.js", CollectLevel.Shallow)); 
// logs [ SkottNode { id: "children.js" } ]
```

### Find unused dependencies

skott provides a way to walk through dependencies listed in the current working directory manifest (package.json) and compare them to what it founds and marked as "used" during the analysis. The "use" marking will be done when a third-party module appears to be imported in the source code that was walked. All the third-party dependencies that are not used in the traversed files will be returned as "unused".

Additionnally to the source code analysis, skott integrates with [depcheck](https://github.com/depcheck/depcheck) allowing it to take a peak at "implicit" dependencies and emit hypothesis about whether some `devDependencies` are unused or not, by walking through most common config files.

Note: finding precisely implicit dependencies is hard so please double check dependencies part of the `devDependencies` that are marked as "unused" by the analysis. If some `dependencies` (production deps) appear to be unused but are indeed used somewhere in the codebase, it could mean two things:

- the input files pattern you provided to skott don't cover the parts of the graph where the dependency is used
- the dependency is used nowhere through the source code files walked, meaning that it should probably be moved to `devDependencies` or just get removed.

In any case, `unused dependencies` just raise an alert so I would advise to double check before getting rid of a dependency. 

```javascript
import skott from "skott";

const { findUnusedDependencies } = await skott();

const { thirdParty } = await findUnusedDependencies();
// [ lodash, rxjs, typescript ]
```

### Explore file node metadata 

Take for instance `lib.js` with the following content:

lib.js
```javascript
import * as fs from "node:fs";
import { parseScript } from "meriyah";
```

And given the entrypoint `main.js` module below:

main.js
```javascript
import skott from "skott";

const { getStructure } = await skott({
  entrypoint: "lib.js",
  dependencyTracking: {
    builtin: true,
    thirdParty: true,
    typeOnly: true
  }
});

const { graph } = getStructure();
console.log(graph["lib.js"].body);

// Prints
{ 
  size: 70, 
  thirdPartyDependencies: ["meriyah"], 
  builtinDependencies: ["node:fs"] 
}
```

### Explore workspace content

Let's suppose we're currently using pnpm workspaces and we have the following workspace:

```
/apps/my-app/package.json
/libs/my-lib/package.json
```

Skott allows you to traverse the workspace and collect all manifest files with their own dependencies. 

main.js
```javascript
import skott from "skott";

const { getWorkspace } = await skott();

console.log(getWorkspace());
// Prints
{ 
  "my-app": {
    dependencies: {
      // 
    },
    devDependencies: {
      //
    },
    peerDependencies: {
      //
    }
  },
  "my-lib": {
    dependencies: {
      // 
    },
    devDependencies: {
      //
    },
    peerDependencies: {
      //
    }
  }
}
```

This feature could help creating a dependency graph only using manifests instead of parsing and traversing the whole source code graph using static analysis.