import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);
const store = new Vuex.Store({
    state: {
        isLoading: 0, //loading效果
        isShare: false, //分享
        activite: null,  // 活动状态
        userState: 0,  //用户是否报名
        userMsg: {
            score: 0
        }, //用户信息
        second: 0, //可领取星星状态
        red_rnvelope: {}, // 红包状态
        userRank: [], // 排行榜
        order: null,  //是否预约
        countedList: [], //瓜分红包记录
        gift_star: 0,
        historyList: []
    },
    mutations: {
        isLoaging(state, boolean) {
            boolean ? ++state.isLoading : --state.isLoading
        },
        changShareState(state, boolean) {
            state.isShare = boolean
        },
        changeActivite(state, val) {
            state.activite = val
        },
        changeuserMsg(state, val) {
            state.userMsg = val
        },
        changeSecond(state, val) {
            state.second = val
        },
        changered_rnvelope(state, val) {
            state.red_rnvelope = val
        },
        changeuserRank(state, val) {
            state.userRank = val
        },
        changeorder(state, val) {
            state.order = val
        },
        changecountedList(state, val) {
            state.countedList = val
        },
        changeuserState(state, val) {
            state.userState = val
        },
        changGift_star(state, val) {
            state.gift_star = val
        },
        addMymsg: (state, val) => {  //添加进数组尾部
            state.userRank.push(val)
        },
        addListStare: (state, i) => {
            state.userRank[i].score += 1
            state.red_rnvelope.star_counts += 1
        },
        addVipStart(state, i) {
            state.userRank[i].score += 189
            state.red_rnvelope.star_counts += 189
        },
        addGiftStart(state, giftStarObj) {
            state.userRank[giftStarObj.rank].score += giftStarObj.startNum
            state.userMsg.score += giftStarObj.startNum
            state.red_rnvelope.star_counts += giftStarObj.startNum
        },
        changHistoryList(state, val) {
            state.historyList = val
        },
        addHistoryList(state, val) {
            state.historyList = state.historyList.concat(val)
        },
        changFirst(state, val) {
            state.userMsg.is_first = val
        }
    },
    actions: {
        setloading({ commit }, boolean) {
            commit('isLoaging', boolean)
        }
    },
    getters: {
        addscore(state) {
            return state.userMsg.score++
        },
        addscoreVip(state) {
            return state.userMsg.score += 189
        }
    }
})
export default store;