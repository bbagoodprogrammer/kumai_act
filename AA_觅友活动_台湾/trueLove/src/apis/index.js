import axios from "axios";
import store from "../store";
import getSign from "../utils/getSign";
import { getUrlString, toast, replaceUrl } from "../utils";
import api from "./api";
import { testGet } from "./test";

function appendParam(url, key, value) {
    if (!new RegExp("(\\?|&)" + key + "=").test(url)) {
        url = url.replace(/(\?|&)+$/, "");
        return (
            url +
            (/\?/.test(url) ? "&" : "?") +
            key +
            "=" +
            encodeURIComponent(value)
        );
    }
    return url;
}
function getQueryParams(url) {
    const obj = {};
    if (url && typeof url == "string") {
        const parts = url.replace(/#[^#]*$/, "").split("?");
        if (parts.length == 2) {
            const params = parts[1].split("&");
            for (let i = 0; i < params.length; i++) {
                const arr = params[i].split("=");
                const key = arr[0];
                const value = arr[1];
                obj[key] = decodeURIComponent(value);
            }
        }
    }
    return obj;
}
axios.interceptors.request.use(
    async config => {
        const a2b = atob;
        const euc = encodeURIComponent;
        // console.log('axios.interceptors', config);
        let { method, url, data } = config;

        // 测试请求URL差异处理
        // if (_test) {
        //     url = '/action' + url;
        // }

        // 替换URL占位符
        if (url) {
            const rid = getUrlString("rid") || getUrlString("room_id") || "";
            const uid = getUrlString("uid") || "";
            const token = getUrlString("token") || "";
            url = url
                .replace("{rid}", euc(rid))
                .replace("{uid}", euc(uid))
                .replace("{token}", euc(token));
        }

        // 自动增加语言参数
        url = appendParam(url, "lang", __lang);
        // 自动增加随机参数
        url = appendParam(url, "t", Date.now());
        // 觅友开发测试增加忽略APP签名参数
        if (APP == "miyou") {
            if (process.env.NODE_ENV == "development") {
                // 本地开发环境自动附加signture参数
                url = appendParam(url, "signture", "innerserver");
            } else {
                // 生产环境透传signture参数
                const p = a2b("c2lnbnR1cmU");
                const signture = getUrlString(p) || "";
                if (signture) {
                    url = appendParam(url, p, signture);
                }
            }
        }
        config.url = url;

        // 如果DATA已经是FormData格式，先转成普通对象供后续觅友APP签名使用
        if (data instanceof FormData) {
            const obj = {};
            data.forEach((value, key) => {
                obj[key] = value;
            });
            data = obj;
        }

        // 转换POST提交的数据格式
        if (method == "post" && data) {
            const formData = new FormData();
            for (let key in data) {
                formData.append(key, data[key]);
            }
            config.data = formData;
        }

        // 觅友请求参数APP签名，根据规范POST请求时如果有同名参数URL参数优先
        if (APP == "miyou") {
            const dataAll = Object.assign({}, data, getQueryParams(url));
            const callbackId = btoa(
                (dataAll["action"] || "") +
                    Date.now() +
                    Math.floor(Math.random() * 1000)
            );
            const signObj = await getSign(dataAll, callbackId);
            const { sign, timestamp } = signObj;
            config.headers = {
                sign,
                timestamp,
                ...config.headers
            };
            // iOS旧版签名忽略空值参数兼容错误提示
            const arr = [];
            for (let key in dataAll) {
                if (dataAll[key] == "") {
                    arr.push(key);
                }
            }
            if (arr.length) {
                console.error(`[${arr.join(",")}] params empty`);
            }
        }
        return config;
    },
    err => {
        return Promise.reject(err);
    }
);

function get(url, config) {
    return new Promise((resolve, reject) => {
        store.commit("updateLoading", true);
        axios
            .get(url, config)
            .then(response => {
                store.commit("updateLoading", false);
                resolve(response);
            })
            .catch(error => {
                store.commit("updateLoading", false);
                reject(error);
            });
    });
}

function post(url, data, config) {
    return new Promise((resolve, reject) => {
        store.commit("updateLoading", true);
        axios
            .post(url, data, config)
            .then(response => {
                store.commit("updateLoading", false);
                resolve(response);
            })
            .catch(error => {
                store.commit("updateLoading", false);
                reject(error);
            });
    });
}

function loadData(apiFunc, commitName, loadOnce = false) {
    return new Promise(async (resolve, reject) => {
        if (
            typeof apiFunc == "function" &&
            commitName &&
            typeof commitName == "string"
        ) {
            if (
                loadOnce &&
                store.state.loadDataCount &&
                store.state.loadDataCount[commitName]
            ) {
                resolve();
                return;
            }

            const res = await apiFunc();
            if (res.data) {
                const { response_status, response_data } = res.data;
                if (response_status && response_status.error === "") {
                    store.commit(commitName, response_data);

                    store.state.loadDataCount = store.state.loadDataCount || {};
                    if (store.state.loadDataCount[commitName]) {
                        store.state.loadDataCount[commitName]++;
                    } else {
                        store.state.loadDataCount[commitName] = 1;
                    }

                    resolve(response_data);
                } else {
                    if (response_status.error) {
                        toast(response_status.error);
                    }
                    reject(res.data);
                }
            } else {
                reject(res);
            }
        } else {
            reject();
        }
    });
}

// 初始化
function getInitInfo() {
    // return testGet('getInitInfo');
    // return testGet(arguments.callee.name);
    return get(`/index.php?action=trueLove.init&uid={uid}&token={token}`);
}
//进入页面获取邀请我的列表
function creatInivitFriend() {
    return get(
        `/index.php?action=trueLove.acceptableInvita&uid={uid}&token={token}`
    );
}
//好友列表
function friendList(from) {
    return get(
        `/index.php?action=trueLove.friends&uid={uid}&token={token}&from=${from}`
    );
}

//接受邀請  mail_id 列表的郵件ID
function acceptFriend(mail_id) {
    return get(
        `/index.php?action=trueLove.accept&uid={uid}&token={token}&mail_id=${mail_id}`
    );
}

//拒絕邀請  mail_id 列表的郵件ID
function rejectFriend() {
    return get(
        `/index.php?action=trueLove.reject&uid={uid}&token={token}&mail_id=${mail_id}`
    );
}

//拒絕解除關係
function rejectRelieve_cj(mail_id) {
    return get(
        `/index.php?action=trueLove.rejectRelieve&uid={uid}&token={token}&mail_id=${mail_id}`
    );
}

//同意解除關係
function getAcceptableInvita(mail_id) {
    return get(
        `/index.php?action=trueLove.acceptRelieve&uid={uid}&token={token}&mail_id=${mail_id}`
    );
}

//邀請好友
function inivitFriend(to_uid) {
    return get(
        `/index.php?action=trueLove.invite&uid={uid}&token={token}&to_uid=${to_uid}`
    );
}

//申请解除关系
function relieve() {
    return get(`/index.php?action=trueLove.relieve&uid={uid}&token={token}`);
}

//轉盤列表
function giftList() {
    return get(`/index.php?action=trueLove.giftList&uid={uid}&token={token}`);
}

//抽獎 is_batch  1: 10抽  0:單抽
function luck_go(is_batch) {
    return get(
        `/index.php?action=trueLove.go&uid={uid}&token={token}&is_batch=${is_batch}`
    );
}

//抽獎歷史記錄
function lotteryRecord(from) {
    return get(
        `/index.php?action=trueLove.giftRecord&uid={uid}&token={token}&from=${from}`
    );
}

//初始调用
function joinAct() {
    return get(`/index.php?action=trueLove.subscribe&uid={uid}&token={token}`);
}

//信箱（威威代碼部分）
function invite(data) {
    return get(replaceUrl(api.invite, data));
}

function reject(data) {
    return get(replaceUrl(api.reject, data));
}

function rejectRelieve(data) {
    return get(replaceUrl(api.rejectRelieve, data));
}

function acceptRelieve(data) {
    return get(replaceUrl(api.acceptRelieve, data));
}

// function reject(data) {
//     return get(replaceUrl(api.rejectRelieve, data));
// }

function accept(data) {
    return get(replaceUrl(api.accept, data));
}
export {
    get,
    post,
    loadData,
    getInitInfo,
    friendList,
    inivitFriend,
    creatInivitFriend,
    rejectFriend,
    acceptFriend,
    rejectRelieve_cj,
    getAcceptableInvita,
    relieve,
    invite,
    reject,
    accept,
    rejectRelieve,
    acceptRelieve,
    giftList,
    luck_go,
    lotteryRecord,
    joinAct
};
