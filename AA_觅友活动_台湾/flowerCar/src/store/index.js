import Vue from "vue";
import vuex from "vuex";
import { loadData, getInitInfo } from "../apis";

Vue.use(vuex);

export default new vuex.Store({
    state: {
        loading: false,
        records: [],
        tab: 0,
        showType: 1,
        tasks: {},
        activity: {},
        cars: [],
        owner: {},
        rankGroups: {
            1: {},
            2: {}
        },
        groupsUserMsg: {
            1: {},
            2: {}
        } //儲存各種天數的個人信息
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
        setTasks(state, val) {
            state.tasks = val;
        },
        setInitInfo(state, data) {
            Object.assign(state, data);
            let obj = {
                type: 1,
                data: {
                    //当前日榜信息
                    key: 0,
                    loadCount: 1,
                    loadEnd: data.rank.length < 20 ? true : false,
                    loading: false,
                    none: data.rank.length ? false : true,
                    list: data.rank
                    // second: response_data.data.current_time
                }
            };
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
            //当天日榜个人信息
            let userObj = {
                type: 1,
                data: {
                    //当前日榜信息
                    key: 0,
                    msg: data.owner
                }
            };
            const key2 = userObj.data.key;
            delete userObj["key"];
            state.groupsUserMsg[userObj.type] = Object.assign(
                {},
                state.groupsUserMsg[userObj.type],
                {
                    [key2]: Object.assign(
                        {},
                        state.groupsUserMsg[userObj.type][key2],
                        userObj.data
                    )
                }
            );
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
            // console.log(state.rankGroups, obj);
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
