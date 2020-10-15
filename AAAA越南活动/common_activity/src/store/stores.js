import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);
const store = new Vuex.Store({
    state: {
        actStatus: 0, //活动状态，默认未开始
        isLoading: 0, //loading效果
        isShare: false, //分享
        giftGroups: {},
        user_info: {}, // 个人信息
        act_info: {},  //活动信息
        mission_status: 0, // 任务TAB红点
        exchange_status: 0,//兑换红点
        current_date: '', //当前日
        current_index: '',//当前日索引
        tab_index: '',  //当前在那一天的Tab
        date_line: [], //日期列表
        isDur: false,
        exchange_configs: [], //兑换页数据
        dayLoading: false,   //天數Loading
        // top_mission:{}, //登录任务
        // missions:{}, //其他任务
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
        setUser_info(state, val) {
            state.user_info = val
        },
        setAct_info(state, val) {
            state.act_info = val
        },
        setMission_status(state, val) {
            state.mission_status = val
        },
        setExchange_status(state, val) {
            state.exchange_status = val
        },
        setCurrent_date(state, val) {
            state.current_date = val
        },
        setCurrent_index(state, val) {
            state.current_index = val
        },
        setTab_index(state, val) {
            state.tab_index = val
        },
        setDate_line(state, val) {
            state.date_line = val
        },
        setTop_mission(state, val) {
            state.top_mission = val
        },
        setMissions(state, val) {
            state.missions = val
        },
        setisDur(state, val) {
            state.isDur = val
        },
        revGiftState(state, val) {
            state.exchange_configs[val.index].exchanged_count += val.giftNum  //已兌換加數據
            state.user_info.chips -= val.prizsNum * 1
        },
        setExchange_configs(state, val) {
            state.exchange_configs = val
        },
        setDayLoading(state, val) {
            state.dayLoading = val
        },
        setTaskState(state, val) {
            if (val.isLogin) {
                state.giftGroups[state.tab_index].top_mission.status = 2
                let prizes = state.giftGroups[state.tab_index].top_mission.prizes
                let num = 0
                prizes.forEach(element => {
                    if (element.prize_type == 8) {
                        num = element.prize_count
                    }
                })
                state.user_info.chips = state.user_info.chips * 1 + num * 1
            } else {
                state.giftGroups[state.tab_index].missions[val.index].status = 2
                let prizes = state.giftGroups[state.tab_index].missions[val.index].prizes
                let num = 0
                prizes.forEach(element => {
                    if (element.prize_type == 8) {
                        num = element.prize_count
                    }
                })
                state.user_info.chips = state.user_info.chips * 1 + num * 1
            }
        },
        updateRankGroups(state, obj) {
            if (obj && typeof obj.key != 'undefined') {
                const key = obj.key;
                delete obj['key'];
                state.giftGroups = Object.assign({}, state.giftGroups, { [key]: Object.assign({}, state.giftGroups[key], obj) });
            }
            console.log(state.giftGroups)
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