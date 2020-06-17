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
        return get(`/index.php?action=findGift.init&signture=innerserver&uid=${uid}&token=${token}`);
    } else {
        return get(`/index.php?action=findGift.init&signture=innerserver`);
    }
}
//彈幕
function getRoolMsg() {
    return get(`/index.php?action=findGift.notice&signture=innerserver&uid=${uid}&token=${token}`)
}
//抽奖
function luckDraw(type, num) {
    return get(`/index.php?action=findGift.open&type=${type}&count=${num}&signture=innerserver&uid=${uid}&token=${token}`);
}
//買鑰匙
function buyKeys(count) {
    return get(`/index.php?action=findGift.buy&count=${count}&signture=innerserver&uid=${uid}&token=${token}`)
}
//兌換
function getGift(pid) {
    return get(`/index.php?action=findGift.exchange&pid=${pid}&signture=innerserver&uid=${uid}&token=${token}`)
}

//榜單
function getRank(from, more) {
    if (more) {
        return axios.get(`/index.php?action=findGift.rank&from=${from}&signture=innerserver&uid=${uid}&token=${token}`)
    } else {
        return get(`/index.php?action=findGift.rank&from=${from}&signture=innerserver&uid=${uid}&token=${token}`)
    }
}
//記錄
function getHistory(type, from, more) {
    if (more) {
        return axios.get(`/index.php?action=findGift.history&type=${type}&from=${from}&signture=innerserver&uid=${uid}&token=${token}`)
    }
    return get(`/index.php?action=findGift.history&type=${type}&from=${from}&signture=innerserver&uid=${uid}&token=${token}`)
}
const httpConfig = {
    getDefault,
    getRoolMsg,
    luckDraw,
    buyKeys,
    getGift,
    getRank,
    getHistory
}
export default httpConfig