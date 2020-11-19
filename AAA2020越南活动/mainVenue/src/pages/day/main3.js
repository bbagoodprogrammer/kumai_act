// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import main3 from './main3.vue'
import store from "../../store/stores"
import common from "../../utils/common"

Vue.prototype.toast = common.toast
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
    el: '#app',
    store,
    components: { main3 },
    render: h => h(main3)
})