import Vue from 'vue'
import Router from 'vue-router'

import Index from '../components/Index'
import PageSetting from "../components/PageSetting"
import PageHistory from "../components/PageHistory"
import PageHistoryDetail from '../components/PageHistoryDetail'
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
            path: '/PageSetting',
            name: 'PageSetting',
            component: PageSetting,
            meta: {
                title: _lang.title
            }
        },
        {
            path: '/qustion',
            name: 'qustion',
            component: _agreement,
            meta: {
                title: _lang.title
            }
        },
        {
            path: '/history',
            name: 'history',
            component: PageHistory,
            meta: {
                title: _lang.title
            }
        },
        {
            path: '/history/detail',
            name: 'historyDetail',
            component: PageHistoryDetail,
        },
    ]
})