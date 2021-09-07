import Vue from "vue";
import vuex from "vuex";
import { loadData, getInitInfo } from "../apis";
import downTime from "../utils/downTime";
Vue.use(vuex);

export default new vuex.Store({
    state: {
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
        land_info: []
    },
    mutations: {
        updateLoading(state, value) {
            state.loading = value;
        },

        setInitInfo(state, data) {
            Object.assign(state, data);
        },
        setLandInfo(state, val) {
            let arr = {
                1: {
                    id: 1, // 地id 0~8指定九块地 种植时带上
                    end_seconds: 0, // 倒计时秒数
                    value: 0, // 收成值
                    status: 0, //土地狀態：0=未擴建，1=已擴建（未種植），2=已種植，3=已成熟
                    protect_seconds: 0
                },
                2: {
                    id: 2,
                    end_seconds: 0,
                    value: 0,
                    status: 0,
                    protect_seconds: 0
                },
                3: {
                    id: 3,
                    end_seconds: 0,
                    value: 0,
                    status: 0,
                    protect_seconds: 0
                },
                4: {
                    id: 4,
                    end_seconds: 0,
                    value: 0,
                    status: 0,
                    protect_seconds: 0
                },
                5: {
                    id: 5,
                    end_seconds: 0,
                    value: 0,
                    status: 0,
                    protect_seconds: 0
                },
                6: {
                    id: 6,
                    end_seconds: 0,
                    value: 5,
                    status: 0,
                    protect_seconds: 0
                },
                7: {
                    id: 7,
                    end_seconds: 0,
                    value: 100,
                    status: 0,
                    protect_seconds: 0
                },
                8: {
                    id: 8,
                    end_seconds: 0,
                    value: 110,
                    status: 0,
                    protect_seconds: 0
                },
                9: {
                    id: 9,
                    end_seconds: 0,
                    value: 110,
                    status: 0,
                    protect_seconds: 0
                },
                10: {
                    id: 10,
                    end_seconds: 0,
                    value: 110,
                    status: 0,
                    protect_seconds: 0
                }
            };
            let newArr = Object.assign({}, arr, val);
            for (let i in newArr) {
                const obj = newArr[i];
                const timeKey = "land" + obj.id;
                const protectKey = "protect" + obj.id;
                if (obj.end_seconds > 0) {
                    downTime(timeKey, obj.end_seconds);
                }
                if (obj.protect_seconds > 0) {
                    downTime(protectKey, obj.protect_seconds);
                }
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
