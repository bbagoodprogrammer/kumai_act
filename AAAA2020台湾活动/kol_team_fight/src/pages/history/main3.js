// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import main3 from './main3.vue'
import store from "../../store/stores"
import VueLazyload from 'vue-lazyload'
import lang from "../../config/lang"
import common from "../../utils/common"
Vue.prototype.lang = lang
Vue.prototype.toast = common.toast
Vue.prototype.vxc = common.vuexCommit
Vue.prototype.ModalHelper = common.ModalHelper
Vue.config.productionTip = false
Vue.use(VueLazyload, {
    preLoad: 1.3,
    error: require('../../assets/img/default.png'),
    loading: require('../../assets/img/default.png'),
    attempt: 1
})
/* eslint-disable no-new */
new Vue({
    el: '#app',
    store,
    components: { main3 },
    render: h => h(main3)
    // template: '<main3/>'
})