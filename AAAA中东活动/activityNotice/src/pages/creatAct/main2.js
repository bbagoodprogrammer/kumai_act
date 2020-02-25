// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import main2 from './main2.vue'


Vue.config.productionTip = false
import 'vant/lib/index.css';
import vant from 'vant'
// import 'amfe-flexible'
Vue.use(vant)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { main2 },
  template: '<main2/>'
})