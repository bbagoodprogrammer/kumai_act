import Vue from "vue";
import vuex from "vuex";
import { loadData, getInitInfo } from "../apis";

Vue.use(vuex);

export default new vuex.Store({
    state: {
        loading: false,
        step: 1,
        rankGroups: {
            1: {},
            2: {},
            3: {}
        },
        groupsUserMsg: {
            1: {},
            2: {},
            3: {}
        }, //儲存各種天數的個人信息
        showType: 1,
        tab: 1
    },
    mutations: {
        updateLoading(state, value) {
            state.loading = value;
        },
        setShowType(state, val) {
            state.showType = val;
        },
        changTab(state, val) {
            state.tab = val;
        },
        setInitInfo(state, data) {
            Object.assign(state, data);
        },
        updateGroupsUserMsg(state, obj) {
            if (obj && typeof obj.data.key != "undefined") {
                const key = obj.data.key;
                delete obj["key"];
                state.groupsUserMsg[obj.type] = Object.assign(
                    {},
                    state.groupsUserMsg[obj.type],
                    {
                        [key]: Object.assign(
                            {},
                            state.groupsUserMsg[obj.type][key],
                            obj.data
                        )
                    }
                );
            }
            console.log(state.groupsUserMsg);
        },
        updateRankGroups(state, obj) {
            if (obj && typeof obj.data.key != "undefined") {
                const key = obj.data.key;
                delete obj["key"];
                state.rankGroups[obj.type] = Object.assign(
                    {},
                    state.rankGroups[obj.type],
                    {
                        [key]: Object.assign(
                            {},
                            state.rankGroups[obj.type][key],
                            obj.data
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
