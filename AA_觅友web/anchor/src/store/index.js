import Vue from 'vue'
import vuex from 'vuex'
import { status } from '../config';
import { loadData, getGuildInfo } from '../apis'

Vue.use(vuex)

export default new vuex.Store({
    state: {
        loading: false,

        my_info:{},
        item_type_list:[],
        recommend_item_list:[],
        hot_item_list:null,
    },
    getters: {
        signed: state => {
            return state.status == status.SUCCESS;
        },
    },
    mutations: {
        updateLoading(state, value) {
            state.loading = value;
        },

        setInitInfo(state, data) {
            Object.assign(state, data);
        },
        setData(state, info){
            state.my_info = info;
        },
    },
    actions: {
        async getGuildInfo() {
            try {
               await loadData(getGuildInfo, 'setData');
            } catch(e) {
                console.log('setData', e);
            }
        },
    }
})