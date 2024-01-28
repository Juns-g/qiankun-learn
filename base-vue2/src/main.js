import Vue from 'vue'
import routes from './router/index.js'
import Router from 'vue-router'
import App from './App.vue'
import { registerMicroApps, start } from 'qiankun'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './index.css'

Vue.config.productionTip = false
Vue.use(Router)
Vue.use(ElementUI)

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
