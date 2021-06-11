import Vue from 'vue';
import vuex from 'vuex';
import { loadSvgaData } from '../utils/svga'
import {getPrizeList, getHuntRecord} from '../apis'
import { toast } from '../utils'

Vue.use(vuex);

let sort = [
  {
    key: 0,
  },
  {
    key: 1,
  },
  {
    key: 2,
  },
  {
    key: 3,
  },
  {
    key: 8,
  },
  {
    key: 4,
  },
  {
    key: 5,
  },
  {
    key: 6,
  },
  {
    key: 7,
  },
]

export default new vuex.Store({
  state: {
    loading: false,
    rankGroups: {},
    svgaDatas: [],
    normalList: [],//普通模式list
    superList: [],//超级模式list
    actInfo: {},
    huntRecord: [],
    speed_config: 150,
    ruleNormalList: [], // 玩法说明里面的列表
    ruleSuperList: []
  },

  mutations: {
    updateLoading(state, value) {
      state.loading = value;
    },
    updateState(state, obj) {
      Object.assign(state, obj);
    },
    setSvgaDatas(state, payload) {
      state.svgaDatas.push(payload)
    },

    updateRankGroups(state, obj) {
      if (obj && typeof obj.key != 'undefined') {
        const key = obj.key;
        delete obj['key'];
        state.rankGroups = Object.assign({}, state.rankGroups, { [key]: Object.assign({}, state.rankGroups[key], obj) });
      }
      // console.log('rankGroups=>', state.rankGroups)
    },

    setNormalList (state, list) {
      let arr = JSON.parse(JSON.stringify(sort))
      arr.forEach((item,index) => {
        if (item.key != 8) {
          arr[index] = {...arr[index], ...list[item.key]}
        }
        if (index == 0) {
          arr[index] = {...arr[index], check: true}
        } else {
          arr[index] = {...arr[index], check: false}
        }
      })
      state.normalList = arr

    },

    setSuperList (state, list) {
      list.forEach((item,index) => {
        item.key = index
        if (index == 0) {
          item.check = true
        } else {
          item.check = false
        }
      })
      state.superList = list
    },

    changList (state, payload) {
      let {type, list} = payload
      if (type) {
        state.superList = list
      } else {
        state.normalList = list
      }
    },

    setActInfo (state, payload) {
      state.actInfo = payload
    },

    changeMapCount (state, payload) { // 改变寻宝图的数量, payload可以为正值或者负值
      state.actInfo.mapCount += payload
    },

    changeCoins (state, payload) { // 改变金币
      state.actInfo.coins -= payload
    },

    changeLuckyValue (state, payload) {
      state.actInfo.luckyValue = payload
    },

    changeShellsJewels (state, payload) {
      let {type, num} = payload
      if (type == 'shell') { //贝壳
        state.actInfo.shells -= num
      } else {
        state.actInfo.jewels -= num
      }
    },

    changeMode (state, payload) {
      state.actInfo.isSuperMode = payload
      //模式改变了，需要初始化寻宝九宫格
      if (payload) {
        state.superList.forEach((item,index) => {
          if (index == 0) {
            item.check = true
          } else {
            item.check = false
          }
        })
      } else {
        state.normalList.forEach((item,index) => {
          if (index == 0) {
            item.check = true
          } else {
            item.check = false
          }
        })
      }
    },

    setHuntRecord (state, payload) {
      state.huntRecord = payload
    },

    setRuleNormalList(state, payload) {
      let list = JSON.parse(JSON.stringify(payload))
      list.sort((a, b) => b.chance - a.chance )
      state.ruleNormalList = list
    },

    setRuleSuperList(state, payload) {
      let list = JSON.parse(JSON.stringify(payload))
      list.sort((a, b) => b.chance - a.chance )
      state.ruleSuperList = list
    },
  },

  actions: {
    async getSvgaData({ commit }) {
      let fileData = await loadSvgaData('http://fstatic.cat1314.com/uc/svga/1800ef0b3e52fa8d71218fc1aa7f5e70_1606904457.svga')
      commit('setSvgaDatas', {
        type: 'whiteCircle',
        fileData
      })
      let fileData1 = await loadSvgaData('http://fstatic.cat1314.com/uc/svga/31d61bd02cfce101464303091b3279d0_1607586446.svga')
      commit('setSvgaDatas', {
        type: 'colourCircle',
        fileData: fileData1
      })
      let fileData2 = await loadSvgaData('http://fstatic.cat1314.com/uc/svga/2519a40b0d1e8d11aa6fc26a88f04558_1606993552.svga')
      commit('setSvgaDatas', {
        type: 'bgLight',
        fileData: fileData2
      })
    },

    async fetchPrizeList({ commit }) {
      let res = await getPrizeList()
      if (res.data) {
        const { response_status, response_data } = res.data;
        if (response_status && response_status.error === "") {
          commit('setNormalList', response_data.normalList)
          commit('setSuperList', response_data.superList)
          commit('setRuleNormalList', response_data.normalList)
          commit('setRuleSuperList', response_data.superList)
          commit('setActInfo', {
            isSuperMode: response_data.isSuperMode,
            luckyValue: response_data.luckyValue,
            isLuckyTime: response_data.isLuckyTime,
            mapCount: response_data.mapCount,
            shells: response_data.shells,
            jewels: response_data.jewels,
            coins: response_data.coins,
            mapPrice: response_data.mapPrice,
            superMaxNum: response_data.superMaxNum
          })
        } else if (response_status.error) {
          toast(response_status.error.replace(/\[\d+\]$/, ''));
        }
      }
    },

    async getHuntRecord({commit}) {
      const res = await getHuntRecord();
      if (res.data) {
        const { response_status, response_data } = res.data;
        if (response_status && response_status.error === "") {
          commit('setHuntRecord', response_data.list)
        }
      }
    }
  },
})