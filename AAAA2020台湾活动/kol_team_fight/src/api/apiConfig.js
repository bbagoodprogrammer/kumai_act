// 创建axios实例
import axios from 'axios'
import store from "../store/stores.js"
import getString from "../utils/getString.js"

let act = '/kol_team_fight'


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
        return get(`${act}/init.php?token=${token}`);
    } else {
        return get(`${act}/init.php`);
    }
}

//搜索隊員
function searchMate(s_uid) {
    return get(`${act}/searchMate.php?token=${token}&s_uid=${s_uid}`)
}

//隊長邀請
function invite(invite_id) {
    return get(`${act}/invite.php?token=${token}&invite_id=${invite_id}`)
}

//好友列表加載
function friendList(from) {
    return axios.get(`${act}/frindList.php?token=${token}&from=${from}`)
}

//任務列表
function taskList() {
    return get(`${act}/task.php?token=${token}`)
}

//隊長再次邀請
function hostInvite(invite_id) {
    return get(`${act}/invite.php?token=${token}&invite_id=${invite_id}`)
}

//隊長處理申請記錄
function hostApplySet(rid, type) {
    return get(`${act}/applySet.php?token=${token}&apply_id=${rid}&type=${type}`)
}


//隊員再次申請
function application(apply_id) {
    return get(`${act}/apply.php?token=${token}&apply_id=${apply_id}`)
}

//隊員處理邀請
function applySet(apply_id, type) {
    return get(`${act}/inviteSet.php?token=${token}&rid=${apply_id}&type=${type}`)
}


//戰隊詳情
function teamInfo(team_id) {
    return get(`${act}/teamInfo.php?token=${token}&team_id=${team_id}`)
}


//報名
function singUp(type) {
    return get(`${act}/register.php?token=${token}&type=${type}`)
}

//搜索隊長信息
function searchLeader(suid) {
    return get(`${act}/searchLeader.php?token=${token}&s_uid=${suid}`)
}

//跳轉隨機UID
function joinRoom() {
    return get(`${act}/joinRoom.php?token=${token}`)
}
const httpConfig = {
    getDefault,
    searchMate,
    invite,
    friendList,
    taskList,
    hostInvite,
    hostApplySet,
    application,
    applySet,
    teamInfo,
    singUp,
    searchLeader,
    joinRoom
}
export default httpConfig