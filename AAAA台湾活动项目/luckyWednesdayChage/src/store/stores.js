import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);
const store = new Vuex.Store({
    state:{
        isLoading:0, //loading效果
        isShare:false, //分享
        historyList:{},  //累計購買禮物和購買列表
        wardsList:{},   //禮物Id列表 
    },
    mutations:{
        isLoaging(state,boolean){
            boolean ? ++state.isLoading : --state.isLoading
        },
        changShareState(state,boolean){
            state.isShare = boolean
        },
        changHistoryList(state,val){
            state.historyList = val
        },
        changWardsList(state,val){
            state.wardsList = val
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