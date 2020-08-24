// 创建axios实例
import axios from 'axios'
import store from "../store/stores.js"
import getString from "../utils/getString.js"
import qs from 'qs'



// const defaultUid = 4979504;
//const defaultToken = '9g0rbTx1xZzvvx12zI7Ox1MIfqxuOLUD2pH4sMdS2Wp68UipYzi5jvF17OISrR6eBwePmxxrKkymtpnTMtkSq0bZ1QJoNkFWE0v1srRMiilfWp-ycMfLe8fTgIMTzLRN';
let token = getString("token")
let uid = getString("uid")
let rid = getString("rid")
let vote_id = getString("vote_id")
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

//提交投票
function commitVote(descriptions, option_type, options, voter_type_limit, user_level_limit, time_limit) {
    let data = {
        // action: "roomVote.createVote",
        token,
        uid,
        rid,
        descriptions,
        option_type,
        options: JSON.stringify(options),
        voter_type_limit,
    }
    if (user_level_limit != '') {
        data['user_level_limit'] = user_level_limit
    }
    if (time_limit != '') {
        data['time_limit'] = time_limit
    }
    console.log(data)
    return axios({
        url: '/index.php?action=roomVote.createVote',
        method: 'post',
        data: qs.stringify(data),
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    })
}


//投票詳情
function voteMsg(reset) {
    if (reset) {
        axios.get(`/index.php?action=roomVote.voteDetail&uid=${uid}&token=${token}&rid=${rid}&vote_id=${vote_id}`)
    }
    return get(`/index.php?action=roomVote.voteDetail&uid=${uid}&token=${token}&rid=${rid}&vote_id=${vote_id}`)
}

//結束投票
function endVote() {
    let data = {
        token,
        uid,
        rid,
        vote_id
    }
    return axios({
        url: '/index.php?action=roomVote.closeVote',
        method: 'post',
        data: qs.stringify(data),
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    })
}

//投票
function commitChione(option) {
    let data = {
        token,
        uid,
        rid,
        vote_id,
        option
    }
    return axios({
        url: '/index.php?action=roomVote.vote',
        method: 'post',
        data: qs.stringify(data),
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    })
}

//投票記錄
function getVoteHistory(last_id, more) {
    if (more) {
        return axios.get(`/index.php?action=roomVote.getVoteHistory&uid=${uid}&token=${token}&rid=${rid}&last_id=${last_id}`)
    }
    return get(`/index.php?action=roomVote.getVoteHistory&uid=${uid}&token=${token}&rid=${rid}&last_id=${last_id}`)
}
const httpConfig = {
    commitVote,
    voteMsg,
    endVote,
    commitChione,
    getVoteHistory
}
export default httpConfig