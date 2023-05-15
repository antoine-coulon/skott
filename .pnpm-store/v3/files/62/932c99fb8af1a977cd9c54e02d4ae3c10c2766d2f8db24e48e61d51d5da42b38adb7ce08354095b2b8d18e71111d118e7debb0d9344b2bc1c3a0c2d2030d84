/**
 * @since 2.0.0
 */
/**
 * @since 2.0.0
 */
export function identity(a) {
    return a;
}
/**
 * @since 2.0.0
 */
export var unsafeCoerce = identity;
/**
 * @since 2.0.0
 */
export function not(predicate) {
    return function (a) { return !predicate(a); };
}
/**
 * @since 2.0.0
 */
export function constant(a) {
    return function () { return a; };
}
/**
 * A thunk that returns always `true`
 *
 * @since 2.0.0
 */
export var constTrue = function () {
    return true;
};
/**
 * A thunk that returns always `false`
 *
 * @since 2.0.0
 */
export var constFalse = function () {
    return false;
};
/**
 * A thunk that returns always `null`
 *
 * @since 2.0.0
 */
export var constNull = function () {
    return null;
};
/**
 * A thunk that returns always `undefined`
 *
 * @since 2.0.0
 */
export var constUndefined = function () {
    return;
};
/**
 * A thunk that returns always `void`
 *
 * @since 2.0.0
 */
export var constVoid = function () {
    return;
};
/**
 * Flips the order of the arguments of a function of two arguments.
 *
 * @since 2.0.0
 */
export function flip(f) {
    return function (b, a) { return f(a, b); };
}
export function flow(ab, bc, cd, de, ef, fg, gh, hi, ij) {
    switch (arguments.length) {
        case 1:
            return ab;
        case 2:
            return function () {
                return bc(ab.apply(this, arguments));
            };
        case 3:
            return function () {
                return cd(bc(ab.apply(this, arguments)));
            };
        case 4:
            return function () {
                return de(cd(bc(ab.apply(this, arguments))));
            };
        case 5:
            return function () {
                return ef(de(cd(bc(ab.apply(this, arguments)))));
            };
        case 6:
            return function () {
                return fg(ef(de(cd(bc(ab.apply(this, arguments))))));
            };
        case 7:
            return function () {
                return gh(fg(ef(de(cd(bc(ab.apply(this, arguments)))))));
            };
        case 8:
            return function () {
                return hi(gh(fg(ef(de(cd(bc(ab.apply(this, arguments))))))));
            };
        case 9:
            return function () {
                return ij(hi(gh(fg(ef(de(cd(bc(ab.apply(this, arguments)))))))));
            };
    }
    return;
}
/**
 * @since 2.0.0
 */
export function tuple() {
    var t = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        t[_i] = arguments[_i];
    }
    return t;
}
/**
 * @since 2.0.0
 */
export function increment(n) {
    return n + 1;
}
/**
 * @since 2.0.0
 */
export function decrement(n) {
    return n - 1;
}
/**
 * @since 2.0.0
 */
export function absurd(_) {
    throw new Error('Called `absurd` function which should be uncallable');
}
/**
 * Creates a tupled version of this function: instead of `n` arguments, it accepts a single tuple argument.
 *
 * @example
 * import { tupled } from 'fp-ts/lib/function'
 *
 * const add = tupled((x: number, y: number): number => x + y)
 *
 * assert.strictEqual(add([1, 2]), 3)
 *
 * @since 2.4.0
 */
export function tupled(f) {
    return function (a) { return f.apply(void 0, a); };
}
/**
 * Inverse function of `tupled`
 *
 * @since 2.4.0
 */
export function untupled(f) {
    return function () {
        var a = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            a[_i] = arguments[_i];
        }
        return f(a);
    };
}
