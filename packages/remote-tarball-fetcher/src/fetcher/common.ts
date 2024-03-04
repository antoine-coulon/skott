import type { ReadableStream } from "node:stream/web";

import { Effect, Option } from "effect";

export interface PackageInformation {
  id: string;
  tarballUrl: string;
}

export class FetchPackageInformationError {
  readonly _tag = "FetchPackageInformationError";
}

export interface Fetcher<AdditionalInformation = Record<string, string>> {
  fetchPackageInformation: (
    libraryName: string
  ) => Effect.Effect<
    PackageInformation & AdditionalInformation,
    FetchPackageInformationError
  >;
  downloadTarball: (
    tarballUrl: string
  ) => Effect.Effect<Option.Option<ReadableStream>>;
}
