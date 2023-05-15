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
import { identity } from './Identity';
import { pipeable } from './pipeable';
import { getWriterM } from './WriterT';
var T = getWriterM(identity);
/**
 * @since 2.0.0
 */
export var URI = 'Writer';
// tslint:enable:readonly-array
/**
 * @since 2.0.0
 */
export var evalWriter = T.evalWriter;
/**
 * @since 2.0.0
 */
export var execWriter = T.execWriter;
/**
 * Appends a value to the accumulator
 *
 * @since 2.0.0
 */
export var tell = T.tell;
// tslint:disable:readonly-array
/**
 * Modifies the result to include the changes to the accumulator
 *
 * @since 2.0.0
 */
export var listen = T.listen;
// tslint:enable:readonly-array
// tslint:disable:readonly-array
/**
 * Applies the returned function to the accumulator
 *
 * @since 2.0.0
 */
export var pass = T.pass;
// tslint:enable:readonly-array
// tslint:disable:readonly-array
/**
 * Projects a value from modifications made to the accumulator during an action
 *
 * @since 2.0.0
 */
export function listens(f) {
    return function (fa) { return T.listens(fa, f); };
}
// tslint:enable:readonly-array
/**
 * Modify the final accumulator value by applying a function
 *
 * @since 2.0.0
 */
export function censor(f) {
    return function (fa) { return T.censor(fa, f); };
}
/**
 * @since 2.0.0
 */
export function getMonad(M) {
    return __assign({ URI: URI }, T.getMonad(M));
}
/**
 * @since 2.0.0
 */
export var writer = {
    URI: URI,
    map: T.map
};
var map = pipeable(writer).map;
export { 
/**
 * @since 2.0.0
 */
map };
