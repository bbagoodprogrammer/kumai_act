import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);
const store = new Vuex.Store({
    state: {
        actStatus: 0, //活动状态，默认未开始
        registered: false, // 用户是否报名
        isLoading: 0, //loading效果
        isShare: false, //分享
        gift_list: [],   //礼物配置
        userMsg: {},  //个人信息
        shoCom: 'Trun', // 当前tab
    },
    mutations: {
        isLoaging(state, boolean) {
            boolean ? ++state.isLoading : --state.isLoading
        },
        changShareState(state, boolean) {
            state.isShare = boolean
        },
        changActStatus(state, val) {
            state.actStatus = val
        },
        changRegistered(state, val) {
            state.registered = val
        },
        changGift_list(state, val) {
            state.gift_list = val
        },
        changUserMsg(state, val) {
            state.userMsg = val
        },
        changShoCom(state, val) {
            state.shoCom = val
        },
        reducnKey(state) {
            state.userMsg.box_key--
            state.userMsg.lock_box--
        },
        reduceTicket(state) {
            state.userMsg.ticket--
        },
        addGift(state, val) {
            if (val.type == 1) {
                state.userMsg.ticket = state.userMsg.ticket * 1 + val.num
            } else if (val.type == 2) {
                state.userMsg.lock_box = state.userMsg.lock_box * 1 + val.num
            } else if (val.type == 3) {
                state.userMsg.box_key = state.userMsg.box_key * 1 + val.num
            }
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