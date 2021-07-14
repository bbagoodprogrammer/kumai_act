import Vue from 'vue'
import vuex from 'vuex'
import { status } from '../config';
import { loadData, getHomePage } from '../apis'

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
            state.my_info = info.my_info;
            state.item_type_list = info.item_type_list;
            state.recommend_item_list = info.recommend_item_list;
            state.hot_item_list = info.hot_item_list;
        },
    },
    actions: {
        async getHomePage() {
            try {
               await loadData(getHomePage, 'setData');
            } catch(e) {
                console.log('setData', e);
            }
        },
    }
})