declare const TypeId: unique symbol;
/**
 * @since 1.0.0
 * @category symbol
 */
export type TypeId = typeof TypeId;
/**
 * @since 1.0.0
 * @category model
 */
export interface MutableList<A> extends Iterable<A> {
    readonly _id: TypeId;
}
/**
 * Creates an empty `MutableList`.
 *
 * @since 1.0.0
 * @category constructors
 */
export declare const empty: <A>() => MutableList<A>;
/**
 * Creates a new `MutableList` from an `Iterable`.
 *
 * @since 1.0.0
 * @category constructors
 */
export declare const from: <A>(iterable: Iterable<A>) => MutableList<A>;
/**
 * Creates a new `MutableList` from the specified elements.
 *
 * @since 1.0.0
 * @category constructors
 */
export declare const make: <A>(...elements: readonly A[]) => MutableList<A>;
/**
 * Returns `true` if the list contains zero elements, `false`, otherwise.
 *
 * @since 1.0.0
 * @category getters
 */
export declare const isEmpty: <A>(self: MutableList<A>) => boolean;
/**
 * Returns the length of the list.
 *
 * @since 1.0.0
 * @category getters
 */
export declare const length: <A>(self: MutableList<A>) => number;
/**
 * Returns the last element of the list, if it exists.
 *
 * @since 1.0.0
 * @category getters
 */
export declare const tail: <A>(self: MutableList<A>) => A | undefined;
/**
 * Returns the first element of the list, if it exists.
 *
 * @since 1.0.0
 * @category getters
 */
export declare const head: <A>(self: MutableList<A>) => A | undefined;
/**
 * Executes the specified function `f` for each element in the list.
 *
 * @since 1.0.0
 * @category traversing
 */
export declare const forEach: {
    <A>(f: (element: A) => void): (self: MutableList<A>) => void;
    <A>(self: MutableList<A>, f: (element: A) => void): void;
};
/**
 * Removes all elements from the doubly-linked list.
 *
 * @since 1.0.0
 * @category mutations
 */
export declare const reset: <A>(self: MutableList<A>) => MutableList<A>;
/**
 * Appends the specified value to the end of the list.
 *
 * @since 1.0.0
 * @category mutations
 */
export declare const append: {
    <A>(value: A): (self: MutableList<A>) => MutableList<A>;
    <A>(self: MutableList<A>, value: A): MutableList<A>;
};
/**
 * Removes the first value from the list and returns it, if it exists.
 *
 * @since 0.0.1
 * @category mutations
 */
export declare const shift: <A>(self: MutableList<A>) => A | undefined;
/**
 * Removes the last value from the list and returns it, if it exists.
 *
 * @since 0.0.1
 * @category mutations
 */
export declare const pop: <A>(self: MutableList<A>) => A | undefined;
/**
 * Prepends the specified value to the beginning of the list.
 *
 * @since 1.0.0
 * @category mutations
 */
export declare const prepend: {
    <A>(value: A): (self: MutableList<A>) => MutableList<A>;
    <A>(self: MutableList<A>, value: A): MutableList<A>;
};
export {};
//# sourceMappingURL=MutableList.d.ts.map