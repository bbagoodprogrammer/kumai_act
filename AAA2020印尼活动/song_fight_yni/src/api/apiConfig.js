// 创建axios实例
import axios from 'axios'
import store from "../store/stores.js"
import getString from "../utils/getString.js"
import jsonp from 'jsonp'



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
        return get(`/song_fight/init.php?token=${token}`);
    } else {
        return get(`/song_fight/init.php`);
    }
}
//搜索歌曲
function searchSong(name, val) {
    if (val) {
        return get(`/song_fight/searchSong.php?name=${name}&next=1`)
    }
    return get(`/song_fight/searchSong.php?name=${name}`)
}
//提交歌曲
function searchMySong(accid) {
    return get(`/song_fight/mySong.php?token=${token}&accid=${accid}`)
}
//投遞
function pushWork(workid, accid) {
    return get(`/song_fight/pushWork.php?token=${token}&sid=${workid}&cid=${accid}`)
}

//我的投遞記錄
function myPushWorkHistory(from, more) {
    if (more) {
        return axios.get(`/song_fight/myPushWork.php?token=${token}&from=${from}`)
    }
    return get(`/song_fight/myPushWork.php?token=${token}&from=${from}`)
}


//我的投票
function myJun() {
    return get(`/song_fight/myJun.php?token=${token}`)
}

//評委獲取作品
function getWork() {
    return get(`/song_fight/getWork.php?token=${token}`)
}

//評委選作品
function selectWork(pk, rid) {
    return get(`/song_fight/selectWork.php?token=${token}&pk=${pk}&rid=${rid}`)
}

//作品詳情
function workInfo(rid) {
    return get(`workInfo.php?token=${token}&rid=${rid}`)
}
//APP關注
function appAttemsion(touid) {
    return new Promise((resolve, reject) => {
        jsonp(`https://act.wekarapp.com/index.php?&uid=${uid}&action=FocusExt&singerUid=${touid}&token=${token}`, null, (err, res) => {
            err ? reject(err) : resolve(res)
        });
    })
    //return get(`http://act.singnowapp.com/index.php?&uid=${uid}&action=FocusExt&singerUid=${touid}&token=${token}`)
}
//作品評委列表
function getWorkComList(rid) {
    return get(`/song_fight/workComList.php?token=${token}&rid=${rid}`)
}
//預告歌單
function getNextSong() {
    return get(`/song_fight/nextSong.php?`)
}
//關注
// function attemsion(suid) {
//     return get(`/drifting_bottle/attension.php?token=${token}&suid=${suid}`)
// }
const httpConfig = {
    getDefault,
    appAttemsion,
    searchSong,
    searchMySong,
    pushWork,
    myPushWorkHistory,
    getWork,
    selectWork,
    workInfo,
    myJun,
    getNextSong,
    getWorkComList
}
export default httpConfig