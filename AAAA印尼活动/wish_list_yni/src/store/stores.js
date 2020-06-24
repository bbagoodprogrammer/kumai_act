import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);
const store = new Vuex.Store({
    state: {
        actStatus: null, //活动状态，默认未开始
        registered: false, // 用户是否报名
        isLoading: 0, //loading效果
        isShare: false, //分享
        rankGroups: {},
        debutList: {},  //出道榜单
        // took: 0,//是否摘下心愿
        // count: 0,//可许愿次数
        userMsgState: {},// 用户信息
        history1: {},
        history2: {},
        history3: {},
        rankList1: [],
        rankList2: []
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
        delItem(state, delObj) {
            state.rankGroups[delObj.rankIndex].list.splice(delObj.listInedx, 1)
        },
        addTook(state) {
            state.userMsgState.took++
        },
        changTook(state, val) {
            state.userMsgState.took = val
        },
        changUserMsg(state, val) {
            state.userMsgState = val
        },
        updateRankGroups(state, obj) {
            if (obj && typeof obj.key != 'undefined') {
                const key = obj.key;
                delete obj['key'];
                state.rankGroups = Object.assign({}, state.rankGroups, { [key]: Object.assign({}, state.rankGroups[key], obj) });
            }
        },
        changHistory1(state, val) {
            state.history1 = val
        },
        changHistory2(state, val) {
            state.history2 = val
        },
        changHistory3(state, val) {
            state.history3 = val
        },
        getScore(state, val) {
            state.history1.list[val.index].score = val.score
        },
        addHistory1(state, val) {
            state.history1.list = state.history1.list.concat(val)
        },
        addHistory2(state, val) {
            state.history2.list = state.history2.list.concat(val)
        },
        addHistory3(state, val) {
            state.history3.list = state.history3.list.concat(val)
        },
        changRanklist1(state, val) {
            state.rankList1 = val
        },
        changRanklist2(state, val) {
            state.rankList2 = val
        },
        addRanklist1(state, val) {
            state.rankList1 = state.rankList1.concat(val)
        },
        addRanklist2(state, val) {
            state.rankList2.list = state.rankList2.list.concat(val)
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