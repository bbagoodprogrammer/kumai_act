import Vue from 'vue'
import vuex from 'vuex'
import { status } from '../config';
import { loadData, getInitInfo } from '../apis'

Vue.use(vuex)

export default new vuex.Store({
    state: {
        loading: false,

        mobile: '', //已绑定的手机号
        card: '', //身份证图片文件地址
        contact: '', //申请失败客服邮箱
        status: 0, //0未申请 1申请通过 2提交审核中 3失败可重新申请 4直接拒绝
        reason: '', //拒绝原因

        stime: 0, //数据统计开始时间戳
        etime: 0, //数据统计结束时间戳
        days: 0, //还有多少天进入下一个统计周期
        done: 0, //数据是否达标（白名单用户可以直接让这个值为真）
        current: 0, //当前欢钻收入
        target: 0, //欢钻收入统计目标值
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
        setUserData(state, data) {
            const {stime, etime, days, done, task} = data;
            const current = task.earn.current;
            const target = task.earn.target;
            Object.assign(state, {stime, etime, days, done, current, target});
        },

        setStatus(state, status) {
            state.status = status;
        },
        setMobile(state, mobile) {
            state.mobile = mobile;
        },
        setCardImage(state, src) {
            state.card = src;
        },
    },
    actions: {
        async getInitInfo() {
            try {
               await loadData(getInitInfo, 'setInitInfo');
            } catch(e) {
                console.log('getInitInfo', e);
            }
        },
    }
})