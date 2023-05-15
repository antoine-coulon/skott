"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var StateT_1 = require("./StateT");
var Identity_1 = require("./Identity");
var pipeable_1 = require("./pipeable");
var T = StateT_1.getStateM(Identity_1.identity);
/**
 * @since 2.0.0
 */
exports.URI = 'State';
/* tslint:enable:readonly-array */
/**
 * Run a computation in the `State` monad, discarding the final state
 *
 * @since 2.0.0
 */
exports.evalState = T.evalState;
/**
 * Run a computation in the `State` monad discarding the result
 *
 * @since 2.0.0
 */
exports.execState = T.execState;
/**
 * Get the current state
 *
 * @since 2.0.0
 */
exports.get = T.get;
/**
 * Set the state
 *
 * @since 2.0.0
 */
exports.put = T.put;
/**
 * Modify the state by applying a function to the current state
 *
 * @since 2.0.0
 */
exports.modify = T.modify;
/**
 * Get a value which depends on the current state
 *
 * @since 2.0.0
 */
exports.gets = T.gets;
/**
 * @since 2.0.0
 */
exports.of = T.of;
/**
 * @since 2.0.0
 */
exports.state = {
    URI: exports.URI,
    map: T.map,
    of: exports.of,
    ap: T.ap,
    chain: T.chain
};
var _a = pipeable_1.pipeable(exports.state), ap = _a.ap, apFirst = _a.apFirst, apSecond = _a.apSecond, chain = _a.chain, chainFirst = _a.chainFirst, flatten = _a.flatten, map = _a.map;
exports.ap = ap;
exports.apFirst = apFirst;
exports.apSecond = apSecond;
exports.chain = chain;
exports.chainFirst = chainFirst;
exports.flatten = flatten;
exports.map = map;
