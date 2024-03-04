import { ReadableStream } from "stream/web";

import { expect } from "chai";
import { Effect, Option, pipe } from "effect";

import { githubFetcher } from "./github.js";

function itEffect<A, E>(
  description: string,
  effect: Effect.Effect<A, E, never>
) {
  it(description, () => effect.pipe(Effect.runPromise));
}

describe("GitHub integration", () => {
  describe("When fetching skott tarball", () => {
    itEffect(
      "Should fetch the tarball from the main branch",
      Effect.gen(function* gen(_) {
        const fetcher = githubFetcher;

        const { id, defaultBranch, tarballUrl } = yield* _(
          fetcher.fetchPackageInformation("antoine-coulon/skott")
        );

        expect(id).to.be.a("string");
        expect({ defaultBranch, tarballUrl }).to.deep.equal({
          defaultBranch: "main",
          tarballUrl: "https://github.com/antoine-coulon/skott/archive/main.zip"
        });

        const tarball = yield* _(
          pipe(
            Effect.map(
              fetcher.downloadTarball(
                "https://github.com/antoine-coulon/skott/archive/main.zip"
              ),
              Option.getOrThrow
            )
          )
        );

        expect(tarball).to.be.an.instanceOf(ReadableStream);
      })
    );
  });
});
