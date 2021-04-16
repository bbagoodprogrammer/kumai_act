import "./css/main.scss";

import "es6-promise/auto";
import "regenerator-runtime/runtime";
import Vue from "vue";
import App from "./App";
import store from "./store/stores";
import VueLazyload from "vue-lazyload";
import router from "./router";
import { replaceLang, toast, vuexCommit } from "./utils";

Vue.prototype.toast = toast;
Vue.prototype.vuexCommit = vuexCommit;

Vue.config.productionTip = false;

Vue.use(VueLazyload, {
    preLoad: 1.3,
    error: require("./img/default.png"),
    loading: require("./img/default.png"),
    attempt: 1
});

router.beforeEach((to, from, next) => {
    if (to.meta && to.meta.title) {
        document.title = to.meta.title;
    }
    if (to.matched.length) {
        next();
    } else {
        router.replace("/");
    }
});

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
    router,
    components: { App },
    render: h => h(App)
});
