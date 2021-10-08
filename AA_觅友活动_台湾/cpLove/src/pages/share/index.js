import '../../css/main.scss'

import 'es6-promise/auto'
import 'regenerator-runtime/runtime'
import Vue from 'vue'
import Page from './Page'
import store from '../../store'

Vue.config.productionTip = false

Vue.mixin({
  computed: {
      lang: () => _lang,
      images: () => _images,
  },
  methods: {
    
  },
})

new Vue({
  el: '#app',
  store,
  components: { Page },
  render: h => h(Page)
})