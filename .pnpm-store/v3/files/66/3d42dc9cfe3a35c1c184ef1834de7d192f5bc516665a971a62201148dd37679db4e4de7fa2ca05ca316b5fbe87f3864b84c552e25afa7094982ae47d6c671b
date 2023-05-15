"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var Identity_1 = require("./Identity");
var pipeable_1 = require("./pipeable");
var WriterT_1 = require("./WriterT");
var T = WriterT_1.getWriterM(Identity_1.identity);
/**
 * @since 2.0.0
 */
exports.URI = 'Writer';
// tslint:enable:readonly-array
/**
 * @since 2.0.0
 */
exports.evalWriter = T.evalWriter;
/**
 * @since 2.0.0
 */
exports.execWriter = T.execWriter;
/**
 * Appends a value to the accumulator
 *
 * @since 2.0.0
 */
exports.tell = T.tell;
// tslint:disable:readonly-array
/**
 * Modifies the result to include the changes to the accumulator
 *
 * @since 2.0.0
 */
exports.listen = T.listen;
// tslint:enable:readonly-array
// tslint:disable:readonly-array
/**
 * Applies the returned function to the accumulator
 *
 * @since 2.0.0
 */
exports.pass = T.pass;
// tslint:enable:readonly-array
// tslint:disable:readonly-array
/**
 * Projects a value from modifications made to the accumulator during an action
 *
 * @since 2.0.0
 */
function listens(f) {
    return function (fa) { return T.listens(fa, f); };
}
exports.listens = listens;
// tslint:enable:readonly-array
/**
 * Modify the final accumulator value by applying a function
 *
 * @since 2.0.0
 */
function censor(f) {
    return function (fa) { return T.censor(fa, f); };
}
exports.censor = censor;
/**
 * @since 2.0.0
 */
function getMonad(M) {
    return __assign({ URI: exports.URI }, T.getMonad(M));
}
exports.getMonad = getMonad;
/**
 * @since 2.0.0
 */
exports.writer = {
    URI: exports.URI,
    map: T.map
};
var map = pipeable_1.pipeable(exports.writer).map;
exports.map = map;
