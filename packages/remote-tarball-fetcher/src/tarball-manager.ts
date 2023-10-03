import { mkdir } from "node:fs/promises";
import * as os from "node:os";
import * as path from "node:path";
import { pipeline } from "node:stream/promises";

import semver from "semver";
import tar from "tar";

import type { Fetcher } from "./fetcher/index.js";

const kSkottStore = "skott_store";

export class TarballManager {
  private readonly _store = new Map();

  constructor(private _fetcher: Fetcher) {}

  get store(): Map<string, string> {
    return this._store;
  }

  private isPackageIncludingValidSemver(packageName: string): boolean {
    const nameWithMaybeSemver = packageName.split("@");
    if (nameWithMaybeSemver.length === 1) {
      return false;
    }

    const segmentThatShouldIncludeSemver = packageName.lastIndexOf("@");
    const maybeSemver = packageName.slice(segmentThatShouldIncludeSemver + 1);

    return semver.valid(maybeSemver) !== null;
  }

  private async fetchPackageInformation(
    packageName: string
  ): Promise<{ packageNameWithVersion: string; tarballUrl: string }> {
    const { latestVersion, tarballUrl } =
      await this._fetcher.fetchPackageInformation(packageName);

    if (this.isPackageIncludingValidSemver(packageName)) {
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
  ): Promise<string | undefined> {
    // package name already includes a package version
    if (this._store.has(packageName)) {
      return this._store.get(packageName);
    }

    try {
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

      await mkdir(pathToTarball, { recursive: true });
      const tarballStream = await this._fetcher.downloadTarball(tarballUrl);
      await pipeline(tarballStream, tar.extract({ cwd: pathToTarball }));
      this.store.set(packageNameWithVersion, pathToTarball);

      return pathToTarball;
    } catch {
      return undefined;
    }
  }
}
