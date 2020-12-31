import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);
const store = new Vuex.Store({
    state: {
        actStatus: 0, //活动状态，默认未开始
        userMsg: {}, // 用户是否报名
        isLoading: 0, //loading效果
        toastObj: {
            toast: false,   //彈窗
            toastTitle: '', // 彈窗標題
            toastMsg: '',  //彈窗內容
            cb: null
        },
        isShare: false, //分享
        prize: 0,
        stime: 0,
        etime: 0,
        ctime: 0,
        petime: 0,
        list: [],
        isRegistered: 0,
        fid: 0
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
        setPrize(state, val) {
            state.prize = val
        },
        setStime(state, val) {
            state.stime = val
        },
        setEtime(state, val) {
            state.etime = val
        },
        setCtime(state, val) {
            state.ctime = val
        },
        setList(state, val) {
            state.list = val
        },
        addList(state, val) {
            state.list = state.list.concat(val)
        },
        setPetime(state, val) {
            state.petime = val
        },
        setIsRegistered(state, val) {
            state.isRegistered = val
        },
        setFid(state, val) {
            state.fid = val
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