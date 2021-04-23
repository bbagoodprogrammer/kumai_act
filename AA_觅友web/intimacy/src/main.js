import './css/main.scss';

import 'es6-promise/auto';
import 'regenerator-runtime/runtime';
import Vue from 'vue';
import VueLazyLoad from 'vue-lazyload';
import App from './App';
import store from './store';
// import DirectivePlugin from './utils/directive';
// Vue.use(DirectivePlugin);

Vue.use(VueLazyLoad, {
    error: require('./img/default.png'),
    loading: require('./img/default.png'),
});

Vue.config.productionTip = false;

new Vue({
  el: '#app',
  store,
  components: { App },
  render: h => h(App)
});