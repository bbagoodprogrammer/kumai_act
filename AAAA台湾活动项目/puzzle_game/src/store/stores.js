import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);
const store = new Vuex.Store({
    state: {
        actStatus: 0, //活动状态，默认未开始
        userMsg: {},
        isLoading: 0, //loading效果
        isShare: false, //分享
        praise_area: [],  //给我点赞的人
        rank: [],
        puzzle_total_counts: 0,
        puzzle_list: []
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
        changPraise_area(state, val) {
            state.praise_area = val
        },
        changRank(state, val) {
            state.rank = val
        },
        changPuzzle_total_counts(state, val) {
            state.puzzle_total_counts = val
        },
        changPuzzle_list(state, val) {
            state.puzzle_list = val
        },
        singUped(state, val) {
            state.userMsg = val
            if (state.rank.length < 20) {
                state.rank.push(val)
            }
        },
        getFragment(state, val) {
            for (let item in val) {
                state.puzzle_list[item] += val[item]
            }
        },
        reducePoints(state, val) {
            state.userMsg.integral -= val
        },
        addUserRank(state, val) {
            state.rank = state.rank.concat(val)
        },
        addTotal_count(state) {
            state.puzzle_total_counts += 1
            for (let item in state.puzzle_list) {
                state.puzzle_list[item]--
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