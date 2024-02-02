import AboutPage from '../components/AboutPage.vue'
import HelloWorld from '../components/HelloWorld.vue'

const routes = [
  { name: 'home', path: '/', component: HelloWorld },
  {
    name: 'about',
    path: '/about',
    component: AboutPage,
  },
]

export default routes
