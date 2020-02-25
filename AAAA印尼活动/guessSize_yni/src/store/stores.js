import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);
const store = new Vuex.Store({
    state: {
        actStatus: 0, //活动状态，默认未开始
        owner_msg: {
            b: 0
        }, // 用户是否报名
        isLoading: 0, //loading效果
        isShare: false, //分享
        actPoints1: {},//一阶段选中
        actPoints2: {},//二阶段选中的
        actPoints3: {},//三阶段选中的
        bettingRecord: [],//投注中奖记录
        bettingHistory: [],//兑换历史记录
        downTime: null, //开奖倒计时
        hours: null, //开奖时
        bet_countsp: 0,//投注人数
        total_bet_b: 0,//本厂投注额
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
        changOwner_msg(state, val) {
            state.owner_msg = val
        },
        changeActPoints1(state, val) {
            state.actPoints1 = val
        },
        changeActPoints2(state, val) {
            state.actPoints2 = val
        },
        changeActPoints3(state, val) {
            state.actPoints3 = val
        },
        changeIsBetting(state, val) {
            state.owner_msg.bets = val.betChange
            state.owner_msg.b -= Number(val.totalCoins)
            state.bet_countsp += 1
            state.total_bet_b += val.totalCoins
        },
        singUp(state) {
            state.owner_msg.is_reg = 1
        },
        changBettingRecord(state, val) {
            state.bettingRecord = val
        },
        addBettingRecord(state, val) {
            state.bettingRecord = state.bettingRecord.concat(val)
        },
        changCoins(state, val) {
            state.owner_msg.b = val
        },
        changDownTime(state, val) {
            state.downTime = val
        },
        changHours(state, val) {
            state.hours = val
        },
        changBet_countsp(state, val) {
            state.bet_countsp = val
        },
        changBettingHistory(state, val) {
            state.bettingHistory = val
        },
        addBettingHistory(state, val) {
            state.bettingHistory = state.bettingHistory.concat(val)
        },
        changTotal_bet_b(state, val) {
            state.total_bet_b = val
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