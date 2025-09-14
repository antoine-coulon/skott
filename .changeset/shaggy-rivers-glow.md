---
"skott": patch
---

Ensure skott cli properly manages stdio by removing the ora spinner that was writing to stderr. With this fix, only error logs are written to stderr. Combined with the process’ exit code, this allows tools consuming stderr to correctly determine whether an error occurred.
