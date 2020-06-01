// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import main4 from './main4.vue'
import store from "../../store/stores"

Vue.config.productionTip = false
import lang from "../../config/lang"
Vue.prototype.lang = lang
/* eslint-disable no-new */
new Vue({
    el: '#app',
    store,
    components: { main4 },
    template: '<main4/>'
})