/* eslint-disable no-sync */
import * as fs from "node:fs";
import * as path from "node:path";
import { ReadableStream } from "stream/web";

import { Effect, Logger, Option } from "effect";
import { describe, expect, test, afterEach } from "vitest";

import type { Fetcher, PackageInformation } from "./fetcher/index.js";
import { TarballManager } from "./tarball-manager.js";

const kTemporaryDirFixture = path.join(process.cwd(), "fixture");
// sample-project contains two dummy files
const kTarGzFixture = path.join(kTemporaryDirFixture, "project.tgz");
const kZipFixture = path.join(kTemporaryDirFixture, "project.zip");

function makeInMemoryFetcher(
  { id, tarballUrl }: PackageInformation,
  format: "zip" | "tar"
): Fetcher {
  const fetcher: Fetcher = {
    fetchPackageInformation: () =>
      Effect.succeed({
        id,
        tarballUrl
      }),
    downloadTarball: () =>
      Effect.sync(() =>
        Option.some({
          stream: new ReadableStream({
            start: async (controller) => {
              for await (const chunk of fs.createReadStream(
                format === "zip" ? kZipFixture : kTarGzFixture
              )) {
                controller.enqueue(chunk);
              }
              controller.close();
            }
          }),
          format
        })
      )
  };

  return fetcher;
}

function makeInMemoryTarFetcher({
  id,
  tarballUrl
}: PackageInformation): Fetcher {
  return makeInMemoryFetcher({ id, tarballUrl }, "tar");
}

function makeInMemoryZipFetcher({
  id,
  tarballUrl
}: PackageInformation): Fetcher {
  return makeInMemoryFetcher({ id, tarballUrl }, "zip");
}

function makeTarballManager(fetcher: Fetcher): TarballManager {
  return new TarballManager(fetcher);
}

function normalizePath(path: string | Buffer) {
  const p = path.toString();
  if (process.platform === "win32") {
    return p.replace(/\\/g, "/");
  }

  return p;
}

function forceRecursiveRm(path: string) {
  try {
    fs.rmSync(path, {
      recursive: true,
      force: true
    });
  } catch {}
}

const stubLogger = Logger.make(() => {});
const LoggerTest = Logger.replace(Logger.defaultLogger, stubLogger);

