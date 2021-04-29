// 创建axios实例
import axios from "axios";
import store from "../store/stores.js";
import getString from "../utils/getString.js";
import qs from "qs";

const actName = "/kroom_party";

// const defaultUid = 4979504;
//const defaultToken = '9g0rbTx1xZzvvx12zI7Ox1MIfqxuOLUD2pH4sMdS2Wp68UipYzi5jvF17OISrR6eBwePmxxrKkymtpnTMtkSq0bZ1QJoNkFWE0v1srRMiilfWp-ycMfLe8fTgIMTzLRN';
let token = getString("token");
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
    store.dispatch("setloading", true); // 打开loading
    axios
      .get(url, config)
      .then(response => {
        store.dispatch("setloading", false);
        // console.log(response)
        resolve(response);
      })
      .catch(error => {
        store.dispatch("setloading", false);
        reject(error);
      });
  });
}

//获取活动基础信息
function getDefault() {
  if (token) {
    return get(`${actName}/init.php?token=${token}`);
  } else {
    return get(`${actName}/init.php`);
  }
}

//列表
function getList(from, isMore) {
  if (isMore) {
    if (token) {
      return axios.get(`${actName}/loadList.php?token=${token}&from=${from}`);
    } else {
      return axios.get(`${actName}/loadList.php?from=${from}`);
    }
  } else {
    if (token) {
      return get(`${actName}/loadList.php?token=${token}&from=${from}`);
    } else {
      return get(`${actName}/loadList.php?from=${from}`);
    }
  }
}

//檢查是否房主貨管理員
function adminOrOwner(rid, type) {
  if (type) {
    return get(`${actName}/adminOrowner.php?token=${token}&type=${type}`);
  }
  return get(`${actName}/adminOrowner.php?token=${token}&rid=${rid}`);
}

//申請活動
function commitAct(
  rid,
  them,
  nums,
  cover,
  desc,
  stime,
  etime,
  prize,
  is_reg,
  setType,
  host_uid
) {
  let data = {
    token,
    rid,
    them,
    nums,
    cover,
    desc,
    stime,
    etime,
    prize,
    is_reg,
    host_uid
  };
  let api = `${actName}/apply.php`;
  if (setType) {
    data.id = setType;
    api = `${actName}/applyEdit.php`;
  }
  return axios({
    url: api,
    method: "post",
    data: qs.stringify(data),
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    }
  });
}

//關注
function attention(id) {
  return get(`${actName}/attension.php?token=${token}&id=${id}`);
}

//報名
function singUp(id, reg_msg, reg_song) {
  let data = {
    id,
    token,
    reg_msg,
    reg_song
  };
  return axios({
    url: `${actName}/register.php`,
    method: "post",
    data: qs.stringify(data),
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    }
  });
}

//獲取報名列表
function getPeopleList(id, from, isMore) {
  if (isMore) {
    return axios.get(
      `${actName}/regList.php?token=${token}&id=${id}&from=${from}`
    );
  }
  return get(`${actName}/regList.php?token=${token}&id=${id}&from=${from}`);
}

//我的活動
function getMyAct(from, isMore) {
  if (isMore) {
    return axios.get(`${actName}/myParty.php?token=${token}&from=${from}`);
  }
  return get(`${actName}/myParty.php?token=${token}&from=${from}`);
}

//活動詳情
function getActData(id) {
  return get(`${actName}/partyData.php?token=${token}&id=${id}`);
}
//獲取金豆
function getBeat() {
  return get(`${actName}/getDayBean.php?token=${token}`);
}

//活動積分
function actScore(id) {
  return get(`${actName}/score.php?token=${token}&id=${id}`);
}
const httpConfig = {
  getDefault,
  getList,
  adminOrOwner,
  commitAct,
  attention,
  singUp,
  getPeopleList,
  getMyAct,
  getActData,
  getBeat,
  actScore
};
export default httpConfig;
