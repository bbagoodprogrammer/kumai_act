import Vue from 'vue'
import vuex from 'vuex'
import { status } from '../config';
import { loadData, getWealthCfg } from '../apis'

Vue.use(vuex)

export default new vuex.Store({
    state: {
        loading: false,

        wealth:{},
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
        setWealthCfg(state, info){
            // info.wealthLv = 1;
            // info.wealthExp = 600;
            // info.nextWealthLvExp = 900;
            // info.avatar="http://umediakm.singnowapp.com/uc/img/head_8967467_1611950856.png_small";
            state.wealth = info;
        },
    },
    actions: {
        async getWealthCfg() {
            try {
               await loadData(getWealthCfg, 'setWealthCfg');
            } catch(e) {
                console.log('setWealthCfg', e);
            }
        },
    }
})