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
const name = require('./package.json').name
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
  },
})
```

现在可以发现子应用已经成功接入了，不过样式还有些问题
![vue3 子应用接入](https://pic.imgdb.cn/item/65b6142c871b83018a94333d.jpg)

### 样式调整

vue2 引入 elementUI，vue3 引入 elementPlus
详细如何引入不再赘述，遇到的问题会记录在 [问题记录](#问题记录) 里面

![vue2 引入 elementUI](https://pic.imgdb.cn/item/65b64ab2871b83018a669546.jpg)

![vue3 引入 element PLUS](https://pic.imgdb.cn/item/65b6502c871b83018a80fb77.jpg)

## 问题记录

### 父子应用路由问题

#### 问题描述

单独访问子应用 (localhost:8001) 路由都正常, 在父应用中访问子应用(localhost:8000/sub-vue3)出现路由报错`[Vue Router warn]: No match found for location with path "/sub-vue3"`

子应用路由配置如下:

```js
const routes = [
  { path: '/', component: HelloWorld },
  { path: '/about', component: AboutPage },
]
```

#### 分析

单独访问子应用，一切正常，但是嵌入基座去访问就无法显示页面。查看控制台报错，发现是路由匹配不到。也就是说，单独访问时路由`/about`对应页面正确，嵌入时`/sub-vue3/about`这个路由没有被正确匹配。

思路：区分当前是否单独访问，单独访问使用`/about`，qiankun 环境使用`/sub-vue3/about`，判断条件可以用 qiankun 在全局 window 注入的`window.__POWERED_BY_QIANKUN__`

#### 尝试解决

修改子应用的路由配置，qiankun 环境就统一添加前缀：

```js
let routes = [
  { path: '/', component: HelloWorld },
  { path: '/about', component: AboutPage },
]

if (window.__POWERED_BY_QIANKUN__) {
  routes = routes.map(route => ({
    ...route,
    path: `/sub-vue3${route.path}`,
  }))
}
```

问题解决，都符合预期

### 子应用样式覆盖基座问题

#### 问题描述

侧边栏和顶栏都是基座应用的，但是访问子应用时，子应用的同名样式覆盖掉了基座应用的样式。如下图：

![基座](https://pic.imgdb.cn/item/65b73351871b83018afccb68.jpg)

![子应用](https://pic.imgdb.cn/item/65b7337a871b83018afd5180.jpg)

#### 分析

样式污染的原因也不太复杂，在俩个应用中的类名重复了，而且没有隔离措施，所以就会导致样式覆盖的问题。思路也有一些，在基座应用中是直接写的样式(没有使用 scoped 或者导入的 css)，父子的同名样式都没有做隔离措施。

#### 方案

1. 父子应用 vue 文件开启 scoped
   直接把需要隔离禁止改变的样式写到单独对应的 vue 文件中，会自动帮我们加上 hash 来隔离样式。不过如果要在子应用中修改这部分样式的话，就会失败了。但是目的就是这样 🤣，就是不允许子应用修改这个样式。
2. 使用复杂的类名，人为避免类名重复
   可行，不过不靠谱。
3. 开启 qiankun 的 sandbox
   可行，不过没有详细了解会有哪些坑。他是直接把子应用放在了一个 [shadow dom](https://developer.mozilla.org/zh-CN/docs/Web/API/Web_components/Using_shadow_DOM) 里面了，这样也会有问题，父子的样式直接完全隔离了，而且基座无法操作到子应用的 dom 和样式。

#### 解决

最开始的目的是为了解决子应用的样式覆盖基座这个问题，因为项目如果大了之后，不可避免可能会出现类名重复，如果又凑巧没有开启 vue 自带的 scoped 或者人为做隔离措施的话，就容易导致这样的问题。

理想的方案还是直接父子完全样式隔离掉，所以说最好的方案还是直接使用 qiankun 的方案，不过 shadow-box 的坑还没有踩过，以及肯能会有事件冒泡相关的问题，所以暂时不采用。

> sandbox - boolean | { strictStyleIsolation?: boolean, experimentalStyleIsolation?: boolean } - 可选，是否开启沙箱，默认为 true。
>
> 默认情况下沙箱可以确保单实例场景子应用之间的样式隔离，但是无法确保主应用跟子应用、或者多实例场景的子应用样式隔离。当配置为 { strictStyleIsolation: true } 时表示开启严格的样式隔离模式。这种模式下 qiankun 会为每个微应用的容器包裹上一个 shadow dom 节点，从而确保微应用的样式不会对全局造成影响。
>
> 基于 ShadowDOM 的严格样式隔离并不是一个可以无脑使用的方案，大部分情况下都需要接入应用做一些适配后才能正常在 ShadowDOM 中运行起来（比如 react 场景下需要解决这些 问题，使用者需要清楚开启了 strictStyleIsolation 意味着什么。后续 qiankun 会提供更多官方实践文档帮助用户能快速的将应用改造成可以运行在 ShadowDOM 环境的微应用。
>
> 除此以外，qiankun 还提供了一个实验性的样式隔离特性，当 experimentalStyleIsolation 被设置为 true 时，qiankun 会改写子应用所添加的样式为所有样式规则增加一个特殊的选择器规则来限定其影响范围，因此改写后的代码会表达类似为如下结构：
>
> // 假设应用名是 react16
>
> ```css
> .app-main {
>   font-size: 14px;
> }
> div[data-qiankun-react16] .app-main {
>   font-size: 14px;
> }
> ```
>
> 注意: @keyframes, @font-face, @import, @page 将不被支持 (i.e. 不会被改写)

其中的 experimentalStyleIsolation 感觉是最为合适的选择，不过还处于实验性，所以需要关注一下 qiankun 这个 api 的之后更新。

最终采用的就是这个方案。

![问题解决](https://pic.imgdb.cn/item/65b73a9a871b83018a1250be.jpg)
