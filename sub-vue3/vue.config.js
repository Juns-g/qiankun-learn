const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    port: 8001,
    headers: {
      // 跨域
      'Access-Control-Allow-Origin': '*',
    },
  },
  configureWebpack: {
    output: {
      // 必须打包出一个库文件
      library: `sub-vue3`,
      // 库格式必须是 umd
      libraryTarget: 'umd', // 把子应用打包成 umd 库格式
      // jsonpFunction: `webpackJsonp_${name}`,
      chunkLoadingGlobal: `webpackJsonp_sub_vue3`,
    },
  },
})
