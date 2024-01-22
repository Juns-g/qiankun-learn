import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import {
  renderWithQiankun,
  qiankunWindow,
} from 'vite-plugin-qiankun/dist/helper'

let app: any
if (!qiankunWindow.__POWERED_BY_QIANKUN__) {
  createApp(App).mount('#sub-vue-app')
} else {
  renderWithQiankun({
    mount(props) {
      console.log('🚀 ~ mount:', props)
      app = createApp(App)
      app.mount('#sub-vue-app')
    },
    unmount() {
      console.log('🚀 ~ unmount:', app)
      app.unmount('#sub-vue-app')
      app._container.innerHTML = ''
      app = null
    },
    bootstrap() {
      console.log('🚀 ~ bootstrap')
    },
    update() {
      console.log('🚀 ~ update')
    },
  })
}
