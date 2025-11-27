import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

/**
 * Configuração Vite para build apenas da página de Boot
 * Use: vite build --config vite.config.boot.js
 */
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist-boot',
    rollupOptions: {
      input: './boot.html'
    }
  }
})

