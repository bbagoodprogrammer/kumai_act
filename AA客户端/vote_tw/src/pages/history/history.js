// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import history from './history.vue'
import '../../assets/scss/common.scss'
import VueLazyload from 'vue-lazyload'
import common from "../../utils/common"
import store from "../../store/stores"
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
    components: { history },
    render: h => h(history)
    // template: '<history/>'
})