import Vue from "vue";
import vuex from "vuex";
import { loadData, getInitInfo } from "../apis";

Vue.use(vuex);

export default new vuex.Store({
    state: {
        days_rank: [],
        activity: {},
        loading: false,
        rankGroups: {}, //储存當天的信息
        groupsUserMsg: {},
        first: true,
        tab: 0,
        records: []
    },
    mutations: {
        updateLoading(state, value) {
            state.loading = value;
        },
        changTab(state, val) {
            state.tab = val;
        },
        setInitInfo(state, data) {
            Object.assign(state, data);
            state.first = false;
        },
        updateRankGroups(state, obj) {
            if (obj && typeof obj.key != "undefined") {
                const key = obj.key;
                delete obj["key"];
                state.rankGroups = Object.assign({}, state.rankGroups, {
                    [key]: Object.assign({}, state.rankGroups[key], obj)
                });
            }
        },
        changGroupsUserMsg(state, obj) {
            if (obj && typeof obj.key != "undefined") {
                const key = obj.key;
                delete obj["key"];
                state.groupsUserMsg = Object.assign({}, state.groupsUserMsg, {
                    [key]: Object.assign({}, state.groupsUserMsg[key], obj)
                });
            }
            console.log(state.groupsUserMsg);
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
