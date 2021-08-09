import Vue from "vue";
import vuex from "vuex";
import { loadData, getInitInfo } from "../apis";

Vue.use(vuex);

export default new vuex.Store({
    state: {
        stime: 0,
        etime: 0,
        activity: {},
        loading: false,
        target_score: 0,
        titles: {},
        rankGroups: {}, //储存當天的信息
        rankGroups_history: {},
        groupsUserMsg: {}, //儲存各種天數的個人信息
        activity_status: 0,
        popup: {},
        owner: {},
        record: [],
        daily_top: [],
        tab: 0,
        gift_list: [],
        user_coins: 0,
        go_count: 0,
        record: [],
        date_str: "",
        init: -1
    },
    mutations: {
        updateLoading(state, value) {
            state.loading = value;
        },
        setGo_count(state, val) {
            console.log(val);
            state.go_count = val;
        },
        changTab(state, val) {
            state.tab = val;
        },
        setGift_list(state, val) {
            state.gift_list = val;
        },
        setUser_coins(state, val) {
            state.user_coins = val;
        },
        setInitInfo(state, data) {
            Object.assign(state, data);
            state.init = 1;
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
        },
        updateRankGroups_history(state, obj) {
            if (obj && typeof obj.key != "undefined") {
                const key = obj.key;
                delete obj["key"];
                state.rankGroups_history = Object.assign(
                    {},
                    state.rankGroups_history,
                    {
                        [key]: Object.assign(
                            {},
                            state.rankGroups_history[key],
                            obj
                        )
                    }
                );
            }
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
