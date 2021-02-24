import './css/main.scss';

import 'es6-promise/auto';
import 'regenerator-runtime/runtime';
import Vue from 'vue';
// import VueLazyLoad from 'vue-lazyload';
import App from './App';
import store from './store';

// Vue.use(VueLazyLoad, {
//     error: require('./img/avatar.png'),
//     loading: require('./img/avatar.png'),
// });

Vue.config.productionTip = false;

new Vue({
  el: '#app',
  store,
  components: { App },
  render: h => h(App)
});