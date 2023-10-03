import { Readable } from "node:stream";

import fetch from "node-fetch";
import semver from "semver";

import type { Fetcher } from "./common.js";

function isSemverValid(version: string): boolean {
  return semver.valid(version) !== null;
}

function dissociatePackageNameFromItsSemver(packageName: string): {
  name: string;
  semver: string | undefined;
} {
  const nameWithMaybeSemver = packageName.split("@");

  if (nameWithMaybeSemver.length === 1) {
    return {
      name: nameWithMaybeSemver[0],
      semver: undefined
    };
  }

  const segmentThatShouldIncludeSemver = packageName.lastIndexOf("@");
  const maybeSemver = packageName.slice(segmentThatShouldIncludeSemver + 1);
  const name = packageName.slice(0, segmentThatShouldIncludeSemver);

  return {
    name,
    semver: isSemverValid(maybeSemver) ? maybeSemver : undefined
  };
}

const kNpmRegistryApiUrl = "https://registry.npmjs.org";

type NpmApiPayload = any;

async function fetchAndParseResponse(url: string): Promise<NpmApiPayload> {
  return fetch(url).then((response) => response.json());
}

export const npmFetcher: Fetcher = {
  fetchPackageInformation: async (packageName) => {
    const { name, semver } = dissociatePackageNameFromItsSemver(packageName);
    const packageUrl = new URL(name, kNpmRegistryApiUrl);

    const allPackageInformation = await fetchAndParseResponse(packageUrl.href);

    const latestVersion = allPackageInformation["dist-tags"].latest;

    if (!semver) {
      return {
        latestVersion,
        tarballUrl: allPackageInformation.versions[latestVersion].dist.tarball
      };
    }

    const specificPackageVersionUrl = new URL(
      name.concat("/", semver),
      kNpmRegistryApiUrl
    );
    const specificPackageVersionInformation = await fetchAndParseResponse(
      specificPackageVersionUrl.href
    );
    const tarballUrl = specificPackageVersionInformation.dist.tarball;

    return {
      latestVersion,
      tarballUrl
    };
  },
  downloadTarball: (tarballUrl) =>
    fetch(tarballUrl).then((response) => response.body as Readable)
};