describe("Remote Tarball Fetcher", () => {
  afterEach(() => {
    forceRecursiveRm(path.join(kTemporaryDirFixture, "skott_store"));
  });

  describe("When fetching a package for the first time", () => {
    describe("When no identifier is specified", () => {
      test("should download the latest version of the tgz tarball and reference it in the store", async () => {
        const manager = makeTarballManager(
          makeInMemoryTarFetcher({
            id: "2.0.0",
            tarballUrl: "https://location-of-the-thing-skott-2.0.0.tgz"
          })
        );
        const libraryNameWithScope = "@skott/fs-tree-structure";
        const libraryNameWithLatestVersion = `${libraryNameWithScope}@2.0.0`;
        const expectedLocation = path.join(
          kTemporaryDirFixture,
          `skott_store`,
          libraryNameWithLatestVersion
        );

        const location = await Effect.runPromise(
          manager
            .downloadAndStore(libraryNameWithScope, kTemporaryDirFixture)
            .pipe(Effect.map(Option.getOrThrow))
            .pipe(Effect.provide(LoggerTest))
        );

        expect(location).to.equal(expectedLocation);
        expect([...manager.store.entries()]).to.deep.equal([
          [libraryNameWithLatestVersion, expectedLocation]
        ]);
        expect(fs.readdirSync(expectedLocation)).to.deep.equal([
          "file1.js",
          "folder"
        ]);
      });

      test("should download the latest version of the zip tarball and reference it in the store", async () => {
        const manager = makeTarballManager(
          makeInMemoryZipFetcher({
            id: "2.0.0",
            tarballUrl: "https://location-of-the-thing-skott-2.0.0.zip"
          })
        );
        const libraryNameWithScope = "@skott/zip";
        const libraryNameWithLatestVersion = `${libraryNameWithScope}@2.0.0`;
        const expectedLocation = path.join(
          kTemporaryDirFixture,
          `skott_store`,
          libraryNameWithLatestVersion
        );

        const location = await Effect.runPromise(
          manager
            .downloadAndStore(libraryNameWithScope, kTemporaryDirFixture)
            .pipe(Effect.map(Option.getOrThrow))
            .pipe(Effect.provide(LoggerTest))
        );

        expect(location).to.equal(expectedLocation);
        expect([...manager.store.entries()]).to.deep.equal([
          [libraryNameWithLatestVersion, expectedLocation]
        ]);

        expect(
          fs
            .readdirSync(expectedLocation, { recursive: true })
            .map(normalizePath)
        ).to.deep.equal([
          "project",
          "project/file1.js",
          "project/folder",
          "project/folder/file2.js"
        ]);
      });
    });

    describe("When a semver as identifier is specified", () => {
      describe("When the semver is valid", () => {
        test("should download the provided version of the tarball and reference it in the store", async () => {
          const manager = makeTarballManager(
            makeInMemoryTarFetcher({
              id: "3.0.0",
              tarballUrl: "https://location-of-the-thing-skott-2.4.1.tgz"
            })
          );
          const libraryName = "fs-tree-structure";
          const libraryNameWithSpecifiedVersion = `${libraryName}@2.4.1`;
          const expectedLocation = path.join(
            kTemporaryDirFixture,
            `skott_store`,
            libraryNameWithSpecifiedVersion
          );

          const location = await Effect.runPromise(
            manager
              .downloadAndStore(
                libraryNameWithSpecifiedVersion,
                kTemporaryDirFixture
              )
              .pipe(Effect.map(Option.getOrThrow))
              .pipe(Effect.provide(LoggerTest))
          );

          try {
            expect(location).to.equal(expectedLocation);
            expect([...manager.store.entries()]).to.deep.equal([
              [libraryNameWithSpecifiedVersion, expectedLocation]
            ]);
            expect(fs.readdirSync(expectedLocation)).to.deep.equal([
              "file1.js",
              "folder"
            ]);
          } finally {
            // cleanup
            forceRecursiveRm(expectedLocation);
          }
        });
      });
    });

    describe("When a unique identifier is specified", () => {
      test("should download the provided version of the tarball and reference it in the store", async () => {
        const manager = makeTarballManager(
          makeInMemoryTarFetcher({
            id: "3aiqDSFU3092",
            tarballUrl: "https://location-of-the-thing-skott-2.4.1.tgz"
          })
        );
        const libraryName = "fs-tree-structure";
        const libraryWithIdentifier = `${libraryName}@3aiqDSFU3092`;
        const expectedLocation = path.join(
          kTemporaryDirFixture,
          `skott_store`,
          libraryWithIdentifier
        );

        const location = await Effect.runPromise(
          manager
            .downloadAndStore(libraryName, kTemporaryDirFixture)
            .pipe(Effect.map(Option.getOrThrow))
            .pipe(Effect.provide(LoggerTest))
        );

        try {
          expect(location).to.equal(expectedLocation);
          expect([...manager.store.entries()]).to.deep.equal([
            [libraryWithIdentifier, expectedLocation]
          ]);
          expect(fs.readdirSync(expectedLocation)).to.deep.equal([
            "file1.js",
            "folder"
          ]);
        } finally {
          // cleanup
          forceRecursiveRm(expectedLocation);
        }
      });
    });
  });

  describe("When downloading a same package more than once", () => {
    describe("When the package identifier is specified", () => {
      test("should directly use the locally stored package using the provided identifier", async () => {
        const packageInformation = {
          id: "3.0.0",
          tarballUrl: "https://location-of-the-package-2.0.0.tgz"
        };

        const manager = makeTarballManager(
          makeInMemoryTarFetcher(packageInformation)
        );
        const libraryName = "digraph-js";
        const packageNameWithIdentifier = `${libraryName}@0.4.1`;
        const expectedLocation = path.join(
          kTemporaryDirFixture,
          `skott_store`,
          packageNameWithIdentifier
        );

        const location = await Effect.runPromise(
          manager
            .downloadAndStore(packageNameWithIdentifier, kTemporaryDirFixture)
            .pipe(Effect.map(Option.getOrThrow))
            .pipe(Effect.provide(LoggerTest))
        );

        expect(location).to.equal(expectedLocation);

        const fetcherNotWorking: Fetcher = {
          fetchPackageInformation: () => {
            throw new Error("Should not be called");
          },
          downloadTarball: () => {
            throw new Error("Should not be called");
          }
        };

        /**
         * Switch an implementation with a fetcher that does not work at all
         * but the tarball should be already in the store so we
         * should be able to still retrieve the path and the tarball
         */
        manager.switchFetcher(fetcherNotWorking);

        const sameLocation = await Effect.runPromise(
          manager
            .downloadAndStore(packageNameWithIdentifier, kTemporaryDirFixture)
            .pipe(Effect.map(Option.getOrThrow))
            .pipe(Effect.provide(LoggerTest))
        );

        expect(location).to.equal(sameLocation);
        expect(fs.readdirSync(expectedLocation)).to.deep.equal([
          "file1.js",
          "folder"
        ]);
      });
    });

    describe("When the package identifier is not specified", () => {
      test("should only require the identifier to be fetched then use the locally stored package", async () => {
        const packageInformation = {
          id: "8.1.0",
          tarballUrl: "https://location-of-the-package-8.1.0.tgz"
        };

        const manager = makeTarballManager(
          makeInMemoryTarFetcher(packageInformation)
        );
        const libraryName = "openforker";
        const libraryNameWithSpecifiedVersion = `${libraryName}@8.1.0`;
        const expectedLocation = path.join(
          kTemporaryDirFixture,
          `skott_store`,
          libraryNameWithSpecifiedVersion
        );

        const location = await Effect.runPromise(
          manager
            .downloadAndStore(
              libraryNameWithSpecifiedVersion,
              kTemporaryDirFixture
            )
            .pipe(Effect.map(Option.getOrThrow))
            .pipe(Effect.provide(LoggerTest))
        );

        expect(location).to.equal(expectedLocation);

        const fetcherWithOnlyPackageInformationWorking: Fetcher = {
          fetchPackageInformation: () =>
            Effect.succeed({
              id: packageInformation.id,
              tarballUrl: packageInformation.tarballUrl
            }),
          downloadTarball: () => {
            throw new Error("Should not be called");
          }
        };

        /**
         * Switch an implementation with a fetcher that only work for the
         * version information but not for the tarball downloading. As the
         * tarball is already in the store, we should be able to still
         * retrieve it using the package name and the specific version provided.
         */
        manager.switchFetcher(fetcherWithOnlyPackageInformationWorking);

        const sameLocation = await Effect.runPromise(
          manager
            .downloadAndStore(
              // We do not provide the version here
              libraryName,
              kTemporaryDirFixture
            )
            .pipe(Effect.map(Option.getOrThrow))
            .pipe(Effect.provide(LoggerTest))
        );

        expect(location).to.equal(sameLocation);
        expect(fs.readdirSync(expectedLocation)).to.deep.equal([
          "file1.js",
          "folder"
        ]);
      });
    });
  });

  describe("When creating the tarball on the local filesystem", () => {
    describe("When at least one of the steps of the folder creation from the tarball fails", () => {
      test("should ensure that nothing is added in the store if nothing is added in the local filesystem state", async () => {
        const manager = makeTarballManager({
          fetchPackageInformation: () =>
            Effect.succeed({
              id: "0.1.79",
              tarballUrl: "url-of-the-tarball"
            }),
          downloadTarball: () => Effect.succeed(Option.none())
        });
        const libraryName = "fs-tree-structure";

        const location = await Effect.runPromise(
          manager
            .downloadAndStore(libraryName, kTemporaryDirFixture)
            .pipe(Effect.provide(LoggerTest))
        );

        expect(location._tag).to.equal("None");
        expect(manager.store.size).to.equal(0);
      });
    });
  });
});
