import Vue from 'vue'
import Router from 'vue-router'

import Index from '../components/Index'

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
            path: '/Rule',
            name: 'Rule',
            component: _agreement,
            meta: {
                title: _lang.rule_title
            }
        }
    ]
})