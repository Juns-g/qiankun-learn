import Vue from 'vue'
import routes from './router/index.js'
import Router from 'vue-router'
import App from './App.vue'
import { registerMicroApps, start } from 'qiankun'
import { subApps, lifeCycles } from './qiankun.js'
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

// 注册
registerMicroApps(subApps, lifeCycles)
// 启动微服务
start({
  sandbox: {
    strictStyleIsolation: false,
    experimentalStyleIsolation: true,
  },
})
