import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { registerMicroApps, start } from 'qiankun'

createApp(App).mount('#app')

// 子应用列表
const apps = [
  /* {
    name: 'sub-react',
    entry: '//localhost:8000',
    // entry: { scripts: ['//localhost:8000/main.js'] },
    container: '#sub-app',
    activeRule: '/sub-react',
  }, */
  {
    name: 'sub-vue',
    entry: '//localhost:7000',
    container: '#sub-app',
    activeRule: '/sub-vue',
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
registerMicroApps(apps, lifeCycles)
// 启动微服务
start()
