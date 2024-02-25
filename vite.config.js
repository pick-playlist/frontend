import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": "http://localhost:3000",
    },
  },
  resolve: {
    alias: [
      //절대 경로로 접근하기
      { find: "~/assets", replacement: "/src/assets" },
      { find: "~/components", replacement: "/src/components" },
      { find: "~/lib", replacement: "/src/lib" },
      { find: "~/routers", replacement: "/src/routers" },
      { find: "~/pages", replacement: "/src/pages" },
      { find: "~/store", replacement: "/src/store" },
    ],
  },
});
