import Vue from "vue";
import Router from "vue-router";

import Index from "../components/Index";
// import History from "../components/History.vue";
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
        }
        // {
        //     path: "/history",
        //     name: "history",
        //     component: History,
        //     meta: {
        //         title: _lang.title
        //     }
        // }
    ]
});
