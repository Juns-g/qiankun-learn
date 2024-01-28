const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    port: 8000,
    headers: {
      // 允许跨域访问子应用页面
      'Access-Control-Allow-Origin': '*',
    },
  },
})
