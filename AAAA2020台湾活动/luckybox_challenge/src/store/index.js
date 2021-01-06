import Vue from 'vue'
import vuex from 'vuex'
import { status } from '../config';
import { loadData, getInitInfo } from '../apis'

Vue.use(vuex)

export default new vuex.Store({
    state: {
        loading: false,
        step: 0,
        gift: {},
        rankGroups: {},  //储存當天的信息
        groupsUserMsg: {},  //儲存各種天數的個人信息
        isShare: false,
        mainTab: 0,
        registered: false,
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
        setStep(state, val) {
            state.step = val
        },
        setShareState(state, val) {
            state.isShare = val
        },
        setGift(state, val) {
            state.gift = val
        },
        setGiftStatus(state, val) {
            state.gift[val].receive = true
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
        changTab(state, val) {
            state.mainTab = val
        },
        setRegistered(state, val) {
            state.registered = val
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