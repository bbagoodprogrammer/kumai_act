import Vue from "vue";
import vuex from "vuex";
import { loadData, getInitInfo } from "../apis";

Vue.use(vuex);

export default new vuex.Store({
    state: {
        activity: {},
        defaultTop1: {
            avatar: "",
            nick: false,
            score: "?????",
            count: "?"
        },
        loading: false,
        days_top: {},
        rank: [],
        synthesis: {},
        rankGroups: {}, //储存當天的信息
        groupsUserMsg: {},
        owner: {},
        tab: 0,
        notices: []
    },
    mutations: {
        setTab(state, val) {
            state.tab = val;
        },
        updateLoading(state, value) {
            state.loading = value;
        },
        setInitInfo(state, data) {
            Object.assign(state, data);
            console.log(state);
        },
        updateRankGroups(state, obj) {
            if (obj && typeof obj.key != "undefined") {
                const key = obj.key;
                delete obj["key"];
                state.rankGroups = Object.assign({}, state.rankGroups, {
                    [key]: Object.assign({}, state.rankGroups[key], obj)
                });
            }
            console.log(state.rankGroups);
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
