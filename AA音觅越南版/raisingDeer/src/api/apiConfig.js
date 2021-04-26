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
        return get(`/index.php?action=deerMan.init&signture=innerserver&uid=${uid}&token=${token}`);
    } else {
        return get(`/index.php?action=deerMan.init&signture=innerserver`);
    }
}
//報名
function singUp(invite_uid) {
    if (invite_uid) {
        return get(`/index.php?action=deerMan.register&signture=innerserver&invite_uid=${invite_uid}&uid=${uid}&token=${token}&t=${Math.random()}`);
    } else {
        return get(`/index.php?action=deerMan.register&signture=innerserver&uid=${uid}&token=${token}&t=${Math.random()}`);
    }
}

//土地解鎖
function getLand(id) {
    return axios.get(`/index.php?action=deerMan.unlockLand&signture=innerserver&id=${id}&uid=${uid}&token=${token}`)
}

//澆水
function wating(id) {
    return axios.get(`/index.php?action=deerMan.waterLand&signture=innerserver&id=${id}&uid=${uid}&token=${token}`)
}

//土地收成
function getCaoMei(id) {
    return axios.get(`/index.php?action=deerMan.harvest&signture=innerserver&id=${id}&uid=${uid}&token=${token}`)
}

//榜單
function getRank(from) {
    return axios.get(`/index.php?action=deerMan.rank&signture=innerserver&from=${from}`)
}

//道具任務列表
function propTasks() {
    return get(`/index.php?action=deerMan.toolMissions&signture=innerserver&uid=${uid}&token=${token}`)
}

//領任務獎勵
function getGifts(id) {
    return get(`/index.php?action=deerMan.getMissionReward&signture=innerserver&id=${id}&uid=${uid}&token=${token}`)
}

//使用道具
function useFunc(tool_id) {
    return get(`/index.php?action=deerMan.useTool&signture=innerserver&tool_id=${tool_id}&uid=${uid}&token=${token}`)
}

//水瓶任務列表
function waterTask() {
    return get(`/index.php?action=deerMan.waterMissions&signture=innerserver&uid=${uid}&token=${token}`)
}

//分享回調
function shareback(type, level) {
    if (type == 2) {
        return get(`/index.php?action=deerMan.share&signture=innerserver&type=${type}&level=${level}&uid=${uid}&token=${token}`)
    } else {
        return get(`/index.php?action=deerMan.share&signture=innerserver&type=${type}&uid=${uid}&token=${token}`)
    }
}

//已邀請用戶
function sharedPeople(from, type) {
    if (type) {
        return axios.get(`/index.php?action=deerMan.invitedUsers&signture=innerserver&from=${from}&uid=${uid}&token=${token}`)
    } else {
        return get(`/index.php?action=deerMan.invitedUsers&signture=innerserver&from=${from}&uid=${uid}&token=${token}`)
    }
}

//好友列表
function firendList(from, type) {
    if (type) {
        return axios.get(`/index.php?action=deerMan.friends&signture=innerserver&from=${from}&uid=${uid}&token=${token}`)
    } else {
        return get(`/index.php?action=deerMan.friends&signture=innerserver&from=${from}&uid=${uid}&token=${token}`)
    }
}

//邀請好友
function inivt(to_uid, type) {
    if (type) {
        return axios.get(`/index.php?action=deerMan.invite&signture=innerserver&to_uid=${to_uid}&uid=${uid}&token=${token}`)
    } else {
        return get(`/index.php?action=deerMan.invite&signture=innerserver&to_uid=${to_uid}&uid=${uid}&token=${token}`)
    }
}

//成長動態
function gotState(from) {
    return axios.get(`/index.php?action=deerMan.rewardRecords&signture=innerserver&from=${from}&uid=${uid}&token=${token}`)
}
const httpConfig = {
    getDefault,
    singUp,
    getLand,
    wating,
    getCaoMei,
    getRank,
    propTasks,
    getGifts,
    useFunc,
    waterTask,
    shareback,
    sharedPeople,
    firendList,
    inivt,
    gotState
}
export default httpConfig