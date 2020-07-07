// 创建axios实例
import axios from 'axios'
import store from "../store/stores.js"
import getString from "../utils/getString.js"




// const defaultUid = 4979504;
//const defaultToken = '9g0rbTx1xZzvvx12zI7Ox1MIfqxuOLUD2pH4sMdS2Wp68UipYzi5jvF17OISrR6eBwePmxxrKkymtpnTMtkSq0bZ1QJoNkFWE0v1srRMiilfWp-ycMfLe8fTgIMTzLRN';
let token = getString("token")
let uid = getString("uid")

// var num = 0
// axios.interceptors.request.use(function (config) {  //在请求发出之前进行一些操作
//     num++
//     store.dispatch("setloading",true)
//     return config
// });
// axios.interceptors.response.use(response => {        // 接受请求后num--，判断请求所有请求是否完成
//     num--
//     if (num <= 0) {
//         store.dispatch("setloading",false)    
//     } else {
//         store.dispatch("setloading",true)      
//     }
// })
// axios.create({
//     timeout: 5000          // 请求超时时间
//   });
// axios.defaults.baseURL = "http://activity.17sing.tw"
// axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8';//配置请求头
//包装axios.get，实现统一处理Loading
function get(url, config) {
    // if (store.state.isShare) {
    //     //分享时识别对应接口，自动切换或直接使用本地数据
    //     for (let regx in share) {
    //         if (url.indexOf(regx) != -1) {
    //             const conf = share[regx];
    //             if (typeof conf == 'string') {
    //                 url = conf;
    //             } else {
    //                 return new Promise(resolve => {
    //                     resolve({
    //                         data: {
    //                             response_status: {error:'', code:0},
    //                             response_data: conf
    //                         }
    //                     });
    //                 });
    //             }
    //         }
    //     }
    // }

    return new Promise((resolve, reject) => {
        store.dispatch("setloading", true) // 打开loading
        axios.get(url, config)
            .then(response => {
                store.dispatch("setloading", false)
                // console.log(response)
                resolve(response);
            })
            .catch(error => {
                store.dispatch("setloading", false)
                reject(error);
            });
    });
}

//获取活动基础信息
function getDefault() {
    if (token) {
        return get(`/drifting_bottle/init.php?token=${token}`);
    } else {
        return get(`/drifting_bottle/init.php`);
    }
}

//撈瓶子
function getBottle() {
    return get(`/drifting_bottle/gain.php?token=${token}`);
}

//投瓶子
function throwBottle(type, work_id) {
    return get(`/drifting_bottle/delivery.php?token=${token}&type=${type}&work_id=${work_id}`)
}

//點擊投瓶接口
function throwClick() {
    return get(`/drifting_bottle/deliveryInit.php?token=${token}`)
}

//獲取好友列表
function getFriendList() {
    return axios.get(`/drifting_bottle/myFriend.php?token=${token}`)
}

//獲取好友歌曲列表
function getFriendSong(fid) {
    return axios.get(`/drifting_bottle/friendSong.php?token=${token}&fid=${fid}`)
}

//我的投瓶記錄
function getMyBottleHistory(from) {
    return axios.get(`/drifting_bottle/deliveryRecord.php?token=${token}&from=${from}`)
}

//我的撈瓶記錄
function getMyGetBottle(from) {
    return axios.get(`/drifting_bottle/gainRecord.php?token=${token}&from=${from}`)
}


//點擊聽歌
function singIng(bottle) {
    return axios.get(`/drifting_bottle/clickBottle.php?token=${token}&bottle=${bottle}`)
}

//發獎
function geiGift(bottle, s_key) {
    return axios.get(`/drifting_bottle/hearPrize.php?token=${token}&bottle=${bottle}&s_key=${s_key}`)
}

//聽歌時長
function singTime(bottle, type, h_time, s_key) {
    return axios.get(`/drifting_bottle/hearBottle.php?token=${token}&bottle=${bottle}&type=${type}&h_time=${h_time}&s_key=${s_key}`)
}


//關注
function attemsion(bottle, suid) {
    return get(`/drifting_bottle/attension.php?token=${token}&bottle=${bottle}&suid=${suid}`)
}

//排行榜
function getRank(from, more) {
    if (more) {
        return axios.get(`/drifting_bottle/list.php?token=${token}&from=${from}`)
    }
    return get(`/drifting_bottle/list.php?token=${token}&from=${from}`)
}

//APP關注
function appAttemsion(touid) {
    return axios.get(`http://act.17sing.tw/index.php?&uid=${uid}&action=FocusExt&singerUid=${touid}&token=${token}`)
}
const httpConfig = {
    getDefault,
    getBottle,
    throwBottle,
    throwClick,
    getFriendList,
    getFriendSong,
    getMyBottleHistory,
    getMyGetBottle,
    singIng,
    geiGift,
    singTime,
    attemsion,
    getRank,
    appAttemsion
}
export default httpConfig