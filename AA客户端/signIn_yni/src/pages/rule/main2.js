// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'es6-promise/auto'
import Vue from 'vue'
import main2 from './main2.vue'


Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { main2 },
  render: h => h(main2)
})