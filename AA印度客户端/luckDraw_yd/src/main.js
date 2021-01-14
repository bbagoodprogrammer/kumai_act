import './css/main.scss'

import 'es6-promise/auto'
import 'regenerator-runtime/runtime'
import Vue from 'vue'
import App from './App'
import store from './store'
import router from './router'
import { replaceLang, toast } from './utils';
import VueLazyLoad from 'vue-lazyload';
import 'vant/lib/index.css';
import { Swipe, SwipeItem, Popup } from 'vant';

Vue.prototype.toast = toast

Vue.use(Popup);
Vue.use(Swipe);
Vue.use(SwipeItem);

Vue.use(VueLazyLoad, {
    error: require('./img/avatar.png'),
    loading: require('./img/avatar.png'),
});

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