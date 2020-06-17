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
        return get(`/task_cards/init.php?token=${token}`);
    } else {
        return get(`/task_cards/init.php`);
    }
}

//翻牌彈幕
function getRotaMsg(type) {
    if (type) {
        return get('/task_cards/notice.php')
    } else {
        return axios.get('/task_cards/notice.php')
    }
}

//註冊
function singUp(model) {
    return get(`/task_cards/register.php?model=${model}&token=${token}`)
}

//買卡
function buyCard(type) {
    return get(`/task_cards/buy.php?type=${type}&token=${token}`)
}

//用卡
function userCard(card, type) {
    if (type) {
        return get(`/task_cards/use.php?etype=${type}&type=${card}&token=${token}`)
    } else {
        return get(`/task_cards/use.php?type=${card}&token=${token}`)
    }
}

//翻牌 
function openCard() {
    return get(`/task_cards/open.php?token=${token}&r=${new Date().getTime()}`)
}

//翻牌記錄
function getHistory(from, type) {
    if (type) {
        return axios.get(`/task_cards/history.php?from=${from}&token=${token}`)
    }
    return get(`/task_cards/history.php?from=${from}&token=${token}`)
}

//取消使用
function cancel() {
    return get(`/task_cards/cancel.php?token=${token}`)
}
const httpConfig = {
    getDefault,
    getRotaMsg,
    singUp,
    buyCard,
    userCard,
    openCard,
    getHistory,
    cancel
}
export default httpConfig