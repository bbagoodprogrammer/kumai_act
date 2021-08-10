import Vue from "vue";
import vuex from "vuex";
import { loadData, getInitInfo } from "../apis";

Vue.use(vuex);

export default new vuex.Store({
    state: {
        loading: false,
        user: {
            noble_level: 1,
            noble_value: 20000
        },
        level_list: {
            //等级列表，key是等级，value是贵族值
            "1": {
                value: 20000, // 等级列表
                name: "游侠",
                gid: -1
            },
            "2": {
                value: 100000,
                name: "骑士",
                gid: -1
            },
            "3": {
                value: 300000,
                name: "子爵",
                gid: -1
            },
            "4": {
                value: 800000,
                name: "伯爵",
                gid: -1
            },
            "5": {
                value: 1500000,
                name: "侯爵",
                gid: -1
            },
            "6": {
                value: 3000000,
                name: "公爵",
                gid: -1
            }
        }
    },
    mutations: {
        updateLoading(state, value) {
            state.loading = value;
        },

        setInitInfo(state, data) {
            Object.assign(state, data);
            console.log(state);
        }
    },
    actions: {
        async getInitInfo() {
            try {
                await loadData(getInitInfo, "setInitInfo");
            } catch (e) {
                console.log("getInitInfo", e);
            }
        }
    }
});
