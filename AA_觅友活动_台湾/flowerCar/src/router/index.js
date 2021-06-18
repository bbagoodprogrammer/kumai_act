import Vue from "vue";
import Router from "vue-router";

import Index from "../components/Index";

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: "/",
            name: "index",
            component: Index,
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
