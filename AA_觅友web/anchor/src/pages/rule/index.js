import '../../css/main.scss'

import Vue from 'vue'
import Page from './Page'

// import lang from './lang';

// window._lang = lang;

Vue.config.productionTip = false

Vue.mixin({
    computed: {
        lang: () => _lang,
        images: () => _images,
    },
    methods: {
        // replaceLang,
    },
})

new Vue({
    el: '#app',
    components: { Page },
    render: h => h(Page)
})