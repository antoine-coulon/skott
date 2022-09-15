export interface ModuleWalkerResult {
  moduleDeclarations: Set<string>;
}

export interface ModuleWalker {
  walk(fileContent: string): Promise<ModuleWalkerResult>;
}
