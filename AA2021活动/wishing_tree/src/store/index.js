import Vue from 'vue'
import vuex from 'vuex'
import { status } from '../config';
import { loadData, getInitInfo } from '../apis'

Vue.use(vuex)

export default new vuex.Store({
    state: {
        loading: false,
        share: true,
        rankGroups: {},  //储存當天的信息
        groupsUserMsg: {},  //儲存各種天數的個人信息
        setInited: 0,
        dateArr: [],
        totalDay: 0,
        c_day: 0,
        tab: 1,
        schule: {},
        step: 0,
        score: 0
    },
    getters: {
        signed: state => {
            return state.status == status.SUCCESS;
        },
    },
    mutations: {
        updateLoading(state, value) {
            state.loading = value;
        },

        setInitInfo(state, data) {
            Object.assign(state, data);
        },
        setShareState(state, val) {
            state.share = val
        },
        changGroupsUserMsg(state, obj) {
            if (obj && typeof obj.key != 'undefined') {
                const key = obj.key;
                delete obj['key'];
                state.groupsUserMsg = Object.assign({}, state.groupsUserMsg, { [key]: Object.assign({}, state.groupsUserMsg[key], obj) });
            }
            // console.log(state.groupsUserMsg)
        },
        updateRankGroups(state, obj) {
            if (obj && typeof obj.key != 'undefined') {
                const key = obj.key;
                delete obj['key'];
                state.rankGroups = Object.assign({}, state.rankGroups, { [key]: Object.assign({}, state.rankGroups[key], obj) });
            }
            // console.log(state.rankGroups)
        },
        changTab(state, val) {
            state.tab = val
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
        },
        setSchule(state, val) {
            state.schule = val
        },
        setStep(state, val) {
            state.step = val
        },
        setScore(state, val) {
            state.score = val
        }
    },
    actions: {
        async getInitInfo() {
            try {
                await loadData(getInitInfo, 'setInitInfo');
            } catch (e) {
                console.log('getInitInfo', e);
            }
        },
    }
})