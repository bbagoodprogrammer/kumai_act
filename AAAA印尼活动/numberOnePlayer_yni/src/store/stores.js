import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);
import { getGameInfo } from '../apis';
const store = new Vuex.Store({
    state: {
        actStatus: 0, //活动状态，默认未开始
        registered: false, // 用户是否报名
        isLoading: 0, //loading效果
        isShare: false, //分享
        daily_tasks: {
            "login": {				//登陆任务
                "task_list": [			//總任務進度條
                    {
                        "counts": 1,		//完成次數，
                        "send_counts": 10	//贈送積分值
                    }
                ],
                "task_name": "login",		//任務key
                "star": 10,			//當前任務贈送多少積分
                "finish_count": 0,		//當前完成進度
                "task_count": 1,		//任務完成所需總進度
                "step": 0			//完成到第几關卡，從0開始數
            },
            "publicWork": {		//发歌任务
                "task_list": [
                    {
                        "counts": 1,
                        "send_counts": 15
                    }
                ],
                "task_name": "publicWork",
                "star": 15,
                "finish_count": 0,
                "task_count": 1,
                "step": 0
            },
            "last_publicWork": {		//昨天发的歌曲，今天未删除
                "task_list": [
                    {
                        "counts": 1,
                        "send_counts": 15
                    }
                ],
                "task_name": "last_publicWork",
                "star": 15,
                "finish_count": 0,
                "task_count": 1,
                "step": 0
            },
            "praise": {				//收听任务
                "task_list": [
                    {
                        "counts": 10,
                        "send_counts": 10
                    }
                ],
                "task_name": "praise",
                "star": 10,
                "finish_count": 0,
                "task_count": 10,
                "step": 0
            },
            "share": {				//分享任务
                "task_list": [
                    {
                        "counts": 1,
                        "send_counts": 10
                    }
                ],
                "task_name": "share",
                "star": 10,
                "finish_count": 0,
                "task_count": 1,
                "step": 0
            },
            "online": {				//K房在线
                "task_list": [
                    {
                        "counts": 15,
                        "send_counts": 10
                    }
                ],
                "task_name": "online",
                "star": 10,
                "finish_count": 0,
                "task_count": 15,
                "step": 0
            },
            "kmic_start": {			//上麦
                "task_list": [
                    {
                        "counts": 1,
                        "send_counts": 10
                    }
                ],
                "task_name": "kmic_start",
                "star": 10,
                "finish_count": 0,
                "task_count": 1,
                "step": 0
            },
            "sendBean": {			//送300豆子
                "task_list": [
                    {
                        "counts": 300,
                        "send_counts": 10
                    }
                ],
                "task_name": "sendBean",
                "star": 10,
                "finish_count": 0,
                "task_count": 300,
                "step": 0
            },
            "charge": {				//储值
                "task_list": [
                    {
                        "counts": 100,
                        "send_counts": 20
                    },
                    {
                        "counts": 200,
                        "send_counts": 20
                    },
                    {
                        "counts": 300,
                        "send_counts": 20
                    }
                ],
                "task_name": "charge",
                "star": 20,
                "finish_count": 0,
                "task_count": 100,
                "step": 0
            },
            "sendCoin": {			//赠送金币任务（K房，作品）	
                "task_list": [
                    {
                        "counts": 100,
                        "send_counts": 20
                    },
                    {
                        "counts": 200,
                        "send_counts": 20
                    },
                    {
                        "counts": 300,
                        "send_counts": 20
                    }
                ],
                "task_name": "sendSpecialGift",
                "star": 20,
                "finish_count": 0,
                "task_count": 100,
                "step": 0
            }

        }, //任务
        rankGroups: {},
        groupsUserMsg: {},
        setInited: 0,  //是否請求的初始畫的接口
        daily_b: 0, //每日遊戲幣
        daily_tasks: [],
        tab2: 2,
        ticketState: [],
        praise_area: [],   //给我点赞的人
        send_praise: 0,  //我当前的剩余点赞次数
        userScore: 0,
        lv_gift_status: 0,
    },
    mutations: {
        isLoaging(state, boolean) {
            boolean ? ++state.isLoading : --state.isLoading
        },
        changShareState(state, boolean) {
            state.isShare = boolean
        },
        changActStatus(state, val) {
            state.actStatus = val
        },
        changRegistered(state, val) {
            state.registered = val
        },
        changSetInited(state, val) {
            state.setInited = val
        },
        changDaily_b(state, val) {
            state.daily_b = val
        },
        changDaily_tasks(state, val) {
            state.daily_tasks = val
        },
        changTab2(state, val) {
            state.tab2 = val
        },
        changTicketState(state, val) {
            state.ticketState = val
        },
        changPraise_area(state, val) {
            state.praise_area = val
        },
        changSend_praise(state, val) {
            state.send_praise = val
        },
        changLv_gift_status(state, val) {
            state.lv_gift_status = val
        },
        changGroupsUserMsg(state, obj) {
            if (obj && typeof obj.key != 'undefined') {
                const key = obj.key;
                delete obj['key'];
                state.groupsUserMsg = Object.assign({}, state.groupsUserMsg, { [key]: Object.assign({}, state.groupsUserMsg[key], obj) });
            }
        },
        updateRankGroups(state, obj) {
            if (obj && typeof obj.key != 'undefined') {
                const key = obj.key;
                delete obj['key'];
                state.rankGroups = Object.assign({}, state.rankGroups, { [key]: Object.assign({}, state.rankGroups[key], obj) });
            }
        },
        reduceB(state, val) {
            state.daily_b -= val
        },
        addB(state, val) {
            state.daily_b += val
        },
        addRank(state, val) {
            if (state.rankGroups[0]) {
                state.rankGroups[0].list.push(val)
            } else if (state.rankGroups['total']) {
                state.rankGroups['total'].list.push(val)
            }
        },
        addTicketState(state, val) {
            state.ticketState[val].is_get = 1
        },
        setGameInfo(state, info) {
            state.gameInfo = Object.assign({}, state.gameInfo, info);
        },
        addScore(state, val) {
            state.userScore = state.userScore + val > 0 ? state.userScore + val : 0
            //個人信息加分數
            if (state.groupsUserMsg[0]) {
                state.groupsUserMsg[0].msg.score = state.userScore
            }
            if (state.groupsUserMsg['total']) {
                state.groupsUserMsg['total'].msg.score += 20
            }
            //排行榜加分數
            if (state.rankGroups[0] && state.groupsUserMsg[0]) {
                let rank1 = state.groupsUserMsg[0].msg.rank - 1
                if (rank1 < 100) {
                    state.rankGroups[0].list[rank1].score = state.userScore
                }

            }
            if (state.rankGroups['total'] && state.groupsUserMsg['total']) {
                let rank2 = state.groupsUserMsg['total'].msg.rank - 1
                if (rank2 < 100) {
                    state.rankGroups['total'].list[rank2].score += 20
                }
            }
        },
        changScore(state, val) {
            state.userScore = val
        },
        addTotalScore(state, val) {
            if (state.rankGroups['total']) {
                let rank = state.groupsUserMsg['total'].msg.rank - 1
                state.rankGroups['total'].list[rank].score += val
                state.groupsUserMsg['total'].msg.score += val
            }
        }
    },
    actions: {
        setloading({ commit }, boolean) {
            commit('isLoaging', boolean)
        },
        async getGameInfo() {
            const res = await getGameInfo();
            if (res.data) {
                const { response_status, response_data } = res.data;
                if (response_status && response_status.code === 0) {
                    context.commit('setGameInfo', response_data);
                }
            }
        },
    },
    getters: {}
})
export default store;