// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import main2 from "./main2.vue";
import lang from "../../config/lang";
Vue.prototype.lang = lang;

Vue.config.productionTip = false;
import store from "../../store/stores";
/* eslint-disable no-new */
new Vue({
  el: "#app",
  store,
  components: { main2 },
  render: h => h(main2)
});
