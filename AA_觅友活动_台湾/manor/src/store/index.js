import Vue from "vue";
import vuex from "vuex";
import downTime from "../utils/downTime";
Vue.use(vuex);

export default new vuex.Store({
    state: {
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
        setLandInfo(state, arr) {
            arr = [
                {
                    land_id: 0, // 地id 0~8指定九块地 种植时带上
                    seed: 0, // 0-未种植 1-种植的是普通种子 2-种植的是疯狂种子
                    second: 0, // 倒计时秒数
                    value: 0, // 收成值
                    status: 0 // 0-未种植 1-成长中 2-可收成
                },
                {
                    land_id: 1,
                    seed: 0,
                    second: 0,
                    value: 0,
                    status: 0
                },
                {
                    land_id: 2,
                    seed: 0,
                    second: 0,
                    value: 0,
                    status: 0
                },
                {
                    land_id: 3,
                    seed: 0,
                    second: 0,
                    value: 0,
                    status: 0
                },
                {
                    land_id: 4,
                    seed: 0,
                    second: 0,
                    value: 0,
                    status: 0
                },
                {
                    land_id: 5,
                    seed: 0,
                    second: 0,
                    value: 0,
                    status: 0
                },
                {
                    land_id: 6,
                    seed: 0,
                    second: 0,
                    value: 5,
                    status: 0
                },
                {
                    land_id: 7,
                    seed: 0,
                    second: 0,
                    value: 100,
                    status: 0
                },
                {
                    land_id: 8,
                    seed: 0,
                    second: 0,
                    value: 110,
                    status: 0
                },
                {
                    land_id: 9,
                    seed: 0,
                    second: 0,
                    value: 110,
                    status: 0
                }
            ];

            for (let i = 0; i < arr.length; i++) {
                const obj = arr[i];
                const timeKey = "land" + obj.land_id;
                console.log(obj.second);
                downTime(timeKey, obj.second);
            }
            state.land_info = arr;
        },
        updateLandInfo(state, obj) {
            if (obj && typeof obj.land_id == "number") {
                const oldInfo = state.land_info[obj.land_id];
                if (oldInfo) {
                    const newInfo = Object.assign({}, oldInfo, obj);
                    Vue.set(state.land_info, obj.land_id, newInfo);
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
    actions: {}
});
