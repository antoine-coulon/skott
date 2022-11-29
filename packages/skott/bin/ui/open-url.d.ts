declare module "openurl" {
  export declare function open(
    url: string,
    callback?: (error: Error) => void
  ): void;

  export declare function mailto(
    recipients: string[],
    fields: Record<string, string>,
    recipientsSeparator: string,
    callback?: (error: Error) => void
  ): void;
}
