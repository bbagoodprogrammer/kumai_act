import axios from "axios";
import store from "../store";
import getSign from "../utils/getSign";
import { getUrlString, toast } from "../utils";
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

//初始化
function getInitInfo() {
    return get(`/index.php?action=manor.init&uid={uid}&token={token}`);
}

//土地狀態
function getLands(touid) {
    return get(
        `/index.php?action=manor.lands&uid={uid}&token={token}&touid=${touid}`
    );
}

//用户道具列表
function goodsList(type) {
    return get(
        `/index.php?action=manor.goodsList&uid={uid}&token={token}&type=${type}`
    );
}

//種植
function plant(land_id, goods_id) {
    return get(
        `/index.php?action=manor.plant&uid={uid}&token={token}&land_id=${land_id}&goods_id=${goods_id}`
    );
}

//摘
function harvest(plant_id) {
    return get(
        `/index.php?action=manor.harvest&uid={uid}&token={token}&plant_id=${plant_id}`
    );
}

//擴建
function addLand() {
    return get(`/index.php?action=manor.addLand&uid={uid}&token={token}`);
}

//使用的道具
function useProps(plant_id, goods_id) {
    return get(
        `/index.php?action=manor.useProps&uid={uid}&token={token}&plant_id=${plant_id}&goods_id=${goods_id}`
    );
}

//偷摘阳光
function steal(plant_id, goods_id) {
    return get(
        `/index.php?action=manor.steal&uid={uid}&token={token}&plant_id=${plant_id}&goods_id=${goods_id}`
    );
}

//报名
function reg(touid) {
    if (touid) {
        return get(
            `/index.php?action=manor.reg&uid={uid}&token={token}&touid=${touid}`
        );
    }
    return get(`/index.php?action=manor.reg&uid={uid}&token={token}`);
}

//商店
function shop() {
    return get(`/index.php?action=manor.shop&uid={uid}&token={token}`);
}

//购买
function buy(goods_id, num) {
    return get(
        `/index.php?action=manor.buy&uid={uid}&token={token}&goods_id=${goods_id}&num=${num}`
    );
}

//兌換
function exchange(prize_id, num) {
    return get(
        `/index.php?action=manor.exchange&uid={uid}&token={token}&prize_id=${prize_id}&num=${num}`
    );
}

//任務
function tasks() {
    return get(`/index.php?action=manor.tasks&uid={uid}&token={token}`);
}

//任務领取
function taskGet(task_id) {
    return get(
        `/index.php?action=manor.taskGet&uid={uid}&token={token}&task_id=${task_id}`
    );
}

//邀请列表
function invitedList() {
    return get(`/index.php?action=manor.subscribeList&uid={uid}&token={token}`);
}

//已邀请列表
function invitedUsers() {
    return get(`/index.php?action=manor.invitedUsers&uid={uid}&token={token}`);
}

//批量邀請用戶
function invite(touids) {
    return get(
        `/index.php?action=manor.invite&uid={uid}&token={token}&touids=${touids}`
    );
}

//当天签到
function sign() {
    return get(`/index.php?action=manor.sign&uid={uid}&token={token}`);
}

//歷史記錄
function history(type, from) {
    return get(
        `/index.php?action=manor.history&uid={uid}&token={token}&type=${type}&from=${from}`
    );
}

export {
    get,
    post,
    loadData,
    getLands,
    plant,
    goodsList,
    harvest,
    addLand,
    useProps,
    getInitInfo,
    steal,
    reg,
    shop,
    buy,
    exchange,
    tasks,
    taskGet,
    invitedList,
    invitedUsers,
    invite,
    sign,
    history
};
