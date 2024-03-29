import './css/main.scss'

import 'es6-promise/auto'
import 'regenerator-runtime/runtime'
import Vue from 'vue'
import App from './App'
import store from './store'
import router from './router'
import { replaceLang } from './utils';

// import LuckDraw from 'vue-luck-draw'
// Vue.use(LuckDraw)

import { DatetimePicker } from 'vant';
import 'vant/lib/index.css';
import { Popup } from 'vant';
Vue.use(Popup);

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
        lang: () => _lang,
        images: () => _images,
    },
    methods: {
        replaceLang,
    },
})

new Vue({
    el: '#app',
    store,
    router,
    components: { App },
    render: h => h(App)
})