import Vue from 'vue'
import vuex from 'vuex'
import { status } from '../config';
import { loadData, getInitInfo } from '../apis'

Vue.use(vuex)

export default new vuex.Store({
    state: {
        loading: false,
        actStatus: 0, //活动状态，默认未开始
        userMsg: {}, // 用户是否报名
        toastObj: {
            toast: false,   //彈窗
            toastTitle: '', // 彈窗標題
            toastMsg: '',  //彈窗內容
            cb: null
        },
        isShare: false, //分享
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
            state.toastObj.toast = true
            state.toastObj.toastMsg = val.msg
            if (val.title) {
                state.toastObj.toastTitle = val.title
            }
            if (val.cb) {
                state.toastObj.cb = val.cb
            }
        },
        closeToast(state, val) {
            state.toastObj.toast = false
        }
    },
    actions: {
        async getInitInfo() {
            try {
                await loadData(getInitInfo, 'setInitInfo');
            } catch (e) {
                console.log('getInitInfo', e);
            }
        }
    }
})