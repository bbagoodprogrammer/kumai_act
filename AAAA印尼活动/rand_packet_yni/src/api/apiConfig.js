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
function getDefault(day) {
    if (token) {
        return get(`/rand_packet/init.php?day=${day}&token=${token}`);
    } else {
        return get(`/rand_packet/init.php?day=${day}`);
    }
}

//註冊
function userSingUp(day) {
    if (day != -1) {
        return get(`/rand_packet/register.php?day=${day}&token=${token}`)
    } else {
        return get(`/rand_packet/register.php?token=${token}`)
    }
}

//開盒子
function openBox(type) {
    return get(`/rand_packet/open.php?type=${type}&token=${token}`)
}

//盒子記錄
function getBoxHistory(from, more) {
    if (more) {
        return axios.get(`/rand_packet/history.php?from=${from}&token=${token}`)
    } else {
        return get(`/rand_packet/history.php?from=${from}&token=${token}`)
    }
}


//获取弹幕
function getRoolMsg() {
    return get('/rand_packet/notice.php')
}
const httpConfig = {
    getDefault,
    userSingUp,
    openBox,
    getBoxHistory,
    getRoolMsg
}
export default httpConfig