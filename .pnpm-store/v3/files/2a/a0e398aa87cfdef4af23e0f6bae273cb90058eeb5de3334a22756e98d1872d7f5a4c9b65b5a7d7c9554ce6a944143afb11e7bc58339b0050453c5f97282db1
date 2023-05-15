import { getStateM } from './StateT';
import { identity } from './Identity';
import { pipeable } from './pipeable';
var T = getStateM(identity);
/**
 * @since 2.0.0
 */
export var URI = 'State';
/* tslint:enable:readonly-array */
/**
 * Run a computation in the `State` monad, discarding the final state
 *
 * @since 2.0.0
 */
export var evalState = T.evalState;
/**
 * Run a computation in the `State` monad discarding the result
 *
 * @since 2.0.0
 */
export var execState = T.execState;
/**
 * Get the current state
 *
 * @since 2.0.0
 */
export var get = T.get;
/**
 * Set the state
 *
 * @since 2.0.0
 */
export var put = T.put;
/**
 * Modify the state by applying a function to the current state
 *
 * @since 2.0.0
 */
export var modify = T.modify;
/**
 * Get a value which depends on the current state
 *
 * @since 2.0.0
 */
export var gets = T.gets;
/**
 * @since 2.0.0
 */
export var of = T.of;
/**
 * @since 2.0.0
 */
export var state = {
    URI: URI,
    map: T.map,
    of: of,
    ap: T.ap,
    chain: T.chain
};
var _a = pipeable(state), ap = _a.ap, apFirst = _a.apFirst, apSecond = _a.apSecond, chain = _a.chain, chainFirst = _a.chainFirst, flatten = _a.flatten, map = _a.map;
export { 
/**
 * @since 2.0.0
 */
ap, 
/**
 * @since 2.0.0
 */
apFirst, 
/**
 * @since 2.0.0
 */
apSecond, 
/**
 * @since 2.0.0
 */
chain, 
/**
 * @since 2.0.0
 */
chainFirst, 
/**
 * @since 2.0.0
 */
flatten, 
/**
 * @since 2.0.0
 */
map };
