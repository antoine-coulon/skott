"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.toNonEmptyArray = exports.tail = exports.isNonEmpty = exports.head = exports.has = exports.fromNonEmptyReadonlyArray = exports.fromIterable = exports.empty = exports.Do = void 0;
// -------------------------------------------------------------------------------------
// ReadonlyArray
// -------------------------------------------------------------------------------------
/** @internal */
const empty = [];
/** @internal */
exports.empty = empty;
const fromIterable = collection => Array.isArray(collection) ? collection : Array.from(collection);
// -------------------------------------------------------------------------------------
// NonEmptyReadonlyArray
// -------------------------------------------------------------------------------------
/** @internal */
exports.fromIterable = fromIterable;
const isNonEmpty = as => as.length > 0;
/** @internal */
exports.isNonEmpty = isNonEmpty;
const head = as => as[0];
/** @internal */
exports.head = head;
const tail = as => as.slice(1);
// -------------------------------------------------------------------------------------
// Record
// -------------------------------------------------------------------------------------
/** @internal */
exports.tail = tail;
const Do = {};
/** @internal */
exports.Do = Do;
const has = Object.prototype.hasOwnProperty;
/** @internal */
exports.has = has;
const toNonEmptyArray = a => [a];
/** @internal */
exports.toNonEmptyArray = toNonEmptyArray;
const fromNonEmptyReadonlyArray = as => [head(as), ...tail(as)];
exports.fromNonEmptyReadonlyArray = fromNonEmptyReadonlyArray;
//# sourceMappingURL=Common.js.map