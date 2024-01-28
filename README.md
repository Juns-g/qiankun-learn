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

[qiankun 官方文档](https://qiankun.umijs.org/zh/guide/getting-started)

```bash
npm i qiankun -S
```

入口文件改造：

```js
import Vue from 'vue'
import routes from './router/index.js'
import Router from 'vue-router'
import App from './App.vue'
import { registerMicroApps, start } from 'qiankun'

Vue.config.productionTip = false
Vue.use(Router)

const router = new Router({
  routes,
  mode: 'history',
})

new Vue({
  render: h => h(App),
  router,
}).$mount('#app')

// qiankun子应用
const subApps = [
  {
    name: 'sub-vue3', // app name registered
    entry: '//localhost:8001',
    container: '#sub-app',
    activeRule: '/sub-vue3',
  },
]

// 生命周期
const lifeCycles = {
  beforeLoad: [
    async app => {
      console.log('beforeLoad', app)
    },
  ],
  beforeMount: [
    async app => {
      console.log('beforeMount', app)
    },
  ],
  afterMount: [
    async app => {
      console.log('afterMount', app)
    },
  ],
  beforeUnmount: [
    async app => {
      console.log('beforeUnmount', app)
    },
  ],
  afterUnmount: [
    async app => {
      console.log('afterUnmount', app)
    },
  ],
}

// 注册
registerMicroApps(subApps, lifeCycles)
// 启动微服务
start()
```

### vue3 子应用接入

入口文件导出生命周期钩子：

```js

```
