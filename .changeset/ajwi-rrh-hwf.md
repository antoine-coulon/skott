---
"skott": patch
---

Upgrade `effect` dependency from pinned `3.3.2` to `^3.20.0` to fix high-severity security vulnerability GHSA-38f7-945m-qr2g (`AsyncLocalStorage` context contamination inside Effect fibers under concurrent RPC load).
