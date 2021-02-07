import Vue from 'vue'
import vuex from 'vuex'
import { status } from '../config';
import { loadData, getInitInfo } from '../apis'

Vue.use(vuex)

export default new vuex.Store({
    state: {
        loading: false,
        share: true,
        level: {},
        rankGroups: {},  //储存當天的信息
        rankGroups_history: {},
        groupsUserMsg: {},  //儲存各種天數的個人信息
        load: 0,
        step: 0,
        tab: 2,
        reg: false,
        Lv: 0,
        score: 0,
        task: {},
        user_info: {},
        mark: 0,
        continuity: 0,
        continuity_gift: [10]
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
            // state1 = JSON.parse(JSON.stringify(Object.assign(state, data)))
            Object.assign(state, Object.assign({}, data))
            console.log(state, data)
            state.reg = data.user_info.registered
        },
        setShareState(state, val) {
            state.share = val
        },
        setLvState(state, val) {
            state.level[val].get = true
            state.level[val].can = false
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

        },
        changTab(state, val) {
            state.tab = val
        },
        setReg(state, val) {
            state.reg = false
        },
        setBoxStatus(state, val) {
            state.level[val].get = false
            state.level[val].can = true
        },
        updateRankGroups_history(state, obj) {
            if (obj && typeof obj.key != 'undefined') {
                const key = obj.key;
                delete obj['key'];
                state.rankGroups_history = Object.assign({}, state.rankGroups_history, { [key]: Object.assign({}, state.rankGroups_history[key], obj) });
            }
            console.log(state.rankGroups_history)
        },
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