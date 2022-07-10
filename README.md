<p align="center">
	<img alt="cyclops" src="https://user-images.githubusercontent.com/43391199/176795254-531273fc-5496-4f39-86f0-88b9cae3287d.png" width="320">
</p>

**cyclops** is a minimalist developer tool that can be used to generate directed graphs from your Node.js project. It can automatically detect circular dependencies and can be used to implement affected/incremental patterns as it exposes a way to know precisely dependencies for each graph node.

> **Note**
>
> Unlike [madge](https://github.com/pahen/madge), **cyclops** is not meant to represent all the file tree structure but was designed to only include dependencies that are currently being used in the project based on the entrypoint.


* ✅ Works for JavaScript (ES6 and CommonJS modules)
* ✅ Deeply detects circular dependencies in an efficient way
* ✅ Deeply collect all dependencies on which a graph node depends on  
* ✅ Parent and child dependencies traversals

## Examples

To initialize the dependency graph, the default exported function must be used first.
Once executed, the default function returns a set of functions to retrieve some
information about the graph just built.


```javascript
import cyclops from "cyclops";

const { getStructure, getCircularDependencies, hasCircularDependencies } = await cyclops({
  entrypoint: "index.js"
});

const { graph, files } = getStructure();
console.log(graph); // logs { "index.js": { id: "index.js", adjacentTo: [], body: {...} } };
console.log(files); // logs [ "index.js" ]
```

Or simply search for circular dependencies

```javascript
import cyclops from "cyclops";

const { getCircularDependencies } = await cyclops({
  entrypoint: "index.js"
});

// Imagine that starting from "index.js" cyclops detects a circular dependency
// between "core.js" and "utils.js" files

console.log(getCircularDependencies()); // logs [ [ "core.js", "utils.js" ] ]
```
