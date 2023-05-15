**ligie** generates [mermaid-js](https://github.com/mermaid-js/mermaid) diagrams (.md, .svg, .png) from basic graph structures.


```javascript
    const graph = {
        "a": ["b", "c", "d"];
        "b": [],
        "c": ["d"],
        "d": []
    };

    const outDir = process.cwd();
    const mermaid = generateMermaid(graph, outDir, { orientation: "LR" });

    await mermaid.toMarkdown(); // 1.
    await mermaid.toSvg(); // 2.
    await mermaid.toPng(); // 3.
```

For the 1), a markdown file will include a graph diagram:

```mermaid
    graph LR;

    a --> b
    a --> c
    a --> d
    c --> d
```