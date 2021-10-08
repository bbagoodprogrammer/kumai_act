import Vue from 'vue'
import vuex from 'vuex'
import {
    loadData,
    getInitInfo,
    getNotice,
} from '../apis'
import downTime from '../utils/downTime';
Vue.use(vuex)

export default new vuex.Store({
    state: {
        rankGroups: {},
        loading: false,
        rcoins: {
            a: 0,
            b: 0,
            c: 0,
            d: 0,
            e: 0,
            f: 0,
            g: 0,
        },
        notice: [],
        user_info: {},
        salt_score: 0,
        sweet_score: 0,
        sweet_len: 0,
        salt_len: 0,
        invite_res:{},
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

        setInitInfo(state, data) {
            var response_data1111 = {
                "step": 1, //活动阶段 0未开始 1进行中 2已结束
                "stime": 1606298400, //开始时间
                "etime": 1606737600, //结束书简
                "down_time": 373739, //活动结束倒计时
                "coins": 20005, //当前奖金池金币总数
                "salt_score": 520, //盐系热恋值
                "sweet_score": 520, //甜系热恋值
                "total_score": 1040, //热恋总值
                "user_info": {
                    "registered": true, //参与活动
                    "team": "salt", //所属系
                    "rank": 1, //排名
                    "score": 520, //当前队伍的热恋值
                    "uid": 10013098,
                    "avatar": "http://udatefile.cat1314.com/uc/img/head_10013098_1572938743.png?wsSecret=2466c92401b167aafc7ba954e38f752d&wsTime=1606406400",
                    "nick": "𝓐 𝓣𝓾 𝓛𝓪",
                    "cp_uid": "10013061",
                    "cp_avatar": "http://udatefile.cat1314.com/uc/img/head_10013061_1592876180.png?wsSecret=718379b7412dfc9dc98c787cc56ef1dd&wsTime=1606406400", //参与活动CP头像
                    "cp_nick": "" //参与活动CP名字
                },
                "result": { //活动结束后提示信息
                    "team": "salt",
                    "score": 65722,
                    "win": true,
                    "coin": 20362 //输的一方不存在当前字段
                }, //活动结束开奖结果信息
                "invite": { //收到的邀请数据
                    "uid": "10013061",
                    "avatar": "http://udatefile.cat1314.com/uc/img/head_10013061_1592876180.png?wsSecret=718379b7412dfc9dc98c787cc56ef1dd&wsTime=1606406400",
                    "nick": "可爱的你哈哈哈哈哈哈11"
                }
            }
            // data = response_data;
            downTime('time', data.down_time || 0);
            state.rcoins.a = parseInt(data.coins % 10);
            state.rcoins.b = parseInt(data.coins % 100 / 10);
            state.rcoins.c = parseInt(data.coins % 1000 / 100);
            state.rcoins.d = parseInt(data.coins % 10000 / 1000);
            state.rcoins.e = parseInt(data.coins % 100000 / 10000);
            state.rcoins.f = parseInt(data.coins % 1000000 / 100000);
            state.rcoins.g = parseInt(data.coins % 10000000 / 1000000);

            0 == data.salt_score && 0 == data.sweet_score ? (state.sweet_len = 50, state.salt_len = 50) : (state.sweet_len = Math.floor(data.sweet_score / (data.salt_score + data.sweet_score) * 100), state.salt_len = Math.floor(data.salt_score / (data.salt_score + data.sweet_score) * 100));

            state.stime = data.stime;
            state.etime = data.etime;
            state.end_time = data.etime;
            state.user_info = data.user_info;
            state.salt_score = data.salt_score;
            state.sweet_score = data.sweet_score;
            state.new_mail = data.new_mail;
            state.cp_result = data.cp_result;
            state.result = data.result;
            state.AppCpInfo = data.AppCpInfo;
            state.invite_res = data.invite;
            state.activity_status = data.step;
            Object.assign(state, data);
        },
        setNotice(state, data) {
            state.notice = data.list;
        }
    },
    actions: {
        async getInitInfo(context) {
            // context.commit('setInitInfo');
            // return;
            try {
                await loadData(getInitInfo, 'setInitInfo');
            } catch (e) {
                context.commit('getInitInfo');
                console.log('getInitInfo', e);
            }
        },
        async getNotice(context) {
            try {
                await loadData(getNotice, 'setNotice');
            } catch (e) {
                context.commit('setNotice');
                console.log('setNotice', e);
            }
        },
    }
})