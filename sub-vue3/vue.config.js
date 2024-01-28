const { defineConfig } = require('@vue/cli-service')
const name = require('./package.json').name
const { ElementPlusResolver } = require('unplugin-vue-components/resolvers')

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
      library: `${name}-[name]`,
      // 库格式必须是 umd
      libraryTarget: 'umd', // 把子应用打包成 umd 库格式
      // jsonpFunction: `webpackJsonp_${name}`,
      chunkLoadingGlobal: `webpackJsonp_${name}`,
    },
    plugins: [
      require('unplugin-auto-import/webpack').default({
        resolvers: [ElementPlusResolver()],
      }),
      require('unplugin-vue-components/webpack').default({
        resolvers: [ElementPlusResolver()],
      }),
    ],
  },
})
