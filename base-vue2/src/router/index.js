import BasePage1 from '../components/BasePage1.vue'
import BasePage2 from '../components/BasePage2.vue'
import HelloWorld from '../components/HelloWorld.vue'

const routes = [
  { path: '/page1', component: BasePage1 },
  { path: '/page2', component: BasePage2 },
  { path: '/', component: HelloWorld },
]

export default routes
