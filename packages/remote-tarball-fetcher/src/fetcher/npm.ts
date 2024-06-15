import * as S from "@effect/schema/Schema";
import { Effect, Option, flow, pipe } from "effect";
import semver from "semver";

import { FetchPackageInformationError, type Fetcher } from "./definition.js";

const kNpmRegistryApiUrl = "https://registry.npmjs.org";

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

const NpmRepositorySchema = S.Struct({
  "dist-tags": S.Struct({
    latest: S.String
  }),
  versions: S.Record(
    S.String,
    S.Struct({ dist: S.Struct({ tarball: S.String }) })
  )
});

const NpmRepositoryByVersionSchema = S.Struct({
  dist: S.Struct({ tarball: S.String })
});

function fetchFromNpm(url: string) {
  return pipe(
    Effect.tryPromise({
      try: () => fetch(url).then((response) => response.json()),
      catch: () => new FetchPackageInformationError()
    })
  );
}

interface NpmRepositoryInformation {
  latestVersion: string;
}

export const npmFetcher: Fetcher<NpmRepositoryInformation> = {
  fetchPackageInformation: (packageName) =>
    Effect.gen(function* _gen(_) {
      const { name, semver: packageSemver } =
        dissociatePackageNameFromItsSemver(packageName);

      const packageUrl = new URL(name, kNpmRegistryApiUrl);

      const allPackageInformation = yield* _(
        fetchFromNpm(packageUrl.href).pipe(
          Effect.flatMap(
            flow(S.decodeUnknown(NpmRepositorySchema), Effect.orDie)
          )
        )
      );

      const latestVersion = allPackageInformation["dist-tags"].latest;

      if (!packageSemver) {
        return {
          id: latestVersion,
          latestVersion,
          tarballUrl: allPackageInformation.versions[latestVersion].dist.tarball
        };
      }

      const specificPackageVersionUrl = new URL(
        name.concat("/", packageSemver),
        kNpmRegistryApiUrl
      );

      const specificPackageVersionInformation = yield* _(
        fetchFromNpm(specificPackageVersionUrl.href).pipe(
          Effect.flatMap(
            flow(S.decodeUnknown(NpmRepositoryByVersionSchema), Effect.orDie)
          )
        )
      );

      const tarballUrl = specificPackageVersionInformation.dist.tarball;

      return {
        id: packageSemver,
        latestVersion,
        tarballUrl
      };
    }),
  downloadTarball: (tarballUrl) =>
    Effect.promise(() =>
      fetch(tarballUrl).then((response) => Option.fromNullable(response.body))
    ).pipe(
      Effect.map(
        Option.map((body) => {
          return { stream: body, format: "tar" };
        })
      )
    )
};
