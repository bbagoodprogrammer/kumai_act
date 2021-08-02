import Vue from "vue";
import vuex from "vuex";
import { loadData, getInitInfo } from "../apis";

Vue.use(vuex);

export default new vuex.Store({
    state: {
        activity: {
            shovels: {
                gold: {},
                iron: {}
            }
        },
        owner: {},
        showType: 1,
        loading: false,
        totleOwner: {},
        islands: [],
        notices: []
    },
    mutations: {
        updateLoading(state, value) {
            state.loading = value;
        },
        setInitInfo(state, data) {
            Object.assign(state, data);
        },
        setShowType(state, val) {
            state.showType = val;
        },
        setTotleOwner(state, val) {
            state.totleOwner = val;
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
