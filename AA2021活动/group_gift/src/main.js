import './css/main.scss'

import 'es6-promise/auto'
import 'regenerator-runtime/runtime'
import Vue from 'vue'
import App from './App'
import store from './store'
import VueLazyload from 'vue-lazyload'
import router from './router'
import { replaceLang, vuexCommit, toast, ModalHelper } from './utils';

import 'vant/lib/index.css';
import { Swipe, SwipeItem, Popup } from 'vant';


Vue.use(Popup);
Vue.use(Swipe);
Vue.use(SwipeItem);

Vue.prototype.toast = toast
Vue.prototype.vxc = vuexCommit
Vue.prototype.ModalHelper = ModalHelper

Vue.config.productionTip = false


Vue.use(VueLazyload, {
    preLoad: 1.3,
    error: require('./img/default.png'),
    loading: require('./img/default.png'),
    attempt: 1
})

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