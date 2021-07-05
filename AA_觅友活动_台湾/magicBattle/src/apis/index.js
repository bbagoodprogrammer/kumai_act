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

function getInitInfo() {
    // return testGet('getInitInfo');
    // return testGet(arguments.callee.name);
    return get("/index.php?action=magicBattle.init&uid={uid}&token={token}");
}

function synthesis(prize_id, count) {
    return get(
        `/index.php?action=magicBattle.synthesis&uid={uid}&token={token}&prize_id=${prize_id}&count=${count}`
    );
}

function outs() {
    return get(
        `/index.php?action=magicBattle.divination&uid={uid}&token={token}`
    );
}

function singUp() {
    return get(
        `/index.php?action=magicBattle.register&uid={uid}&token={token}`
    );
}

function history(from, more) {
    if (more) {
        return axios.get(
            `/index.php?action=magicBattle.history&uid={uid}&token={token}&from=${from}`
        );
    }
    return get(
        `/index.php?action=magicBattle.history&uid={uid}&token={token}&from=${from}`
    );
}

export { get, post, loadData, getInitInfo, synthesis, outs, singUp, history };
