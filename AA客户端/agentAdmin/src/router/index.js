import Vue from 'vue'
import Router from 'vue-router'

import Login from '../components/Login'
import Admin from '../components/Admin'

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            name: 'login',
            component: Login,
            meta: {
                title: _lang.login_title
            }
        },
        {
            path: '/admin',
            name: 'admin',
            component: Admin,
            meta: {
                title: _lang.admin_title
            }
        },
    ]
})