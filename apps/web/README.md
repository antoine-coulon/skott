## skott web application

This is the web application project embedded by `skott` to be used when `--displayMode=webapp` when using the CLI.

Note that this web application can be used without `skott` and is published as a standalone library on npm.

The application needs 3 endpoints to correctly work:


- `/api/analysis`: endpoint returning `SkottStructureWithMetadata` payload. See `src/skott.ts`
  
- `/api/cycles`: endpoint returning `{ cycles: string[][] }` payload. See `src/skott.ts`
  
- `/api/subscribe`: endpoint that provides Server-Sent Events support to hot refresh the application whenever an event is received.

- `/api/meta`: endpoint returning meta information about the application, especially visualization related stuff that can change including visualization granularity e.g. "group" that might fit better with monorepo visualization.