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
        roolMsg: [],
        rankGroups: {},  //储存當天的信息
        groupsUserMsg: {},  //儲存各種天數的個人信息
        second: 0,
        steps: {},
        position: 0,
        owner: {},
        dice: 0,
        day: {},
        total: {},
        reg: false,
        tab: 0,
        dayTask: {},
        prog: []
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
        setRoolMsg(state, val) {
            state.roolMsg = val
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
        setTaskGiftStatus(state, key) {

            state.dayTask.tasks[key].got = 1
        },
        setSecond(state, val) {
            state.second = val
        },
        setSteps(state, val) {
            state.steps = val
        },
        setPosition(state, val) {
            state.position = val
        },
        setOwner(state, val) {
            state.owner = val
        },
        setDice(state, val) {
            state.dice = val
        },
        setDay(state, val) {
            state.day = val
        },
        setTotal(state, val) {
            state.total = val
        },
        setReg(state, val) {
            state.reg = val
        },
        changTab(state, val) {
            state.tab = val
        },
        setDayTask(state, val) {
            state.dayTask = val
        },
        setBalance(state, val) {
            state.dayTask.balance = val
        },
        addPosition(state) {
            if (state.position >= 21) {
                state.position = 0
            } else {
                state.position++
            }
        },
        addPositionForWard(state, val) {
            state.position = (state.position + val) % 22
        },
        reduexDiceNum(state, val) {
            state.dice -= val
        },
        addDice(state, val) {
            state.dice++
        },
        addScore(state, val) {
            state.day.score += val
            state.total.score += val
        },
        setProg(state, val) {
            console.log(val)
            state.prog = val
        },
        setTotalLuckNums(state, val) {
            console.log(this)
            Vue.set(state.prog, 0, val)
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