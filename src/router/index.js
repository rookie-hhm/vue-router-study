import VueRouter from '../vue-router'
import Vue from 'vue'
import Home from '../components/Home'
import HelloWorld from '../components/HelloWorld'
import About from '../components/About'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: HelloWorld
  },
  {
    path: '/A',
    component: Home,
    children: [
      {
        path: 'A1',
        component: { render (h) { return h('div', 'a1') }}
      }
    ]
  },
  {
    path: '/B',
    component: About,
    children: [
      {
        path: 'B1',
        component: { render (h) { return h('div', 'b1') }}
      }
    ]
  }
]
let router = new VueRouter({
  routes,
  mode: 'hash'
})

router.beforeEach((to, from, next) => {
  console.log('beforeEach', to, from)
  next()
})

router.afterEach((to, from) => {
  console.log(to, from, 'afterEach')
})

export default router