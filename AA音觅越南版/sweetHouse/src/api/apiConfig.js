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
        return get(`/index.php?action=sweetHouse.init&signture=innerserver&uid=${uid}&token=${token}`);
    } else {
        return get(`/index.php?action=sweetHouse.init&signture=innerserver&uid=${uid}&token=${token}`);
    }
}

//报名
function singUp(fuid) {
    if (fuid) {
        return get(`/index.php?action=sweetHouse.reg&signture=innerserver&uid=${uid}&token=${token}&fuid=${fuid}`)
    }
    return get(`/index.php?action=sweetHouse.reg&signture=innerserver&uid=${uid}&token=${token}`)
}

//任务列表
function tasksList() {
    return get(`/index.php?action=sweetHouse.tasks&signture=innerserver&uid=${uid}&token=${token}`)
}

//领取任务奖励获得制作甜品材料
function getCai(key) {
    return get(`/index.php?action=sweetHouse.get&key=${key}&signture=innerserver&uid=${uid}&token=${token}`)
}

//制作甜品
function creatSweet(id, count) {
    return get(`/index.php?action=sweetHouse.make&id=${id}&count=${count}&signture=innerserver&uid=${uid}&token=${token}`)
}
//打开礼盒
function openBox(score) {
    return get(`/index.php?action=sweetHouse.open&score=${score}&signture=innerserver&uid=${uid}&token=${token}`)
}

//榜单 
function getRank(from, more) {
    if (more) {
        return axios.get(`/index.php?action=sweetHouse.rank&from=${from}&signture=innerserver&uid=${uid}&token=${token}`)
    }
    return get(`/index.php?action=sweetHouse.rank&from=${from}&signture=innerserver&uid=${uid}&token=${token}`)
}

//广播
function getRoolMsg() {
    return axios.get(`/index.php?action=sweetHouse.notice&signture=innerserver&uid=${uid}&token=${token}`)
}

//好友列表
function getFriendList(from, invited) {
    if (invited) {
        return get(`/index.php?action=sweetHouse.friends&from=${from}&signture=innerserver&uid=${uid}&token=${token}&invited=${invited}`)
    }
    return get(`/index.php?action=sweetHouse.friends&from=${from}&signture=innerserver&uid=${uid}&token=${token}`)
}

//邀请好友
function shareFriend(touid) {
    return get(`/index.php?action=sweetHouse.invite&fuid=${touid}&signture=innerserver&uid=${uid}&token=${token}`)
}

//历史记录
function getHistroy(from) {
    return get(`/index.php?action=sweetHouse.history&from=${from}&signture=innerserver&uid=${uid}&token=${token}`)
}

//分享
function share(type, score) {
    if (type == 2) {
        return get(`/index.php?action=sweetHouse.share&uid=${uid}&type=${type}&score=${score}&signture=innerserver`)
    }
    return get(`/index.php?action=sweetHouse.share&uid=${uid}&type=${type}&signture=innerserver`)
}

//打开礼盒成功分享上报
function shareSuc(score) {
    return get(`/index.php?action=sweetHouse.shareReport&type=packet&signture=innerserver&uid=${uid}&score=${score}&token=${token}`)
}

function shareCb() {
    return get(`/index.php?action=sweetHouse.shareReport&type=task&signture=innerserver&uid=${uid}&token=${token}`)
}


function setNum(label) {
    return axios.get(`/index.php?action=sweetHouse.report&label=${label}&signture=innerserver&uid=${uid}&token=${token}`)
}
const httpConfig = {
    getDefault,
    singUp,
    tasksList,
    getCai,
    creatSweet,
    openBox,
    getRank,
    getRoolMsg,
    getFriendList,
    shareFriend,
    getHistroy,
    share,
    shareSuc,
    shareCb,
    setNum
}
export default httpConfig