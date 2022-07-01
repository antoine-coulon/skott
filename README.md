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

```javascript
import cyclops from "cyclops";

const { graph, files, circularDependencies } = await cyclops({
  entrypoint: "index.js"
});
```
