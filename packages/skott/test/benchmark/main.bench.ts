import { Effect, Option, pipe } from "effect";
import { githubFetcher, TarballManager } from "remote-tarball-fetcher";
import { bench, describe } from "vitest";

import skott from "../../index.js";

const fetcher = new TarballManager(githubFetcher);

const packagesByLang = {
  js: ["knex/knex", "parcel-bundler/parcel"],
  ts: ["Effect-TS/effect", "gcanti/fp-ts"]
};

const packageStore = await pipe(
  Object.values(packagesByLang).flat(),
  Effect.forEach(
    (name) =>
      pipe(
        fetcher.downloadAndStore(name).pipe(Effect.map(Option.getOrThrow)),
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

describe("skott_benchmark", () => {
  for (const { location, name } of packageStore) {
    bench(
      name,
      async () => {
        await skott({
          cwd: location,
          ignorePatterns: ["test/**/*.{ts,js}"]
        });
      },
      { iterations: 5 }
    );
  }
});
