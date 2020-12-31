// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import main5 from './main5.vue'
import store from "../../store/stores"

Vue.config.productionTip = false
import lang from "../../config/lang"
import common from "../../utils/common"

Vue.prototype.toast = common.toast
Vue.prototype.vxc = common.vuexCommit
Vue.prototype.lang = lang
/* eslint-disable no-new */

Vue.config.productionTip = false

new Vue({
    el: '#app',
    store,
    components: { main5 },
    render: h => h(main5)
})