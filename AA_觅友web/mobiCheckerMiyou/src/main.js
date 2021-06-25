import './css/main.scss'

import 'es6-promise/auto'
import 'regenerator-runtime/runtime'
import Vue from 'vue'
import App from './App'
import store from './store'
import { replaceLang } from './utils'

Vue.config.productionTip = false

Vue.mixin({
    computed: {
        lang: () => _lang,
    },
    methods: {
        replaceLang,
    },
})

new Vue({
    el: '#app',
    store,
    components: { App },
    render: h => h(App)
})