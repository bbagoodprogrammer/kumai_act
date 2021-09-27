import Vue from 'vue'
import App from './App.vue'
import router from './router'
import VueLazyLoad from 'vue-lazyload';
import './utils/flexible.js'
import './assets/reset.css'
import store from './store'

Vue.config.productionTip = false
Vue.use(VueLazyLoad, {
  error: require('./assets/images/default.png'),
  loading: require('./assets/images/default.png'),
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
