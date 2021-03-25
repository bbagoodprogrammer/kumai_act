import Vue from "vue";
import vuex from "vuex";
import { loadData, getInitInfo } from "../apis";

Vue.use(vuex);

export default new vuex.Store({
    state: {
        loading: false,
        myCode: 0,
        money: 0,
        newUser: -1,
        inputCode: -1,
        firstTips: -1,
        exchangeCoinNeed: 0,
        exchangeMoneyNeed: 0,
        top: [],
        step: -1
    },
    mutations: {
        updateLoading(state, value) {
            state.loading = value;
        },
        setInitInfo(state, data) {
            Object.assign(state, data);
            console.log(state);
        },
        setInputCode(state, val) {
            state.inputCode = val;
        },
        setNewMoney(state, val) {
            state.money = val;
        },
        setTop(state, val) {
            state.top = val;
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
