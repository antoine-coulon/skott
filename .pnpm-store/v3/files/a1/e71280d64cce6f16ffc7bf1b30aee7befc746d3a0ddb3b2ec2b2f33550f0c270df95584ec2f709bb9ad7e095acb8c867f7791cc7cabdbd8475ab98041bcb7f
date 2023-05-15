/**
 * Represents a description of how to modify the path to a configuration
 * value.
 *
 * @since 1.0.0
 * @category models
 */
export type PathPatch = Empty | AndThen | MapName | Nested | Unnested;
/**
 * @since 1.0.0
 * @category models
 */
export interface Empty {
    readonly _tag: "Empty";
}
/**
 * @since 1.0.0
 * @category models
 */
export interface AndThen {
    readonly _tag: "AndThen";
    readonly first: PathPatch;
    readonly second: PathPatch;
}
/**
 * @since 1.0.0
 * @category models
 */
export interface MapName {
    readonly _tag: "MapName";
    readonly f: (string: string) => string;
}
/**
 * @since 1.0.0
 * @category models
 */
export interface Nested {
    readonly _tag: "Nested";
    readonly name: string;
}
/**
 * @since 1.0.0
 * @category models
 */
export interface Unnested {
    readonly _tag: "Unnested";
    readonly name: string;
}
/**
 * @since 1.0.0
 * @category constructors
 */
export declare const empty: PathPatch;
/**
 * @since 1.0.0
 * @category constructors
 */
export declare const andThen: {
    (that: PathPatch): (self: PathPatch) => PathPatch;
    (self: PathPatch, that: PathPatch): PathPatch;
};
/**
 * @since 1.0.0
 * @category constructors
 */
export declare const mapName: {
    (f: (string: string) => string): (self: PathPatch) => PathPatch;
    (self: PathPatch, f: (string: string) => string): PathPatch;
};
/**
 * @since 1.0.0
 * @category constructors
 */
export declare const nested: {
    (name: string): (self: PathPatch) => PathPatch;
    (self: PathPatch, name: string): PathPatch;
};
/**
 * @since 1.0.0
 * @category constructors
 */
export declare const unnested: {
    (name: string): (self: PathPatch) => PathPatch;
    (self: PathPatch, name: string): PathPatch;
};
//# sourceMappingURL=PathPatch.d.ts.map