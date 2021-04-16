import Vue from "vue";
import Router from "vue-router";

import Blindbox from "../components/Blindbox";
import History from "../components/History.vue";
Vue.use(Router);

export default new Router({
    routes: [
        {
            path: "/",
            name: "Blindbox",
            component: Blindbox,
            meta: {
                title: _lang.title
            }
        },
        {
            path: "/history",
            name: "History",
            component: History,
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
