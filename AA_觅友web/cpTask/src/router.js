import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const router = new Router({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import(/* webpackChunkName: "home" */'./views/Home')
    },
    {
      path: '/level',
      name: 'Level',
      component: () => import(/* webpackChunkName: "level" */'./views/Level')
    },
    {
      path: '/explain',
      name: 'Explain',
      component: () => import(/* webpackChunkName: "explain" */'./views/Explain')
    }
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
