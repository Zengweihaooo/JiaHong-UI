import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

const githubRepositoryName = process.env.GITHUB_REPOSITORY?.split('/')[1]
const base =
  process.env.GITHUB_ACTIONS && githubRepositoryName
    ? `/${githubRepositoryName}/`
    : '/'

export default defineConfig({
  base,
  plugins: [vue()],
  define: {
    'import.meta.env.VITE_JH_ASSET_BASE': JSON.stringify(`${base}assets/`)
  },
  build: {
    outDir: 'dist-pages',
    emptyOutDir: true
  }
})
