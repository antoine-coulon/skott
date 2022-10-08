import { Readable } from "node:stream";

export interface PackageInformation {
  latestVersion: string;
  tarballUrl: string;
}

export interface Fetcher {
  fetchPackageInformation: (libraryName: string) => Promise<PackageInformation>;
  downloadTarball: (tarballUrl: string) => Readable;
}
