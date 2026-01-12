import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      '@assets': path.resolve(__dirname, './src/assets'),
    },
  },
  server: {
  port: 5173,
  open: true,
  proxy: {
    "/api": {
      target: "http://localhost:5000",
      changeOrigin: true,
      secure: false,
    },
  },
},  
});
