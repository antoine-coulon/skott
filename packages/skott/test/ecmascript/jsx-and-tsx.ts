import { describe, expect, it } from "vitest";

import {
  buildSkottProjectUsingInMemoryFileExplorer,
  fakeNodeBody,
  mountFakeFileSystem
} from "../shared";

export function makeTestSuiteForJsxOrTsx(rawLanguage: "ts" | "js"): void {
  const suiteLanguageLabel = rawLanguage === "ts" ? "TSX" : "JSX";
  const jsxOrTsx = rawLanguage === "ts" ? "tsx" : "jsx";

  describe(`When the project uses ${suiteLanguageLabel} files`, () => {
    describe(`When the entrypoint is a ${suiteLanguageLabel} file`, () => {
      it("should extract imports declarations from it", async () => {
        mountFakeFileSystem({
          [`index.${jsxOrTsx}`]: `
                  import { foo } from "./lib";
    
                  const a = (
                    <div>
                      {["foo", "bar"].map(function (i) {
                        return <span>{i / 2}</span>;
                      })}
                    </div>
                  );
              `,
          [`lib.${rawLanguage}`]: `
                  export const foo = { doSomething: () => 'Hello, world!' };
              `
        });

        const { graph } = await buildSkottProjectUsingInMemoryFileExplorer({
          entrypoint: `index.${jsxOrTsx}`
        });

        expect(graph).to.be.deep.equal({
          [`index.${jsxOrTsx}`]: {
            adjacentTo: [`lib.${rawLanguage}`],
            id: `index.${jsxOrTsx}`,
            body: fakeNodeBody
          },
          [`lib.${rawLanguage}`]: {
            adjacentTo: [],
            id: `lib.${rawLanguage}`,
            body: fakeNodeBody
          }
        });
      });
    });

    describe(`When there are both index.${rawLanguage} and index.${jsxOrTsx}`, () => {
      describe("When implicitely refering to the index located in folder", () => {
        it(`should resolve to the index.${rawLanguage}`, async () => {
          mountFakeFileSystem({
            [`index.${rawLanguage}`]: `
                    import "./lib";
                `,
            [`lib/index.${jsxOrTsx}`]: `
                    import { foo } from "./lib";
      
                    const a = (
                      <div>
                        Hello World
                      </div>
                    );
                `,
            [`lib/foo.${rawLanguage}`]: ``,
            [`lib/index.${rawLanguage}`]: `
                    import "./bar";  
                    export const foo = { doSomething: () => 'Hello, world!' };
                `,
            [`lib/bar.${rawLanguage}`]: ``
          });

          const { graph } = await buildSkottProjectUsingInMemoryFileExplorer({
            entrypoint: `index.${rawLanguage}`
          });

          expect(graph).to.be.deep.equal({
            [`index.${rawLanguage}`]: {
              adjacentTo: [`lib/index.${rawLanguage}`],
              id: `index.${rawLanguage}`,
              body: fakeNodeBody
            },
            [`lib/index.${rawLanguage}`]: {
              adjacentTo: [`lib/bar.${rawLanguage}`],
              id: `lib/index.${rawLanguage}`,
              body: fakeNodeBody
            },
            [`lib/bar.${rawLanguage}`]: {
              adjacentTo: [],
              id: `lib/bar.${rawLanguage}`,
              body: fakeNodeBody
            }
          });
        });
      });

      describe(`When explicitely refering to a file that both exist with .${rawLanguage} or .${jsxOrTsx} extension`, () => {
        it(`should resolve to the index.${rawLanguage}`, async () => {
          mountFakeFileSystem({
            [`index.${rawLanguage}`]: `
                    import "./lib/component";
                    import "./lib/index";
                `,
            [`lib/component.${jsxOrTsx}`]: ``,
            [`lib/component.${rawLanguage}`]: `
                    const a = (
                      <div>
                        Hello
                      </div>
                    );
                `,
            [`lib/index.${jsxOrTsx}`]: `
                    import { foo } from "./lib";
      
                    const a = (
                      <div>
                        {["foo", "bar"].map(function (i) {
                          return <span>{i / 2}</span>;
                        })}
                      </div>
                    );
                `,
            [`lib/foo.${rawLanguage}`]: ``,
            [`lib/index.${rawLanguage}`]: `
                    import "./bar";  
                    export const foo = { doSomething: () => 'Hello, world!' };
                `,
            [`lib/bar.${rawLanguage}`]: ``
          });

          const { graph } = await buildSkottProjectUsingInMemoryFileExplorer({
            entrypoint: `index.${rawLanguage}`
          });

          expect(graph).to.be.deep.equal({
            [`index.${rawLanguage}`]: {
              adjacentTo: [
                `lib/component.${rawLanguage}`,
                `lib/index.${rawLanguage}`
              ],
              id: `index.${rawLanguage}`,
              body: fakeNodeBody
            },
            [`lib/index.${rawLanguage}`]: {
              adjacentTo: [`lib/bar.${rawLanguage}`],
              id: `lib/index.${rawLanguage}`,
              body: fakeNodeBody
            },
            [`lib/bar.${rawLanguage}`]: {
              adjacentTo: [],
              id: `lib/bar.${rawLanguage}`,
              body: fakeNodeBody
            },
            [`lib/component.${rawLanguage}`]: {
              adjacentTo: [],
              id: `lib/component.${rawLanguage}`,
              body: fakeNodeBody
            }
          });
        });
      });
    });
  });

  describe("When implicetly refering to a TSX or JSX module", () => {
    it("should resolve the module", async () => {
      mountFakeFileSystem({
        [`index.${rawLanguage}`]: `
          import "./component_1";
          import "./component_2.${jsxOrTsx}";
        `,
        [`component_1.${jsxOrTsx}`]: `
          export default function Component() {
            return <div>Hello World</div>;
          }
        `,
        [`component_2.${jsxOrTsx}`]: `
          export default function Component() {
            return <div>Hello World</div>;
          }
        `
      });

      const { graph } = await buildSkottProjectUsingInMemoryFileExplorer({
        entrypoint: `index.${rawLanguage}`
      });

      expect(graph).to.be.deep.equal({
        [`index.${rawLanguage}`]: {
          adjacentTo: [`component_1.${jsxOrTsx}`, `component_2.${jsxOrTsx}`],
          id: `index.${rawLanguage}`,
          body: fakeNodeBody
        },
        [`component_1.${jsxOrTsx}`]: {
          adjacentTo: [],
          id: `component_1.${jsxOrTsx}`,
          body: fakeNodeBody
        },
        [`component_2.${jsxOrTsx}`]: {
          adjacentTo: [],
          id: `component_2.${jsxOrTsx}`,
          body: fakeNodeBody
        }
      });
    });
  });
}

describe("When some TypeScript code is not TSX compliant", () => {
  it("should be able to parse the script disabling the jsx feature", async () => {
    const fileThatCanNotBeParsedAsTSX = `
      export const unparsableTSXFunction = async <T>(
        x: T
      ) => {}
      
      await import("./something");
    `;

    mountFakeFileSystem({
      "index.ts": fileThatCanNotBeParsedAsTSX,
      "something.ts": ``
    });

    const { graph } = await buildSkottProjectUsingInMemoryFileExplorer({
      entrypoint: "index.ts"
    });

    expect(graph).to.deep.equal({
      "index.ts": {
        id: "index.ts",
        adjacentTo: ["something.ts"],
        body: fakeNodeBody
      },
      "something.ts": {
        id: "something.ts",
        adjacentTo: [],
        body: fakeNodeBody
      }
    });
  });
});
