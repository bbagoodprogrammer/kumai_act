import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);
const store = new Vuex.Store({
    state: {
        isLoading: 0, //loading效果
        toast: false,   //彈窗
        toastTitle: '', // 彈窗標題
        toastMsg: '',  //彈窗內容
        toastCb: null,  //彈窗回調
        isShare: false, //分享
        activeityState: null,  //活動狀態
        nowDay: 1, //當前天
        dateArr: [],   //日榜Tab时间搓
        setInited: 0,  //是否請求的初始畫的接口
        rankGroups: {},  //储存當天的信息
        groupsUserMsg: {},  //儲存各種天數的個人信息
        tab: 1,  //当前选中tab
        daily_tasks: {}, //任务
        totalDay: null, //总天数，
        all_chance: 0, //總召喚值
        re_chance: 0,//剩餘召喚值
        charge: 0, //今日已充值金幣
        av: '',
        singUp: false
    },
    mutations: {
        isLoaging(state, boolean) {
            boolean ? ++state.isLoading : --state.isLoading
        },
        closeToast(state, val) {
            state.toast = false
        },
        setToast(state, val) {
            state.toast = true
            state.toastMsg = val.msg
            if (val.title) {
                state.toastTitle = val.title
            }
            if (val.cb) {
                state.toastCb = val.cb
            }
        },
        clearCb(state) {
            state.toastCb = null
        },
        changShareState(state, boolean) {
            state.isShare = boolean
        },
        changactiveityState(state, val) {
            state.activeityState = val
        },
        changNowDay(state, val) {
            state.nowDay = val
        },
        changDaily_tasks(state, val) {
            state.daily_tasks = val
        },
        changDateArr(state, val) {
            state.dateArr = val
        },
        changGroupsUserMsg(state, obj) {
            if (obj && typeof obj.key != 'undefined') {
                const key = obj.key;
                delete obj['key'];
                state.groupsUserMsg = Object.assign({}, state.groupsUserMsg, { [key]: Object.assign({}, state.groupsUserMsg[key], obj) });
            }
        },
        updateRankGroups(state, obj) {
            if (obj && typeof obj.key != 'undefined') {
                const key = obj.key;
                delete obj['key'];
                state.rankGroups = Object.assign({}, state.rankGroups, { [key]: Object.assign({}, state.rankGroups[key], obj) });
            }
            console.log(state.rankGroups)
        },
        reduxScore(state, val) {
            state.re_chance -= val
        },
        changTotalDay(state, val) {
            state.totalDay = val
        },
        changSetInited(state, val) {
            state.setInited = val
        },
        changTab(state, val) {
            state.tab = val
        },
        setAll_chance(state, val) {
            state.all_chance = val
        },
        setRe_chance(state, val) {
            state.re_chance = val
        },
        setCharge(state, val) {
            state.charge = val
        },
        setAv(state, val) {
            state.av = val
        },
        setSingUp(state, val) {
            state.singUp = val
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