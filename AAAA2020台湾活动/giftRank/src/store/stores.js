import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);
const store = new Vuex.Store({
    state: {
        actStatus: 0, //活动状态，默认未开始
        registered: false,// 用户是否报名
        isLoading: 0, //loading效果
        toast: false,   //彈窗
        toastTitle: '', // 彈窗標題
        toastMsg: '',  //彈窗內容
        isShare: false, //分享
        inited: 0, //是否初次加載
        showType: 1,    //默認顯示那個類型的榜單
        totalDay: 12,
        rankGroups: {
            1: {},
            2: {},
            3: {}
        },  //储存當天的信息
        groupsUserMsg: {
            1: {},
            2: {},
            3: {}
        },  //儲存各種天數的個人信息
        nowDay: 0, // 當前天
        dateArr: [],
        nowTab: 0,
        timeObj: {}
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
        setUserSingUp(state, val) {
            state.registered = val
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
        setInited(state, val) {
            state.inited = val
        },
        setShowType(state, val) {
            state.showType = val
        },
        setDateArr(state, val) {
            state.dateArr = val
            console.log(val)
        },
        setNowDay(state, val) {
            state.nowDay = val
        },
        changTab(state, val) {
            state.nowTab = val
        },
        setActiIme(state, val) {
            state.timeObj = val
        },
        updateGroupsUserMsg(state, obj) {
            if (obj && typeof obj.data.key != 'undefined') {
                const key = obj.data.key;
                delete obj['key'];
                state.groupsUserMsg[obj.type] = Object.assign({}, state.groupsUserMsg[obj.type], { [key]: Object.assign({}, state.groupsUserMsg[obj.type][key], obj.data) });
            }
            console.log('msg', state.groupsUserMsg)
        },
        updateRankGroups(state, obj) {
            if (obj && typeof obj.data.key != 'undefined') {
                const key = obj.data.key;
                delete obj['key'];
                console.log(state.rankGroups, obj.type)
                state.rankGroups[obj.type] = Object.assign({}, state.rankGroups[obj.type], { [key]: Object.assign({}, state.rankGroups[obj.type][key], obj.data) });
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