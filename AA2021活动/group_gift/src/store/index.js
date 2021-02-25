import Vue from 'vue'
import vuex from 'vuex'
import { status } from '../config';
import { loadData, getInitInfo } from '../apis'

Vue.use(vuex)

export default new vuex.Store({
    state: {
        loading: false,
        share: true,
        top: [],
        gift: {},
        load: 0,
        finish: 0,
        my_group: [],
        user: {},
        type: 1,
        rankGroups_history: {},
        end: 0,
        invite: null
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
            console.log(state)
        },
        setShareState(state, val) {
            state.share = val
        },
        setUser(state, val) {
            state.user = val
        },
        setType(state, val) {
            state.type = val
        },
        updateRankGroups_history(state, obj) {
            if (obj && typeof obj.key != 'undefined') {
                const key = obj.key;
                delete obj['key'];
                state.rankGroups_history = Object.assign({}, state.rankGroups_history, { [key]: Object.assign({}, state.rankGroups_history[key], obj) });
            }
            console.log(state.rankGroups_history)
        },
        clearInvite(state, val) {
            state.invite = val
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