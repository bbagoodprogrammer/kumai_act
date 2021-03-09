import Vue from "vue";
import vuex from "vuex";
import downTime from "../utils/downTime";
Vue.use(vuex);

export default new vuex.Store({
    state: {
        loading: false,
        share: true,
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
        speciesObj: {},
        first: true,
        seed: 0,
        seed1: 0,
        hoping: 0,
        chance: 0,
        schuleList: {},
        step: 1,
        stime: 0,
        etime: 0,
        load: 0,
        reg: false,
        tab: 1,
        userRank: {
            info: {}
        },
        land_id: 0,
        task_day_gift: {},
        day_flower: 0,
        task_day: 0,
        charge_get: false,
        charge: 0,
        extension: 0
    },
    mutations: {
        setextension(state, val) {
            state.extension = val;
        },
        setCharge_get(state, val) {
            state.charge_get = val;
        },
        setCharge(state, val) {
            state.charge = val;
        },
        setDay_flower(state, val) {
            state.day_flower = val;
        },
        setTask_day(state, val) {
            state.task_day = val;
        },
        updateLoading(state, value) {
            state.loading = value;
        },
        setShareState(state, val) {
            state.share = val;
        },
        setLandInfo(state, val) {
            let arr = {
                1: {
                    land_id: 1, // 地id 0~8指定九块地 种植时带上
                    seed: 0, // 0-未种植 1-种植的是普通种子 2-种植的是疯狂种子
                    second: 0, // 倒计时秒数
                    value: 0, // 收成值
                    status: -1 // 0-未种植 1-成长中 2-可收成
                },
                2: {
                    land_id: 2,
                    seed: 0,
                    second: 0,
                    value: 0,
                    status: -1
                },
                3: {
                    land_id: 3,
                    seed: 0,
                    second: 0,
                    value: 0,
                    status: -1
                },
                4: {
                    land_id: 4,
                    seed: 0,
                    second: 0,
                    value: 0,
                    status: -1
                },
                5: {
                    land_id: 5,
                    seed: 0,
                    second: 0,
                    value: 0,
                    status: -1
                },
                6: {
                    land_id: 6,
                    seed: 0,
                    second: 0,
                    value: 0,
                    status: -1
                },
                7: {
                    land_id: 7,
                    seed: 0,
                    second: 0,
                    value: 5,
                    status: -1
                },
                8: {
                    land_id: 8,
                    seed: 0,
                    second: 0,
                    value: 100,
                    status: -1
                },
                9: {
                    land_id: 9,
                    seed: 0,
                    second: 0,
                    value: 110,
                    status: -1
                }
            };
            let newArr = Object.assign({}, arr, val);
            console.log(newArr);
            //此处合并数据
            // var newArr = arr.map((item, index) => {
            //     return { ...item, ...val[index] };
            // });
            for (let i in newArr) {
                const obj = newArr[i];
                const timeKey = "land" + obj.land_id;
                // console.log(obj.second);
                downTime(timeKey, obj.second);
            }
            state.land_info = newArr;
        },
        updateLandInfo(state, obj) {
            if (obj && typeof obj.land_id == "number") {
                const oldInfo = state.land_info[obj.land_id];
                if (oldInfo) {
                    const newInfo = Object.assign({}, oldInfo, obj);
                    Vue.set(state.land_info, obj.land_id, newInfo);
                }
            }
            console.log(state.land_info);
        },
        resetLandSteps(state, exceptionId) {
            for (let i in state.land_info) {
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
        setSpeciesObj(state, val) {
            state.speciesObj = val;
        },
        setFirst(state, val) {
            state.first = val;
        },
        setSeed(state, val) {
            state.seed = val;
        },
        setSeed1(state, val) {
            state.seed1 = val;
        },
        setHoping(state, val) {
            state.hoping = val;
        },
        reduxSeed(state, val) {
            console.log(val);
            if (val.type == 1) {
                state.seed -= val.nums;
            } else if (val.type == 2) {
                state.seed1 -= val.nums;
            } else {
                state.hoping -= val.nums;
            }
            console.log(state.seed, state.seed1, state.hoping);
        },
        addSeed(state, val) {
            if (val.type == 1) {
                state.seed += val.nums;
            } else if (val.type == 2) {
                state.seed1 += val.nums;
            } else {
                state.hoping += val.nums;
            }
            console.log(state.seed, state.seed1, state.hoping);
        },
        addLuckSeed(state, val) {
            if (val[0]) {
                state.seed += val[0];
            }
            if (val[2]) {
                state.hoping += val[2];
            }
        },
        setTaskStatus(state, val) {
            state.schuleList[val].status = true;
        },
        setChance(state, val) {
            state.chance = val;
        },
        addChance(state, val) {
            state.chance += val;
        },
        setSchule(state, val) {
            state.schuleList = val;
        },
        setStime(state, val) {
            state.stime = val;
        },
        setEtime(state, val) {
            state.etime = val;
        },
        setStep(state, val) {
            state.step = val;
        },

        setLoad(state, val) {
            state.load = val;
        },
        setReg(state, val) {
            state.reg = val;
        },
        setTab(state, val) {
            state.tab = val;
        },
        setUserRank(state, val) {
            state.userRank = val;
        },
        setExtension(state, val) {
            state.land_id = val;
        },
        setTask_day_gift(state, val) {
            state.task_day_gift = val;
        },
        setGiftStatus(state, val) {
            state.task_day_gift[val].get = true;
        },
        reduxChance(state, val) {
            state.chance -= val;
        }
    },
    actions: {}
});
