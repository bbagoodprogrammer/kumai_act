import Vue from "vue";
import vuex from "vuex";
import { loadData, getInitInfo } from "../apis";

Vue.use(vuex);

export default new vuex.Store({
    state: {
        is_anchor: null,
        anchor_uid: null,
        owner: {}, //當前个人数据
        owner_change: {}, //展示的用戶數據（點擊榜單切換用）
        task: null, //本人的任务
        loading: false,
        activity_status: 1,
        roolMsg: [],
        tips: null,
        record: [],
        second: 0
    },
    mutations: {
        updateLoading(state, value) {
            state.loading = value;
        },
        setInitInfo(state, data) {
            Object.assign(state, data);
            state.owner_change = state.owner;
        },
        setRoolMsg(state, val) {
            state.roolMsg = val;
        },
        setChangeFloor(state, val) {
            state.owner_change = val;
        },
        reSetChange_floor(state, val) {
            state.owner_change = state.owner;
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
