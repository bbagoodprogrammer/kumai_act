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
function getDefault(more) {
    if (more) {
        return axios.get(`/songking2020/init.php?token=${token}`);
    }
    if (token) {
        return get(`/songking2020/init.php?token=${token}`);
    } else {
        return get(`/songking2020/init.php`);
    }
}

//開箱
function openPacket(level) {
    return get(`/songking2020/openPacket.php?level=${level}&token=${token}`)
}

//紅包訂閱
function subscribe() {
    return get(`/songking2020/subscribe.php?token=${token}`)
}


//開紅包
function openRedPacket() {
    return get(`/songking2020/openRedPacket.php?token=${token}`)
}

//紅包記錄
function redPacketHistory(from, more) {
    if (more) {
        return axios.get(`/songking2020/redPacketHistory.php?from=${from}&token=${token}`)
    }
    return get(`/songking2020/redPacketHistory.php?from=${from}&token=${token}`)
}

//關閉紅包彈窗
function hideRedPacket() {
    return axios.get(`/songking2020/hideRedPacket.php?token=${token}`)
}

//報名作品列表
function song() {
    return get(`/songking2020/song.php?token=${token}`)
}

//選擇作品報名
function upload(sid) {
    return get(`/songking2020/upload.php?token=${token}&sid=${sid}`)
}




//報名
function singUp() {
    return get(`/songking2020/reg.php?token=${token}`)
}



//飆升作品記錄
function upRank() {
    if (token) {
        return get(`/songking2020/upRank.php?token=${token}`)
    }
    return get(`/songking2020/upRank.php`)
}

//魅力歌王榜
function rank(from) {
    if (token) {
        return get(`/songking2020/rank.php?token=${token}&from=${from}`)
    }
    return get(`/songking2020/rank.php?from=${from}`)
}


//上上报
function report(from) {
    return axios.get(`/songking2020/report.php?from=${from}&token=${token}`)
}





const httpConfig = {
    getDefault,
    singUp,
    song,
    upload,
    upRank,
    rank,
    subscribe,
    openPacket,
    openRedPacket,
    redPacketHistory,
    hideRedPacket,
    report
}
export default httpConfig