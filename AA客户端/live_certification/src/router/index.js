import Vue from 'vue'
import Router from 'vue-router'

import Index from '../components/Index'
import skill from '../components/skill'


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
            path: '/skill',
            name: 'skill',
            component: skill,
            meta: {
                title: _lang.page_skill_title
            }
        }
    ]
})