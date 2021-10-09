import Vue from "vue";
import Router from "vue-router";

import Index from "../components/Index";

Vue.use(Router);
import Rule from "../components/Rule";
import CreatAct from "../components/CreatAct";

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
            path: "/Rule",
            name: "Rule",
            component: Rule,
            meta: {
                title: _lang.title
            }
        },
        {
            path: "/CreatAct",
            name: "CreatAct",
            component: CreatAct,
            meta: {
                title: _lang.title
            }
        }
    ]
});
