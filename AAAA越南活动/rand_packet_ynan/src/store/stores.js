import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);
const store = new Vuex.Store({
    state: {
        actStatus: 0, //活动状态，默认未开始
        registered: false, // 用户是否报名
        isLoading: 0, //loading效果
        isShare: false, //分享
        rankGroups: {},  //储存當天的信息
        groupsUserMsg: {},  //儲存各種天數的個人信息
        nowDay: 0,    //當前天
        totalDay: 0,  //活動總天數
        totalTime: 0,   //總榜倒計時
        dayTime: 0,     //當前日榜倒計時
        dateArr: [],  //時間數組
        packet: {
            level: []
        },    //箱子情況
        setInited: true,    //是否初始化
        tab: 1,
        registered: null,  //報名
    },
    mutations: {
        isLoaging(state, boolean) {
            boolean ? ++state.isLoading : --state.isLoading
        },
        changShareState(state, boolean) {
            state.isShare = boolean
        },
        changActStatus(state, val) {
            state.actStatus = val
        },
        setNowDay(state, val) {
            state.nowDay = val
        },
        setTotalDay(state, val) {
            state.totalDay = val
        },
        setTotalTime(state, val) {
            state.totalTime = val
        },
        setDayTime(state, val) {
            state.dayTime = val
        },
        setDateArr(state, val) {
            state.dateArr = val
        },
        setPacket(state, val) {
            state.packet = val
        },
        setInited(state, val) {
            state.setInited = val
        },
        setDayBoxState(state, val) {
            state.packet.dayOpened = val
        },
        setTotalState(state, val) {
            state.packet.totalOpened = val
        },
        setTab(state, val) {
            state.tab = val
        },
        setRegistered(state, val) {
            state.registered = val
        },
        setSingUp(state, val) {
            state.registered = true
            for (let key in state.groupsUserMsg) {
                state.groupsUserMsg[key].msg = val
            }
            if (state.rankGroups[state.nowDay] && state.rankGroups[state.nowDay].list.length < 20) {
                state.rankGroups[state.nowDay].list.push(val)
            }
            if (state.rankGroups['total'] && state.rankGroups['total'].list.length < 20) {
                state.rankGroups['total'].list.push(val)
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
        changGroupsUserMsg(state, obj) {
            if (obj && typeof obj.key != 'undefined') {
                const key = obj.key;
                delete obj['key'];
                state.groupsUserMsg = Object.assign({}, state.groupsUserMsg, { [key]: Object.assign({}, state.groupsUserMsg[key], obj) });
                console.log(state.groupsUserMsg)
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