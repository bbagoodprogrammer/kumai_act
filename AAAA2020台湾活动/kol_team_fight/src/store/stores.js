import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);
const store = new Vuex.Store({
    state: {
        actStatus: 0, //活动状态，默认未开始
        userMsg: {}, // 用戶信息
        isLoading: 0, //loading效果
        toastObj: {
            toast: false,   //彈窗
            toastTitle: '', // 彈窗標題
            toastMsg: '',  //彈窗內容
            cb: null
        },
        isShare: false, //分享
        leader: null, //是否隊長
        kol: null, //是否KOL用戶
        red_point: {},
        team: {},
        friend_list: {}, //好友列表
        list: [],  //戰隊排行
        myRank: [], //我的名次
        nums: 0,
        history: {},
        rankGroups: {}, // ,
        tab: 0,
        leader: null,
        kol: null,
        roomRank: {}
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
        setMyRank(state, val) {

            state.myRank = val
        },
        setToast(state, val) {
            state.toastObj.toast = true
            state.toastObj.toastMsg = val.msg
            if (val.title) {
                state.toastObj.toastTitle = val.title
            }
            if (val.cb) {
                state.toastObj.cb = val.cb
            }
        },
        closeToast(state, val) {
            state.toastObj.toast = false
        },
        setFriend_list(state, val) {
            state.friend_list = val
        },
        setInvited(state, val) {
            state.friend_list[val].status = 0
        },
        addFriendList(state, val) {
            state.friend_list = state.friend_list.concat(val)
        },
        updateHistory(state, obj) {
            if (obj && typeof obj.key != 'undefined') {
                const key = obj.key;
                delete obj['key'];
                state.history = Object.assign({}, state.history, { [key]: Object.assign({}, state.history[key], obj) });
            }
        },
        updateRankGroups(state, obj) {
            if (obj && typeof obj.key != 'undefined') {
                const key = obj.key;
                delete obj['key'];
                state.rankGroups = Object.assign({}, state.rankGroups, { [key]: Object.assign({}, state.rankGroups[key], obj) });
            }
        },
        hostInivitSuc(state, val) {
            state.history[val.index].list[val.listIndex].status = val.status
        },
        changTab(state, val) {
            state.tab = val
        },
        setLeader(state, val) {
            state.leader = val
        },
        setKol(state, val) {
            state.kol = val
        },
        myRoomRank(state, val) {
            console.log(val)
            state.roomRank = val
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