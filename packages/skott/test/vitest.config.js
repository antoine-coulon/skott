import { defineConfig, configDefaults } from "vitest/config";

export default defineConfig({
  test: {
    include: ["./**/*.spec.ts"],
    maxThreads: process.env.CI ? 1 : configDefaults.maxThreads,
    minThreads: process.env.CI ? 1 : configDefaults.minThreads
  }
});
