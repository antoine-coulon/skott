import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    include: ["./test/integration/**/*.ispec.ts"],
    logHeapUsage: true
  }
});
