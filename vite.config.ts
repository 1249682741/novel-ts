import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
// import Components from 'unplugin-vue-components/vite'
// import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import {resolve} from 'path'


// https://vitejs.dev/config/
const config = {
  resolve: {
    alias: [
      {
        find: /\/@/,
        replacement: resolve(__dirname, 'src')
      }
    ]
  },
  css: {
    preprocessorOptions: {
      scss: {
        // 引入 var.scss 这样就可以在全局中使用 var.scss中预定义的变量了
        // 给导入的路径最后加上 ; 
        additionalData: '@import "./src/styles/_variables.scss";@import "./src/styles/_mixins.scss";'
      }
    }
  },
  server: {
    port: 8080,
  },
  plugins: [
    vue(),
    // Components({
    //   resolvers: [ElementPlusResolver()]
    // })
  ]
}

export default config