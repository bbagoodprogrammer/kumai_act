import Vue from "vue";
import vuex from "vuex";
import { loadData, getInitInfo } from "../apis";

Vue.use(vuex);

export default new vuex.Store({
    state: {
        loading: false,
        step: 1,
        roolMsg: [],
        floorConfig: {
            0: {
                name: "空地"
            },
            2: {
                name: "豪華酒店"
            },
            3: {
                name: "大笨鐘"
            },
            4: {
                name: "帝國大廈"
            }
        }
    },
    mutations: {
        updateLoading(state, value) {
            state.loading = value;
        },
        setInitInfo(state, data) {
            Object.assign(state, data);
        },
        setRoolMsg(state, val) {
            state.roolMsg = val;
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
