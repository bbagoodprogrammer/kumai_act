import Vue from 'vue'
import Router from 'vue-router'

import Index from '../components/Index'
import PageSetting from "../components/PageSetting"


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
        }
    ]
})