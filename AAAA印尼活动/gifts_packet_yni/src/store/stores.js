import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);
const store = new Vuex.Store({
    state: {
        actStatus: 0, //活动状态，默认未开始
        owner: {},//个人信息
        owner2: {},
        isLoading: 0, //loading效果
        isShare: false, //分享
        rankGroups: {},
        isOne: true,
        time: 0,
        tab: 0
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
        setOwner(state, val) {
            state.owner = val
        },
        setIsOne(state, val) {
            state.isOne = val
        },
        setTime(state, val) {
            state.time = val
        },
        setOwner(state, val) {
            state.owner = val
        },
        setUserMsg2(state, val) {
            state.owner2 = val
        },
        setTab(state, val) {
            state.tab = val
        },
        setOwer(state, val) {
            state.owner.registered = true
            state.owner.rank = val.rank
            state.owner.score = val.score
            state.owner2.rank = val.rank2
            state.owner2.score = val.score2
            if (state.rankGroups[0].list.length < 20) {
                state.rankGroups[0].list.push(val)
            } else if (state.rankGroups[1] && state.rankGroups[1].list.length < 20) {
                state.rankGroups[1].list.push(val)
            }
        },
        updateRankGroups(state, obj) {
            if (obj && typeof obj.key != 'undefined') {
                const key = obj.key;
                delete obj['key'];
                state.rankGroups = Object.assign({}, state.rankGroups, { [key]: Object.assign({}, state.rankGroups[key], obj) });
            }
        },
    },
    actions: {
        setloading({ commit }, boolean) {
            commit('isLoaging', boolean)
        }
    },
    getters: {}
})
export default store;