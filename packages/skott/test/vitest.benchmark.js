import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    watch: false,
    benchmark: {
      reporters: process.env.CI ? ['json'] : ['json', 'default'],
      include: ["./test/benchmark/**/*.bench.ts"],
      outputFile: './test/benchmark/result.json',
    }
  },
});
