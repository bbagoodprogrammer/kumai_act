import Vue from 'vue'
import vuex from 'vuex'

Vue.use(vuex)

export default new vuex.Store({
    state: {
        loading: false, //全局Loading，在apis文件统一处理
    },
    mutations: {
        updateLoading(state, value) {
            state.loading = value;
        },
    },
})