import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);
const store = new Vuex.Store({
    state: {
        actStatus: 0, //活动状态，默认未开始
        isLoading: 0, //loading效果
        isShare: false, //分享
        initData: {
            tasks: {}
        },
        type: 1,   ////1為正常階段，2為選擇排除卡階段
        newCards: [],
        taskType: 0
    },
    mutations: {
        isLoaging(state, boolean) {
            boolean ? ++state.isLoading : --state.isLoading
        },
        setShareState(state, boolean) {
            state.isShare = boolean
        },
        setActStatus(state, val) {
            state.actStatus = val
        },
        setInitData(state, val) {
            state.initData = val
        },
        setOpenState(state, val) {
            this.initData.cards[val].open
        },
        setNewCards(state, val) {
            state.newCards = val
        },
        reductOpenClick(state, val) {
            state.initData.chanceUsed++
            // state.initData.cards.push(val)
            if (val.double == 1) {  //用了double卡
                state.initData.doubleOpened = val.id
            }
            if (state.initData.skipType) {  //用了排除卡
                state.initData.skipOpened = val.etype
            }
        },
        setExclude(state, val) {  //排除類型
            state.initData.skipType = val
        },
        setTaskType(state, val) {
            state.taskType = val
        },
        redxExclude(state, val) {   //取消使用排除卡
            state.initData.skipType = ''
        },
        setBuyCard(state, val) {
            if (val == 1) {  //排除卡
                state.initData.skipGot = true
            } else {
                state.initData.doubleGot = true
            }
            //完成任務
            // if (state.initData.tasks) {
            //     state.initData.tasks.buy.finished = 1
            // }
        },
        setUseDouble(state, val) {
            state.initData.doubleUsed = val
        },
        setType(state, val) {
            state.type = val
        },
        setSingUp(state) {
            state.initData.registered = true
        }
    },
    actions: {
        setloading({ commit }, boolean) {
            commit('isLoaging', boolean)
        }
    },
    getters: {}
})
export default store;