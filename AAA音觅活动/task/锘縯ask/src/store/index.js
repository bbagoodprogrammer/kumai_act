import Vue from 'vue'
import vuex from 'vuex'
import { loadData, getInitInfo } from '../apis'

Vue.use(vuex)

export default new vuex.Store({
    state: {
        loading: false,
        rankGroups: {},
        dayRankOwnerInfos: {}, //{1:owner_msg, 2:owner_msg}
    },
    mutations: {
        updateLoading(state, value) {
            state.loading = value;
        },

        updateRankGroups(state, obj) {
            if (obj && typeof obj.key != 'undefined') {
                const key = obj.key;
                delete obj['key'];
                state.rankGroups = Object.assign({}, state.rankGroups, {[key]: Object.assign({}, state.rankGroups[key], obj)});
            }
        },
        setDayRankOwnerInfos(state,info) {
            // console.log(info);
            if(info.key){
                Vue.set(state.dayRankOwnerInfos, info.key, info);
            }else{
                Vue.set(state.dayRankOwnerInfos, 0, info);
            }
        },

        setInitInfo(state, data) {
            Object.assign(state, data);
        },
    },
    actions: {
        async getInitInfo() {
            try {
               await loadData(getInitInfo, 'setInitInfo');
            } catch(e) {
                console.log('getInitInfo', e);
            }
        },
    }
})