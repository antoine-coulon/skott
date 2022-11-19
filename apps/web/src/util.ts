export function isJavaScriptModule(module: string) {
  return (
    module.endsWith(".js") ||
    module.endsWith(".jsx") ||
    module.endsWith(".mjs") ||
    module.endsWith(".cjs")
  );
}

export function isTypeScriptModule(module: string) {
  return module.endsWith(".ts") || module.endsWith(".tsx");
}
