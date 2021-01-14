import Vue from 'vue'
import Router from 'vue-router'

import Index from '../components/Index'
import Share from '../components/Share'


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
            path: '/Share',
            name: 'Share',
            component: Share,
            meta: {
                title: _lang.share_title
            }
        }
    ]
})