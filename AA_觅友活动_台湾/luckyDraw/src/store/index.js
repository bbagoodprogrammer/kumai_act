import Vue from 'vue'
import vuex from 'vuex'
import { loadData, getInitInfo,getDrawCost } from '../apis'

Vue.use(vuex)

export default new vuex.Store({
    state: {
        loading: false,
        prizes: [],
        costs: {},
        step: 0,
        beans: 0,
        chance: 0,
        stime:0,
        etime:0,
    },
    mutations: {
        updateLoading(state, value) {
            state.loading = value;
        },

        setInitInfo(state, data) {
            Object.assign(state, data);
        },
        setDrawCost(state, data) {
            state.costs = data.costs;
        },
        updateus_beans(state,val) {
            state.beans = state.beans - val;
        },
        updateus_chance(state, val) {
            state.chance = state.chance - val;
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
        async getDrawCost() {
            try {
               await loadData(getDrawCost, 'setDrawCost');
            } catch(e) {
                console.log('getDrawCost', e);
            }
        },
    }
})