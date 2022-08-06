import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue({
      reactivityTransform: true,
    }),
  ],
  resolve: {
    alias: {
      pages: resolve(__dirname, 'src/pages'),
      components: resolve(__dirname, 'src/components'), // 组件路径别名
      '@': resolve(__dirname, 'src'), // 根路径别名
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: '@import "./src/assets/style/var.scss";',
      },
    },
  },
})
