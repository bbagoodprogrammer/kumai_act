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
        daily_b: 0,
        registered: null,
        shcule: {},
        first: true,
        groupsUserMsg: {},
        petUserMsg: {},
        rankGroups: {},
        point: {},
        tab: 1,
        act_index: 1,
        tab1_type: 1,
        pets: {},
        userInfo: {}
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
        setDaily_b(state, val) {
            state.daily_b = val
        },
        setRegistered(state, val) {
            state.registered = val
        },
        reduceB(state, val) {
            state.daily_b -= val * 1
        },
        addB(state, val) {
            state.daily_b += val * 1
        },
        setShcule(state, val) {
            state.shcule = val
        },
        setFirst(state, val) {
            state.first = val
        },
        changGroupsUserMsg(state, obj) {
            if (obj && typeof obj.key != 'undefined') {
                const key = obj.key;
                delete obj['key'];
                state.groupsUserMsg = Object.assign({}, state.groupsUserMsg, { [key]: Object.assign({}, state.groupsUserMsg[key], obj) });
            }
        },
        petChangGroupsUserMsg(state, obj) {
            if (obj && typeof obj.key != 'undefined') {
                const key = obj.key;
                delete obj['key'];
                state.petUserMsg = Object.assign({}, state.petUserMsg, { [key]: Object.assign({}, state.petUserMsg[key], obj) });
            }
        },
        setPoint(state, val) {
            state.point = val
            console.log(val)
        },
        updateRankGroups(state, obj) {
            if (obj && typeof obj.key != 'undefined') {
                const key = obj.key;
                delete obj['key'];
                state.rankGroups = Object.assign({}, state.rankGroups, { [key]: Object.assign({}, state.rankGroups[key], obj) });
            }
        },
        changTab(state, val) {
            state.tab = val
        },
        setAct_index(state, val) {
            state.act_index = val
        },
        setTab1_type(state, val) {
            state.tab1_type = val
        },
        setPets(state, val) {
            state.pets = val
        },
        setUserInfo(state, val) {
            state.userInfo = val
        },
        delPoints(state) {
            state.point.three = false
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