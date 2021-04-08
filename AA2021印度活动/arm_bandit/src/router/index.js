import Vue from "vue";
import Router from "vue-router";

import ArmBandit from "../components/ArmBandit";
// import Rule from "../components/Rule.vue";
Vue.use(Router);

export default new Router({
    routes: [
        {
            path: "/",
            name: "ArmBandit",
            component: ArmBandit,
            meta: {
                title: _lang.title
            }
        },
        {
            path: "/rule",
            name: "rule",
            component: _rule,
            meta: {
                title: _lang.title
            }
        }
    ]
});
