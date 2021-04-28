// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import main2 from './main2.vue'
import store from '../../store/stores.js'
import VueLazyload from 'vue-lazyload'
import common from "../../utils/common"
import promise from 'es6-promise'
import lang from "../../config/lang"
Vue.prototype.lang = lang
// import DatetimePicker from 'vant/lib/DatetimePicker ';
Vue.prototype.toast = common.toast
Vue.prototype.vxc = common.vuexCommit
//vue滑块
// import VueAwesomeSwiper from 'vue-awesome-swiper'
// import 'swiper/dist/css/swiper.css'
// Vue.use(VueAwesomeSwiper)
promise.polyfill()
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
  components: { main2 },
  template: '<main2/>'
})
