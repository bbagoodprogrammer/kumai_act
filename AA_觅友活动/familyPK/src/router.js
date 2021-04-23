import Vue from 'vue'
import Router from 'vue-router'

import Index from './views/Index.vue'
import FamilyList from './views/FamilyList.vue'
import Rule from './views/Rule.vue'

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
            path: '/family',
            name: 'family',
            component: FamilyList,
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