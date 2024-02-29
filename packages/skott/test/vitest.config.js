import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    include: ["./**/*.spec.ts"],
    benchmark: {
      reporters: ['json', 'default'],
      include: ["./test/benchmark/**/*.ts"],
      outputFile: './test/benchmark/result.json',
    }
  },
});
