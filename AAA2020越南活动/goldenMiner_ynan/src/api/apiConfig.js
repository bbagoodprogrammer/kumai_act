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
function getDefault(val) {
    if (token) {
        if (val) {
            return axios.get(`/happy_miner/init.php?token=${token}`);
        }
        return get(`/happy_miner/init.php?token=${token}`);
    } else {
        return get(`/happy_miner/init.php`);
    }
}

//挖礦
function lottery(track, all) {
    if (all) {
        return get(`/happy_miner/lottery1.php?token=${token}`)
    }
    return get(`/happy_miner/lottery.php?token=${token}&track=${track}`)
}

//報名
function singUp() {
    return get(`/happy_miner/register.php?token=${token}`)
}

//每日禮包
function getDayWards() {
    if (token) {
        return get(`/happy_miner/dayGift.php?token=${token}`)
    } else {
        return get(`/happy_miner/dayGift.php`)
    }

}

//領取
function getGift(gift_id) {
    return get(`/happy_miner/getDayGift.php?token=${token}&gift_id=${gift_id}`)
}

//榜單
function getRank(from, type) {
    if (type) {
        if (token) {
            return axios.get(`/happy_miner/allList.php?token=${token}&from=${from}`)
        } else {
            return axios.get(`/happy_miner/allList.php?from=${from}`)
        }
    } else {
        if (token) {
            return get(`/happy_miner/allList.php?token=${token}&from=${from}`)
        } else {
            return get(`/happy_miner/allList.php?from=${from}`)
        }
    }

}

//歷史記錄
function getHistory(from, type) {
    if (type) {
        return axios.get(`/happy_miner/wealthList.php?token=${token}&from=${from}`)
    } else {
        return get(`/happy_miner/wealthList.php?token=${token}&from=${from}`)
    }
}
const httpConfig = {
    getDefault,
    lottery,
    singUp,
    getDayWards,
    getGift,
    getRank,
    getHistory
}
export default httpConfig