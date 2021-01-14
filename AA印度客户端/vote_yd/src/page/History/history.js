// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'regenerator-runtime/runtime'
import Vue from 'vue'
import history from './history.vue'
import '../../css/main.scss'
import VueLazyload from 'vue-lazyload'
import { toast } from "../../utils"
import store from "../../store"
Vue.prototype.toast = toast
// Vue.prototype.vxc = common.vuexCommit
// Vue.prototype.ModalHelper = common.ModalHelper
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
    // methods: {
    //   replaceLang,
    // },
})
/* eslint-disable no-new */
new Vue({
    el: '#app',
    store,
    components: { history },
    render: h => h(history)
    // template: '<history/>'
})