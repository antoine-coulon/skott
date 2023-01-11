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

export function isDevelopmentEnvironment(): boolean {
  // @ts-ignore - vite specific
  return import.meta.env.DEV;
}
