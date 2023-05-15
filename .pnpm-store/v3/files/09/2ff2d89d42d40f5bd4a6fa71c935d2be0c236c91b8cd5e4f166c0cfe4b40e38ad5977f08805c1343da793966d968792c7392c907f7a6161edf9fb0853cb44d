import { use } from 'chai';
import { stringify } from '@vitest/utils';
export { setColors as setupColors } from '@vitest/utils';

type Formatter = (input: string | number | null | undefined) => string;

declare function getMatcherUtils(): {
    EXPECTED_COLOR: Formatter;
    RECEIVED_COLOR: Formatter;
    INVERTED_COLOR: Formatter;
    BOLD_WEIGHT: Formatter;
    DIM_COLOR: Formatter;
    matcherHint: (matcherName: string, received?: string, expected?: string, options?: MatcherHintOptions) => string;
    printReceived: (object: unknown) => string;
    printExpected: (value: unknown) => string;
};
declare function diff(a: any, b: any, options?: DiffOptions): string;

type FirstFunctionArgument<T> = T extends (arg: infer A) => unknown ? A : never;
type ChaiPlugin = FirstFunctionArgument<typeof use>;
type Tester = (a: any, b: any) => boolean | undefined;
interface MatcherHintOptions {
    comment?: string;
    expectedColor?: Formatter;
    isDirectExpectCall?: boolean;
    isNot?: boolean;
    promise?: string;
    receivedColor?: Formatter;
    secondArgument?: string;
    secondArgumentColor?: Formatter;
}
interface DiffOptions {
    aAnnotation?: string;
    aColor?: Formatter;
    aIndicator?: string;
    bAnnotation?: string;
    bColor?: Formatter;
    bIndicator?: string;
    changeColor?: Formatter;
    changeLineTrailingSpaceColor?: Formatter;
    commonColor?: Formatter;
    commonIndicator?: string;
    commonLineTrailingSpaceColor?: Formatter;
    contextLines?: number;
    emptyFirstOrLastLinePlaceholder?: string;
    expand?: boolean;
    includeChangeCounts?: boolean;
    omitAnnotationLines?: boolean;
    patchColor?: Formatter;
    compareKeys?: any;
    showLegend?: boolean;
}
interface MatcherState {
    assertionCalls: number;
    currentTestName?: string;
    dontThrow?: () => void;
    error?: Error;
    equals: (a: unknown, b: unknown, customTesters?: Array<Tester>, strictCheck?: boolean) => boolean;
    expand?: boolean;
    expectedAssertionsNumber?: number | null;
    expectedAssertionsNumberErrorGen?: (() => Error) | null;
    isExpectingAssertions?: boolean;
    isExpectingAssertionsError?: Error | null;
    isNot: boolean;
    promise: string;
    suppressedErrors: Array<Error>;
    testPath?: string;
    utils: ReturnType<typeof getMatcherUtils> & {
        diff: typeof diff;
        stringify: typeof stringify;
        iterableEquality: Tester;
        subsetEquality: Tester;
    };
}
interface SyncExpectationResult {
    pass: boolean;
    message: () => string;
    actual?: any;
    expected?: any;
}
type AsyncExpectationResult = Promise<SyncExpectationResult>;
type ExpectationResult = SyncExpectationResult | AsyncExpectationResult;
interface RawMatcherFn<T extends MatcherState = MatcherState> {
    (this: T, received: any, expected: any, options?: any): ExpectationResult;
}
type MatchersObject<T extends MatcherState = MatcherState> = Record<string, RawMatcherFn<T>>;

