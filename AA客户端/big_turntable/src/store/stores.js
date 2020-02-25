import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);
const store = new Vuex.Store({
    state: {
        owner_wallet: {
            bean: 0,
            coin: 0
        },
        top_record: [],
        goldGiftArr: [],  //金转盘礼物配置
        silverGiftArr: [], //银转盘礼物配置
        userMsg: {}, //我的中奖信息
    },
    mutations: {
        changOwner_wallet(state, val) {
            state.owner_wallet = val
        },
        changTop_record(state, val) {
            state.top_record = val
        },
        charuTop_record(state, val) {
            state.top_record.splice(val.msgIndex, 0, val.msg)
        },
        addMsg(state, val) {
            state.top_record.push(val)
        },
        rudectB(state, val) {
            state.owner_wallet.coin -= val
        },
        rudectDou(state, val) {
            state.owner_wallet.bean -= val
        },
        goldGiftArr(state, val) {
            state.goldGiftArr = val
        },
        silverGiftArr(state, val) {
            state.silverGiftArr = val
        },
        changUserMsg(state, val) {
            state.userMsg = val
        },
        addCoins(state, val) {
            state.owner_wallet.coin += val
        },
        addBean(state, val) {
            state.owner_wallet.bean += val
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