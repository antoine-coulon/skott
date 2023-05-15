export { assertTypes, clone, createDefer, deepClone, getOwnProperties, getType, isObject, noop, objectAttr, slash, toArray } from './helpers.js';
export { ArgumentsType, Arrayable, Awaitable, Constructable, DeepMerge, MergeInsertions, MutableArray, Nullable } from './types.js';
import { PrettyFormatOptions } from 'pretty-format';
import p from 'picocolors';

declare function stringify(object: unknown, maxDepth?: number, { maxLength, ...options }?: PrettyFormatOptions & {
    maxLength?: number;
}): string;

declare function getSafeTimers(): {
    setTimeout: any;
    setInterval: any;
    clearInterval: any;
    clearTimeout: any;
};
declare function setSafeTimers(): void;

declare function shuffle<T>(array: T[], seed?: number): T[];

declare function format(...args: any[]): string;
declare function inspect(obj: unknown): string;
declare function objDisplay(obj: unknown): string;

declare const SAFE_TIMERS_SYMBOL: unique symbol;
declare const SAFE_COLORS_SYMBOL: unique symbol;

declare function getColors(): typeof p;
declare function setColors(colors: typeof p): void;

export { SAFE_COLORS_SYMBOL, SAFE_TIMERS_SYMBOL, format, getColors, getSafeTimers, inspect, objDisplay, setColors, setSafeTimers, shuffle, stringify };
