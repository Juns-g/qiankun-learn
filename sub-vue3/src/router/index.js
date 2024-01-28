import AboutPage from '../components/AboutPage.vue'
import HelloWorld from '../components/HelloWorld.vue'
import { createRouter, createWebHistory } from 'vue-router'

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

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
