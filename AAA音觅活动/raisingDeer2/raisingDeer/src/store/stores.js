import Vue from 'vue';
import Vuex from 'vuex';
import downTime from '../utils/downTime'
Vue.use(Vuex);
const store = new Vuex.Store({
    state: {
        actStatus: 0, //活动状态，默认未开始
        userMsg: {}, // 用户是否报名
        isLoading: 0, //loading效果
        toast: false,   //彈窗
        toastTitle: '', // 彈窗標題
        toastImg: null,
        toastMsg: '',  //彈窗內容
        isShare: true, //分享
        land_info: [],
        // userSore: 9999,  //用戶成長值
        // userWater: 10,   //用户水瓶数
        lvArr: [
            0,
            2000,
            10000,
            20000,
            40000
        ],
        aniImg: 0,
        rank: [],
        propMissions: {}, //道具頁
        mouthAni: 1,
        deerAmi: 1
    },
    mutations: {
        isLoaging(state, boolean) {
            boolean ? ++state.isLoading : --state.isLoading
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
        mouthMove(state, val) {
            state.mouthAni = val
            setTimeout(() => {
                state.mouthAni = 1
            }, 2000)
        },
        updatAniImg(state, val) {
            state.deerAmi = val
        },
        setToast(state, val) {
            if (!state.toast) {
                state.toast = true
                state.toastMsg = val.msg
                state.toastTitle = val.title
                state.toastImg = val.img
                setTimeout(() => {
                    state.toast = false
                }, val.time || 1000)
            }
        },
        closeToast(state) {
            state.toast = false
        },
        setLvArr(state, val) {
            state.lvArr = val
        },
        setRank(state, val) {
            state.rank = val
        },
        addRank(state, val) {
            state.rank = state.rank.concat(val)
        },
        setPropMissions(state, val) {
            state.propMissions = val
        },
        reduxProp(state, val) {
            state.propMissions.tools[val].tool_count--
        },
        pushRank(state, val) {
            if (state.rank.length < 20) {
                state.rank.push(val)
            }
        },
        setLandInfo(state, val) {
            let arr = [
                {
                    id: 1,  //土地ID
                    status: 0,   //土地状态  0未解鎖，1可解鎖，2澆水期，3成長期，4成熟期
                    ripe_time: 0, // 倒计时秒数
                    unlock_level: 0,   //解锁成长值
                    tips: '領取鹿寶寶 </br>可解鎖',  //解锁提示文案
                    time_require: 3,  //成熟所需时间
                    water_require: 6,  //浇水所需水瓶数
                    reward_exp: 60  //成熟获得成长值
                },
                {
                    id: 2,  //土地ID
                    status: 0,   //土地状态
                    ripe_time: 0, // 倒计时秒数
                    unlock_level: 2000,   //解锁成长值
                    tips: '養成顏值逆天鹿解鎖田地</br>提供更多成長值',  //解锁提示文案
                    time_require: 3,  //成熟所需时间
                    water_require: 6,  //浇水所需水瓶数
                    reward_exp: 100  //成熟获得成长值
                },
                {
                    id: 3,  //土地ID
                    status: 0,   //土地状态
                    ripe_time: 0, // 倒计时秒数
                    unlock_level: 10000,
                    tips: '養成桃花旺旺鹿解鎖田地</br>提供更多成長值',
                    time_require: 3,
                    water_require: 6,
                    reward_exp: 150
                },
                {
                    id: 4,  //土地ID
                    status: 0,   //土地状态
                    ripe_time: 0, // 倒计时秒数
                    unlock_level: 20000,
                    tips: '養成天籟之音鹿解鎖田地</br>提供更多成長值',
                    time_require: 3,
                    water_require: 6,
                    reward_exp: 200
                }
            ]
            console.log(val)
            //此处合并数据
            var newArr = arr.map((item, index) => {
                return { ...item, ...val[index] };
            });
            console.log('new', newArr)
            for (let i = 0; i < newArr.length; i++) {
                const obj = newArr[i];
                const timeKey = 'land' + obj.id;
                downTime(timeKey, obj.ripe_time);
            }

            state.land_info = newArr;
        },
        updateLandInfo(state, obj) {
            if (obj && typeof obj.id == 'number') {
                const oldInfo = state.land_info[obj.id - 1];
                if (oldInfo) {
                    const newInfo = Object.assign({}, oldInfo, obj);
                    Vue.set(state.land_info, obj.id - 1, newInfo);
                }
            }
        },
        addScore(state, val) {
            state.userMsg.deer_exp += val
        },
        addWater(state, val) {
            state.userMsg.water_count += val
        },
        getPrpoWards(state, obj) {
            state.propMissions.missions[obj.index].status = 2
            if (obj.type == 1) { //普通加速，2超快加速，3成長值400，4水瓶
                state.propMissions.tools[0].tool_count += obj.num * 1
            } else if (obj.type == 2) {
                state.propMissions.tools[1].tool_count += obj.num * 1
            } else if (obj.type == 3) {
                state.userMsg.deer_exp += obj.num * 1
            }
        },
        reduceNum(state, val) {  //1水瓶  2
            if (val.type == 1) {
                state.userMsg.water_count -= val.num
            } else if (val.type == 2) {
            }
        }
    },
    actions: {
        setloading({ commit }, boolean) {
            commit('isLoaging', boolean)
        }
    },
    getters: {}
})
export default store;