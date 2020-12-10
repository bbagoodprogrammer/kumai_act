// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'es6-promise/auto'
import Vue from 'vue'
import App from './App'
import store from './store/stores.js'
import VueLazyload from 'vue-lazyload'
import lang from "./config/lang"
import common from "./utils/common"
Vue.prototype.lang = lang
Vue.prototype.toast = common.toast
Vue.prototype.vxc = common.vuexCommit
Vue.prototype.ModalHelper = common.ModalHelper
//vue滑块
// import VueAwesomeSwiper from 'vue-awesome-swiper'
// import 'swiper/dist/css/swiper.css'
// Vue.use(VueAwesomeSwiper)
Vue.config.productionTip = false
Vue.use(VueLazyload, {
  preLoad: 1.3,
  error: require('./assets/img/default.png'),
  loading: require('./assets/img/default.png'),
  attempt: 1
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  components: { App },
  render: h => h(App)
  // template: '<App/>'
})
