import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);
const store = new Vuex.Store({
  state: {
    actStatus: 0, //活动状态，默认未开始
    isSingUp: null, // 用户是否报名
    isLoading: 0, //loading效果
    toast: false, //彈窗
    toastTitle: "", // 彈窗標題
    toastMsg: "", //彈窗內容
    cb: null,
    isShare: false, //分享
    gifts: {
      0: {},
      1: {}
    },
    inited: 0,
    tab: 0,
    owner: {},
    rankGroups: {}, //储存當天的信息
    groupsUserMsg: {} //儲存各種天數的個人信息
  },
  mutations: {
    isLoaging(state, boolean) {
      boolean ? ++state.isLoading : --state.isLoading;
    },
    setShareState(state, boolean) {
      state.isShare = boolean;
    },
    setActStatus(state, val) {
      state.actStatus = val;
    },
    setUserMsg(state, val) {
      state.userMsg = val;
    },
    setToast(state, val) {
      state.toast = true;
      state.toastMsg = val.msg;
      if (val.title) {
        state.toastTitle = val.title;
      }
      if (val.cb) {
        state.cb = val.cb;
      }
    },
    closeToast(state, val) {
      state.toast = false;
    },
    setGifts(state, val) {
      state.gifts = val;
    },
    setInited(state, val) {
      state.inited = val;
    },
    changTab(state, val) {
      state.tab = val;
    },
    setOwner(state, val) {
      state.owner = val;
    },
    setSingUp(state, val) {
      state.isSingUp = val;
    },
    changGroupsUserMsg(state, obj) {
      if (obj && typeof obj.key != "undefined") {
        const key = obj.key;
        delete obj["key"];
        state.groupsUserMsg = Object.assign({}, state.groupsUserMsg, {
          [key]: Object.assign({}, state.groupsUserMsg[key], obj)
        });
      }
    },
    updateRankGroups(state, obj) {
      if (obj && typeof obj.key != "undefined") {
        const key = obj.key;
        delete obj["key"];
        state.rankGroups = Object.assign({}, state.rankGroups, {
          [key]: Object.assign({}, state.rankGroups[key], obj)
        });
      }
      console.log(state.rankGroups);
    }
  },
  actions: {
    setloading({ commit }, boolean) {
      commit("isLoaging", boolean);
    }
  },
  getters: {}
});
export default store;
