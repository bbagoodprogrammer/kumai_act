import '../../css/main.scss'

import Vue from 'vue'
import Page from './Page'

// import lang from './lang';

// window._lang = lang;

Vue.config.productionTip = false

new Vue({
    el: '#app',
    components: { Page },
    render: h => h(Page)
})