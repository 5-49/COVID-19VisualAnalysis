import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    children:[
      {
        path: '/demo',
        name: 'Demo',
        component: () => import('../views/demo.vue')
      }

    ]
  },
]

const router = new VueRouter({
  routes
})

export default router
