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
        store.dispatch("setloading",true) // 打开loading
        axios.get(url, config)
        .then(response => {
            store.dispatch("setloading",false) 
            // console.log(response)
            resolve(response);
        })
        .catch(error => {
            store.dispatch("setloading",false) 
            reject(error);
        });
    });
}

//获取活动基础信息
function getDefault(){
    if(token){
        return get(`/slot_machine/getactinfo.php?token=${token}`);
    }else{
        return get(`/slot_machine/getactinfo.php`);
    }
}
//抽奖
function luckDraw(coins){
    return get(`/slot_machine/getLottery.php?token=${token}&coins=${coins}`);
}
//抽奖记录
function getHistroy(num,type){
    if(type == "more"){
        return axios.get(`/slot_machine/lotteryHistory.php?token=${token}&start=${num}`);
    }else{
        return get(`/slot_machine/lotteryHistory.php?token=${token}&start=${num}`);
    }
    
}
// 获取基本信息
// function getBaseInfo() {
//     return get(`/family_battle/default.php?uid=${uid}&token=${token}`);
//     // axios.get(`/family_battle/default.php?uid=${defaultUid}&token=${defaultToken}`).then(function(res){
//     //     console.log(res)
//     // })
// }
// function getCords(){ //对战信息
//     return get(`/family_battle/pklist.php?uid=${uid}&token=${token}`)
// }

// function getMore(from){ // PK获取更多
//     return axios.get(`/family_battle/rank.php?uid=${uid}&token=${token}&from=${from}`)
// }
// function getEliteList(from){ //获取精英榜
//     return axios.get(`/family_battle/richman.php?uid=${uid}&token=${token}&from=${from}`)
// }
// // 报名
// function apply() {
//     return get(`/collect_notes/register.php?token=${token}`);
// }

// // 完成任务
// function finishTask(taskId) {
//     return get(`/collect_notes/getnotes.php?token=${token}&task_id=${taskId}`);
// }

// // 开奖
// function openPacket() {
//     return get(`/collect_notes/getpacket.php?token=${token}`);
// }

const httpConfig = {
    getDefault,
    luckDraw,
    getHistroy
}
export default httpConfig