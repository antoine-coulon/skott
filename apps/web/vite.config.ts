import tsconfigPaths from "vite-tsconfig-paths";

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [tsconfigPaths(), react()],
  server: {
    proxy: {
      "/api": "http://localhost:3333",
    },
  },
});
