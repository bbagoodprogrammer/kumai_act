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
        return get(`/prayer_star/init.php?token=${token}`);
    } else {
        return get(`/prayer_star/shareinit.php`);
    }
}
//签到任务
function sing() {
    return get(`/prayer_star/sign.php?token=${token}`)
}
//领取精灵球
function receive(key) {
    return get(`/prayer_star/getgift.php?token=${token}&gid=${key}`)
}
//祈愿
function blessing(toUid) {
    return get(`/prayer_star/prayer.php?token=${token}&toUid=${toUid}`)
}
//查询id 
function query(uid) {
    return get(`/prayer_star/search.php?token=${token}&search_uid=${uid}`)
}
//榜单
function songliRank(type, from, more) {
    if (token) {
        if (more) {
            return axios.get(`/prayer_star/rank.php?token=${token}&rank_type=${type}&from=${from}`)
        } else {
            return get(`/prayer_star/rank.php?token=${token}&rank_type=${type}&from=${from}`)
        }
    } else {
        if (more) {
            return axios.get(`/prayer_star/sharerank.php?rank_type=${type}&from=${from}`)
        } else {
            return get(`/prayer_star/sharerank.php?rank_type=${type}&from=${from}`)
        }
    }

}
//获取歌曲列表
function getSongList() {
    return get(`/prayer_star/getusersongs.php?token=${token}`)
}
//报名
function singUp(sid) {
    return get(`/prayer_star/register.php?token=${token}&sid=${sid}`)
}
const httpConfig = {
    getDefault,
    sing,
    receive,
    blessing,
    query,
    songliRank,
    getSongList,
    singUp
}
export default httpConfig