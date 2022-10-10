<p align="center">
	<img alt="skott" src="https://user-images.githubusercontent.com/43391199/188307540-00740a8b-ad19-401b-b767-6211bfb0d26b.png" width="350">
</p>

## How to use skott

### Install

You can install skott either locally or globally
```bash
npm install skott --save-dev 
// or
npm install skott -g
```

### **JavaScript API**

```javascript
import skott from "skott";

const { getStructure, findCircularDependencies, findParentsOf, findLeaves } = await skott({
  /**
   * Entrypoint of the project. Must be either a CommonJS or ES6 module.
   * No TypeScript files are supported as entrypoints yet.
   */ 
  entrypoint: "dist/index.js",
  /**
   * Max depth search for circular dependencies. This can be useful for 
   * performance purposes. 
   * Defaults to `POSITIVE_INFINITY`.
   */
  circularMaxDepth: 20,
  /**
   * Whether the base directory of the entrypoint should be included in relative 
   * file paths. For the specified `dist/index.js` above, it would consider the 
   * root path to be `./` consequently `dist/` would never appear in any file paths.
   * Defaults to `false`.
   */
  includeBaseDir: false,
  /**
   * Whether third-party dependencies (npm) and/or builtin (Node.js core modules) 
   * should be added in the graph. 
   * Both defaults to `false`.
   */
  dependencyTracking: {
    thirdParty: true,
    builtin: true
  };
});
```

### **Command line interface**

skott exposes a CLI directly using features from the core library.

When the library installed locally you can run:

```bash
$ ./node_modules/.bin/skott src/index.js
```

When the library installed globally:

```bash
$ skott src/index.js
```

**Skott** can be used to generate static file (.svg, .png, .md) from the project graph structure using [mermaid-js](https://github.com/mermaid-js/mermaid):

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

When askign for circular dependencies to be found (using the `--showCircularDependencies` option):

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
    thirdParty: true
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