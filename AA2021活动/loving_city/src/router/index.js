import Vue from "vue";
import Router from "vue-router";

import Index from "../components/Index";
import PeopleList from "../components/PeopleList.vue";
import UserList from "../components/UserList.vue";

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
            path: "/PeopleList",
            name: "PeopleList",
            component: PeopleList,
            meta: {
                title: _lang.title
            }
        },
        {
            path: "/UserList",
            name: "UserList",
            component: UserList,
            meta: {
                title: _lang.title
            }
        },
        {
            path: "/rule",
            name: "rule",
            component: _agreement,
            meta: {
                title: _lang.title
            }
        }
    ]
});
