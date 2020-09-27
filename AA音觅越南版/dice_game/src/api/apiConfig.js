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
        return get(`/index.php?action=richMan.init&signture=innerserver&uid=${uid}&token=${token}`);
    } else {
        return get(`/index.php?action=richMan.init&signture=innerserver`);
    }
}
//註冊
function singUp(fuid) {
    if (fuid) {
        return get(`/index.php?action=richMan.reg&fuid=${fuid}&signture=innerserver&uid=${uid}&token=${token}`)
    }
    return get(`/index.php?action=richMan.reg&signture=innerserver&uid=${uid}&token=${token}`)
}

//每日任務
function dayTask() {
    return get(`/index.php?action=richMan.tasks&signture=innerserver&uid=${uid}&token=${token}`)
}
//好友列表
function getFriendList(from, invited) {
    if (invited) {
        return get(`/index.php?action=richMan.friends&from=${from}&signture=innerserver&uid=${uid}&token=${token}&invited=${invited}`)
    }
    return get(`/index.php?action=richMan.friends&from=${from}&signture=innerserver&uid=${uid}&token=${token}`)
}


//邀请好友
function shareFriend(touid) {
    return get(`/index.php?action=richMan.invite&fuid=${touid}&signture=innerserver&uid=${uid}&token=${token}`)
}

//完成任務領取骰子
function getCai(task) {
    return get(`/index.php?action=richMan.get&task=${task}&signture=innerserver&uid=${uid}&token=${token}`)
}

//購買骰子
function buyDice(count) {
    return get(`/index.php?action=richMan.buy&count=${count}&signture=innerserver&uid=${uid}&token=${token}`)
}

//遊戲公告
function roolMsg() {
    return get(`/index.php?action=richMan.notice&signture=innerserver`)
}


//投下骰子前進
function goDice() {
    return get(`/index.php?action=richMan.run&signture=innerserver&uid=${uid}&token=${token}`)
}

//放棄限時任務
function giveUp(type) {
    return get(`/index.php?action=richMan.giveup&type=${type}&signture=innerserver&uid=${uid}&token=${token}`)
}



//領取記錄
function getHistroy(from) {
    return get(`/index.php?action=richMan.history&from=${from}&signture=innerserver&uid=${uid}&token=${token}`)
}

//任務分享成功上報
function shareSuc() {
    return get(`/index.php?action=richMan.share&signture=innerserver&uid=${uid}&token=${token}`)
}
const httpConfig = {
    getDefault,
    singUp,
    dayTask,
    getFriendList,
    shareFriend,
    getCai,
    buyDice,
    goDice,
    giveUp,
    getHistroy,
    roolMsg,
    shareSuc
}
export default httpConfig