import Vue from 'vue'
import routes from './router/index.js'
import Router from 'vue-router'
import App from './App.vue'

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
