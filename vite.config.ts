import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "./",
  css: {
    modules: {
      generateScopedName: "[local]__[hash:base64:5]",
    },
  },
})
