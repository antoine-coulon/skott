import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    include: ["./test/integration/**/*.spec.ts"],
    logHeapUsage: true
  }
});
