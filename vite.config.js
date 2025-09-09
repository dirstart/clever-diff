import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { viteMockServe } from 'vite-plugin-mock'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    viteMockServe({
      mockPath: 'mock',
      enable: true,
      watchFiles: true,
      logger: true, // 显示mock请求日志
      supportTs: false, // 如果使用TypeScript，设置为true
      localEnabled: true, // 本地开发环境启用
      prodEnabled: false, // 生产环境禁用
    })
  ],
  server: {
    port: 3001,
    open: true,
    cors: true
  }
})
