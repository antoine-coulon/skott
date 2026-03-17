---
"skott": patch
---

Fix a persisting issue when it comes to generating static files using the @skottorg/static-file-plugin plugin. It is now again possible to generate static files from skott using "md", "json", "svg", "png" `displayMode` options. Example `skott --displayMode=md` to generate a mermaid diagram.
