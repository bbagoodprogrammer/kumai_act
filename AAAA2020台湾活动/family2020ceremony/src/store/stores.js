import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);
const store = new Vuex.Store({
    state: {
        actStatus: 0, //活动状态，默认未开始
        registered: false,//是否有家族  无家族为0
        charm: 0, //无家族有房间时会存在此字段  已积攒的魅力值,开家族使用
        isLoading: 0, //loading效果
        toast: false,   //彈窗
        toastTitle: '', // 彈窗標題
        toastMsg: '',  //彈窗內容
        isShare: false, //分享
        inited: 0, //是否初次加載
        showType: 1,    //默認顯示那個類型的榜單
        nowTab: 1,//當前進行階段
        totalDay: 0,
        nowShowType: 0,
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
        dateArr: [],
        oneNowDay: 0,
        task: {}
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
            console.log(val)
        },
        setDateArr(state, val) {
            state.dateArr = val
        },
        changTab(state, val) {
            state.nowTab = val
        },
        setTotalDay(state, val) {
            state.totalDay = val
        },
        updateGroupsUserMsg(state, obj) {
            if (obj && typeof obj.data.key != 'undefined') {
                const key = obj.data.key;
                delete obj['key'];
                state.groupsUserMsg[obj.type] = Object.assign({}, state.groupsUserMsg[obj.type], { [key]: Object.assign({}, state.groupsUserMsg[obj.type][key], obj.data) });
            }
            console.log(state.groupsUserMsg)
        },
        updateRankGroups(state, obj) {
            if (obj && typeof obj.data.key != 'undefined') {
                const key = obj.data.key;
                delete obj['key'];
                state.rankGroups[obj.type] = Object.assign({}, state.rankGroups[obj.type], { [key]: Object.assign({}, state.rankGroups[obj.type][key], obj.data) });
            }
        },
        setnowShowType(state, val) {
            state.nowShowType = val
        },
        setTask(state, val) {
            state.task = val
        },
        setCharm(state, val) {
            state.charm = val
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