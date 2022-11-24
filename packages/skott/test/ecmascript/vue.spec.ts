/* eslint-disable max-lines */

import { expect } from "chai";

import {
  buildSkottProjectUsingInMemoryFileExplorer,
  fakeNodeBody,
  mountFakeFileSystem
} from "./shared";

describe("When traversing a Vue project", () => {
  // describe("When the file has a vue import declarations", () => {

  // });
  describe("When template has require declaration", () => {
    mountFakeFileSystem({
      "main.js": "import App from './App.vue';",
      "App.vue": `
        <template><img src="./img.png" :data-src="require('./img.png')"/></template>
        <script>
        import utils from './utils.js';
        export default {}
        </script>
      `,
      "img.png": "",
      "utils.js": "export const utils = {}"
    });
    it("should be able to collect imgs from template", async () => {
      const skottProject = await buildSkottProjectUsingInMemoryFileExplorer({
        fileExtensions: [".js", ".vue", ".png"],
        entrypoint: "main.js"
      });
      console.log(skottProject);
      expect(skottProject).to.be.deep.equal({
        graph: {
          "main.js": {
            id: "main.js",
            adjacentTo: ["App.vue"],
            body: fakeNodeBody
          },
          "App.vue": {
            id: "App.vue",
            adjacentTo: ["utils.js", "img.png"],
            body: fakeNodeBody
          },
          "utils.js": {
            id: "utils.js",
            adjacentTo: [],
            body: fakeNodeBody
          },
          "img.png": {
            id: "img.png",
            adjacentTo: [],
            body: fakeNodeBody
          }
        },
        files: ["main.js", "App.vue", "utils.js", "img.png"],
        circularDependencies: [],
        hasCircularDependencies: false,
        leaves: ["utils.js", "img.png"]
      });
    });
  });
});
