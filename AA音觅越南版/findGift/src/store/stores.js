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
        totasCb: '',    //彈窗確定回調
        totasType: 1,    //默認1 2確認取消按鈕  3儲值按扭  4獲取鑰匙按鈕
        isShare: false, //分享
        keyNum: 0,
        open_keys: {},
        roolMsg: [],
        fragments: 0,
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
            state.toast = true
            state.toastMsg = val.msg
            if (val.type) {
                state.totasType = val.type
            }
            if (val.title) {
                state.toastTitle = val.title
            }
            if (val.cb) {
                state.totasCb = val.cb
            }
        },
        restTotal(state) {
            state.totasCb = null
            state.totasType = 1
        },
        closeToast(state, val) {
            state.toast = false
        },
        setUserKeyNum(state, val) {
            state.keyNum = val * 1
        },
        setOpen_keys(state, val) {
            state.open_keys = val
        },
        setRoolMsg(state, val) {
            state.roolMsg = val
        },
        reduxKeys(state, val) {
            state.keyNum -= val.needKeyNum
            state.fragments += val.frames
        },
        setFragments(state, val) {
            state.fragments = val * 1
        },
        addKeys(state, val) {
            state.keyNum += val
        },
        reduxFragments(state, val) {
            state.fragments -= val
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