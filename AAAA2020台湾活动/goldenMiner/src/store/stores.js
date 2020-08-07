import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);
const store = new Vuex.Store({
    state: {
        actStatus: 0, //活动状态，默认未开始
        userMsg: {}, // 用户是否报名
        isLoading: 0, //loading效果
        toast: false,   //彈窗
        toastTitle: '', // 彈窗標題
        toastMsg: '',  //彈窗內容
        isShare: false, //分享
        my_pool: {},//我的獎池
        myrank: {},
        today_wealth: 0, //今日財富值
        continuous: 0, //連續完成任務天數
        schule: {}, // 任務
        charge: 0,  //充值多少
        wardsList: {}, //每日禮包
        rankList: [], //榜單
        receive: false, // 紅點
    },
    mutations: {
        isLoaging(state, boolean) {
            boolean ? ++state.isLoading : --state.isLoading
        },
        setShareState(state, boolean) {
            state.isShare = boolean
        },
        setActStatus(state, val) {
            state.actStatus = val
        },
        setUserMsg(state, val) {
            state.userMsg = val
        },
        setMy_pool(state, val) {
            state.my_pool = val
        },
        setMyrank(state, val) {
            state.myrank = val
        },
        setReceive(state, val) {
            state.receive = val
        },
        setToday_wealth(state, val) {
            state.today_wealth = val
        },
        lotterySuc(state, val) {
            state.userMsg.chances -= val.chances
            state.today_wealth = state.today_wealth * 1 + val.num * 1
            state.myrank.score = state.myrank.score * 1 + val.num * 1
        },
        setContinuous(state, val) {
            state.continuous = val
        },
        setSchule(state, val) {
            state.schule = val
        },
        setCharge(state, val) {
            state.charge = val
        },
        setWardsList(state, val) {
            state.wardsList = val
        },
        setRankList(state, val) {
            state.rankList = val
        },
        addRank(state, val) {
            state.rankList = state.rankList.concat(val)
        },
        setGiftStatus(state, val) {
            state.wardsList[val.index].receive = true
        },
        setToast(state, val) {
            state.toast = true
            state.toastMsg = val.msg
            if (val.title) {
                state.toastTitle = val.title
            }
        },
        closeToast(state, val) {
            state.toast = false
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