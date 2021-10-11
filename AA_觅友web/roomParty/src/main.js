import "./css/main.scss";

import "es6-promise/auto";
import "regenerator-runtime/runtime";
import Vue from "vue";
import App from "./App";
import store from "./store";
import router from "./router";
import { replaceLang, vuexCommit, toast } from "./utils";
import VueLazyLoad from "vue-lazyload";
import DatetimePicker from "vant/lib/datetime-picker";
import "vant/lib/datetime-picker/style";
import popup from "vant/lib/popup";
import "vant/lib/popup/style";
Vue.use(DatetimePicker);
Vue.use(popup);

Vue.use(VueLazyLoad, {
    error: require("./img/default.png"),
    loading: require("./img/default.png")
});

Vue.config.productionTip = false;
Vue.prototype.toast = toast;
Vue.prototype.vxc = vuexCommit;

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
