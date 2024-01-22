import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import qiankun from 'vite-plugin-qiankun'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/sub-vue',
  plugins: [
    vue(),
    qiankun('sub-vue', {
      useDevMode: true,
    }),
  ],
  server: {
    port: 7000,
    cors: true,
    origin: 'http://localhost:7000',
  },
})
