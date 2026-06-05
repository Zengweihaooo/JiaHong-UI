import { resolve } from 'node:path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  build: {
    assetsInlineLimit: 0,
    lib: {
      entry: resolve(__dirname, 'src/index.js'),
      name: 'JiaHongUI',
      formats: ['es', 'cjs'],
      fileName: (format) => (format === 'es' ? 'jiahong-ui.js' : 'jiahong-ui.cjs'),
      cssFileName: 'styles'
    },
    rollupOptions: {
      external: ['vue'],
      output: {
        exports: 'named',
        globals: {
          vue: 'Vue'
        }
      }
    }
  }
})
