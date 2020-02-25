import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);
const store = new Vuex.Store({
    state: {
        actStatus: 0, //活动状态，默认未开始
        groupMsg: {}, //团队个人信息
        groupRank: [],//团队榜单
        peopleMsg: {}, //用户个人信息
        peopleRank: [], //用户个人榜单
        isLoading: 0, //loading效果
        isShare: false, //分享
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
        changGroupMsg(state, val) {
            state.groupMsg = val
            if (state.groupRank.length < 5) {
                state.groupRank.push(val)
            }
        },
        changGroupRank(state, val) {
            state.groupRank = val
        },
        addGroupRank(state, val) {
            state.groupRank = state.groupRank.concat(val)
        },
        changPeopleMsg(state, val) {
            state.peopleMsg = val
        },
        changPeopleRank(state, val) {
            state.peopleRank = val
        },
        addPeopleRank(state, val) {
            state.peopleRank = state.peopleRank.concat(val)
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