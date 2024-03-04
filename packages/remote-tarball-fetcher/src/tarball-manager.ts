import { mkdir } from "node:fs/promises";
import * as os from "node:os";
import * as path from "node:path";
import { pipeline } from "node:stream/promises";

import { Effect, Option, pipe } from "effect";
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

  private hasLocalIdentifier(packageName: string): boolean {
    const segmentThatShouldIncludeSemver = packageName.lastIndexOf("@");
    const identifier = packageName.slice(segmentThatShouldIncludeSemver + 1);

    return (
      !Number.isNaN(Number(identifier)) || semver.valid(identifier) !== null
    );
  }

  private makeLocalIdentifier(packageName: string, id: string): string {
    if (this.hasLocalIdentifier(packageName)) {
      return packageName;
    }

    return `${packageName}@${id}`;
  }

  public switchFetcher(fetcher: Fetcher): void {
    this._fetcher = fetcher;
  }

  public downloadAndStore(
    packageName: string,
    baseOutDir = os.tmpdir()
  ): Effect.Effect<Option.Option<string>> {
    return pipe(
      Effect.succeed(this),
      Effect.flatMap((self) =>
        Effect.gen(function* gen(_) {
          if (self._store.has(packageName)) {
            return self._store.get(packageName);
          }

          const { id, tarballUrl } = yield* _(
            self._fetcher.fetchPackageInformation(packageName)
          );

          const localTarballId = self.makeLocalIdentifier(packageName, id);

          if (self._store.has(localTarballId)) {
            return self._store.get(localTarballId);
          }

          const pathToTarball = path.join(
            baseOutDir,
            kSkottStore,
            localTarballId
          );

          yield* _(
            Effect.promise(() => mkdir(pathToTarball, { recursive: true }))
          );

          const tarballStream = yield* _(
            self._fetcher
              .downloadTarball(tarballUrl)
              .pipe(Effect.map(Option.getOrThrow))
          );

          yield* _(
            Effect.promise(() =>
              pipeline(tarballStream, tar.extract({ cwd: pathToTarball }))
            )
          );

          self.store.set(localTarballId, pathToTarball);

          return pathToTarball;
        })
      ),
      Effect.map(Option.fromNullable),
      Effect.catchAllCause(() => Effect.succeed(Option.none()))
    );
  }
}
