import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [
    react(),
  ],
  build: {
    lib: {
      entry: 'src/index.ts',
      name: "plugin-template-frontend",
      fileName: () => "script.js",
      formats: ["es"],
    },
    outDir: "dist",
    rollupOptions: {
      output: {
        manualChunks: undefined,
      },
    },
  },
  define: { 'process.env.NODE_ENV': '"production"' }
});