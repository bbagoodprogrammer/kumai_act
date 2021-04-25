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
  },
  getters: {
    userRanking: state => state.initData.userRanking || {},
    tasks: state => state.initData.tasks || [],
    familyPK: state => state.initData.familyPK || {},
    familyCompetition: state => state.initData.familyCompetition || {},
    familyRank: state => state.initData.familyRank || {},
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
    changeFirstLoad(state, value) {
      state.firstLoad = value;
    },
  },
  actions: {
    async initData({ commit, state }) {
      let res = await init();
      let { response_status, response_data } = res.data;
      if (response_status.code === 0) {
        commit('setInitData', response_data)
      }
    },
  }
})