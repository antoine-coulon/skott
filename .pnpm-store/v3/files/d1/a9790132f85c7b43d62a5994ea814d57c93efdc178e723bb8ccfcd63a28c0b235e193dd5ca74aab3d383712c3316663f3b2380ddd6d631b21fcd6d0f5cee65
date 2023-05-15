"use strict";

// Require Node.js Dependencies
const { join } = require("path");
const { existsSync } = require("fs");

// CONSTANTS
const kRootRulesDir = join(__dirname, "src");

const rules = {
  strict: ["error", "global"]
};

const useTypeScript = existsSync(join(process.cwd(), "tsconfig.json"));
const parser = useTypeScript ? "@typescript-eslint/parser" : "@babel/eslint-parser";
const parserOptions = {
  ecmaVersion: 2020,
  sourceType: useTypeScript ? "module" : "script"
};

const extendedRules = [
  join(kRootRulesDir, "possible-errors.js"),
  join(kRootRulesDir, "best-practices.js"),
  join(kRootRulesDir, "node.js"),
  join(kRootRulesDir, "styles.js"),
  join(kRootRulesDir, "ecmascript6.js")
];
if (useTypeScript) {
  extendedRules.push(join(kRootRulesDir, "typescript.js"));
}

const extendsRequired = [...extendedRules.map(require.resolve)];
if (useTypeScript) {
  extendsRequired.unshift("plugin:@typescript-eslint/recommended");
}

module.exports = {
  extends: extendsRequired,
  parser,
  parserOptions,
  rules
}
