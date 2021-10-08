import './css/main.scss'

import 'es6-promise/auto'
import 'regenerator-runtime/runtime'
import Vue from 'vue'
import App from './App'
import store from './store'
import router from './router'
import { getUrlString, replaceLang, replaceLangBR, profile } from './utils';

Vue.config.productionTip = false

router.beforeEach((to, from, next) => {
    if (to.meta && to.meta.title) {
        document.title = to.meta.title;
    }
    if (to.matched.length) {
        next();
    } else {
        router.replace('/');
    }
})

Vue.mixin({
    computed: {
        app: () => _app,
        local: () => _local,
        lang: () => _lang,
        images: () => _images,
        isShare: () => !getUrlString('token'),
        rtl() {
            return ['ar', 'ur'].indexOf(_local) != -1;
        },
    },
    methods: {
        replaceLang,
        replaceLangBR,
        profile,
    },
})

new Vue({
    el: '#app',
    store,
    router,
    components: { App },
    render: h => h(App)
})