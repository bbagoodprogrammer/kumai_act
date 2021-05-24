import Vue from "vue";
import vuex from "vuex";
import { loadData, getInitInfo } from "../apis";

Vue.use(vuex);

export default new vuex.Store({
    state: {
        loading: false,
        stars: {},
        rank_space_station: [],
        owner: {},
        mysterious: {},
        activity: {},
        rank: [],
        records: [],
        rankGroups_history: {}
    },
    mutations: {
        updateLoading(state, value) {
            state.loading = value;
        },

        setInitInfo(state, data) {
            Object.assign(state, data);
        },
        reduxCoupons(state) {
            state.owner.coupons_used = Number(state.owner.coupons_used) + 1;
            state.owner.coupons -= 1;
        },
        updateRankGroups_history(state, obj) {
            if (obj && typeof obj.key != "undefined") {
                const key = obj.key;
                delete obj["key"];
                state.rankGroups_history = Object.assign(
                    {},
                    state.rankGroups_history,
                    {
                        [key]: Object.assign(
                            {},
                            state.rankGroups_history[key],
                            obj
                        )
                    }
                );
            }
            console.log(state.rankGroups_history);
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