interface AsymmetricMatcherInterface {
    asymmetricMatch(other: unknown): boolean;
    toString(): string;
    getExpectedType?(): string;
    toAsymmetricMatcher?(): string;
}
declare abstract class AsymmetricMatcher<T, State extends MatcherState = MatcherState> implements AsymmetricMatcherInterface {
    protected sample: T;
    protected inverse: boolean;
    $$typeof: symbol;
    constructor(sample: T, inverse?: boolean);
    protected getMatcherContext(expect?: Vi.ExpectStatic): State;
    abstract asymmetricMatch(other: unknown): boolean;
    abstract toString(): string;
    getExpectedType?(): string;
    toAsymmetricMatcher?(): string;
}
declare class StringContaining extends AsymmetricMatcher<string> {
    constructor(sample: string, inverse?: boolean);
    asymmetricMatch(other: string): boolean;
    toString(): string;
    getExpectedType(): string;
}
declare class Anything extends AsymmetricMatcher<void> {
    asymmetricMatch(other: unknown): boolean;
    toString(): string;
    toAsymmetricMatcher(): string;
}
declare class ObjectContaining extends AsymmetricMatcher<Record<string, unknown>> {
    constructor(sample: Record<string, unknown>, inverse?: boolean);
    getPrototype(obj: object): any;
    hasProperty(obj: object | null, property: string): boolean;
    asymmetricMatch(other: any): boolean;
    toString(): string;
    getExpectedType(): string;
}
declare class ArrayContaining<T = unknown> extends AsymmetricMatcher<Array<T>> {
    constructor(sample: Array<T>, inverse?: boolean);
    asymmetricMatch(other: Array<T>): boolean;
    toString(): string;
    getExpectedType(): string;
}
declare class Any extends AsymmetricMatcher<any> {
    constructor(sample: unknown);
    fnNameFor(func: Function): string;
    asymmetricMatch(other: unknown): boolean;
    toString(): string;
    getExpectedType(): string;
    toAsymmetricMatcher(): string;
}
declare class StringMatching extends AsymmetricMatcher<RegExp> {
    constructor(sample: string | RegExp, inverse?: boolean);
    asymmetricMatch(other: string): boolean;
    toString(): string;
    getExpectedType(): string;
}
declare const JestAsymmetricMatchers: ChaiPlugin;

declare function equals(a: unknown, b: unknown, customTesters?: Array<Tester>, strictCheck?: boolean): boolean;
declare function isAsymmetric(obj: any): boolean;
declare function hasAsymmetric(obj: any, seen?: Set<unknown>): boolean;
declare function isA(typeName: string, value: unknown): boolean;
declare function fnNameFor(func: Function): string;
declare function hasProperty(obj: object | null, property: string): boolean;
declare function isImmutableUnorderedKeyed(maybeKeyed: any): boolean;
declare function isImmutableUnorderedSet(maybeSet: any): boolean;
declare const iterableEquality: (a: any, b: any, aStack?: Array<any>, bStack?: Array<any>) => boolean | undefined;
declare const subsetEquality: (object: unknown, subset: unknown) => boolean | undefined;
declare const typeEquality: (a: any, b: any) => boolean | undefined;
declare const arrayBufferEquality: (a: unknown, b: unknown) => boolean | undefined;
declare const sparseArrayEquality: (a: unknown, b: unknown) => boolean | undefined;
declare const generateToBeMessage: (deepEqualityName: string, expected?: string, actual?: string) => string;

declare const MATCHERS_OBJECT: unique symbol;
declare const JEST_MATCHERS_OBJECT: unique symbol;
declare const GLOBAL_EXPECT: unique symbol;

declare const getState: <State extends MatcherState = MatcherState>(expect: Vi.ExpectStatic) => State;
declare const setState: <State extends MatcherState = MatcherState>(state: Partial<State>, expect: Vi.ExpectStatic) => void;

declare const JestChaiExpect: ChaiPlugin;

declare const JestExtend: ChaiPlugin;

export { Any, Anything, ArrayContaining, AsymmetricMatcher, AsymmetricMatcherInterface, AsyncExpectationResult, ChaiPlugin, DiffOptions, ExpectationResult, FirstFunctionArgument, GLOBAL_EXPECT, JEST_MATCHERS_OBJECT, JestAsymmetricMatchers, JestChaiExpect, JestExtend, MATCHERS_OBJECT, MatcherHintOptions, MatcherState, MatchersObject, ObjectContaining, RawMatcherFn, StringContaining, StringMatching, SyncExpectationResult, Tester, arrayBufferEquality, equals, fnNameFor, generateToBeMessage, getState, hasAsymmetric, hasProperty, isA, isAsymmetric, isImmutableUnorderedKeyed, isImmutableUnorderedSet, iterableEquality, setState, sparseArrayEquality, subsetEquality, typeEquality };
