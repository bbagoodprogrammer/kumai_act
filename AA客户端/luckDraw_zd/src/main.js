import './css/main.scss';

import 'es6-promise/auto';
import 'regenerator-runtime/runtime';
import Vue from 'vue';
import VueLazyLoad from 'vue-lazyload';
import App from './App';
import store from './store';
import router from './router';
import DirectivePlugin from './utils/directive';
Vue.use(DirectivePlugin);

Vue.config.productionTip = false;

Vue.use(VueLazyLoad, {
    error: require('./img/avatar.png'),
    loading: require('./img/avatar.png'),
});

router.beforeEach((to, from, next) => {
    if (to.meta && to.meta.title) {
        document.title = to.meta.title;
    }
    if (to.matched.length) {
        next();
    } else {
        router.replace('/');
    }
});

new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  render: h => h(App)
});