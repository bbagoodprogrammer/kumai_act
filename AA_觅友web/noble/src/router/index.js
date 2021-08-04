import Vue from "vue";
import Router from "vue-router";

import Index from "../components/Index";
import Explain from "../components/Explain.vue";

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
            path: "/explain",
            name: "explain",
            component: Explain,
            meta: {
                title: _lang.title
            }
        }
    ]
});
