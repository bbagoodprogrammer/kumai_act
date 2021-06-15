import Vue from "vue";
import vuex from "vuex";
import { loadData, getInitInfo } from "../apis";

Vue.use(vuex);

export default new vuex.Store({
    state: {
        loading: false,
        list: [],
        prize: null,
        ulist: []
    },
    mutations: {
        updateLoading(state, value) {
            state.loading = value;
        },
        setInitInfo(state, data) {
            Object.assign(state, data);
        },
        addList(state, val) {
            state.list = state.list.concat(val);
            console.log(val);
        },
        setFirst(state, val) {
            state.first = val;
        }
    },
    actions: {
        async getInitInfo(store, nums) {
            try {
                await loadData(getInitInfo, "setInitInfo", false, nums);
            } catch (e) {
                console.log("getInitInfo", e);
            }
        }
    }
});
