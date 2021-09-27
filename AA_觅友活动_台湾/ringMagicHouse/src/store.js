import Vue from "vue";
import vuex from "vuex";
import { init } from "./apis";

Vue.use(vuex);

export default new vuex.Store({
    state: {
        loading: false,
        firstLoad: true,
        initData: {
            userInfo: {},
            popup: {}
        },
        rankGroups: {},
        currentTab: 0,
        makeRing: false,
        ringDialogInfo: {},
        ringProgress: [{}, {}, {}]
    },
    getters: {
        userInfo: state => state.initData.userInfo,
        greetings: state => state.initData.greetings,
        taskList: state => state.initData.taskList,
        energy: state => state.initData.energy || {},
        popup: state =>
            state.initData.popup ||
            {
                // type: 'finishCompleteRingAfterCP',
                //  data: {cp_nick: 12, rname: '11455'}
            },
        cooperateTestRes: state => state.initData.cooperateTestRes || {},
        ringProgress: state => state.initData.ringProgress || [],
        allRingsFinished: state => state.initData.allRingsFinished || {}
    },
    mutations: {
        updateLoading(state, value) {
            state.loading = value;
        },
        setInitData(state, payload) {
            state.initData = payload;
        },
        updateRankGroups(state, obj) {
            if (obj && typeof obj.key != "undefined") {
                const key = obj.key;
                delete obj["key"];
                state.rankGroups = Object.assign({}, state.rankGroups, {
                    [key]: Object.assign({}, state.rankGroups[key], obj)
                });
            }
        },
        changeFirstLoad(state, payload) {
            state.firstLoad = payload;
        },
        changeTestStep(state, payload) {
            state.initData.cooperateTestStep = payload;
        },
        changeCurrentTab(state, payload) {
            state.currentTab = payload;
        },
        makeRing(state, payload) {
            state.makeRing = payload;
        },
        setRingDialogInfo(state, payload) {
            state.ringDialogInfo = payload;
        }
    },
    actions: {
        async initData({ commit, state }) {
            let res = await init();
            let { response_status, response_data } = res.data;
            if (response_status.code === 0) {
                commit("setInitData", response_data);
            }
        }
    }
});
