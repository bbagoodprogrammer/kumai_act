import "./css/main.scss";

import "es6-promise/auto";
import "regenerator-runtime/runtime";
import Vue from "vue";
import share from "./components/Share.vue";
import store from "./store";
import { replaceLang, vuexCommit, toast, ModalHelper } from "./utils";

Vue.prototype.toast = toast;
Vue.prototype.vxc = vuexCommit;
Vue.prototype.ModalHelper = ModalHelper;

Vue.config.productionTip = false;

// router.beforeEach((to, from, next) => {
//     if (to.meta && to.meta.title) {
//         document.title = to.meta.title;
//     }
//     if (to.matched.length) {
//         next();
//     } else {
//         router.replace("/");
//     }
// });

Vue.mixin({
    computed: {
        lang: () => _lang,
        images: () => _images
    },
    methods: {
        replaceLang
    }
});

new Vue({
    el: "#app",
    store,
    components: { share },
    render: h => h(share)
});
