/**
 * @since 1.0.0
 */
import type * as Chunk from "@effect/data/Chunk";
import type * as Context from "@effect/data/Context";
import type { LazyArg } from "@effect/data/Function";
import type * as HashSet from "@effect/data/HashSet";
import type * as Config from "@effect/io/Config";
import type * as ConfigError from "@effect/io/Config/Error";
import type * as PathPatch from "@effect/io/Config/Provider/PathPatch";
import type * as Effect from "@effect/io/Effect";
/**
 * @since 1.0.0
 * @category symbols
 */
export declare const ConfigProviderTypeId: unique symbol;
/**
 * @since 1.0.0
 * @category symbols
 */
export type ConfigProviderTypeId = typeof ConfigProviderTypeId;
/**
 * @since 1.0.0
 * @category symbols
 */
export declare const FlatConfigProviderTypeId: unique symbol;
/**
 * @since 1.0.0
 * @category symbols
 */
export type FlatConfigProviderTypeId = typeof FlatConfigProviderTypeId;
/**
 * A ConfigProvider is a service that provides configuration given a description
 * of the structure of that configuration.
 *
 * @since 1.0.0
 * @category models
 */
export interface ConfigProvider extends ConfigProvider.Proto {
    /**
     * Loads the specified configuration, or fails with a config error.
     */
    load<A>(config: Config.Config<A>): Effect.Effect<never, ConfigError.ConfigError, A>;
    /**
     * Flattens this config provider into a simplified config provider that knows
     * only how to deal with flat (key/value) properties.
     */
    flattened: ConfigProvider.Flat;
}
/**
 * @since 1.0.0
 */
export declare namespace ConfigProvider {
    /**
     * @since 1.0.0
     * @category models
     */
    interface Proto {
        readonly [ConfigProviderTypeId]: ConfigProviderTypeId;
    }
    /**
     * A simplified config provider that knows only how to deal with flat
     * (key/value) properties. Because these providers are common, there is
     * special support for implementing them.
     *
     * @since 1.0.0
     * @category models
     */
    interface Flat {
        readonly [FlatConfigProviderTypeId]: FlatConfigProviderTypeId;
        patch: PathPatch.PathPatch;
        load<A>(path: Chunk.Chunk<string>, config: Config.Config.Primitive<A>, split?: boolean): Effect.Effect<never, ConfigError.ConfigError, Chunk.Chunk<A>>;
        enumerateChildren(path: Chunk.Chunk<string>): Effect.Effect<never, ConfigError.ConfigError, HashSet.HashSet<string>>;
    }
    /**
     * @since 1.0.0
     * @category models
     */
    interface FromMapConfig {
        readonly pathDelim: string;
        readonly seqDelim: string;
    }
    /**
     * @since 1.0.0
     * @category models
     */
    interface FromEnvConfig {
        readonly pathDelim: string;
        readonly seqDelim: string;
    }
}
/**
 * The service tag for `ConfigProvider`.
 *
 * @since 1.0.0
 * @category context
 */
export declare const Tag: Context.Tag<ConfigProvider>;
/**
 * Creates a new config provider.
 *
 * @since 1.0.0
 * @category constructors
 */
export declare const make: (load: <A>(config: Config.Config<A>) => Effect.Effect<never, ConfigError.ConfigError, A>, flattened: ConfigProvider.Flat) => ConfigProvider;
/**
 * Creates a new flat config provider.
 *
 * @since 1.0.0
 * @category constructors
 */
export declare const makeFlat: (load: <A>(path: Chunk.Chunk<string>, config: Config.Config.Primitive<A>) => Effect.Effect<never, ConfigError.ConfigError, Chunk.Chunk<A>>, enumerateChildren: (path: Chunk.Chunk<string>) => Effect.Effect<never, ConfigError.ConfigError, HashSet.HashSet<string>>, patch: PathPatch.PathPatch) => ConfigProvider.Flat;
/**
 * A config provider that loads configuration from context variables,
 * using the default System service.
 *
 * @since 1.0.0
 * @category constructors
 */
export declare const fromEnv: (config?: ConfigProvider.FromEnvConfig) => ConfigProvider;
/**
 * Constructs a new `ConfigProvider` from a key/value (flat) provider, where
 * nesting is embedded into the string keys.
 *
 * @since 1.0.0
 * @category constructors
 */
