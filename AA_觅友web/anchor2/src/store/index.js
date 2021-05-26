import Vue from "vue";
import vuex from "vuex";
import { status } from "../config";
import { loadData, getGuildInfo } from "../apis";

Vue.use(vuex);

export default new vuex.Store({
    state: {
        loading: false,

        my_info: {},
        item_type_list: [],
        recommend_item_list: [],
        hot_item_list: null,

        //ccj
        rankGroups: {} //储存當天的信息
    },
    getters: {
        signed: state => {
            return state.status == status.SUCCESS;
        }
    },
    mutations: {
        updateLoading(state, value) {
            state.loading = value;
        },

        setInitInfo(state, data) {
            Object.assign(state, data);
        },
        setData(state, info) {
            state.my_info = info;
        },
        updateRankGroups(state, obj) {
            if (obj && typeof obj.key != "undefined") {
                const key = obj.key;
                delete obj["key"];
                state.rankGroups = Object.assign({}, state.rankGroups, {
                    [key]: Object.assign({}, state.rankGroups[key], obj)
                });
            }
        }
    },
    actions: {
        async getGuildInfo() {
            try {
                await loadData(getGuildInfo, "setData");
            } catch (e) {
                console.log("setData", e);
            }
        }
    }
});
