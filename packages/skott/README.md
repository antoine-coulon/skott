<p align="center">
	<img alt="skott" src="https://user-images.githubusercontent.com/43391199/188307540-00740a8b-ad19-401b-b767-6211bfb0d26b.png" width="350">
</p>

## How to use skott

### Install

You can install skott either locally or globally
```bash
npm install skott 
// or
npm install skott -g
```

### **Embedded Web Application**

skott now embeds a new _display mode_ **"skott --displayMode=webapp"** allowing you to visualize more precisely dependencies and the links between them. Here is an overview of a subset from the graph generated for `fastify`:

<img alt="skott-webapp-fastify" src="https://user-images.githubusercontent.com/43391199/204465791-99ae71bb-67e9-4c84-8734-c9cad0b5c24d.png" />

As shown above **Third-party** and **Built-in dependencies** can be toggled when they are tracked (by providing `--trackThirdPartyDependencies` and `--trackBuiltinDependencies` to the CLI).

When `Circular dependencies` are found in the graph, they can also be toggled via the _Node visualization options_ as shown below:

<img alt="skott-webapp-with-cycles" src="https://user-images.githubusercontent.com/43391199/204466577-3b82bf6c-4ed4-436c-bd99-31aa9261fb61.png" />


### **JavaScript API**

```javascript
import skott from "skott";

const { getStructure, findCircularDependencies, findParentsOf, findLeaves } = await skott({
  /**
   * (Optional) Entrypoint of the project. If not provided, `skott` will search for all
   * supported files starting from the current working directory.
   * Defaults to `""`
   */ 
  entrypoint: "src/index.ts",
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
   * (Optional) Whether the base directory of the entrypoint should be included in relative 
   * file paths. For the specified `src/index.ts` above, it would consider the 
   * root path to be `./` consequently `src/` would never appear in any file paths.
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
  };
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
  dependencyResolvers: [new TurborepoResolver()]
});
```

### **Command line interface**

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

**Skott** can be used to generate static files from the project graph structure (.svg, .png, .md, .json)

```bash
$ skott src/index.js --staticFile=svg
```

For **Skott** itself, the following _.svg_ file is generated:

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

## Examples

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

### Search for circular dependencies

```javascript
import skott from "skott";

const { findCircularDependencies, hasCircularDependencies } = await skott({
  entrypoint: "index.js",
  // ...rest of the config
});

// Imagine that starting from "index.js" skott detects a circular dependency
// between "core.js" and "utils.js" files

console.log(findCircularDependencies()); // logs [ [ "core.js", "utils.js" ] ]
console.log(hasCircularDependencies()); // logs "true"
```

### Search for unused dependencies using the graph generated from production code

```javascript
import skott from "skott";

const { findUnusedDependencies } = await skott({
  entrypoint: "index.tsx",
  // ...rest of the config
});

const { thirdParty } = await findUnusedDependencies();
console.log(thirdParty); // logs [ "rxjs", "lodash.difference" ]
```

### Search for leaves (nodes with no children)

leaf.js

```javascript
console.log("I'm a leaf because I have no dependency");
```

index.js

```javascript
import skott from "skott";

const { findLeaves } = await skott({
  entrypoint: "leaf.js",
  // ...rest of the config
});

console.log(findLeaves()); // logs [ "leaf.js" ]
```

### Deeply search for parent dependencies of a given node

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

const { findParentsOf } = await skott({
  entrypoint: "parent.js",
  // ...rest of the config
});

console.log(findParentsOf("children.js")); // logs [ "parent.js" ]
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