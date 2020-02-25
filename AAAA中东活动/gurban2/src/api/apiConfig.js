// 创建axios实例
import axios from 'axios'
import store from "../store/stores.js"
import getString from "../utils/getString.js"




// const defaultUid = 4979504;
//const defaultToken = 'anlefMHHeMNmg4b1e7OoNTGBr0EiJ1oScK70xa4xv7Y6Q9A-5eO5WRSdO7v6THVsKWzaXnhO4umz6TSVe15B83vtNVO37DXe6a5RaJdluxyn7pZH4bz_7rRQTl6X3Iz2';
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
    if (val > 0) {
        return axios.get(`/corban/init.php?token=${token}&from=${val}`);
    } else {
        return get(`/corban/init.php?token=${token}`);
    }

}
//预约瓜分
function maskMutton() {
    return get(`/corban/order.php?token=${token}`)
}
//瓜分羊肉
function carveup() {
    return get(`/corban/openredrnvelope.php?token=${token}`)
}
//领取星星
function getStart() {
    return get(`/corban/getstar.php?token=${token}`)
}
//报名
function singUP() {
    return get(`/corban/register.php?token=${token}`)
}
//记录
function countList() {
    return get(`/corban/openrecord.php?token=${token}`)
}
//VIP
function openVIP() {
    return get(`/corban/getvip.php?token=${token}`)
}
//购买VIP余额
function VIPyue() {
    return get(`/corban/getwallet.php?token=${token}`)
}

//领取送礼星星
function getGiftStar(num) {
    return get(`/corban/getgiftstar.php?token=${token}&star=${num}`)
}

//取消抢红包提醒
function cancelRedReminder() {
    return get(`/corban/unorder.php?token=${token}`)
}

//个人领取详情
function getHistory(from) {
    return get(`/corban/getredrecord.php?token=${token}&from=${from}`)
}
const httpConfig = {
    getDefault,
    maskMutton,
    carveup,
    getStart,
    singUP,
    countList,
    openVIP,
    VIPyue,
    getGiftStar,
    cancelRedReminder,
    getHistory
}
export default httpConfig