declare const TypeId: unique symbol;
/**
 * @since 1.0.0
 * @category symbol
 */
export type TypeId = typeof TypeId;
/**
 * @since 1.0.0
 * @category models
 */
export interface MutableRef<T> {
    readonly _id: TypeId;
    readonly _T: (_: never) => T;
}
/**
 * @since 1.0.0
 * @category constructors
 */
export declare const make: <T>(value: T) => MutableRef<T>;
/**
 * @since 1.0.0
 * @category general
 */
export declare const compareAndSet: {
    <T>(oldValue: T, newValue: T): (self: MutableRef<T>) => boolean;
    <T>(self: MutableRef<T>, oldValue: T, newValue: T): boolean;
};
/**
 * @since 1.0.0
 * @category numeric
 */
export declare const decrement: (self: MutableRef<number>) => MutableRef<number>;
/**
 * @since 1.0.0
 * @category numeric
 */
export declare const decrementAndGet: (self: MutableRef<number>) => number;
/**
 * @since 1.0.0
 * @category general
 */
export declare const get: <T>(self: MutableRef<T>) => T;
/**
 * @since 1.0.0
 * @category numeric
 */
export declare const getAndDecrement: (self: MutableRef<number>) => number;
/**
 * @since 1.0.0
 * @category numeric
 */
export declare const getAndIncrement: (self: MutableRef<number>) => number;
/**
 * @since 1.0.0
 * @category general
 */
export declare const getAndSet: {
    <T>(value: T): (self: MutableRef<T>) => T;
    <T>(self: MutableRef<T>, value: T): T;
};
/**
 * @since 1.0.0
 * @category general
 */
export declare const getAndUpdate: {
    <T>(f: (value: T) => T): (self: MutableRef<T>) => T;
    <T>(self: MutableRef<T>, f: (value: T) => T): T;
};
/**
 * @since 1.0.0
 * @category numeric
 */
export declare const increment: (self: MutableRef<number>) => MutableRef<number>;
/**
 * @since 1.0.0
 * @category numeric
 */
export declare const incrementAndGet: (self: MutableRef<number>) => number;
/**
 * @since 1.0.0
 * @category general
 */
export declare const set: {
    <T>(value: T): (self: MutableRef<T>) => MutableRef<T>;
    <T>(self: MutableRef<T>, value: T): MutableRef<T>;
};
/**
 * @since 1.0.0
 * @category general
 */
export declare const setAndGet: {
    <T>(value: T): (self: MutableRef<T>) => T;
    <T>(self: MutableRef<T>, value: T): T;
};
/**
 * @since 1.0.0
 * @category general
 */
export declare const update: {
    <T>(f: (value: T) => T): (self: MutableRef<T>) => MutableRef<T>;
    <T>(self: MutableRef<T>, f: (value: T) => T): MutableRef<T>;
};
/**
 * @since 1.0.0
 * @category general
 */
export declare const updateAndGet: {
    <T>(f: (value: T) => T): (self: MutableRef<T>) => T;
    <T>(self: MutableRef<T>, f: (value: T) => T): T;
};
/**
 * @since 1.0.0
 * @category boolean
 */
export declare const toggle: (self: MutableRef<boolean>) => MutableRef<boolean>;
export {};
//# sourceMappingURL=MutableRef.d.ts.map