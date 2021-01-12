import Vue from 'vue'
import Router from 'vue-router'

import Index from '../components/Index'
import Chione from '../components/Chione'
import History from "../components/History"

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
            path: '/Chione',
            name: 'Chione',
            component: Chione,
            meta: {
                title: _lang.title
            }
        },
        {
            path: '/History',
            name: 'History',
            component: History,
            meta: {
                title: _lang.history_title
            }
        }
    ]
})