import Vue from "vue";
import Router from "vue-router";

import ArmBandit from "../components/ArmBandit.vue";
import history from "../components/history.vue";
Vue.use(Router);

export default new Router({
    routes: [
        {
            path: "/",
            name: "index",
            component: ArmBandit,
            meta: {
                title: _lang.title
            }
        },
        {
            path: "/history",
            name: "history",
            component: history,
            meta: {
                title: _lang.title
            }
        }
    ]
});