export declare const fromFlat: (flat: ConfigProvider.Flat) => ConfigProvider;
/**
 * Constructs a ConfigProvider using a map and the specified delimiter string,
 * which determines how to split the keys in the map into path segments.
 *
 * @since 1.0.0
 * @category constructors
 */
export declare const fromMap: (map: Map<string, string>, config?: Partial<ConfigProvider.FromMapConfig>) => ConfigProvider;
/**
 * Returns a new config provider that will automatically convert all property
 * names to constant case. This can be utilized to adapt the names of
 * configuration properties from the default naming convention of camel case
 * to the naming convention of a config provider.
 *
 * @since 1.0.0
 * @category combinators
 */
export declare const constantCase: (self: ConfigProvider) => ConfigProvider;
/**
 * Returns a new config provider that will automatically tranform all path
 * configuration names with the specified function. This can be utilized to
 * adapt the names of configuration properties from one naming convention to
 * another.
 *
 * @since 1.0.0
 * @category mutations
 */
export declare const contramapPath: {
    (f: (path: string) => string): (self: ConfigProvider) => ConfigProvider;
    (self: ConfigProvider, f: (path: string) => string): ConfigProvider;
};
/**
 * Returns a new config provider that will automatically convert all property
 * names to kebab case. This can be utilized to adapt the names of
 * configuration properties from the default naming convention of camel case
 * to the naming convention of a config provider.
 *
 * @since 1.0.0
 * @category combinators
 */
export declare const kebabCase: (self: ConfigProvider) => ConfigProvider;
/**
 * Returns a new config provider that will automatically convert all property
 * names to lower case. This can be utilized to adapt the names of
 * configuration properties from the default naming convention of camel case
 * to the naming convention of a config provider.
 *
 * @since 1.0.0
 * @category combinators
 */
export declare const lowerCase: (self: ConfigProvider) => ConfigProvider;
/**
 * Returns a new config provider that will automatically nest all
 * configuration under the specified property name. This can be utilized to
 * aggregate separate configuration sources that are all required to load a
 * single configuration value.
 *
 * @since 1.0.0
 * @category mutations
 */
export declare const nested: {
    (name: string): (self: ConfigProvider) => ConfigProvider;
    (self: ConfigProvider, name: string): ConfigProvider;
};
/**
 * Returns a new config provider that preferentially loads configuration data
 * from this one, but which will fall back to the specified alternate provider
 * if there are any issues loading the configuration from this provider.
 *
 * @since 1.0.0
 * @category mutations
 */
export declare const orElse: {
    (that: LazyArg<ConfigProvider>): (self: ConfigProvider) => ConfigProvider;
    (self: ConfigProvider, that: LazyArg<ConfigProvider>): ConfigProvider;
};
/**
 * Returns a new config provider that will automatically un-nest all
 * configuration under the specified property name. This can be utilized to
 * de-aggregate separate configuration sources that are all required to load a
 * single configuration value.
 *
 * @since 1.0.0
 * @category mutations
 */
export declare const unnested: {
    (name: string): (self: ConfigProvider) => ConfigProvider;
    (self: ConfigProvider, name: string): ConfigProvider;
};
/**
 * Returns a new config provider that will automatically convert all property
 * names to upper case. This can be utilized to adapt the names of
 * configuration properties from the default naming convention of camel case
 * to the naming convention of a config provider.
 *
 * @since 1.0.0
 * @category combinators
 */
export declare const snakeCase: (self: ConfigProvider) => ConfigProvider;
/**
 * Returns a new config provider that will automatically convert all property
 * names to upper case. This can be utilized to adapt the names of
 * configuration properties from the default naming convention of camel case
 * to the naming convention of a config provider.
 *
 * @since 1.0.0
 * @category combinators
 */
export declare const upperCase: (self: ConfigProvider) => ConfigProvider;
/**
 * Returns a new config provider that transforms the config provider with the
 * specified function within the specified path.
 *
 * @since 1.0.0
 * @category combinators
 */
export declare const within: {
    (path: Chunk.Chunk<string>, f: (self: ConfigProvider) => ConfigProvider): (self: ConfigProvider) => ConfigProvider;
    (self: ConfigProvider, path: Chunk.Chunk<string>, f: (self: ConfigProvider) => ConfigProvider): ConfigProvider;
};
//# sourceMappingURL=Provider.d.ts.map