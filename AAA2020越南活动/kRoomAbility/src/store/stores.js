import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);
const store = new Vuex.Store({
    state: {
        actStatus: 0, //活动状态，默认未开始
        singUp: 0, // 用户是否报名
        isLoading: 0, //loading效果
        toast: false,   //彈窗
        toastTitle: '', // 彈窗標題
        toastMsg: '',  //彈窗內容
        isShare: false, //分享
        dateArr: [],   //日榜Tab时间搓
        nowDay: 0,
        tab: 0, // 當前高亮tab
        totalDay: 0, //總天數
        inited: 0,   //初始化
        rankGroups: {},  //储存當天的信息
        groupsUserMsg: {},  //儲存各種天數的個人信息
        userScore: 0, // 用戶磚石分數
        schule: {},    //任務
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
        setSingUp(state, val) {
            state.singUp = val
        },
        setSucUp(state, val) {
            state.singUp = 1
            for (let i in state.groupsUserMsg) {
                state.groupsUserMsg[i].msg = val
            }
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
        },
        setUserScore(state, val) {
            state.userScore = val
        },
        changTab(state, val) {
            state.tab = val
        },
        setNowDay(state, val) {
            state.nowDay = val
        },
        setDateArr(state, val) {
            state.dateArr = val
        },
        setTotalDay(state, val) {
            state.totalDay = val
        },
        setInited(state, val) {
            state.inited = val
        },
        setSchule(state, val) {
            state.schule = val
        },
        changGroupsUserMsg(state, obj) {
            if (obj && typeof obj.key != 'undefined') {
                const key = obj.key;
                delete obj['key'];
                state.groupsUserMsg = Object.assign({}, state.groupsUserMsg, { [key]: Object.assign({}, state.groupsUserMsg[key], obj) });
            }
            console.log(state.groupsUserMsg)
        },
        updateRankGroups(state, obj) {
            if (obj && typeof obj.key != 'undefined') {
                const key = obj.key;
                delete obj['key'];
                state.rankGroups = Object.assign({}, state.rankGroups, { [key]: Object.assign({}, state.rankGroups[key], obj) });
            }
            console.log(state.rankGroups)
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