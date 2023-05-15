/**
 * @category model
 * @since 1.0.0
 */
export type PCGRandomState = [number, number, number, number];
/**
 * @category model
 * @since 1.0.0
 */
export type OptionalNumber = number | null | undefined;
/**
 * PCG is a family of simple fast space-efficient statistically good algorithms
 * for random number generation. Unlike many general-purpose RNGs, they are also
 * hard to predict.
 *
 * @category model
 * @since 1.0.0
 */
export declare class PCGRandom {
    private _state;
    /**
     * Creates an instance of PCGRandom.
     *
     * @param seed - The low 32 bits of the seed (0 is used for high 32 bits).
     *
     * @memberOf PCGRandom
     */
    constructor(seed?: OptionalNumber);
    /**
     * Creates an instance of PCGRandom.
     *
     * @param seedHi - The high 32 bits of the seed.
     * @param seedLo - The how 32 bits of the seed.
     * @param inc - The low 32 bits of the incrementer (0 is used for high 32 bits).
     *
     * @memberOf PCGRandom
     */
    constructor(seedHi: OptionalNumber, seedLo: OptionalNumber, inc?: OptionalNumber);
    /**
     * Creates an instance of PCGRandom.
     *
     * @param seedHi - The high 32 bits of the seed.
     * @param seedLo - The how 32 bits of the seed.
     * @param incHi - The high 32 bits of the incrementer.
     * @param incLo - The how 32 bits of the incrementer.
     *
     * @memberOf PCGRandom
     */
    constructor(seedHi: OptionalNumber, seedLo: OptionalNumber, incHi: OptionalNumber, incLo: OptionalNumber);
    /**
     * Returns a copy of the internal state of this random number generator as a
     * JavaScript Array.
     *
     * @category getters
     * @since 1.0.0
     */
    getState(): PCGRandomState;
    /**
     * Restore state previously retrieved using `getState()`.
     *
     * @category mutations
     * @since 1.0.0
     */
    setState(state: PCGRandomState): void;
    /**
     * Get a uniformly distributed 32 bit integer between [0, max).
     *
     * @category getter
     * @since 1.0.0
     */
    integer(max: number): number;
    /**
     * Get a uniformly distributed IEEE-754 double between 0.0 and 1.0, with
     * 53 bits of precision (every bit of the mantissa is randomized).
     *
     * @category getters
     * @since 1.0.0
     */
    number(): number;
}
//# sourceMappingURL=Random.d.ts.map