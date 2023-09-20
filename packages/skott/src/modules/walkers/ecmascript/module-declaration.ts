import { isCommonJSModuleImport } from "./javascript/cjs.js";

/**
 * Searching for named exports with no local variable binding such as
 * export { foo } from "./foo.js" as this export from another file is creating
 * a link between the two files.
 */
function isEcmaScriptModuleExport(estreeNode: any): boolean {
  /*
   * A named export with a local variable binding is not interesting as
   * it doesn't create a link between files:
   * const foo = () => {};
   * export { foo };
   * However, a named export with no local variable binding must be converted
   * as a link.
   */
  if (estreeNode.type === "ExportNamedDeclaration" && estreeNode.source) {
    return true;
  }

  // export * as foo from "./foo.js";
  // export * from "./foo.js"
  if (estreeNode.type === "ExportAllDeclaration") {
    return true;
  }

  return false;
}

function isEcmaScriptModuleImport(estreeNode: any): boolean {
  return estreeNode.type === "ImportDeclaration";
}

function isEcmaScriptModuleDeclaration(estreeNode: any): boolean {
  return (
    isEcmaScriptModuleImport(estreeNode) || isEcmaScriptModuleExport(estreeNode)
  );
}

function isTypeScriptImportType(node: any) {
  const hasOnlyTypeSpecifiers =
    node.specifiers &&
    node.specifiers.every(
      (_: { importKind: string }) => _.importKind === "type"
    );

  return node.importKind === "type" || hasOnlyTypeSpecifiers;
}

export function extractModuleDeclarations(
  node: any,
  moduleDeclarations: Set<string>,
  trackTypeOnlyDependencies = true
): void {
  if (isCommonJSModuleImport(node)) {
    /**
     * Just trying to track static paths from dynamic require statements such as
     * `require('./index.js')`. Consequently every "require(someVar)" will be
     * discarded.
     */
    const staticPath = node.arguments[0].value;
    if (staticPath) {
      moduleDeclarations.add(staticPath);
    }
  }

  if (isEcmaScriptModuleDeclaration(node)) {
    if (isTypeScriptImportType(node)) {
      if (trackTypeOnlyDependencies) {
        moduleDeclarations.add(node.source.value);
      }
    } else {
      moduleDeclarations.add(node.source.value);
    }
  }

  if (node.type === "ImportExpression") {
    const staticLiteral = node.source.value;
    if (staticLiteral) {
      moduleDeclarations.add(staticLiteral);

      return;
    }

    const isTemplateLiteral = node.source.type === "TemplateLiteral";
    if (isTemplateLiteral) {
      const isStaticTemplateLiteral = node.source.quasis.length === 1;
      if (isStaticTemplateLiteral) {
        moduleDeclarations.add(node.source.quasis[0].value.raw);
      }
    }
  }
}
