import { mkdir } from "node:fs/promises";
import * as os from "node:os";
import * as path from "node:path";
import { pipeline } from "node:stream/promises";

import tar from "tar";

import { Fetcher } from "./fetcher/index.js";

const kSkottStore = "skott_store";

export class TarballManager {
  private readonly _store = new Map();

  constructor(private _fetcher: Fetcher) {}

  get store(): Map<string, string> {
    return this._store;
  }

  private isPackageIncludingSemver(packageName: string): boolean {
    return packageName.includes("@");
  }

  private async fetchPackageInformation(
    packageName: string
  ): Promise<{ packageNameWithVersion: string; tarballUrl: string }> {
    const { latestVersion, tarballUrl } =
      await this._fetcher.fetchPackageInformation(packageName);
    if (this.isPackageIncludingSemver(packageName)) {
      return {
        packageNameWithVersion: packageName,
        tarballUrl
      };
    }

    return {
      packageNameWithVersion: `${packageName}@${latestVersion}`,
      tarballUrl
    };
  }

  public switchFetcher(fetcher: Fetcher): void {
    this._fetcher = fetcher;
  }

  public async downloadAndStore(
    packageName: string,
    baseOutDir = os.tmpdir()
  ): Promise<string> {
    // package name already includes a package version
    if (this._store.has(packageName)) {
      return this._store.get(packageName);
    }

    const { packageNameWithVersion, tarballUrl } =
      await this.fetchPackageInformation(packageName);

    if (this._store.has(packageNameWithVersion)) {
      return this._store.get(packageNameWithVersion);
    }

    const pathToTarball = path.join(
      baseOutDir,
      kSkottStore,
      packageNameWithVersion
    );

    // this should act as a transaction
    this.store.set(packageNameWithVersion, pathToTarball);
    await mkdir(pathToTarball, { recursive: true });
    await pipeline(
      this._fetcher.downloadTarball(tarballUrl),
      tar.extract({ cwd: pathToTarball })
    );

    return pathToTarball;
  }
}
