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
        return get(`/carnival2020ceremony/init.php?token=${token}`);
    } else {
        return get(`/carnival2020ceremony/init.php`);
    }
}

//抽奖
function go(track) {
    return get(`/carnival2020ceremony/lottery.php?token=${token}&track=${track}`)
}

//抽奖记录
function record1(from, more) {
    if (more) {
        return axios.get(`/carnival2020ceremony/record1.php?token=${token}&from=${from}`)
    }
    return get(`/carnival2020ceremony/record1.php?token=${token}&from=${from}`)
}

//抽奖榜单
function list1(from, more) {
    if (more) {
        return axios.get(`/carnival2020ceremony/list1.php?token=${token}&from=${from}`)
    }
    return get(`/carnival2020ceremony/list1.php?token=${token}&from=${from}`)
}

//助攻VIP
function page2() {
    if (token) {
        return get(`/carnival2020ceremony/page2.php?token=${token}`)
    }
    return get(`/carnival2020ceremony/page2.php`)
}

//VIP榜单
function list2(from) {
    if (token) {
        return axios.get(`/carnival2020ceremony/list2.php?token=${token}&from=${from}`)
    }
    return axios.get(`/carnival2020ceremony/list2.php?from=${from}`)
}

//获取礼包
function getGift(gid) {
    return get(`/carnival2020ceremony/getGift.php?token=${token}&gid=${gid}`)
}

//礼物冠名
function page3() {
    if (token) {
        return get(`/carnival2020ceremony/page3.php?token=${token}`)
    }
    return get(`/carnival2020ceremony/page3.php`)
}

//tab3收礼记录
function record3(from, more) {
    if (more) {
        return axios.get(`/carnival2020ceremony/record3.php?token=${token}&from=${from}`)
    }
    return get(`/carnival2020ceremony/record3.php?token=${token}&from=${from}`)
}

//榜单3
function list3(gid, from) {
    if (token) {
        return get(`/carnival2020ceremony/list3.php?token=${token}&gid=${gid}&from=${from}`)
    }
    return get(`/carnival2020ceremony/list3.php?gid=${gid}&from=${from}`)
}


//页面4
function page4(type) {
    if (token) {
        return get(`/carnival2020ceremony/page4.php?token=${token}&type=${type}`)
    } else {
        return get(`/carnival2020ceremony/page4.php?type=${type}`)
    }

}

//页面5 
function page5(from) {
    if (token) {
        return get(`/carnival2020ceremony/page5.php?token=${token}`)
    }
    return get(`/carnival2020ceremony/page5.php`)
}


//报名
function singUp() {
    return get(`/carnival2020ceremony/register.php?token=${token}`)
}

//删除高亮
function delRedPoint() {
    return axios.get(`/carnival2020ceremony/delRedPoint.php?token=${token}`)
}


const httpConfig = {
    getDefault,
    go,
    page2,
    page3,
    page4,
    page5,
    singUp,
    list1,
    list2,
    list3,
    record1,
    getGift,
    record3,
    delRedPoint
}
export default httpConfig