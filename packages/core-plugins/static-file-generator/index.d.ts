export declare async function generateStaticFile(
  graph: Record<string, SkottNode>,
  staticFileType: "json" | "svg" | "png" | "md"
): Promise<void>;

export declare const supportedStaticFileTypes: string[];
