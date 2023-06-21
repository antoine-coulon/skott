---
"skott": minor
---

Add `getWorkspace` on skott instance that returns a dictionary with all workspace manifests and dependencies listed in each one of them. 

Allow devDependencies to be reported when using `showUnusedDependencies` CLI flag.

Raise exceptions when using the skott API and providing illegal configurations.