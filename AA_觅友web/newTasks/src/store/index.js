import Vue from "vue";
import vuex from "vuex";
import { loadData, getInitInfo } from "../apis";

Vue.use(vuex);

export default new vuex.Store({
    state: {
        loading: false,
        newUser: [],
        daily: []
    },
    mutations: {
        updateLoading(state, value) {
            state.loading = value;
        },
        setInitInfo(state, data) {
            Object.assign(state, data);
            console.log(state);
        },
        setTaskStatus(state, val) {
            if (val.type) {
                state.newUser.splice(val.index, 1);
            } else {
                state.daily.splice(val.index, 1);
            }
        }
    },
    actions: {
        async getInitInfo() {
            try {
                await loadData(getInitInfo, "setInitInfo");
            } catch (e) {
                console.log("getInitInfo", e);
            }
        }
    }
});
