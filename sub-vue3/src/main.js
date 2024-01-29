import { createApp } from 'vue'
import App from './App.vue'
import routes from './router/index.js'
import { createRouter, createWebHistory } from 'vue-router'

let app = null
let router = null

function render({ container } = {}) {
  console.log('🚀 ~ container:', container)
  app = createApp(App)
  router = createRouter({
    history: createWebHistory(
      window.__POWERED_BY_QIANKUN__ ? '/sub-vue3' : '/'
    ),
    routes,
  })
  console.log('🚀 ~ router:', router)
  app.use(router)
  app.mount(container ? container.querySelector('#app') : '#app')
}

console.log(
  '🚀 ~ window.__POWERED_BY_QIANKUN__:',
  window.__POWERED_BY_QIANKUN__
)

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
  router = null
}

// 可选生命周期钩子，仅使用 loadMicroApp 方式加载微应用时生效
export async function update(props) {
  console.log('vue3 update props', props)
}
