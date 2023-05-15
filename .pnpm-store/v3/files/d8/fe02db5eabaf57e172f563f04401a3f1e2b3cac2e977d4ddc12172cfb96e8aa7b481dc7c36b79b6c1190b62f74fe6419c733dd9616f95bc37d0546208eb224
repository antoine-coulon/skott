// -------------------------------------------------------------------------------------
// ReadonlyArray
// -------------------------------------------------------------------------------------
/** @internal */
export const empty = [];
/** @internal */
export const fromIterable = collection => Array.isArray(collection) ? collection : Array.from(collection);
// -------------------------------------------------------------------------------------
// NonEmptyReadonlyArray
// -------------------------------------------------------------------------------------
/** @internal */
export const isNonEmpty = as => as.length > 0;
/** @internal */
export const head = as => as[0];
/** @internal */
export const tail = as => as.slice(1);
// -------------------------------------------------------------------------------------
// Record
// -------------------------------------------------------------------------------------
/** @internal */
export const Do = {};
/** @internal */
export const has = Object.prototype.hasOwnProperty;
/** @internal */
export const toNonEmptyArray = a => [a];
/** @internal */
export const fromNonEmptyReadonlyArray = as => [head(as), ...tail(as)];
//# sourceMappingURL=Common.mjs.map