import Vue from "vue";
import vuex from "vuex";
import { loadData, getInitInfo } from "../apis";
import downTime from "../utils/downTime";
Vue.use(vuex);

export default new vuex.Store({
    state: {
        activity: {},
        inviters: [],
        portal: 0,
        loading: false,
        owner_msg: {
            avatar: "",
            nick: "兔子女郎",
            total_score: 6500,
            total_rank: 65,

            radish: 3000,
            praise: 1000,

            rabbit_lv: 3,

            free_seed: 10,
            crazy_seed: 30
        },
        land_info: [],
        owner: {
            medals: []
        },
        isMain: 1, // 1 主态  2客态
        rankGroups: {}, //储存當天的信息
        groupsUserMsg: {},
        otherUser: {},
        is_friend: false,
        notices: [],
        rankGroups_history: {}
    },
    mutations: {
        addSun(state, val) {
            state.owner.sun += val * 1;
            state.owner.score += val * 1;
        },
        setIs_friend(state, val) {
            state.is_friend = val;
        },
        setOtherUser(state, val) {
            state.otherUser = val;
        },
        setIsMain(state, val) {
            state.isMain = val;
        },
        updateLoading(state, value) {
            state.loading = value;
        },
        setInitInfo(state, data) {
            Object.assign(state, data);
            Vue.set(state.rankGroups, 0, {
                key: 0,
                loadCount: 0,
                loadEnd: false,
                loading: false,
                none: false,
                list: data.rank
            });
        },
        setLandInfo(state, val) {
            let arr = {
                1: {
                    id: 1, // 地id 0~8指定九块地 种植时带上
                    end_seconds: 0, // 倒计时秒数
                    value: 0, // 收成值
                    status: 0, //土地狀態：0=未擴建，1=已擴建（未種植），2=已種植，3=已成熟
                    protect_seconds: 0,
                    prize: {},
                    seed: {}
                },
                2: {
                    id: 2,
                    end_seconds: 0,
                    value: 0,
                    status: 0,
                    protect_seconds: 0,
                    prize: {},
                    seed: {}
                },
                3: {
                    id: 3,
                    end_seconds: 0,
                    value: 0,
                    status: 0,
                    protect_seconds: 0,
                    prize: {},
                    seed: {}
                },
                4: {
                    id: 4,
                    end_seconds: 0,
                    value: 0,
                    status: 0,
                    protect_seconds: 0,
                    prize: {},
                    seed: {}
                },
                5: {
                    id: 5,
                    end_seconds: 0,
                    value: 0,
                    status: 0,
                    protect_seconds: 0,
                    prize: {},
                    seed: {}
                },
                6: {
                    id: 6,
                    end_seconds: 0,
                    value: 5,
                    status: 0,
                    protect_seconds: 0,
                    prize: {},
                    seed: {}
                },
                7: {
                    id: 7,
                    end_seconds: 0,
                    value: 100,
                    status: 0,
                    protect_seconds: 0,
                    prize: {},
                    seed: {}
                },
                8: {
                    id: 8,
                    end_seconds: 0,
                    value: 110,
                    status: 0,
                    protect_seconds: 0,
                    prize: {},
                    seed: {}
                },
                9: {
                    id: 9,
                    end_seconds: 0,
                    value: 110,
                    status: 0,
                    protect_seconds: 0,
                    prize: {},
                    seed: {}
                },
                10: {
                    id: 10,
                    end_seconds: 0,
                    value: 110,
                    status: 0,
                    protect_seconds: 0,
                    prize: {},
                    seed: {}
                }
            };
            let newArr = Object.assign({}, arr, val);
            for (let i in newArr) {
                const obj = newArr[i];
                const timeKey = "land" + obj.id;
                const protectKey = "protect" + obj.id;
                if (obj.end_seconds > 0) {
                    downTime(timeKey, Number(obj.end_seconds) + 1);
                } else {
                    downTime(timeKey, obj.end_seconds);
                }

                downTime(protectKey, obj.protect_seconds);
            }

            state.land_info = newArr;
        },
        updateLandInfo(state, obj) {
            if (obj && typeof obj.id == "number") {
                const oldInfo = state.land_info[obj.id];
                if (oldInfo) {
                    const newInfo = Object.assign({}, oldInfo, obj);
                    Vue.set(state.land_info, obj.id, newInfo);
                }
            }
        },
        resetLandSteps(state, exceptionId) {
            for (let i = 0; i < state.land_info.length; i++) {
                if (typeof exceptionId == "number" && exceptionId == i) {
                    continue;
                }
                const newObj = Object.assign({}, state.land_info[i], {
                    empty: 1
                });
                Vue.set(state.land_info, i, newObj);
            }
        },
        addRadish(state, newRadishCount) {
            if (state.owner_msg) {
                const radish = state.owner_msg.radish + newRadishCount;
                state.owner_msg = Object.assign({}, state.owner_msg, {
                    radish
                });
            }
        },
        updateNormalSeed(state, num = -1) {
            if (state.owner_msg) {
                const free_seed = state.owner_msg.free_seed + num;
                state.owner_msg = Object.assign({}, state.owner_msg, {
                    free_seed
                });
            }
        },
        updateCrazySeed(state, num = -1) {
            if (state.owner_msg) {
                const crazy_seed = state.owner_msg.crazy_seed + num;
                state.owner_msg = Object.assign({}, state.owner_msg, {
                    crazy_seed
                });
            }
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
            console.log(state.rankGroups_history);
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
