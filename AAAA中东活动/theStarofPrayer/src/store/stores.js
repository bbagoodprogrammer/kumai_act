import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);
const store = new Vuex.Store({
    state: {
        isLoading: 0, //loading效果
        isShare: false, //分享
        activeityState: null, //活动状态
        registered: true,
        taskState: {},  //四个任务状态
        taskReceive: {}, //四个礼包领取状态
        totalSpirit: null,  //精灵球总数
        shouliMsg: {},   //收礼榜单个人数据
        shouliRank: [],   //收礼榜单数据
        songliMsg: {},   //送礼个人信息
        songliRank: [],  //送礼榜单
        nowTab: 'giving', //当前tab
    },
    mutations: {
        isLoaging(state, boolean) {
            boolean ? ++state.isLoading : --state.isLoading
        },
        changShareState(state, boolean) {
            state.isShare = boolean
        },
        changActiveityState(state, val) {
            state.activeityState = val
        },
        changRegistered(state, val) {
            state.registered = val
        },
        changTaskState(state, val) {
            state.taskState = val
        },
        changTaskReceive(state, val) {
            state.taskReceive = val
        },
        changTotalSpirit(state, val) {
            state.totalSpirit = val
        },
        changShouliMsg(state, val) {
            state.shouliMsg = val
        },
        changShouliRank(state, val) {
            state.shouliRank = val
        },
        changSongliMsg(state, val) {
            state.songliMsg = val
        },
        changSongliRank(state, val) {
            state.songliRank = val
        },
        changNowTab(state, val) {
            state.nowTab = val
        },
        addSpirit(state, key) {
            state.totalSpirit += Number(key)
            state.shouliMsg.spirit_counts += Number(key)
            state.songliMsg.spirit_counts += Number(key)
        },
        reduceSpirit(state, obj) {
            state.shouliMsg.spirit_counts--
            state.songliMsg.spirit_counts--
            state.shouliRank[obj.index0].score += Number(obj.prayer_score)
        },
        setPackReceive(state, val) {
            state.taskReceive[val] = 1
        },
        setSignInState(state) {
            state.taskState.sign.is_finish = 1
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