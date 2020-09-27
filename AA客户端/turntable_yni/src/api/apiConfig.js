// 创建axios实例
import axios from 'axios'
import store from "../store/stores.js"
import getString from "../utils/getString.js"
import { promises } from 'fs';

const jsonp = require('jsonp');



// const defaultUid = 4979504;
//const defaultToken = '9g0rbTx1xZzvvx12zI7Ox1MIfqxuOLUD2pH4sMdS2Wp68UipYzi5jvF17OISrR6eBwePmxxrKkymtpnTMtkSq0bZ1QJoNkFWE0v1srRMiilfWp-ycMfLe8fTgIMTzLRN';
let token = getString("token")
let uid = getString("uid")
let entryType = sessionStorage.getItem('entryType')
// axios.jsonp = (url, data) => {
//     if (!url)
//         throw new Error('url is necessary')
//     const callback = 'CALLBACK' + Math.random().toString().substr(9, 18)
//     const JSONP = document.createElement('script')
//     JSONP.setAttribute('type', 'text/javascript')

//     const headEle = document.getElementsByTagName('head')[0]

//     let ret = '';
//     if (data) {
//         if (typeof data === 'string')
//             ret = '&' + data;
//         else if (typeof data === 'object') {
//             for (let key in data)
//                 ret += '&' + key + '=' + encodeURIComponent(data[key]);
//         }
//         ret += '&_time=' + Date.now();
//     }
//     JSONP.src = `${url}?callback=${callback}${ret}`;
//     return new Promise((resolve, reject) => {
//         window[callback] = r => {
//             resolve(r)
//             headEle.removeChild(JSONP)
//             delete window[callback]
//         }
//         headEle.appendChild(JSONP)
//     })

// }
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
function getDefault(status) {
    return axios.get(`/big_turntable/init.php?token=${token}&status=${status}&page=${entryType}`);
}
//抽奖
function luckDraw(status) {
    return axios.get(`/big_turntable/go.php?token=${token}&status=${status}&page=${entryType}`);
}
//抽奖记录
function getHistroy(from) {
    return axios.get(`/big_turntable/userrecord.php?token=${token}&from=${from}&page=${entryType}`);
}

// 获取礼物列表
function getGiftList(type) {
    return axios.get(`/big_turntable/getpuzzlegiftlist.php?token=${token}&gift_type=${type}&page=${entryType}`)
}

//兌換禮物
function getGift(type, gid) {
    return get(`/big_turntable/getpuzzlegift.php?token=${token}&gift_type=${type}&gift_id=${gid}&page=${entryType}`)
}

//獲取表情包SVGA
function getSvga(bid) {
    // return axios.jsonp(`http://test.17sing.tw/action/index.php?action=emoticon.getEmoticonBagById&bid=${bid}&uid=${uid}&token=${token}`, "test")
    return new Promise((resolve, reject) => {
        jsonp(`http://test.wekarapp.com/action/index.php?action=emoticon.getEmoticonBagById&bid=${bid}&uid=${uid}&token=${token}`, null, (err, data) => {
            if (err) {
                reject(err);
            } else {
                resolve(data)
            }
        })
    })
}
const httpConfig = {
    getDefault,
    luckDraw,
    getHistroy,
    getGiftList,
    getGift,
    getSvga
}
export default httpConfig