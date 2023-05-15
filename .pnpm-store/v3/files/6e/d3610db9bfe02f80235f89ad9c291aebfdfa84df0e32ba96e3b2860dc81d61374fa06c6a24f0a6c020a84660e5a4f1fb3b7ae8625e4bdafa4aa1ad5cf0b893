/**
 * @since 1.0.0
 */
/**
 * @since 1.0.0
 * @category models
 */
export interface Debug {
    /**
     * Overrides the default log level filter for loggers such as console.
     */
    minumumLogLevel: "All" | "Fatal" | "Error" | "Warning" | "Info" | "Debug" | "Trace" | "None";
    /**
     * Sets a limit on how many stack traces should be rendered.
     */
    traceStackLimit: number;
    /**
     * Enables tracing of execution and stack.
     */
    tracingEnabled: boolean;
    /**
     * Used to extract a source location from an Error when rendering a stack
     */
    parseStack: (error: Error) => ReadonlyArray<Frame | undefined>;
    /**
     * Used to filter a source location when rendering a stack
     */
    filterStackFrame: (frame: Frame) => boolean;
}
/**
 * @since 1.0.0
 * @category models
 */
export interface SourceLocation extends Error {
    depth: number;
    parsed?: Frame | undefined;
    toFrame(): Frame | undefined;
}
/**
 * @since 1.0.0
 * @category models
 */
export interface Frame {
    name?: string;
    fileName: string;
    line: number;
    column: number;
}
/**
 * @since 1.0.0
 * @category models
 */
export type Trace = SourceLocation | undefined;
/**
 * @since 1.0.0
 * @category models
 */
export type Restore = <F extends (...args: Array<any>) => any>(f: F) => F;
/**
 * @since 1.0.0
 * @category debug
 */
export declare const runtimeDebug: Debug;
/**
 * @since 1.0.0
 */
export declare const sourceLocation: (error: Error) => SourceLocation;
/**
 * @since 1.0.0
 */
export declare const bodyWithTrace: <A>(body: (trace: Trace, restore: Restore) => A) => A;
/**
 * @since 1.0.0
 */
export declare const methodWithTrace: <A extends (...args: Array<any>) => any>(body: (trace: Trace, restore: Restore) => A) => A;
/**
 * @since 1.0.0
 */
export declare const pipeableWithTrace: <A extends (...args: Array<any>) => any>(body: (trace: Trace, restore: Restore) => A) => A;
/**
 * @since 1.0.0
 */
export declare const dualWithTrace: {
    <DataLast extends (...args: Array<any>) => any, DataFirst extends (...args: Array<any>) => any>(dfLen: Parameters<DataFirst>["length"], body: (trace: Trace, restore: Restore) => DataFirst): DataLast & DataFirst;
    <DataLast extends (...args: Array<any>) => any, DataFirst extends (...args: Array<any>) => any>(isDataFirst: (args: IArguments) => boolean, body: (trace: Trace, restore: Restore) => DataFirst): DataLast & DataFirst;
};
/**
 * @since 1.0.0
 */
export declare const untraced: <A>(body: (restore: Restore) => A) => A;
/**
 * @since 1.0.0
 */
export declare const untracedDual: <DataLast extends (...args: Array<any>) => any, DataFirst extends (...args: Array<any>) => any>(dfLen: Parameters<DataFirst>["length"], body: (restore: Restore) => DataFirst) => DataLast & DataFirst;
/**
 * @since 1.0.0
 */
export declare const untracedMethod: <A extends (...args: Array<any>) => any>(body: (restore: Restore) => A) => A;
/**
 * @since 1.0.0
 */
export declare const traced: <A>(body: (restore: Restore) => A) => A;
//# sourceMappingURL=Debug.d.ts.map