import Vue from "vue";
import vuex from "vuex";
import { loadData, getInitInfo } from "../apis";

Vue.use(vuex);

export default new vuex.Store({
    state: {
        loading: false,
        rank: [],
        grand_prizes: [],
        grand_prizes_wait: [],
        owner: {},
        records: []
    },
    mutations: {
        updateLoading(state, value) {
            state.loading = value;
        },

        setInitInfo(state, data) {
            Object.assign(state, data);
            console.log(state);
        },
        setUserCoins(state, val) {
            state.owner.balance = val;
        },
        setFirst(state, val) {
            if (val == 1) {
                state.owner.first_time_marbles = 1;
            } else {
                state.owner.first_time_dart = 1;
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
