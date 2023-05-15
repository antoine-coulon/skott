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
var pipeable_1 = require("./pipeable");
var Task_1 = require("./Task");
var TH = require("./These");
var TheseT_1 = require("./TheseT");
var T = TheseT_1.getTheseM(Task_1.task);
/**
 * @since 2.4.0
 */
exports.URI = 'TaskThese';
/**
 * @since 2.4.0
 */
exports.left = T.left;
/**
 * @since 2.4.0
 */
exports.right = T.right;
/**
 * @since 2.4.0
 */
exports.both = T.both;
/**
 * @since 2.4.0
 */
function rightIO(ma) {
    return exports.rightTask(Task_1.task.fromIO(ma));
}
exports.rightIO = rightIO;
/**
 * @since 2.4.0
 */
function leftIO(me) {
    return exports.leftTask(Task_1.task.fromIO(me));
}
exports.leftIO = leftIO;
/**
 * @since 2.4.0
 */
exports.leftTask = T.leftM;
/**
 * @since 2.4.0
 */
exports.rightTask = T.rightM;
/**
 * @since 2.4.0
 */
exports.fromIOEither = Task_1.task.fromIO;
/**
 * @since 2.4.0
 */
function fold(onLeft, onRight, onBoth) {
    return function (fa) { return T.fold(fa, onLeft, onRight, onBoth); };
}
exports.fold = fold;
/**
 * @since 2.4.0
 */
exports.swap = T.swap;
/**
 * @since 2.4.0
 */
function getSemigroup(SE, SA) {
    return Task_1.getSemigroup(TH.getSemigroup(SE, SA));
}
exports.getSemigroup = getSemigroup;
/**
 * @since 2.4.0
 */
function getMonad(S) {
    return __assign(__assign({ URI: exports.URI }, T.getMonad(S)), { fromIO: rightIO, fromTask: exports.rightTask });
}
exports.getMonad = getMonad;
/* tslint:disable:readonly-array */
/**
 * @since 2.4.0
 */
function toTuple(e, a) {
    return function (fa) { return T.toTuple(fa, e, a); };
}
exports.toTuple = toTuple;
/* tslint:enable:readonly-array */
/**
 * @since 2.4.0
 */
exports.taskThese = {
    URI: exports.URI,
    map: T.map,
    bimap: T.bimap,
    mapLeft: T.mapLeft
};
var _a = pipeable_1.pipeable(exports.taskThese), bimap = _a.bimap, map = _a.map, mapLeft = _a.mapLeft;
exports.bimap = bimap;
exports.map = map;
exports.mapLeft = mapLeft;
