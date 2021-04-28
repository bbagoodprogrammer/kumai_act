// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import main2 from './main2.vue'
import 'vant/lib/index.css';
import store from '../../store/stores.js'
Vue.config.productionTip = false
import { DatetimePicker } from 'vant';
Vue.use(DatetimePicker)
import common from "../../utils/common"
import lang from "../../config/lang"
Vue.prototype.lang = lang
Vue.prototype.toast = common.toast
Vue.prototype.vxc = common.vuexCommit
// import Vant from 'vant';
// import 'vant/lib/index.css';

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  components: { main2 },
  template: '<main2/>'
})