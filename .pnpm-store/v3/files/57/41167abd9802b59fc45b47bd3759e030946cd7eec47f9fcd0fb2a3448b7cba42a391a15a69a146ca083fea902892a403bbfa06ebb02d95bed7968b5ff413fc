  <p align="center">
	  <img alt="digraph-js" src="https://user-images.githubusercontent.com/43391199/191079632-ffe879dd-0591-4c9d-aab8-375689130854.png" width="350">
  </p>

Make Directed Graphs traversal and construction effortless, also includes deep circular dependency detection.

**digraph-js** is a lightweight library allowing you to create a Directed Acyclic Graph data structure with embedded features such as deep cycle dependency detection and graph introspection (find deeply ancestors and successors for any given vertex).
It can be used to model complex dependencies systems based on graphs.

✅ Create a graph structure including edges and vertices seamlessly

✅ Deeply find direct/indirect children and parent dependencies of each vertex in the graph (top-to-bottom or bottom-to-top traversals)

✅ Ensure that a given graph is Acyclic by deeply detecting circular dependencies while having the possibility to limit the search depth

## Installation

```bash
$ npm install digraph-js
```

## How to use it

```js
import { DiGraph } from "digraph-js";
import assert from "node:assert";

const myGraph = new DiGraph();

const myDependencyA = { id: "dependencyA", adjacentTo: [], body: {} };
const myDependencyB = { id: "dependencyB", adjacentTo: [], body: {} };
const myDependencyC = { id: "dependencyC", adjacentTo: [], body: {} };

// Add vertices to the graph
myGraph.addVertices(myDependencyA, myDependencyB, myDependencyC);

// Link graph vertices: A ---> B link created
myGraph.addEdge({ from: myDependencyA.id, to: myDependencyB.id });

// Graph traversels
myGraph.addEdge({ from: myDependencyB.id, to: myDependencyC.id });
// getDeepChildren traverses the graph in a Depth-First Search fashion
const deepDependenciesOfA = myGraph.getDeepChildren("dependencyA");
// deepDependenciesOfA is an iterable structure that can be lazily consumed
assert.deepEqual([...deepDependenciesOfA], ["dependencyB", "dependencyC"]);

// Here we voluntarily create a cyclic dependency
myGraph.addEdge({ from: myDependencyB.id, to: myDependencyA.id });
// Detect if the Directed Graph is acyclic (Directed Acyclic Graph)
assert.equal(myGraph.isAcyclic, false);
assert.equal(myGraph.hasCycles(), true);
assert.deepEqual(myGraph.findCycles().cycles, [["dependencyA", "dependencyB"]]);
```

## You already manipulate Directed Graphs without knowing it

  <p align="center">
    <img src="https://dev-to-uploads.s3.amazonaws.com/uploads/articles/2dwieqf30481m49trn6b.png" alt="digraph" />
  </p>

Take for instance the image above with four Vertices each representing a
JavaScript file.

Now the question is: what are the **relationships** between these files? In all
programming languages, one file might import one or multiple files. Whenever
a file imports another one, an implicit relationship is created.

**_hello.js_**

```js
export function sayHello() {}
```

**_main.js_**

```js
import { sayHello } from "hello.js";
```

As you can see above, **main.js** imports **hello.js** to use the `sayHello`
function. The static import creates an implicit relationship between both files.
In the fields of graphs, this relationship can be modeled as a directed edge
from **main.js** to **hello.js** (can be written as **main.js ---> hello.js**)
We can also say that main.js **depends on** hello.js.

We can update the graph with our edges represented:

  <p align="center">
    <img src="https://dev-to-uploads.s3.amazonaws.com/uploads/articles/31qbt7u1mhog516uqlwb.png" alt="digraph" />
  </p>

Basically this graph says that:

- FileA directly depends on FileD and FileB
- FileA indirectly depends on FileC (through both FileD and FileB)
- FileD directly depends on FileC
- FileB directly depends on FileC
- FileC directly depends on nothing

This structure may seem simple but can in fact be used to model very complex
schemas such as:

- **_Static dependencies analysis_** such as cycle dependencies detection
  (e.g: [ESLint no-cycle plugin](https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/no-cycle.md))
- **_Incremental/Affected tasks_** Bundlers/Monorepos tools make extensive use of it (e.g: [NX's affected build/test/lint...](https://nx.dev/using-nx/affected))
- **_Task orchestration_** using a directed acyclic graph, parallel vs sequential
  computations can be modeled (e.g: Continuous Integration schemas with stages, jobs, tasks)

## Further exploring with examples which recreate common features:

- [affected builds (NX alike)](https://github.com/antoine-coulon/digraph-js/tree/master/examples/affected-builds)
- [detect cyclic imports (eslint-plugin-import alike)](https://github.com/antoine-coulon/digraph-js/tree/master/examples/circular-dependencies)
- Sequential vs Parallel execution => Work in progress
