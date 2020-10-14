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
        return get(`/index.php?action=halloweenParty.init&signture=innerserver&uid=${uid}&token=${token}`);
    } else {
        return get(`/index.php?action=halloweenParty.init&signture=innerserver`);
    }
}

//活動首頁
function tasks() {
    return get(`/index.php?action=halloweenParty.taskInit&signture=innerserver&uid=${uid}&token=${token}`)
}

//搜索
function search(s_uid) {
    return get(`/index.php?action=halloweenParty.search&signture=innerserver&ts_uid=${s_uid}&uid=${uid}&token=${token}`)
}

//領取新手任務
function newGetGift(taskId) {
    return get(`/index.php?action=halloweenParty.getNew&signture=innerserver&task=${taskId}&uid=${uid}&token=${token}`)
}

//每日任務領取
function dayGetGift(taskId) {
    return get(`/index.php?action=halloweenParty.get&signture=innerserver&task=${taskId}&uid=${uid}&token=${token}`)
}

//守護榜單
function teamList(tid, from, more) {
    if (more) {
        return axios.get(`/index.php?action=halloweenParty.guardList&signture=innerserver&from=${from}&tid=${tid}&uid=${uid}&token=${token}`)
    }
    return get(`/index.php?action=halloweenParty.guardList&signture=innerserver&from=${from}&tid=${tid}&uid=${uid}&token=${token}`)
}


//邀請好友列表
function invitedList(invited, from, more) {
    if (invited) {
        if (more) {
            return axios.get(`/index.php?action=halloweenParty.friends&signture=innerserver&from=${from}&invited=${invited}&uid=${uid}&token=${token}`)
        }
        return get(`/index.php?action=halloweenParty.friends&signture=innerserver&from=${from}&invited=${invited}&uid=${uid}&token=${token}`)
    } else {
        if (more) {
            return axios.get(`/index.php?action=halloweenParty.friends&signture=innerserver&from=${from}&uid=${uid}&token=${token}`)
        }
        return get(`/index.php?action=halloweenParty.friends&signture=innerserver&from=${from}&uid=${uid}&token=${token}`)
    }

}

//邀請好友
function inivtedFriend(fuid) {
    return get(`/index.php?action=halloweenParty.invite&signture=innerserver&fuid=${fuid}&uid=${uid}&token=${token}`)
}

//註冊
function singUp(fuid) {
    if (fuid) {
        return get(`/index.php?action=halloweenParty.reg&signture=innerserver&fuid=${fuid}&uid=${uid}&token=${token}`)
    }
    return get(`/index.php?action=halloweenParty.reg&signture=innerserver&uid=${uid}&token=${token}`)
}

//兌換頭像框
function exChange() {
    return get(`/index.php?action=halloweenParty.exchange&signture=innerserver&uid=${uid}&token=${token}`)
}

//彈幕
function roolMsg() {
    return axios.get(`/index.php?action=halloweenParty.notice&signture=innerserver&uid=${uid}&token=${token}`)
}

//歷史記錄
function getHistroy(from) {
    return axios.get(`/index.php?action=halloweenParty.dynamic&signture=innerserver&uid=${uid}&token=${token}&from=${from}`)
}
const httpConfig = {
    getDefault,
    tasks,
    search,
    newGetGift,
    dayGetGift,
    teamList,
    invitedList,
    inivtedFriend,
    singUp,
    exChange,
    roolMsg,
    getHistroy
}
export default httpConfig