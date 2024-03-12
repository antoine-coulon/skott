---
"skott": patch
---

This patch fixes the eager evaluation of `cwd` default value from the config preventing [process.chdir](https://nodejs.org/api/process.html#processchdirdirectory) 
to work as expected when used before invoking skott's API.

```js
process.chdir('/tmp/somewhere');

// skott is now being executed at the root of "/tmp/somewhere"

const instance = await skott();
```

Note: regarding the generated graph relationships, this is pretty much equivalent as doing `skott({ cwd: "/tmp/somewhere" })`, even though
node paths will be relative and won't have the same values as the later still executes skott from the script location 
and not from `/tmp/somewhere`. In other words, using `cwd` parameter will have node paths being relative to skott's script location, while using
`process.chdir` will make skott execute the script from the provided directory.

You can find a real example of the difference between node paths using `process.chdir` and `cwd`: https://github.com/antoine-coulon/skott/issues/149#issuecomment-1989451725 
by @mattkindy.
