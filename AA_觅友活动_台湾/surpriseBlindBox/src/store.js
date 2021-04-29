import Vue from 'vue'
import vuex from 'vuex'
import { init } from './apis'

Vue.use(vuex)

export default new vuex.Store({
  state: {
    loading: false,
    firstLoad: true,
    initData: {
      
    },
    rankGroups:{
      
    },
    actionTab: 1,
    friendInfo: {},
    friendList: []
  },
  getters: {
    userRanking: state => state.initData.userRanking || {},
    rareGiftSurplusData: state => state.initData.rareGiftSurplusData || [{}],
    collects: state => state.initData.collects || [],
  },
  mutations: {
    updateLoading(state, value) {
      state.loading = value;
    },
    setInitData (state, payload) {
      state.initData = payload
    },
    updateRankGroups(state, obj) {
      if (obj && typeof obj.key != 'undefined') {
        const key = obj.key;
        delete obj['key'];
        state.rankGroups = Object.assign({}, state.rankGroups, { [key]: Object.assign({}, state.rankGroups[key], obj) });
      }
    },
    changeFirstLoad (state, payload) {
      state.firstLoad = payload
    },
    changeActionTab (state, payload) {
      state.actionTab = payload
    },
    setFriendInfo(state, payload) {
      state.friendInfo = payload
    },
    setFriendList(state, payload) {
      state.friendList = state.friendList.concat(payload)
    },
    clearFriendList(state) {
      state.friendList = []
    }
  },
  actions: {
    async initData({ commit, state }) {
      let res = await init();
      let { response_status, response_data } = res.data;
      if (response_status.code === 0) {
        // 第二期 樱花系列 把第二个隐藏款改成动效款
        if (response_data.currentSeries == 'sakura') {
          response_data.collects.forEach(item => {
            if (item.level == 'hide') {
              item.level = 'dyn'
            }
          })
        }
        commit('setInitData', response_data)
      }
    },
  }
})