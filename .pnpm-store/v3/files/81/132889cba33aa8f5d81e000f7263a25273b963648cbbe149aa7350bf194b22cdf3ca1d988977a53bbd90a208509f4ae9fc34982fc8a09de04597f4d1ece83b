import * as Equal from "@effect/data/Equal";
import * as Hash from "@effect/data/Hash";
import { RedBlackTreeIterator } from "@effect/data/internal/RedBlackTree/iterator";
import * as Node from "@effect/data/internal/RedBlackTree/node";
import type * as RBT from "@effect/data/RedBlackTree";
import type * as Order from "@effect/data/typeclass/Order";
export declare class RedBlackTreeImpl<K, V> implements RBT.RedBlackTree<K, V> {
    readonly _ord: Order.Order<K>;
    readonly _root: Node.Node<K, V> | undefined;
    readonly _id: RBT.TypeId;
    constructor(_ord: Order.Order<K>, _root: Node.Node<K, V> | undefined);
    [Hash.symbol](): number;
    [Equal.symbol](that: unknown): boolean;
    [Symbol.iterator](): RedBlackTreeIterator<K, V>;
    toString(): string;
    toJSON(): {
        _tag: string;
        values: (readonly [K, V])[];
    };
}
//# sourceMappingURL=RedBlackTree.d.ts.map