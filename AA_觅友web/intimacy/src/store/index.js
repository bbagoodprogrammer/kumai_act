import Vue from 'vue';
import vuex from 'vuex';
import { init } from '../apis';

Vue.use(vuex);

export default new vuex.Store({
    state: {
        loading: false,
        cp_res:null,
        is_ask_cp:0,
        is_show:0,
        intimacy_name:'',
        relation:0,
    },
    mutations: {
        updateLoading(state, value) {
            state.loading = value;
        },
        updateState(state, obj) {
            Object.assign(state, obj);
        },
        setInit(state,info){
            state.cp_res = info.cp_privilege;
            state.is_ask_cp = info.is_ask_cp;
            state.is_show = info.is_new_version;
            state.intimacy_name = info.intimacy_name;
            state.relation = info.relation;
        },
    },
    actions: {
        async init(context) {
            const res = await init();
            if (res.data) {
                const {response_status, response_data} = res.data;
                if (response_status && response_status.error === '') {
                    context.commit('setInit', response_data);
                } else if (response_status.error) {
                    // toast(response_status.error);
                }
            }
        },
    },
})