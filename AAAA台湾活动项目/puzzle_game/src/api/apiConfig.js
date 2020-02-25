// 创建axios实例
import axios from 'axios'
import store from "../store/stores.js"
import getString from "../utils/getString.js"




// const defaultUid = 4979504;
//const defaultToken = '9g0rbTx1xZzvvx12zI7Ox1MIfqxuOLUD2pH4sMdS2Wp68UipYzi5jvF17OISrR6eBwePmxxrKkymtpnTMtkSq0bZ1QJoNkFWE0v1srRMiilfWp-ycMfLe8fTgIMTzLRN';
let token = getString("token")
// let uid = getString("uid")

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
        return get(`/puzzle_game/init.php?token=${token}`);
    } else {
        return get(`/puzzle_game/shareinit.php`);
    }
}

//註冊
function singUp() {
    return get(`/puzzle_game/register.php?token=${token}`)
}

//抽奖
function getGift(count) {
    return get(`/puzzle_game/getgift.php?token=${token}&count=${count}`)
}

//任务
function getTask() {
    return get(`/puzzle_game/dailytask.php?token=${token}`)
}

//合成拼圖
function synthesis() {
    return get(`/puzzle_game/puzzle.php?token=${token}`)
}

//邀请好友
function sharePeopl(from) {
    return get(`/puzzle_game/getfriendsrank.php?token=${token}&from=${from}`)
}

//查找好友
function chaUid(uid) {
    return get(`/puzzle_game/searchfriendsrank.php?token=${token}&search_uid=${uid}`)
}

//点赞
function praise(uid) {
    return get(`/puzzle_game/praise.php?token=${token}&touid=${uid}`)
}

//抽獎歷史
function getHistory(from, str) {
    if (str == 'more') {
        return axios.get(`/puzzle_game/getgiftrecord.php?token=${token}&from=${from}`)
    } else {
        return get(`/puzzle_game/getgiftrecord.php?token=${token}&from=${from}`)
    }
}

//榜單翻頁
function getRank(from) {
    if (token) {
        return axios.get(`/puzzle_game/rank.php?token=${token}&from=${from}`)
    } else {
        return axios.get(`/puzzle_game/sharerank.php?from=${from}`)
    }

}

//統計數據
function shareClick() {
    return axios.get(`/puzzle_game/shareclick.php?token=${token}`)
}

const httpConfig = {
    getDefault,
    singUp,
    getGift,
    getTask,
    synthesis,
    sharePeopl,
    chaUid,
    praise,
    getHistory,
    getRank,
    shareClick
}
export default httpConfig