import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);
const store = new Vuex.Store({
    state: {
        actStatus: 0, //活动状态，默认未开始
        isLoading: 0, //loading效果
        isShare: false, //分享
        rank: [],
        owner_msg: {},
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
        setRank(state, val) {
            state.rank = val
        },
        setOwner_msg(state, val) {
            state.owner_msg = val
        },
        setSingUp(state, val) {
            state.owner_msg = val
            if (state.rank.length < 20) {
                state.rank.push(val)
            }
        },
        setSecond(state, val) {
            state.second = val
        },
        addRank(state, val) {
            state.rank = state.rank.concat(val)
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