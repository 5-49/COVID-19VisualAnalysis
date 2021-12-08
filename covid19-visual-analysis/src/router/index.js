import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    redirect: '/world',
    children:[
      {
        path: '/demo',
        name: 'Demo',
        component: () => import('../views/demo.vue')
      },
      {
        path: '/china',
        name: 'China',
        component: () => import('../views/China.vue')
      },
      {
        path: '/world',
        name: 'World',
        component: () => import('../views/World.vue')
      },
      {
        path: '/test',
        name: 'Test',
        component: () => import('../views/test.vue')
      },
    ]
  },
]

const router = new VueRouter({
  routes
})

export default router
