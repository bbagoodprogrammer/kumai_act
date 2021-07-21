import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);
const store = new Vuex.Store({
  state: {
    actStatus: 0, //活动状态，默认未开始
    userMsg: {}, // 用户是否报名
    isLoading: 0, //loading效果
    toastObj: {
      toast: false, //彈窗
      toastTitle: "", // 彈窗標題
      toastMsg: "", //彈窗內容
      cb: null,
      noOk: true //是否需要關閉按鈕
    },
    isShare: false, //分享
    rankGroups: {},
    groupsUserMsg: {}, //儲存各種天數的個人信息
    reg: null,
    score: 0,
    tasks: {
      exchange: {}
    },
    roolMsg: [],
    tab: 0,
    activity: {}
  },
  mutations: {
    isLoaging(state, boolean) {
      boolean ? ++state.isLoading : --state.isLoading;
    },
    setActivity(state, val) {
      state.activity = val;
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
      state.toastObj.toast = true;
      state.toastObj.toastMsg = val.msg;
      if (val.noOk != undefined) {
        state.toastObj.noOk = val.noOk;
      }
      if (val.title) {
        state.toastObj.toastTitle = val.title;
      }
      if (val.cb) {
        state.toastObj.cb = val.cb;
      }
    },
    closeToast(state, val) {
      state.toastObj.toast = false;
      state.toastObj.noOk = true;
    },
    changGroupsUserMsg(state, obj) {
      if (obj && typeof obj.key != "undefined") {
        const key = obj.key;
        delete obj["key"];
        state.groupsUserMsg = Object.assign({}, state.groupsUserMsg, {
          [key]: Object.assign({}, state.groupsUserMsg[key], obj)
        });
      }
      console.log(state.groupsUserMsg);
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
    setReg(state, val) {
      state.reg = val;
    },
    setScore(state, val) {
      state.score = val;
    },
    setTasks(state, val) {
      state.tasks = val;
    },
    setNewTaskStatus(state, val) {
      state.tasks.new_tasks[val].get = true;
    },
    setDayTaskStatus(state, val) {
      state.tasks.day_tasks[val.index].get = true;
      state.tasks.day_tasks[val.index].finish = true;
    },
    setRoolMsg(state, val) {
      state.roolMsg = val;
    },
    changTab(state, val) {
      state.tab = val;
    },
    addSugar(state, val) {
      state.tasks.sugar = state.tasks.sugar * 1 + val * 1;
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
