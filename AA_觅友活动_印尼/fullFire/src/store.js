import Vue from 'vue'
import Vuex from 'vuex'
import { getUrlString } from './utils/index'
import { init, attendParty } from "./request/index";

Vue.use(Vuex)

const state = {
  share: getUrlString('token') ? false : true,
  loading: false,
  initData: {
    userRanking:{}
  },
  rankGroups: {},
}

const mutations = {

  updateLoading(state, payload) {
    state.loading = payload
  },

  updateRankGroups(state, obj) {
    if (obj && typeof obj.key != 'undefined') {
      const key = obj.key;
      delete obj['key'];
      if (Array.isArray(obj.list)) {
        obj.list.forEach(item => {
          if (Array.isArray(item.contribution)) {
            let len = item.contribution.length
            for (let i = 0; i < 3 - len; i++) {
              item.contribution.push({})
            }
          } else {
            item.contribution = [{}, {}, {}]
          }
        })
      }
    
      state.rankGroups = Object.assign({}, state.rankGroups, { [key]: Object.assign({}, state.rankGroups[key], obj) });
    }
  },

  setInitData(state, payload) {
    state.initData = payload
  },

}

const actions = {
  async initData({commit, state}) {
    let res = await init();
    let { response_status, response_data } = res.data;
    if (response_status.code === 0) {
      commit('setInitData', {
        downTime: response_data.downTime,
        step: response_data.step,
        userRanking: response_data.userRanking,
        sTime: response_data.sTime,
        eTime: response_data.eTime
      })
      commit('updateRankGroups', {
        key: 'fullfire',
        loadCount: 1,
        loadEnd: response_data.rankList.length < 20,
        loading: false,
        none: response_data.rankList.length == 0,
        list: response_data.rankList
      })
    }
  },
  attendParty({commit}, rid) {
    attendParty({rid})
  }
}

export default new Vuex.Store({
  state,
  mutations,
  actions
})
