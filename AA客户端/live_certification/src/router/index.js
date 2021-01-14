import Vue from 'vue'
import Router from 'vue-router'

import Index from '../components/Index'
import skill from '../components/skill'
import NotQualified from "../components/NotQualified"
import LiveCover from "../components/LiveCover"


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
        },
        {
            path: '/NotQualified',
            name: 'NotQualified',
            component: NotQualified,
            meta: {
                title: _lang.page_skill_title
            }
        },
        {
            path: '/LiveCover',
            name: 'LiveCover',
            component: LiveCover,
            meta: {
                title: _lang.page_skill_title
            }
        },
        // {
        //     path: '/standard',
        //     name: 'standard',
        //     component: standard,
        //     meta: {
        //         title: _lang.page_skill_title
        //     }
        // },
    ]
})