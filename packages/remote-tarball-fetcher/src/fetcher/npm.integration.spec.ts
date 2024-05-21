import { ReadableStream } from "node:stream/web";

import { Effect, Option } from "effect";
import { describe, expect, test } from "vitest";

import { npmFetcher } from "./npm.js";

function itEffect<A, E>(
  description: string,
  effect: Effect.Effect<A, E, never>
) {
  test(description, () => effect.pipe(Effect.runPromise));
}

describe("npm tarball fetcher", () => {
  describe("When fetching package information from the npm registry", () => {
    describe("When no version is provided", () => {
      itEffect(
        "should fetch both the latest version and the tarball of the latest version",
        Effect.gen(function* gen(_) {
          const fetcher = npmFetcher;

          const packageInformation = yield* _(
            fetcher.fetchPackageInformation("openforker")
          );

          expect(packageInformation).to.deep.equal({
            id: "1.0.7",
            latestVersion: "1.0.7",
            tarballUrl:
              "https://registry.npmjs.org/openforker/-/openforker-1.0.7.tgz"
          });

          const { stream } = yield* _(
            Effect.map(
              fetcher.downloadTarball(packageInformation.tarballUrl),
              Option.getOrThrow
            )
          );

          expect(stream).to.be.an.instanceOf(ReadableStream);
        })
      );
    });

    describe("When a version is provided", () => {
      itEffect(
        "should fetch both the latest version and the tarball from the specified version",
        Effect.gen(function* gen(_) {
          const fetcher = npmFetcher;

          const packageInformation = yield* _(
            fetcher.fetchPackageInformation("openforker@1.0.5")
          );

          expect(packageInformation).to.deep.equal({
            id: "1.0.5",
            latestVersion: "1.0.7",
            tarballUrl:
              "https://registry.npmjs.org/openforker/-/openforker-1.0.5.tgz"
          });

          const { format, stream } = yield* _(
            Effect.map(
              fetcher.downloadTarball(packageInformation.tarballUrl),
              Option.getOrThrow
            )
          );

          expect(format).to.equal("tar");
          expect(stream).to.be.an.instanceOf(ReadableStream);
        })
      );
    });
  });
});
