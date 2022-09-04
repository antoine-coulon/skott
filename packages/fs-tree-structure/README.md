**fs-tree-structure** builds a filesystem tree structure from a list of flat paths.

```javascript
const filePaths = ["lib/feature/index.js", "lib/feature/util/index.js"];

const treeStructure = makeTreeStructure(filePaths);

assert.deepEqual(treeStructure, {
  lib: {
    feature: {
      "index.js": {},
      util: {
        "index.js": {}
      }
    }
  }
});
```
