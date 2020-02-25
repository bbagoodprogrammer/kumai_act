import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);
const store = new Vuex.Store({
    state: {
        actStatus: 0, //活动状态，默认未开始
        registered: false, // 用户是否报名
        isLoading: 0, //loading效果
        isShare: false, //分享
        showCom: 'rank1',
        box: {},  //宝箱狀態
        rankGroups: {},
        msgGroups: {},
        second: 0
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
        changShowCom(state, val) {
            state.showCom = val
        },
        changBox(state, val) {
            state.box = val
        },
        changInvide_sign(state, val) {
            state.msgGroups['rank1'].userMsg.invide_sign = val
        },
        changSecond(state, val) {
            state.second = val
        },
        updateRankGroups(state, obj) {
            if (obj && typeof obj.key != 'undefined') {
                const key = obj.key;
                delete obj['key'];
                state.rankGroups = Object.assign({}, state.rankGroups, { [key]: Object.assign({}, state.rankGroups[key], obj) });
            }
            console.log(state.rankGroups)
        },
        updateMsgGroups(state, obj) {
            if (obj && typeof obj.key != 'undefined') {
                const key = obj.key;
                delete obj['key'];
                state.msgGroups = Object.assign({}, state.msgGroups, { [key]: Object.assign({}, state.msgGroups[key], obj) });
            }
            console.log(state.msgGroups)
        },
        addRank1(state, val) {
            if (state.rankGroups['rank1'].rank.length < 5) {
                state.rankGroups['rank1'].rank = state.rankGroups['rank1'].rank.concat(val)
            }
        },
        addRank2(state, val) {
            if (state.rankGroups['rank2'].rank.length < 20) {
                state.rankGroups['rank2'].rank = state.rankGroups['rank2'].rank.concat(val)
            }
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