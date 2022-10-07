/* eslint-disable no-sync */
import * as fs from "node:fs";
import * as path from "node:path";

import { expect } from "chai";

import { Fetcher, PackageInformation, TarballManager } from ".";

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
});
