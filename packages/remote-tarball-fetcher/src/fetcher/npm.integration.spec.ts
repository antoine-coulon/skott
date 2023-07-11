import { Readable } from "node:stream";

import { expect } from "chai";

import { npmFetcher } from "./npm.js";

describe("npm tarball fetcher", () => {
  describe("When fetching package information from the npm registry", () => {
    describe("When no version is provided", () => {
      it("should fetch both the latest version and the tarball of the latest version", async () => {
        const fetcher = npmFetcher;

        const packageInformation = await fetcher.fetchPackageInformation(
          "openforker"
        );

        expect(packageInformation).to.deep.equal({
          latestVersion: "1.0.7",
          tarballUrl:
            "https://registry.npmjs.org/openforker/-/openforker-1.0.7.tgz"
        });

        const tarball = await fetcher.downloadTarball(
          packageInformation.tarballUrl
        );

        expect(tarball).to.be.an.instanceOf(Readable);
      });
    });

    describe("When a version is provided", () => {
      it("should fetch both the latest version and the tarball from the specified version", async () => {
        const fetcher = npmFetcher;

        const packageInformation = await fetcher.fetchPackageInformation(
          "openforker@1.0.5"
        );

        expect(packageInformation).to.deep.equal({
          latestVersion: "1.0.7",
          tarballUrl:
            "https://registry.npmjs.org/openforker/-/openforker-1.0.5.tgz"
        });

        const tarball = await fetcher.downloadTarball(
          packageInformation.tarballUrl
        );
        expect(tarball).to.be.an.instanceOf(Readable);
      });
    });
  });
});
