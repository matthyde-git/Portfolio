import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  assetsInclude: ["**/*.JPG"],
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: "./tests/setup.js",
    onConsoleLog(log) {
      if (log.includes("React Router Future Flag Warning: ")) return false
    }
  }
})
