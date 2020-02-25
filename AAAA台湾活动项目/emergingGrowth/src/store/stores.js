import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);
const store = new Vuex.Store({
    state: {
        isLoading: 0, //loading效果
        isShare: false, //分享
        activeityState: null, //活动状态
        packets: [], //礼包列表
        score: 0, //用户积分
        tasks: [], // 任务列表
        registered: null, //用户是否报名
        roomId: 0
    },
    mutations: {
        isLoaging(state, boolean) {
            boolean ? ++state.isLoading : --state.isLoading
        },
        changShareState(state, boolean) {
            state.isShare = boolean
        },
        changactiveitySta(state, val) {
            state.activeityState = val
        },
        changPackets(state, val) {
            state.packets = val
        },
        changScore(state, val) {
            state.score = val
        },
        changTasks(state, val) {
            state.tasks = val
        },
        changRegistered(state, val) {
            state.registered = val
        },
        changRoomId(state, val) {
            state.roomId = val
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