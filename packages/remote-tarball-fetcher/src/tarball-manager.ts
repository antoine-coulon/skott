import { mkdir } from "node:fs/promises";
import * as os from "node:os";
import * as path from "node:path";
import { pipeline } from "node:stream/promises";

import tar from "tar";

import { Fetcher } from "./fetcher/index.js";

const kSkottStore = "skott_store";

export class TarballManager {
  private readonly _store = new Map();

  constructor(private readonly _fetcher: Fetcher) {}

  get store(): Map<string, string> {
    return this._store;
  }

  private isPackageIncludingSemver(packageName: string): boolean {
    return packageName.includes("@");
  }

  private async makePackageNameWithVersion(
    packageName: string
  ): Promise<string> {
    const { latestVersion } = await this._fetcher.fetchPackageInformation(
      packageName
    );
    if (this.isPackageIncludingSemver(packageName)) {
      return packageName;
    }

    return `${packageName}@${latestVersion}`;
  }

  async downloadAndStore(
    packageName: string,
    baseOutDir = os.tmpdir()
  ): Promise<string> {
    const targetVersion = await this.makePackageNameWithVersion(packageName);
    const { tarballUrl } = await this._fetcher.fetchPackageInformation(
      packageName
    );
    const pathToTarball = path.join(baseOutDir, kSkottStore, targetVersion);

    // this should act as a transaction
    this.store.set(targetVersion, pathToTarball);
    await mkdir(pathToTarball, { recursive: true });
    await pipeline(
      this._fetcher.downloadTarball(tarballUrl),
      tar.extract({ cwd: pathToTarball })
    );

    return pathToTarball;
  }
}
