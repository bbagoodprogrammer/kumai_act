import Vue from 'vue'
import App from './App.vue'
import router from './router'
// import VueLazyLoad from 'vue-lazyload';
import './utils/flexible.js'

Vue.config.productionTip = false
// Vue.use(VueLazyLoad, {
//   error: require('./assets/images/default.png'),
//   loading: require('./assets/images/default.png'),
// });

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
