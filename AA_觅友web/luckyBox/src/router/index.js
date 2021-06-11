import Vue from 'vue'
import Router from 'vue-router'

import Index from '../components/Index'
import Rule from '../components/Rule'

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            name: 'index',
            component: Index,
            meta: {
                title: _lang.title
            }
        },
        {
            path: '/rule',
            name: 'rule',
            component: Rule,
            meta: {
                title: _lang.title
            }
        },
    ]
})