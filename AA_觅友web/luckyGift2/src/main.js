import './css/main.scss';

import 'es6-promise/auto';
import 'regenerator-runtime/runtime';
import Vue from 'vue';
import VueLazyLoad from 'vue-lazyload';
import App from './App';
import store from './store';
import { replaceLang, replaceLangBR } from './utils';
// import DirectivePlugin from './utils/directive';
// Vue.use(DirectivePlugin);

Vue.use(VueLazyLoad, {
    error: require('./img/avatar.png'),
    loading: require('./img/avatar.png'),
});

Vue.config.productionTip = false;

Vue.mixin({
    computed: {
        lang: () => _lang,
        images: () => _images,
    },
    methods: {
        replaceLang,
        replaceLangBR,
    },
})

new Vue({
  el: '#app',
  store,
  components: { App },
  render: h => h(App)
});