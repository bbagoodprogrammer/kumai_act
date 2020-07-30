// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import '../../assets/scss/common.scss'
import Vue from 'vue'
import Page from './Page.vue'
import 'es6-promise/auto'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { Page },
  render: h => h(Page)
  // template: '<Page/>'
})