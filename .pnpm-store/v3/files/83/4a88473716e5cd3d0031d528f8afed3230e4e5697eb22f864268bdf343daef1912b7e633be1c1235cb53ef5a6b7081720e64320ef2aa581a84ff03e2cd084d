import type * as Config from "@effect/io/Config";
import * as OpCodes from "@effect/io/internal_effect_untraced/opCodes/config";
/**
 * @since 1.0.0
 * @category models
 */
export interface Table extends Op<OpCodes.OP_TABLE, {
    readonly op: OpCodes.OP_TABLE;
    readonly valueConfig: Config.Config<unknown>;
}> {
}
/**
 * @since 1.0.0
 * @category models
 */
export interface Zipped extends Op<OpCodes.OP_ZIP_WITH, {
    readonly op: OpCodes.OP_ZIP_WITH;
    readonly left: Config.Config<unknown>;
    readonly right: Config.Config<unknown>;
    readonly zip: (a: unknown, b: unknown) => unknown;
}> {
}
export declare const all: {
    <A, T extends ReadonlyArray<Config.Config<any>>>(self: Config.Config<A>, ...args: T): Config.Config<readonly [
        A,
        ...(T["length"] extends 0 ? [] : Readonly<{
            [K in keyof T]: [T[K]] extends [Config.Config<infer A>] ? A : never;
        }>)
    ]>;
    <T extends ReadonlyArray<Config.Config<any>>>(args: [...T]): Config.Config<T[number] extends never ? [] : Readonly<{
        [K in keyof T]: [T[K]] extends [Config.Config<infer A>] ? A : never;
    }>>;
    <T extends Readonly<{
        [K: string]: Config.Config<any>;
    }>>(args: T): Config.Config<Readonly<{
        [K in keyof T]: [T[K]] extends [Config.Config<infer A>] ? A : never;
    }>>;
};
//# sourceMappingURL=config.d.ts.map