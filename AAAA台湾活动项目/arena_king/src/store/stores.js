import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);
const store = new Vuex.Store({
    state: {
        actStatus: 0, //活动状态，默认未开始
        userMsg: {}, // 风云榜用户信息
        userMsg2: {},  //擂主榜个人信息
        isLoading: 0, //loading效果
        isShare: false, //分享
        rankGroups: {},  //储存當天的信息
        userGroups: {},   //争霸榜比赛信息
        nowUserStep: null,      //当前争霸赛进行场次
        step1: null,           //风云赛阶段状态 0未开始 1进行中 2已结束
        step2: null,           //争霸赛阶段状态 0未开始 1进行中 2已结束
        step1Time: 0,     //风云赛倒计时
        step2Time: 0,   //争霸赛倒计时
        step3Time: 0,    //爭霸榜等待開始時間
        setInited: 0,  //初始化标记
        tab: 1,//风云榜擂主榜
        mainTab: 0, //风云赛争霸赛
        mainRoom: {}, // 比赛房间
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
        changUserMsg(state, val) {
            state.userMsg = val
        },
        changUserMsg2(state, val) {
            state.userMsg2 = val
        },
        changStep(state, val) {
            state.step1 = val
        },
        changStep2(state, val) {
            state.step2 = val
        },
        changStepTime(state, val) {
            state.step1Time = val
        },
        changStep2Time(state, val) {
            state.step2Time = val
        },
        changStep3Time(state, val) {
            state.step3Time = val
        },
        changSetInited(state, val) {
            state.setInited = val
        },
        changTab(state, val) {
            state.tab = val
        },
        changMainTab(state, val) {
            state.mainTab = val
        },
        changMainRoom(state, val) {
            state.mainRoom = val
        },
        singUpSuc(state, val) {
            if (state.tab == 1) {
                state.userMsg = val
            } else {
                state.userMsg2 = val
                state.userMsg.registered = true
            }
            state.rankGroups[state.tab].list.push(val)
        },
        updateNowUserStep(state, val) {
            state.nowUserStep = val
        },
        updateUserGroups(state, obj) {
            if (obj && typeof obj.key != 'undefined') {
                const key = obj.key;
                delete obj['key'];
                state.userGroups = Object.assign({}, state.userGroups, { [key]: Object.assign({}, state.userGroups[key], obj) });
            }
        },
        updateRankGroups(state, obj) {
            if (obj && typeof obj.key != 'undefined') {
                const key = obj.key;
                delete obj['key'];
                state.rankGroups = Object.assign({}, state.rankGroups, { [key]: Object.assign({}, state.rankGroups[key], obj) });
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