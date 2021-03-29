import Vue from "vue";
import vuex from "vuex";
import { loadData } from "../apis";

Vue.use(vuex);

export default new vuex.Store({
    state: {
        loading: false
    },
    mutations: {
        updateLoading(state, value) {
            state.loading = value;
        },

        setInitInfo(state, data) {
            Object.assign(state, data);
        }
    },
    actions: {
        // async getInitInfo() {
        //     try {
        //        await loadData(getInitInfo, 'setInitInfo');
        //     } catch(e) {
        //         console.log('getInitInfo', e);
        //     }
        // },
    }
});
