import '../../css/main.scss'

import 'es6-promise/auto';
import 'regenerator-runtime/runtime';
import Vue from 'vue';
import App from '../../components/PageSetting';
import store from '../../store';
// import DirectivePlugin from '../../utils/directive';
// Vue.use(DirectivePlugin);


import 'vant/lib/index.css';
import { Swipe, SwipeItem, Popup } from 'vant';

Vue.use(Popup);
Vue.use(Swipe);
Vue.use(SwipeItem);

Vue.config.productionTip = false;

Vue.mixin({
    computed: {
        lang: () => _lang,
        images: () => _images,
    },
})

new Vue({
    el: '#app',
    store,
    components: { App },
    // template: '<App/>'
    render: h => h(App)
});