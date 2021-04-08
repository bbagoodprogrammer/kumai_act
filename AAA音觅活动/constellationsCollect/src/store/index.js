import Vue from "vue";
import vuex from "vuex";
import { loadData, getInitInfo } from "../apis";

Vue.use(vuex);

export default new vuex.Store({
    state: {
        loading: false,
        constellation: {},
        firstLight: false,
        luckDrawCount: -1,
        turntable: []
    },
    mutations: {
        updateLoading(state, value) {
            state.loading = value;
        },
        setLuckDrawCount(state, val) {
            state.luckDrawCount += val;
        },
        setInitInfo(state, data) {
            Object.assign(state, data);
        },
        setFirst(state, val) {
            state.firstLight = false;
        },
        addUserStar(state, val) {
            console.log(val);
            let useCon = state.constellation;
            let prizes_useCon = val;
            for (let i = 0; i < useCon.length; i++) {
                for (let j = 0; j < prizes_useCon.length; j++) {
                    if (prizes_useCon[j].pid == useCon[i].pid) {
                        let nums =
                            useCon[i].count * 1 + prizes_useCon[j].count * 1;
                        Vue.set(state.constellation[i], "count", nums);
                    }
                }
            }
            console.log(state.constellation);
        },
        setGiftHave(state, val) {
            for (let i = 0; i < state.turntable.length; i++) {
                if (state.turntable[i].pid == val) {
                    Vue.set(state.turntable[i], "have", true);
                }
            }
        },
        reduxNums(state) {
            state.luckDrawCount -= 1;
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
