import { Nullable, Arrayable } from './types.js';

declare function assertTypes(value: unknown, name: string, types: string[]): void;
declare function slash(path: string): string;
declare function toArray<T>(array?: Nullable<Arrayable<T>>): Array<T>;
declare function isObject(item: unknown): boolean;
declare function getType(value: unknown): string;
declare function getOwnProperties(obj: any): (string | symbol)[];
declare function deepClone<T>(val: T): T;
declare function clone<T>(val: T, seen: WeakMap<any, any>): T;
declare function noop(): void;
declare function objectAttr(source: any, path: string, defaultValue?: undefined): any;
type DeferPromise<T> = Promise<T> & {
    resolve: (value: T | PromiseLike<T>) => void;
    reject: (reason?: any) => void;
};
declare function createDefer<T>(): DeferPromise<T>;

export { assertTypes, clone, createDefer, deepClone, getOwnProperties, getType, isObject, noop, objectAttr, slash, toArray };
