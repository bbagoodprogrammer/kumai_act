import Vue from 'vue'
import Router from 'vue-router'

import Index from '../components/Index'
import Rule from '../components/Rule'
import Record from '../components/Record.vue'
import RankGroups from '../components/RankGroups'
import ComeList from '../components/ComeList'

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
        {
            path: '/record',
            name: 'record',
            component: Record,
            meta: {
                title: _lang.title
            }
        },
        {
            path: '/rankGroups',
            name: 'rankGroups',
            component: RankGroups,
            meta: {
                title: _lang.title
            }
        },
        {
            path: '/comeList',
            name: 'comeList',
            component: ComeList,
            meta: {
                title: _lang.title
            }
        },
    ]
})