import { expect, describe, test } from "vitest";

import { makeTreeStructure } from "./index.js";

describe("Filesystem tree structure maker", () => {
  describe("When dealing with absolute paths", () => {
    describe("When there is one file with no base directory", () => {
      test("should make a flat tree structure", () => {
        const filePaths = ["index.js"];

        expect(makeTreeStructure(filePaths)).to.deep.equal({
          "index.js": {}
        });
      });
    });

    describe("When files are not located in the same parent directories", () => {
      test("should make a tree structure from raw file paths", () => {
        const filePaths = ["lib/feature/index.js", "apps/main.js"];

        expect(makeTreeStructure(filePaths)).to.deep.equal({
          lib: {
            feature: {
              "index.js": {}
            }
          },
          apps: {
            "main.js": {}
          }
        });
      });
    });

    describe("When files are located in the same exact parent directories", () => {
      test("should make a tree structure with common parents", () => {
        const filePaths = ["lib/feature/index.js", "lib/feature/util.js"];

        expect(makeTreeStructure(filePaths)).to.deep.equal({
          lib: {
            feature: {
              "index.js": {},
              "util.js": {}
            }
          }
        });
      });
    });

    describe("When files are only sharing a subset of parent directories", () => {
      test("should nest them in the same leaves until they diverge", () => {
        const filePaths = ["lib/feature/index.js", "lib/feature/util/index.js"];

        expect(makeTreeStructure(filePaths)).to.deep.equal({
          lib: {
            feature: {
              "index.js": {},
              util: {
                "index.js": {}
              }
            }
          }
        });
      });
    });
  });

  describe("When dealing with base directory names", () => {
    describe("When the directory name is the current working directory", () => {
      test("should trim the base directory segment", () => {
        const filePaths = [
          "./lib/feature/index.js",
          "lib/util.js",
          "../something.js",
          "../../something-faraway.js"
        ];

        expect(makeTreeStructure(filePaths)).to.deep.equal({
          lib: {
            feature: {
              "index.js": {}
            },
            "util.js": {}
          },
          "..": {
            "something.js": {},
            "..": {
              "something-faraway.js": {}
            }
          }
        });
      });
    });
  });

  describe("When using the default sorting by files and folders", () => {
    test("should sort folders before files", () => {
      const filePaths = [
        "./test/feature.js",
        "./index.js",
        "./root.js",
        "./sub-module/file.js",
        "./main.js"
      ];

      expect(
        Object.keys(makeTreeStructure(filePaths, { sort: true }))
      ).to.deep.equal(["sub-module", "test", "index.js", "main.js", "root.js"]);
    });

    test("should sort folders before files", () => {
      const filePaths = [
        "./test/feature.js",
        "./feature/some-module/index.js",
        "./feature/nested/index.js",
        "./feature/main.js",
        "./root.js",
        "./sub-module/nested/feature/file.js",
        "./main.js"
      ];

      const tree = makeTreeStructure(filePaths, { sort: true });

      const firstLevelKeys = Object.keys(tree);

      expect(firstLevelKeys).to.deep.equal([
        "sub-module",
        "feature",
        "test",
        "main.js",
        "root.js"
      ]);

      const featureKeys = Object.keys(tree.feature);

      expect(featureKeys).to.deep.equal(["nested", "some-module", "main.js"]);
    });
  });
});
