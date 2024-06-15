import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    watch: false,
    passWithNoTests: true,
    benchmark: {
      reporters: ['default'],
      include: ["./test/benchmark/**/*.bench.ts"],
      outputJson: './test/benchmark/result.json',
    }
  },
});
