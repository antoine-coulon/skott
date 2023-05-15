/**
 * @since 2.0.0
 */
export function sign(n) {
    return n <= -1 ? -1 : n >= 1 ? 1 : 0;
}
/**
 * @since 2.0.0
 */
export var eqOrdering = {
    equals: function (x, y) { return x === y; }
};
/**
 * Use `monoidOrdering` instead
 * @since 2.0.0
 * @deprecated
 */
export var semigroupOrdering = {
    concat: function (x, y) { return (x !== 0 ? x : y); }
};
/**
 * @since 2.4.0
 */
export var monoidOrdering = {
    // tslint:disable-next-line: deprecation
    concat: semigroupOrdering.concat,
    empty: 0
};
/**
 * @since 2.0.0
 */
export function invert(O) {
    switch (O) {
        case -1:
            return 1;
        case 1:
            return -1;
        default:
            return 0;
    }
}
