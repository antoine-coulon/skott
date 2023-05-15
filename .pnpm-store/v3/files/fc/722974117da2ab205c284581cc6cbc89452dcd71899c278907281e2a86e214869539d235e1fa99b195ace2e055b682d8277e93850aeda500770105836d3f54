import { suite, test, describe, it, beforeAll, beforeEach, afterAll, afterEach, onTestFailed } from '@vitest/runner';
import { b as bench, c as createExpect, g as globalExpect, v as vitest, a as vi } from './chunk-utils-import.9911c99d.js';
import { r as runOnce, i as isFirstRun } from './chunk-integrations-run-once.38756e30.js';
import * as chai from 'chai';
import { assert, should } from 'chai';

function getRunningMode() {
  return process.env.VITEST_MODE === "WATCH" ? "watch" : "run";
}
function isWatchMode() {
  return getRunningMode() === "watch";
}

var dist = {};

(function (exports) {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.expectTypeOf = void 0;
	const fn = () => true;
	/**
	 * Similar to Jest's `expect`, but with type-awareness.
	 * Gives you access to a number of type-matchers that let you make assertions about the
	 * form of a reference or generic type parameter.
	 *
	 * @example
	 * import {foo, bar} from '../foo'
	 * import {expectTypeOf} from 'expect-type'
	 *
	 * test('foo types', () => {
	 *   // make sure `foo` has type {a: number}
	 *   expectTypeOf(foo).toMatchTypeOf({a: 1})
	 *   expectTypeOf(foo).toHaveProperty('a').toBeNumber()
	 *
	 *   // make sure `bar` is a function taking a string:
	 *   expectTypeOf(bar).parameter(0).toBeString()
	 *   expectTypeOf(bar).returns.not.toBeAny()
	 * })
	 *
	 * @description
	 * See the [full docs](https://npmjs.com/package/expect-type#documentation) for lots more examples.
	 */
	const expectTypeOf = (_actual) => {
	    const nonFunctionProperties = [
	        'parameters',
	        'returns',
	        'resolves',
	        'not',
	        'items',
	        'constructorParameters',
	        'instance',
	        'guards',
	        'asserts',
	    ];
	    const obj = {
	        /* eslint-disable mmkal/@typescript-eslint/no-unsafe-assignment */
	        toBeAny: fn,
	        toBeUnknown: fn,
	        toBeNever: fn,
	        toBeFunction: fn,
	        toBeObject: fn,
	        toBeArray: fn,
	        toBeString: fn,
	        toBeNumber: fn,
	        toBeBoolean: fn,
	        toBeVoid: fn,
	        toBeSymbol: fn,
	        toBeNull: fn,
	        toBeUndefined: fn,
	        toBeNullable: fn,
	        toMatchTypeOf: fn,
	        toEqualTypeOf: fn,
	        toBeCallableWith: fn,
	        toBeConstructibleWith: fn,
	        /* eslint-enable mmkal/@typescript-eslint/no-unsafe-assignment */
	        extract: exports.expectTypeOf,
	        exclude: exports.expectTypeOf,
	        toHaveProperty: exports.expectTypeOf,
	        parameter: exports.expectTypeOf,
	    };
	    const getterProperties = nonFunctionProperties;
	    getterProperties.forEach((prop) => Object.defineProperty(obj, prop, { get: () => (0, exports.expectTypeOf)({}) }));
	    return obj;
	};
	exports.expectTypeOf = expectTypeOf;
} (dist));

const noop = () => {
};
const assertType = noop;

var index = /*#__PURE__*/Object.freeze({
  __proto__: null,
  suite: suite,
  test: test,
  describe: describe,
  it: it,
  beforeAll: beforeAll,
  beforeEach: beforeEach,
  afterAll: afterAll,
  afterEach: afterEach,
  onTestFailed: onTestFailed,
  bench: bench,
  runOnce: runOnce,
  isFirstRun: isFirstRun,
  assert: assert,
  should: should,
  createExpect: createExpect,
  chai: chai,
  expect: globalExpect,
  vitest: vitest,
  vi: vi,
  getRunningMode: getRunningMode,
  isWatchMode: isWatchMode,
  expectTypeOf: dist.expectTypeOf,
  assertType: assertType
});

export { isWatchMode as a, assertType as b, dist as d, getRunningMode as g, index as i };
