import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);
const store = new Vuex.Store({
    state: {
        actStatus: 0, //活动状态，默认未开始
        userMsg: {}, // 用户是否报名
        isLoading: 0, //loading效果
        isShare: false, //分享
        my_record: [],  //刮獎數據
        shakeAni: false, //任务抖动动画
        oLuckIng: false, // 正在抽奖
        showLinght: false, // 光效动画
        tasks: {}
    },
    mutations: {
        isLoaging(state, boolean) {
            boolean ? ++state.isLoading : --state.isLoading
        },
        changShareState(state, boolean) {
            state.isShare = boolean
        },
        changActStatus(state, val) {
            state.actStatus = val
        },
        changUserMsg(state, val) {
            state.userMsg = val
        },
        setMy_record(state, val) {
            state.my_record = val
        },
        setLickIng(state, val) {
            state.oLuckIng = val
        },
        addMy_record(state, val) {
            state.my_record.push(val)
            state.userMsg.chances--
            if (val.tid == 7) {
                state.userMsg.chances += 2
            }
            if (state.my_record.length == 9) {
                // setTimeout(() => {
                //     state.showLinght = true
                // }, 500)
                // setTimeout(() => {
                //     state.showLinght = false
                //     state.my_record = []
                // }, 1500)
            }
            if (val.tid == 8) {
                // state.shakeAni = true
                // setTimeout(() => {
                //     state.shakeAni = false
                // }, 1500)
                state.userMsg.invited_new += 1
            }
        },
        setAnmiate(state, val) {
            if (val.tid == 8) {
                setTimeout(() => {
                    state.shakeAni = true
                }, 0)
                setTimeout(() => {
                    state.shakeAni = false
                }, 2500)
            }
            if (state.my_record.length == 9) {
                setTimeout(() => {
                    state.showLinght = true
                }, 200)
                setTimeout(() => {
                    state.showLinght = false
                    state.my_record = []
                }, 1200)
            }
        },
        setTasks(state, val) {
            state.tasks = val
        },
        setSuc(state, val) {
            state.tasks[val].status = 2
        },
        addLuckNum(state) {
            state.userMsg.lottery_times++
        }
    },
    actions: {
        setloading({ commit }, boolean) {
            commit('isLoaging', boolean)
        }
    },
    getters: {}
})
export default store;