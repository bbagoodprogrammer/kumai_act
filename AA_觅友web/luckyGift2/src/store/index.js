import Vue from 'vue';
import vuex from 'vuex';

Vue.use(vuex);

export default new vuex.Store({
    state: {
        loading: false,
    },
    mutations: {
        updateLoading(state, value) {
            state.loading = value;
        },
        updateState(state, obj) {
            Object.assign(state, obj);
        },
    },
    actions: {

    },
})