"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPackageDirectory = exports.tmpdir = void 0;
const fs_1 = require("fs");
const path_1 = require("path");
const os_1 = require("os");
/**
 * Gets the temporary directory, either from the environmental variable
 * `PUPPETEER_TMP_DIR` or the `os.tmpdir`.
 *
 * @returns The temporary directory path.
 *
 * @internal
 */
const tmpdir = () => {
    return process.env['PUPPETEER_TMP_DIR'] || (0, os_1.tmpdir)();
};
exports.tmpdir = tmpdir;
/**
 * @internal
 */
const getPackageDirectory = (from) => {
    let found = (0, fs_1.existsSync)((0, path_1.join)(from, 'package.json'));
    const root = (0, path_1.parse)(from).root;
    while (!found) {
        if (from === root) {
            throw new Error('Cannot find package directory');
        }
        from = (0, path_1.dirname)(from);
        found = (0, fs_1.existsSync)((0, path_1.join)(from, 'package.json'));
    }
    return from;
};
exports.getPackageDirectory = getPackageDirectory;
//# sourceMappingURL=util.js.map