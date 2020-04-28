import Vue from 'vue'
import VueRouter from 'vue-router'

import index from '../views/Index.vue'
import test from '../views/Test.vue'
import v2 from '../views/v2.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'index',
    component: index
  },
  {
    path: '/v2',
    name: 'v2',
    component: v2
  },
  {
    path: '/test',
    name: 'test',
    component: test
  }
]

const router = new VueRouter({
  //mode: 'history',
  base: process.env.BASE_URL,
  routes,
  scrollBehavior() {
    return { x: 0, y: 0 };
  },
})

export default router
