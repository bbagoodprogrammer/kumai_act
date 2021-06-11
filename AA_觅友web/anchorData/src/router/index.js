import Vue from 'vue'
import Router from 'vue-router'

import Index from '../components/Index'
import Task from '../components/Task'
import Data from '../components/Data'

import Bind from '../components/Bind'
import Apply from '../components/Apply'
import Result from '../components/Result'

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
            path: '/task',
            name: 'task',
            component: Task,
            meta: {
                title: _lang.title
            }
        },
        {
            path: '/data',
            name: 'data',
            component: Data,
            meta: {
                title: _lang.page_data
            }
        },
        {
            path: '/bind',
            name: 'bind',
            component: Bind,
            meta: {
                title: _lang.page_bind
            }
        },
        {
            path: '/apply',
            name: 'apply',
            component: Apply,
            meta: {
                title: _lang.page_apply
            }
        },
        // {
        //     path: '/agreement',
        //     name: 'agreement',
        //     component: _agreement,
        //     meta: {
        //         title: _lang.page_agreement
        //     }
        // },
        {
            path: '/result',
            name: 'result',
            component: Result,
            meta: {
                title: _lang.page_apply
            }
        },
    ]
})