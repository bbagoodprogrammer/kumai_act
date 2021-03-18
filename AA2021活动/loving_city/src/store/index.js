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
            2: {}
        },
        groupsUserMsg: {
            1: {},
            2: {}
        }, //儲存各種天數的個人信息
        showType: 1,
        tab: 0,
        firstInit: true,
        reg: false,
        isShare: true,
        is_kol: -1,
        top: [],
        stime: 0,
        etime: 0,
        ctime: 0
    },
    mutations: {
        updateLoading(state, value) {
            state.loading = value;
        },
        setShareState(state, val) {
            state.isShare = val;
        },
        setFirstInit(state, val) {
            state.firstInit = val;
        },
        setShowType(state, val) {
            state.showType = val;
        },
        changTab(state, val) {
            state.tab = val;
        },
        setInitInfo(state, data) {
            Object.assign(state, data);
            state.reg = data.myrank.registered;
            console.log(state);
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
        async getInitInfo(state) {
            try {
                await loadData(getInitInfo, "setInitInfo");
                state.commit("setFirstInit", false);
            } catch (e) {
                console.log("getInitInfo", e);
            }
        }
    }
});
