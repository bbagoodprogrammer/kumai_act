import Vue from 'vue'
import vuex from 'vuex'
import { loadData, getBillBoard, getLuckyBoxDetail } from '../apis'

Vue.use(vuex)

export default new vuex.Store({
    state: {
        loading: false,
        nocite:[],
        box_detail:null,
        send_data:{
            'toUid':0,
            'boxType':1,
        },
        rankGroups: {},
        dayRankOwnerInfos: {},
        inited: !1
    },
    mutations: {
        updateLoading(state, value) {
            state.loading = value;
        },

        updateRankGroups(state, obj) {
            if (obj && typeof obj.key != 'undefined') {
                const key = obj.key;
                delete obj['key'];
                state.rankGroups = Object.assign({}, state.rankGroups, {
                    [key]: Object.assign({}, state.rankGroups[key], obj)
                });
            }
        },

        updateType(state,type){
            state.send_data.boxType = type;
        },

        updateGift(state,type){
            state.gift_flag = type;
        },
        firstSendAvatar(state, value){
            if(value[0].avatar){
                state.sendres = value[0].avatar;
            }
            state.send_data.toUid = value[0].uid;
        },
        updateSend(state, value){
            state.sendres = value.avatar;
            state.send_data.toUid = value.uid;
        },

        setNotice(state, val) {
            state.nocite = val;
        },
        setBoxDetail(state, val){
           state.box_detail = val;
        },

        setInitInfo(state, data) {
            Object.assign(state, data);
        },
    },
    actions: {
        async getBillBoard() {
            try {
               await loadData(getBillBoard, 'setNotice');
            } catch(e) {
                console.log('getBillBoard', e);
            }
        },

        async getLuckyBoxDetail() {
            try {
               await loadData(getLuckyBoxDetail, 'setBoxDetail');
            } catch(e) {
                console.log('getLuckyBoxDetail', e);
            }
        },
       
    }
})