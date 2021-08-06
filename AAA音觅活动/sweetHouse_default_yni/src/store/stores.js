import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);
const store = new Vuex.Store({
  state: {
    actStatus: 0, //活动状态，默认未开始
    reg: null, // 用户是否报名
    isLoading: 0, //loading效果
    toastObj: {
      toast: false, //彈窗
      toastTitle: "", // 彈窗標題
      toastMsg: "", //彈窗內容
      cb: null
    },
    isShare: false, //分享
    roolMsg: [],
    showSingUp: false,
    packets: [], //礼盒配置
    raws: {}, //材料数量
    desserts: {}, //可做材料列表
    score: 0,
    tasksList: {},
    rank: [],
    uid: 0,
    nick: "",
    easy: { less: [] },
    stime: 0,
    etime: 0
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
    setReg(state, val) {
      state.reg = val;
    },
    setToast(state, val) {
      state.toastObj.toast = true;
      state.toastObj.toastMsg = val.msg;
      if (val.title) {
        state.toastObj.toastTitle = val.title;
      }
      if (val.cb) {
        state.toastObj.cb = val.cb;
      }
    },
    closeToast(state, val) {
      state.toastObj.toast = false;
    },
    setRoolMsg(state, val) {
      state.roolMsg = val;
    },
    setSingUp(state) {
      state.showSingUp = !state.showSingUp;
    },
    setPackets(state, val) {
      state.packets = val;
    },
    setRaws(state, val) {
      state.raws = val;
    },
    setDesserts(state, val) {
      state.desserts = val;
    },
    setScore(state, val) {
      state.score = val;
    },
    setTasksList(state, val) {
      state.tasksList = val;
    },
    openBoxSuc(state, val) {
      state.packets[val].got = true;
    },
    reduxRaws(state, val) {
      let need = state.desserts[val.curretIndedx].raw;
      for (let i in state.raws) {
        for (let j in need) {
          if (i == j) {
            state.raws[i].count -= need[i] * 1 * val.num;
          }
        }
      }
      state.desserts[val.curretIndedx].count += val.num;
    },
    addRaws(state, val) {
      state.raws[val.id].count += val.count;
    },
    addScore(state, val) {
      state.score += val;
    },
    setTask(state, val) {
      state.tasksList[val].nowStore++;
      state.tasksList[val].current++;
    },
    setTaskGot(state, val) {
      state.tasksList[val].got = state.tasksList[val].nowStore;
    },
    setRank(state, val) {
      state.rank = val;
    },
    addRank(state, val) {
      state.rank = state.rank.concat(val);
    },
    setUid(state, val) {
      state.uid = val;
    },
    setNick(state, val) {
      state.nick = val;
    },
    setEasy(state, val) {
      state.easy = val;
    },
    setStime(state, val) {
      state.stime = val;
    },
    setEtime(state, val) {
      state.etime = val;
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
