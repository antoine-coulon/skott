import { DataInterface, EventCallbacksWithAny, EventPayloads, Id } from "./data-interface";
/**
 * [[DataSet]] code that can be reused in [[DataView]] or other similar implementations of [[DataInterface]].
 *
 * @typeParam Item - Item type that may or may not have an id.
 * @typeParam IdProp - Name of the property that contains the id.
 */
export declare abstract class DataSetPart<Item, IdProp extends string> implements Pick<DataInterface<Item, IdProp>, "on" | "off"> {
    private readonly _subscribers;
    protected _trigger(event: "add", payload: EventPayloads<Item, IdProp>["add"], senderId?: Id | null): void;
    protected _trigger(event: "update", payload: EventPayloads<Item, IdProp>["update"], senderId?: Id | null): void;
    protected _trigger(event: "remove", payload: EventPayloads<Item, IdProp>["remove"], senderId?: Id | null): void;
    /** @inheritDoc */
    on(event: "*", callback: EventCallbacksWithAny<Item, IdProp>["*"]): void;
    /** @inheritDoc */
    on(event: "add", callback: EventCallbacksWithAny<Item, IdProp>["add"]): void;
    /** @inheritDoc */
    on(event: "remove", callback: EventCallbacksWithAny<Item, IdProp>["remove"]): void;
    /** @inheritDoc */
    on(event: "update", callback: EventCallbacksWithAny<Item, IdProp>["update"]): void;
    /** @inheritDoc */
    off(event: "*", callback: EventCallbacksWithAny<Item, IdProp>["*"]): void;
    /** @inheritDoc */
    off(event: "add", callback: EventCallbacksWithAny<Item, IdProp>["add"]): void;
    /** @inheritDoc */
    off(event: "remove", callback: EventCallbacksWithAny<Item, IdProp>["remove"]): void;
    /** @inheritDoc */
    off(event: "update", callback: EventCallbacksWithAny<Item, IdProp>["update"]): void;
    /**
     * @deprecated Use on instead (PS: DataView.subscribe === DataView.on).
     */
    subscribe: DataSetPart<Item, IdProp>["on"];
    /**
     * @deprecated Use off instead (PS: DataView.unsubscribe === DataView.off).
     */
    unsubscribe: DataSetPart<Item, IdProp>["off"];
    get testLeakSubscribers(): any;
}
//# sourceMappingURL=data-set-part.d.ts.map