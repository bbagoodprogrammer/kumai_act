import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);
const store = new Vuex.Store({
    state: {
        isLoading: 0, //loading效果
        isShare: false, //分享
        activeityState: null,  //活動狀態
        nowDay: 1, //當前天
        integral: 0,   //當前積分
        gift_list: {},  //積分狀態
        dateArr: [],   //日榜Tab时间搓
        setInited: 0,  //是否請求的初始畫的接口
        rankGroups: {},  //储存當天的信息
        groupsUserMsg: {},  //儲存各種天數的個人信息
        tab: 1,  //当前选中tab
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



        totalDay: null, //总天数
        day_down_time: null,  //本日倒計時
        total_down_time: null, //本期倒計時
    },
    mutations: {
        isLoaging(state, boolean) {
            boolean ? ++state.isLoading : --state.isLoading
        },
        changShareState(state, boolean) {
            state.isShare = boolean
        },
        changactiveityState(state, val) {
            state.activeityState = val
        },
        changNowDay(state, val) {
            state.nowDay = val
        },
        changIntegral(state, val) {
            state.integral = val
        },
        changGift_list(state, val) {
            state.gift_list = val
        },
        changDaily_tasks(state, val) {
            state.daily_tasks = val
        },
        changDateArr(state, val) {
            state.dateArr = val
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
            console.log(state.rankGroups)
        },
        changGiftState(state, val) {
            state.gift_list.gift_list[val].is_get = 1
        },


        changTotalDay(state, val) {
            state.totalDay = val
        },
        changday_down_time(state, val) {
            state.day_down_time = val
        },
        changtotal_down_time(state, val) {
            state.total_down_time = val
        },
        changSetInited(state, val) {
            state.setInited = val
        },
        changTab(state, val) {
            state.tab = val
        },
        updateDebutList(state, obj) {
            if (obj && typeof obj.key != 'undefined') {
                const key = obj.key;
                delete obj['key'];
                state.debutList = Object.assign({}, state.debutList, { [key]: Object.assign({}, state.debutList[key], obj) });
            }
        },
    },
    actions: {
        setloading({ commit }, boolean) {
            commit('isLoaging', boolean)
        }
    },
    getters: {}
})
export default store;