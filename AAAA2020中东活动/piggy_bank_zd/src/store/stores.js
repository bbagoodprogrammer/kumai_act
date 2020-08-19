import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);
const store = new Vuex.Store({
    state: {
        actStatus: 0, //活动状态，默认未开始
        isLoading: 0, //loading效果
        toast: false,   //彈窗
        toastTitle: '', // 彈窗標題
        toastMsg: '',  //彈窗內容
        isShare: false, //分享
        mission_countdown: 0, //当日任务倒计时
        userMsg: {}, //用户信息
        anchor_missions: [], //主播任务
        rankGroups: [], // 榜单
        isFirst: true,
        mainTab: 0,      //当前显示的榜单
    },
    mutations: {
        isLoaging(state, boolean) {
            boolean ? ++state.isLoading : --state.isLoading
        },
        changShareState(state, boolean) {
            state.isShare = boolean
        },
        setActStatus(state, val) {
            state.actStatus = val
        },
        setmission_countdown(state, val) {
            state.mission_countdown = val
        },
        setUserMsg(state, val) {
            state.userMsg = val
        },
        setAnchor_missions(state, val) {
            state.anchor_missions = val
        },
        setIsFirst(state, val) {
            state.isFirst = val
        },
        setMainTab(state, val) {
            state.mainTab = val
        },
        updateRankGroups(state, obj) {
            if (obj && typeof obj.key != 'undefined') {
                const key = obj.key;
                delete obj['key'];
                state.rankGroups = Object.assign({}, state.rankGroups, { [key]: Object.assign({}, state.rankGroups[key], obj) });
            }
            // console.log(state.rankGroups)
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