import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);
const store = new Vuex.Store({
    state: {
        isLoading: 0, //loading效果
        isShare: false, //分享
        activeityState: null,  //活動狀態
        rankGroups: {},  //储存當天的信息
        groupsUserMsg: {},  //儲存各種天數的個人信息
        tab: 1,  //当前选中tab
        nowDay: null, //當前天
        totalDay: null, //总天数
        day_down_time: null,  //本日倒計時
        total_down_time: null, //本期倒計時
        setInited: 1,  //是否請求的初始畫的接口
        isDebut: null,    //是否出道
        debutList: {}  //出道榜单
    },
    mutations: {
        isLoaging(state, boolean) {
            boolean ? ++state.isLoading : --state.isLoading
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
        changTotalDay(state, val) {
            state.totalDay = val
        },
        changday_down_time(state, val) {
            state.day_down_time = val
        },
        changtotal_down_time(state, val) {
            state.total_down_time = val
        },
        changSetInited(state, val) {
            state.setInited = val
        },
        changTab(state, val) {
            state.tab = val
        },
        changeisDebut(state, val) {
            state.isDebut = val
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
        },
        updateDebutList(state, obj) {
            if (obj && typeof obj.key != 'undefined') {
                const key = obj.key;
                delete obj['key'];
                state.debutList = Object.assign({}, state.debutList, { [key]: Object.assign({}, state.debutList[key], obj) });
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