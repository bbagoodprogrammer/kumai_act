// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import '../../css/main.scss'
import 'regenerator-runtime/runtime'
import 'es6-promise/auto'
import Vue from 'vue'
import share from './share.vue'
import store from '../../store'
import VueLazyload from 'vue-lazyload'
// import lang from "../config/lang"
import { toast, vuexCommit } from "../../utils"
// Vue.prototype.lang = lang
Vue.prototype.toast = toast
Vue.prototype.vxc = vuexCommit
// Vue.prototype.vxc = common.vuexCommit
// Vue.prototype.ModalHelper = common.ModalHelper
//vue滑块
// import VueAwesomeSwiper from 'vue-awesome-swiper'
// import 'swiper/dist/css/swiper.css'
// Vue.use(VueAwesomeSwiper)
Vue.config.productionTip = false
Vue.use(VueLazyload, {
    preLoad: 1.3,
    error: require('../../img/default.png'),
    loading: require('../../img/default.png'),
    attempt: 1
})

Vue.mixin({
    computed: {
        lang: () => _lang,
        images: () => _images,
    },
    methods: {
        // replaceLang,
    },
})
/* eslint-disable no-new */
new Vue({
    el: '#app',
    store,
    components: { share },
    render: h => h(share)
    // template: '<App/>'
})
