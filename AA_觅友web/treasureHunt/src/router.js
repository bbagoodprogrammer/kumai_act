import Vue from 'vue'
import Router from 'vue-router'

import Home from './views/Home.vue'
import Record from './views/Record.vue'
import Explain from './views/Explain.vue'
import Exchange from './views/Exchange.vue'
import HuntList from './views/HuntList.vue'

Vue.use(Router)

const router = new Router({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'Home',
      // component: () => import(/* webpackChunkName: "home" */'./views/Home')
      component: Home
    },
    {
      path: '/record',
      name: 'Record',
      // component: () => import(/* webpackChunkName: "record" */'./views/Record')
      component: Record
    },
    {
      path: '/explain',
      name: 'Explain',
      // component: () => import(/* webpackChunkName: "explain" */'./views/Explain')
      component: Explain
    },
    {
      path: '/exchange',
      name: 'Exchange',
      // component: () => import(/* webpackChunkName: "exchange" */'./views/Exchange.vue')
      component: Exchange
    },
    {
      path: '/list',
      name: 'HuntList',
      // component: () => import(/* webpackChunkName: "list" */'./views/HuntList.vue')
      component: HuntList
    },
  ]
})

router.beforeEach((to, from, next) => {
  if (to.matched.length) {
    next()
  } else {
    router.replace('/')
  }
})

export default router
