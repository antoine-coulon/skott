import { expect } from "chai";

import {
  buildSkottProjectUsingInMemoryFileExplorer,
  fakeNodeBody,
  mountFakeFileSystem
} from "./shared";

describe("When dealing with ECMAScript standards agnostic of TypeScript and JavaScript", () => {
  describe("When specifying a dirname while providing the entrypoint", () => {
    describe("When the full dirname must be ignored from node paths", () => {
      it("should remove by default the dirname from all relative paths of the graph", async () => {
        mountFakeFileSystem({
          "my-app-folder/my-project/index.js": `
            import { createHtml } './apps/dashboard/index.js';
            render(createHtml());
          `,
          "my-app-folder/my-project/libs/temporal/index.js": `
            export const compareAsc = (d1, d2) => {};
          `,
          "my-app-folder/my-project/apps/dashboard/index.js": `
            import { compareAsc } from "../../libs/temporal/index.js";
            
            export const createHtml = () => "<div> Date comparison </div>";
          `
        });

        const skottProject = await buildSkottProjectUsingInMemoryFileExplorer(
          "my-app-folder/my-project/index.js"
        );

        expect(skottProject).to.be.deep.equal({
          graph: {
            "index.js": {
              adjacentTo: ["apps/dashboard/index.js"],
              id: "index.js",
              body: fakeNodeBody
            },
            "apps/dashboard/index.js": {
              adjacentTo: ["libs/temporal/index.js"],
              id: "apps/dashboard/index.js",
              body: fakeNodeBody
            },
            "libs/temporal/index.js": {
              adjacentTo: [],
              id: "libs/temporal/index.js",
              body: fakeNodeBody
            }
          },
          files: [
            "index.js",
            "apps/dashboard/index.js",
            "libs/temporal/index.js"
          ],
          circularDependencies: [],
          hasCircularDependencies: false,
          leaves: ["libs/temporal/index.js"]
        });
      });

      describe("When the provided entrypoint is not at the top-level of the project", () => {
        it("should include relative segments for files at an higher level than the entrypoint", async () => {
          mountFakeFileSystem({
            "libs/lib1/index.js": `
                import { something } from "../lib2/feature/index.js";
            `,
            "libs/lib2/feature/index.js": `
              import * as util from "../../util.js";
              export const something = () => {};
            `,
            "libs/util.js": ``
          });

          const skottProject = await buildSkottProjectUsingInMemoryFileExplorer(
            "libs/lib1/index.js"
          );

          expect(skottProject).to.be.deep.equal({
            graph: {
              "index.js": {
                adjacentTo: ["../lib2/feature/index.js"],
                id: "index.js",
                body: fakeNodeBody
              },
              "../lib2/feature/index.js": {
                adjacentTo: ["../util.js"],
                id: "../lib2/feature/index.js",
                body: fakeNodeBody
              },
              "../util.js": {
                adjacentTo: [],
                id: "../util.js",
                body: fakeNodeBody
              }
            },
            files: ["index.js", "../lib2/feature/index.js", "../util.js"],
            circularDependencies: [],
            hasCircularDependencies: false,
            leaves: ["../util.js"]
          });
        });
      });
    });

    describe("When the full dirname must be included in nodes file paths", () => {
      it("should include the relative dirname in every path of the graph", async () => {
        mountFakeFileSystem({
          "my-app-folder/my-project/index.js": `
          import { createHtml } '../apps/dashboard/index.js';
          render(createHtml());
        `,
          "my-app-folder/my-project/libs/temporal/index.js": `
          export const compareAsc = (d1, d2) => {};
        `,
          "my-app-folder/apps/dashboard/index.js": `
            import { compareAsc } from "../../my-project/libs/temporal/index.js";
            
            export const createHtml = () => "<div> Date comparison </div>";
        `
        });

        const skottProject = await buildSkottProjectUsingInMemoryFileExplorer(
          "my-app-folder/my-project/index.js",
          true
        );

        expect(skottProject).to.be.deep.equal({
          graph: {
            "my-app-folder/my-project/index.js": {
              adjacentTo: ["my-app-folder/apps/dashboard/index.js"],
              id: "my-app-folder/my-project/index.js",
              body: fakeNodeBody
            },
            "my-app-folder/apps/dashboard/index.js": {
              adjacentTo: ["my-app-folder/my-project/libs/temporal/index.js"],
              id: "my-app-folder/apps/dashboard/index.js",
              body: fakeNodeBody
            },
            "my-app-folder/my-project/libs/temporal/index.js": {
              adjacentTo: [],
              id: "my-app-folder/my-project/libs/temporal/index.js",
              body: fakeNodeBody
            }
          },
          files: [
            "my-app-folder/my-project/index.js",
            "my-app-folder/apps/dashboard/index.js",
            "my-app-folder/my-project/libs/temporal/index.js"
          ],
          circularDependencies: [],
          hasCircularDependencies: false,
          leaves: ["my-app-folder/my-project/libs/temporal/index.js"]
        });
      });
    });
  });

  describe("When some looked up file does not exist", () => {
    it("should ignore the file not found/readable and keep looking up for other files", async () => {
      mountFakeFileSystem({
        "index.js": `
              // exists
              import { foo } from './foo.js';
  
              // does not exist or can't be reached
              import { bar } from './bar.js';
  
              // exists
              import { baz } from './baz.js';
            `,
        "foo.js": "",
        "baz.js": ""
      });

      const { files, graph } = await buildSkottProjectUsingInMemoryFileExplorer(
        "index.js"
      );

      expect(graph).to.deep.equal({
        "index.js": {
          id: "index.js",
          adjacentTo: ["foo.js", "baz.js"],
          body: fakeNodeBody
        },
        "foo.js": {
          id: "foo.js",
          adjacentTo: [],
          body: fakeNodeBody
        },
        "baz.js": {
          id: "baz.js",
          adjacentTo: [],
          body: fakeNodeBody
        }
      });
      expect(files).to.be.deep.equal(["index.js", "foo.js", "baz.js"]);
    });
  });

  describe("When the file contains some imports that are not JavaScript modules", () => {
    it("should process only with JavaScript modules", async () => {
      mountFakeFileSystem({
        "index.js": `
              const foo = require("./javascript-module.js");
              const staticFile = require("./db.json");
              const binaryModule = require("./binary.node");
            `,
        "javascript-module.js": "console.log('Hello, world!');",
        "binaryModule.node": "",
        "staticFile.json": "{}"
      });

      const skottProject = await buildSkottProjectUsingInMemoryFileExplorer(
        "index.js"
      );

      expect(skottProject.files).to.deep.equal([
        "index.js",
        "javascript-module.js"
      ]);
    });
  });

  describe("When extracting dynamic import expressions", () => {
    describe("When importing a local module", () => {
      it("should build the graph with two nodes and one link", async () => {
        mountFakeFileSystem({
          "index.js": `
                async function main() {
                  const foo = await import("./src/foo.js");
                  console.log(foo.foo.domeSomething())
                }
              `,
          "src/foo.js": `
                export const foo = { doSomething: () => 'Hello, world!' };
              `
        });

        const skottProject = await buildSkottProjectUsingInMemoryFileExplorer(
          "index.js"
        );

        expect(skottProject).to.be.deep.equal({
          graph: {
            "index.js": {
              adjacentTo: ["src/foo.js"],
              id: "index.js",
              body: fakeNodeBody
            },
            "src/foo.js": {
              adjacentTo: [],
              id: "src/foo.js",
              body: fakeNodeBody
            }
          },
          files: ["index.js", "src/foo.js"],
          circularDependencies: [],
          hasCircularDependencies: false,
          leaves: ["src/foo.js"]
        });
      });
    });
  });
});
