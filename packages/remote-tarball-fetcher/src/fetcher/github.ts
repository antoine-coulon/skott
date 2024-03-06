import * as S from "@effect/schema/Schema";
import { Effect, Option, flow, pipe } from "effect";

import { FetchPackageInformationError, type Fetcher } from "./definition.js";

interface GitHubRepositoryInformation {
  defaultBranch: string;
}

const GitHubSchema = S.struct({
  default_branch: S.string,
  id: S.number
});

function makeTarballUrl(branch: string, repositoryFullName: string) {
  return `https://github.com/${repositoryFullName}/archive/${branch}.zip`;
}

// eslint-disable-next-line func-style, @typescript-eslint/explicit-function-return-type
export const githubFetcher: Fetcher<GitHubRepositoryInformation> = {
  fetchPackageInformation: (repositoryName) =>
    pipe(
      Effect.tryPromise({
        try: () =>
          fetch(`https://api.github.com/repos/${repositoryName}`).then(
            (response) => response.json()
          ),
        catch: () => new FetchPackageInformationError()
      }),
      Effect.flatMap(flow(S.decodeUnknown(GitHubSchema), Effect.orDie)),
      Effect.map(({ default_branch, id }) => {
        return {
          id: id.toString(),
          defaultBranch: default_branch,
          tarballUrl: makeTarballUrl(default_branch, repositoryName)
        };
      })
    ),
  downloadTarball: (tarballUrl) =>
    Effect.promise(() =>
      fetch(tarballUrl).then((response) => Option.fromNullable(response.body))
    ).pipe(
      Effect.map(
        Option.map((body) => {
          return { stream: body, format: "zip" };
        })
      )
    )
};
