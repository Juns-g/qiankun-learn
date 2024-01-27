# qiankun-learn

用于学习入门 qiankun 微前端框架的使用，以及复现一些当时的情况

## 项目结构

### base-vue2

基座应用，vue2.7.16，webpack，使用 VueCli 构建

### sub-vue3

子应用，vue3.0，webpack，使用 VueCli 构建

### sub-react

子应用，最新版本 react，vite 构建

## 配置

### 修改端口

vue2 和 vue3 都使用的 VueCli 构建，修改 vue3 的端口为 8001：

```js
const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    port: 8001,
  },
})
```

### 基座接入乾坤

[qiankun官方文档](https://qiankun.umijs.org/zh/guide/getting-started)
```bash
npm i qiankun -S
```
