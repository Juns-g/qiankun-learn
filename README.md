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

vue2 和 vue3 都使用的 VueCli 构建
vue2 使用端口 8000，vue3 使用端口 8001, react 使用端口 8002

```js
// vue2
const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    port: 8000,
  },
})
```

```js
// vue3
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
```

### 基座接入乾坤

[qiankun 官方文档](https://qiankun.umijs.org/zh/guide/getting-started)

```bash
pnpm i qiankun -S
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

引入 vue-router，给子应用提供容器

```vue
// App.vue
<template>
  <div id="app">
    <div class="links">
      <router-link to="/page1">Go to base vue2 Page1</router-link>
      <router-link to="/page2">Go to base vue2 Page2</router-link>
      <router-link to="/">Go to base vue2 HelloWorld</router-link>
      <router-link to="/sub-vue3">Go to /sub-vue3</router-link>
      <button @click="goVue3">去vue3子应用 独立访问</button>
    </div>
    <router-view />
    <div id="sub-app" />
  </div>
</template>
```

### vue3 子应用接入

> 不用引入 qiankun，直接修改配置即可

入口文件导出生命周期钩子，并针对不同情况渲染不同内容。
比如在 qiankun 环境（嵌入主应用时）渲染在 props.container 里面的#app，否则渲染在#app。

```js
import { createApp } from 'vue'
import App from './App.vue'

let app = null

function render({ container } = {}) {
  app = createApp(App)
  app.mount(container ? container.querySelector('#app') : '#app')
}

if (!window.__POWERED_BY_QIANKUN__) {
  render()
}

export async function bootstrap() {
  console.log('vue3 bootstrap')
}

export async function mount(props) {
  console.log('vue3 mount props', props)
  render(props)
}

export async function unmount(props) {
  console.log('vue3 unmount props', props)
  app.unmount('#sub-app')
  app._container.innerHTML = ''
  app = null
}

// 可选生命周期钩子，仅使用 loadMicroApp 方式加载微应用时生效
export async function update(props) {
  console.log('vue3 update props', props)
}
```

webpack 配置更改，需要允许跨域，并修改打包配置

```js
// vue.config.js
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
      library: 'sub-vue3',
      // 库格式必须是 umd
      libraryTarget: 'umd', // 把子应用打包成 umd 库格式
      // jsonpFunction: `webpackJsonp_${name}`,
      chunkLoadingGlobal: `webpackJsonp_sub_vue3`,
    },
  },
})
```

## 问题记录
