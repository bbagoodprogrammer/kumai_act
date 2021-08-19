import Vue from "vue";
import vuex from "vuex";
import { loadData, getInitInfo } from "../apis";

Vue.use(vuex);

export default new vuex.Store({
    state: {
        loading: false,
        rank: [],
        owner: {},
        activity: {},
        luckCoins: [false, false, false]
    },
    mutations: {
        updateLoading(state, value) {
            state.loading = value;
        },
        setInitInfo(state, data) {
            Object.assign(state, data);
            console.log(state);
        },
        setLuckState(state, val) {
            state.luckCoins[val] = !state.luckCoins[val];
        },
        resetLuckState(state, val) {
            state.luckCoins = [false, false, false];
        },
        addScore(state, val) {
            state.owner.score += val;
        },
        addCoins(state, val) {
            state.owner.coins = val;
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
