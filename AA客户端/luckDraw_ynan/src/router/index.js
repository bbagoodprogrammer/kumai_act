import Vue from 'vue'
import Router from 'vue-router'

import PageMain from '../PageMain'
import PageRule from '../PageRule'
import PageHistory from '../PageHistory'
import PageHistoryDetail from '../PageHistoryDetail'

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            name: 'main',
            component: PageMain,
        },
        {
            path: '/rule',
            name: 'rule',
            component: PageRule,
        },
        {
            path: '/history',
            name: 'history',
            component: PageHistory,
        },
        {
            path: '/history/detail',
            name: 'historyDetail',
            component: PageHistoryDetail,
        },
    ]
})