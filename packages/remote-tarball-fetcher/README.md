**remote-tarball-fetcher** allows to fetch tarballs from registries such as npm and GitHub and manage them locally.

✅ npm registry
⚠️ GitHub registry (work in progress)

**Fetching tarballs from the npm registry**

```javascript
import { TarballManager, npmFetcher } from "remote-tarball-fetcher";

const manager = new TarballManager(npmFetcher);
```

Download latest versions available in the registry:

```javascript
// both tarballs will be stored in a local registry, default to os.tmpdir();
const location1 = await manager.downloadAndStore("lodash");
const location2 = await manager.downloadAndStore("@nodesecure/ci");

// won't be downloaded again as is automatically managed by a local cache
const sameAsLocation1 = await manager.downloadAndStore("lodash");
```

Or target specific versions using semantic versioning:

```javascript
const location = await manager.downloadAndStore("skott@0.2.0");
```
