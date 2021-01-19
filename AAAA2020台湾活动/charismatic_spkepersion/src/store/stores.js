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
        reg: false,
        packets: {},
        redPacket: {},
        naming: {},
        notice: {},
        top_record: [],
        rankGroups: {},  //储存當天的信息
        groupsUserMsg: {},  //儲存各種天數的個人信息
        tab: 'total',  //当前选中tab
        setInited: 0,
        dateArr: [],
        totalDay: 0,
        c_day: 0,
        inited: 0
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
        setReg(state, val) {
            state.reg = val
        },
        setPacket(state, val) {
            state.packets = val
        },
        setRedPacket(state, val) {
            state.redPacket = val
        },
        setNaming(state, val) {
            state.naming = val
        },
        setNotice(state, val) {
            state.notice = val
        },
        setBoxStatus(state, val) {
            state.packets.status[val] = 1
        },
        setSubscribe(state, val) {
            state.redPacket.subscribe = val
        },
        changGroupsUserMsg(state, obj) {
            if (obj && typeof obj.key != 'undefined') {
                const key = obj.key;
                delete obj['key'];
                state.groupsUserMsg = Object.assign({}, state.groupsUserMsg, { [key]: Object.assign({}, state.groupsUserMsg[key], obj) });
            }
            console.log(state.groupsUserMsg)
        },
        updateRankGroups(state, obj) {
            if (obj && typeof obj.key != 'undefined') {
                const key = obj.key;
                delete obj['key'];
                state.rankGroups = Object.assign({}, state.rankGroups, { [key]: Object.assign({}, state.rankGroups[key], obj) });
            }
            console.log(state.rankGroups)
        },
        changTab(state, val) {
            state.tab = val
        },
        setPacketStatus(state, val) {
            state.packets[val].get = true
        },
        setTimeArr(state, val) {
            state.dateArr = val
        },
        setTotalDay(state, val) {
            state.totalDay = val
        },
        setC_day(state, val) {
            state.c_day = val
        },
        setInited(state, val) {
            state.inited = val
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