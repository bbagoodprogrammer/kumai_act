import Vue from 'vue'
import vuex from 'vuex'
import { status } from '../config';
// import { loadData, getInitInfo } from '../apis'

Vue.use(vuex)

export default new vuex.Store({
    state: {
        loading: false,
        toast: false,   //彈窗
        toastTitle: '', // 彈窗標題
        toastMsg: '',  //彈窗內容
        isShare: false, //分享
        isOver: false
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
        setShareState(state, boolean) {
            state.isShare = boolean
        },
        setActStatus(state, val) {
            state.actStatus = val
        },
        setUserMsg(state, val) {
            state.userMsg = val
        },
        setToast(state, val) {
            state.toast = true
            state.toastMsg = val.msg
            if (val.title) {
                state.toastTitle = val.title
            }
        },
        closeToast(state, val) {
            state.toast = false
        },
        setIsOver(state, val) {
            state.isOver = val
        }
    },
    actions: {
        // async getInitInfo() {
        //     try {
        //         await loadData(getInitInfo, 'setInitInfo');
        //     } catch (e) {
        //         console.log('getInitInfo', e);
        //     }
        // },
    }
})