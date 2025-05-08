import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    proxy: {
      // ─── User 인증 API ──────────────────────
      // 브라우저 요청: POST /user/create → 백엔드: http://localhost:8000/user/create
      //                POST /user/login  → 백엔드: http://localhost:8000/user/login
      "/user": {
        target: "http://localhost:8000",
        changeOrigin: true,
        // rewrite 하지 않으면 /user 그대로 전달됩니다.
        // rewrite: (p) => p,
      },

      // ─── 재고 관리 API ────────────────────────
      "/inventory": {
        target: "http://localhost:8000",
        changeOrigin: true,
        // → http://localhost:8000/inventory
      },

      // ─── 레시피 추천 API ─────────────────────
      "/recipes": {
        target: "http://localhost:8000",
        changeOrigin: true,
        // → http://localhost:8000/recipes
      },

      // ─── 유통기한 알림 API ────────────────────
      "/notifications": {
        target: "http://localhost:8000",
        changeOrigin: true,
        // → http://localhost:8000/notifications
      },
    },
  },

  plugins: [
    react(),
    mode === "development" && componentTagger(),
  ].filter(Boolean),

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
