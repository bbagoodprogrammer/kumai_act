import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);
const store = new Vuex.Store({
    state:{
        isLoading:0, //loading效果
        isShare:false, //分享
        coins:0,  //当前用户金币
        textArr: [], //弹幕信息
        lotterylist:[], //抽中的奖品列表
        drawCions:50,  //当前抽奖类型
        historyList:[], //历史记录
        actState:0     //当前活动状态
    },
    mutations:{
        isLoaging(state,boolean){
            boolean ? ++state.isLoading : --state.isLoading
        },
        changShareState(state,boolean){
            state.isShare = boolean
        },
        changcoins(state,val){
            state.coins = val
        },
        changTextArr(state,val){
            state.textArr = val
        },
        changlotterylist(state,val){
            state.lotterylist = val
        },
        changDrawCions(state,val){
            state.drawCions = val
        },
        changhistoryList(state,val){
            state.historyList = val
        },
        changactState(state,val){
            state.actState = val
        }
    },
    actions:{
        setloading({commit},boolean){
            commit('isLoaging',boolean)
        }
    },
    getters:{}
}) 
export default store;