import Vue from "vue";
import vuex from "vuex";
import { loadData, getInitInfo } from "../apis";

Vue.use(vuex);

export default new vuex.Store({
    state: {
        loading: false,
        editActObj: {},
        isOwner: -1,
        ListLength: -1
    },
    mutations: {
        updateLoading(state, value) {
            state.loading = value;
        },

        setInitInfo(state, data) {
            Object.assign(state, data);
        },
        setEditAct(state, val) {
            state.editActObj = val;
            // console.log(state.editActObj);
        },
        setIsOwner(state, val) {
            state.isOwner = val;
        },
        setListLength(state, val) {
            state.ListLength = val;
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
