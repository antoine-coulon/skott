import { Effect, pipe } from "effect";
import { npmFetcher, TarballManager } from "remote-tarball-fetcher";
import { bench, describe } from "vitest";

import skott from "../../index.js";

const fetcher = new TarballManager(npmFetcher);

const listOfPackages = {
  js: ["webpack", "knex"],
  ts: ["effect", "typescript"]
};

const localPackages = await pipe(
  Object.values(listOfPackages).flat(),
  Effect.forEach(
    (name) =>
      pipe(
        Effect.promise(() => fetcher.downloadAndStore(name)),
        Effect.flatMap(Effect.fromNullable),
        Effect.orDie,
        Effect.tap((location) => Effect.log(`[${name}]: ${location}`)),
        Effect.zip(Effect.succeed(name)),
        Effect.map(([location, name]) => {
          return { location, name };
        })
      ),
    { concurrency: "unbounded" }
  ),
  Effect.tapError(() =>
    Effect.logError("An error happened while fetching local packages")
  ),
  Effect.runPromise
);

describe("skott benchmark", () => {
  for (const { location, name } of localPackages) {
    bench(name, async () => {
      await skott({
        cwd: location
      });
    });
  }
});
