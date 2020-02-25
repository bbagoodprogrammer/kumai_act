import Vue from 'vue';
import Vuex from 'vuex';
import { stat } from 'fs';

Vue.use(Vuex);
const store = new Vuex.Store({
    state: {
        actStatus: 0, //活动状态，默认未开始
        registered: false, // 用户是否报名
        isLoading: 0, //loading效果
        isShare: false, //分享
        rankGroups: {},
        Hi: null, //当前秒杀时间段
        clock_list: [],//当前时间段列表
        is_order: 0,   //当前场次是否预约
        user_msg: {},   //用户信息，剩余金币金豆等
        setInited: null,
        qid: null,

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
        changRegistered(state, val) {
            state.registered = val
        },
        updateRankGroups(state, obj) {
            if (obj && typeof obj.key != 'undefined') {
                const key = obj.key;
                delete obj['key'];
                state.rankGroups = Object.assign({}, state.rankGroups, { [key]: Object.assign({}, state.rankGroups[key], obj) });
            }
            console.log(state.rankGroups)
        },
        changHi(state, val) {
            state.Hi = val
        },
        changClock_list(state, val) {
            state.clock_list = val
        },
        changIs_order(state, val) {
            state.is_order = val
        },
        changUser_msg(state, val) {
            state.user_msg = val
        },
        changSetInited(state, val) {
            state.setInited = val
        },
        changQid(state, val) {
            state.qid = val
        },
        buySusses(state, val) {
            state.rankGroups[val.rankKey].list[val.rankIndex].buy_counts += val.gifNum * 1
            state.rankGroups[val.rankKey].list[val.rankIndex].stock -= val.gifNum * 1
            if (val.pay_type == 1) {
                state.user_msg.coins -= val.amount * 1
            } else {
                state.user_msg.beans -= val.amount * 1
            }
        },
        yuyueSuccess(state, val) {
            state.rankGroups[val].is_order = 1
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