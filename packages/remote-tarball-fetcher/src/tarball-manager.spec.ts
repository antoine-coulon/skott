/* eslint-disable no-sync */
import * as fs from "node:fs";
import * as path from "node:path";

import { expect } from "chai";

import { Fetcher, PackageInformation } from "./fetcher/index.js";
import { TarballManager } from "./tarball-manager.js";

const kTemporaryDirFixture = path.join(process.cwd(), "fixture");
// sample-project contains two dummy files
const kTarGzFixture = path.join(kTemporaryDirFixture, "project.tgz");

function makeInMemoryFetcher({
  latestVersion,
  tarballUrl
}: PackageInformation): Fetcher {
  const fetcher: Fetcher = {
    fetchPackageInformation: async () => {
      return {
        latestVersion,
        tarballUrl
      };
    },
    downloadTarball: () => fs.createReadStream(kTarGzFixture)
  };

  return fetcher;
}

function makeTarballManager(fetcher: Fetcher): TarballManager {
  return new TarballManager(fetcher);
}

describe("Remote Tarball Fetcher", () => {
  afterEach(() => {
    fs.rmdirSync(path.join(kTemporaryDirFixture, "skott_store"), {
      recursive: true
    });
  });
  describe("When fetching a package for the first time", () => {
    describe("When using the remote npm registry", () => {
      describe("When no semver is specified", () => {
        it("should download the latest version of the tarball and reference it in the store", async () => {
          const manager = makeTarballManager(
            makeInMemoryFetcher({
              latestVersion: "2.0.0",
              tarballUrl: "https://location-of-the-thing-skott-2.0.0.tgz"
            })
          );
          const libraryName = "fs-tree-structure";
          const libraryNameWithLatestVersion = `${libraryName}@2.0.0`;
          const expectedLocation = path.join(
            kTemporaryDirFixture,
            `skott_store`,
            libraryNameWithLatestVersion
          );

          const location = await manager.downloadAndStore(
            libraryName,
            kTemporaryDirFixture
          );

          try {
            expect(location).to.equal(expectedLocation);
            expect([...manager.store.entries()]).to.deep.equal([
              [libraryNameWithLatestVersion, expectedLocation]
            ]);
            expect(fs.readdirSync(expectedLocation)).to.deep.equal([
              "file1.js",
              "folder"
            ]);
          } finally {
            // cleanup
            fs.rmSync(expectedLocation, { recursive: true });
          }
        });
      });

      describe("When a semver is specified", () => {
        describe("When the semver is valid", () => {
          it("should download the provided version of the tarball and reference it in the store", async () => {
            const manager = makeTarballManager(
              makeInMemoryFetcher({
                latestVersion: "3.0.0",
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

            const location = await manager.downloadAndStore(
              libraryNameWithSpecifiedVersion,
              kTemporaryDirFixture
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
              fs.rmSync(expectedLocation, { recursive: true });
            }
          });
        });
      });
    });
  });

  describe("When downloading a same package more than once", () => {
    describe("When using the remote npm registry for which any tarball is frozen for a published version", () => {
      describe("When the package version is specified", () => {
        it("should directly use the locally stored package using the provided version", async () => {
          const packageInformation = {
            latestVersion: "3.0.0",
            tarballUrl: "https://location-of-the-package-2.0.0.tgz"
          };

          const manager = makeTarballManager(
            makeInMemoryFetcher(packageInformation)
          );
          const libraryName = "digraph-js";
          const libraryNameWithSpecifiedVersion = `${libraryName}@0.4.1`;
          const expectedLocation = path.join(
            kTemporaryDirFixture,
            `skott_store`,
            libraryNameWithSpecifiedVersion
          );

          const location = await manager.downloadAndStore(
            libraryNameWithSpecifiedVersion,
            kTemporaryDirFixture
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

          const sameLocation = await manager.downloadAndStore(
            libraryNameWithSpecifiedVersion,
            kTemporaryDirFixture
          );

          expect(location).to.equal(sameLocation);
          expect(fs.readdirSync(expectedLocation)).to.deep.equal([
            "file1.js",
            "folder"
          ]);
        });
      });

      describe("When the package version is not specified", () => {
        it("should only require the latest version to be fetched then use the locally stored package", async () => {
          const packageInformation = {
            latestVersion: "8.1.0",
            tarballUrl: "https://location-of-the-package-8.1.0.tgz"
          };

          const manager = makeTarballManager(
            makeInMemoryFetcher(packageInformation)
          );
          const libraryName = "openforker";
          const libraryNameWithSpecifiedVersion = `${libraryName}@8.1.0`;
          const expectedLocation = path.join(
            kTemporaryDirFixture,
            `skott_store`,
            libraryNameWithSpecifiedVersion
          );

          const location = await manager.downloadAndStore(
            libraryNameWithSpecifiedVersion,
            kTemporaryDirFixture
          );

          expect(location).to.equal(expectedLocation);

          const fetcherWithOnlyPackageInformationWorking: Fetcher = {
            fetchPackageInformation: async () => {
              return {
                latestVersion: packageInformation.latestVersion,
                tarballUrl: packageInformation.tarballUrl
              };
            },
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

          const sameLocation = await manager.downloadAndStore(
            // We do not provide the version here
            libraryName,
            kTemporaryDirFixture
          );

          expect(location).to.equal(sameLocation);
          expect(fs.readdirSync(expectedLocation)).to.deep.equal([
            "file1.js",
            "folder"
          ]);
        });
      });
    });
  });

  describe("When creating the tarball on the local filesystem", () => {
    describe("When at least one of the steps of the folder creation from the tarball fails", () => {
      it("should ensure that nothing is added in the store if nothing is added in the local filesystem state", async () => {
        const manager = makeTarballManager({
          fetchPackageInformation: async () => {
            return {
              latestVersion: "0.1.79",
              tarballUrl: "url-of-the-tarball"
            };
          },
          downloadTarball: () => {
            throw new Error("Something failed while downloading!");
          }
        });
        const libraryName = "fs-tree-structure";

        const location = await manager.downloadAndStore(
          libraryName,
          kTemporaryDirFixture
        );

        expect(location).to.equal(undefined);
        expect(manager.store.size).to.equal(0);
      });
    });
  });
});
