import Vue from 'vue'
import VueRouter from 'vue-router'

import login from './modules/login'
import homePage from './modules/homePage'

Vue.use(VueRouter)

const routes = [
  login,
  homePage
]

const router = new VueRouter({
  scrollBehavior: () => ({ y: 0 }),
  routes
})

export default router
