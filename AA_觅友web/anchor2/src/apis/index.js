import axios from "axios";
import { getUrlString, toast } from "../utils";
import store from "../store";
import getSign from "../utils/getSign";

import { testGet } from "./test";

let API_ROOT = "";
const host = location.host;
if (
    /\d+\.\d+\.\d+\.\d+/.test(host) ||
    /localhost/i.test(host) ||
    /^t(est)?\./i.test(host)
) {
    //是否加上action测试环境
    // API_ROOT = '/action';
}

const defaultUid = 2233806;
const defaultToken =
    "7j_LhbO_hE7JJhgXy-UHuFfaBsgYz7rAxuF_EQpXQP5PQb8TK4DmuF4DtIpBTntqiwKjSFQaw97lgBZsqHC99pqoYlDDWwJGoCrQEyfRt_PFUf-eAbGnJaAdrCgBiZnVBLM4FVpQUatmRPXE-Xk8s3HqXW58jJzjGyyRDNkMKWzG-SiP0J_NPLRESSbnH7v9";
const isDebug = getUrlString("debug");
// const isDebug = true;
const uid = getUrlString("uid") || (isDebug ? defaultUid : "");
const token = getUrlString("token") || (isDebug ? defaultToken : "");
const rid = getUrlString("rid");
const lang = __lang;

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
        if (APP_NAME == "miyou") {
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
        if (APP_NAME == "miyou") {
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
    const formData = new FormData();
    for (let key in data) {
        formData.append(key, data[key]);
    }
    return axios.post(url, formData, config);
}

function loadData(apiFunc, commitName) {
    return new Promise(async (resolve, reject) => {
        if (
            typeof apiFunc == "function" &&
            commitName &&
            typeof commitName == "string"
        ) {
            const res = await apiFunc();
            if (res.data) {
                const { response_status, response_data } = res.data;
                if (response_status && response_status.error === "") {
                    store.commit(commitName, response_data);
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

function getGuildInfo() {
    return get(
        API_ROOT +
            `/index.php?action=Action/Anchor.getGuildInfo&uid=${uid}&token=${token}&lang=${lang}`
    );
}

function getDayInfo(ymd) {
    return get(
        API_ROOT +
            `/index.php?action=Action/Anchor.getDayAnchorInfo&uid=${uid}&token=${token}&lang=${lang}&page=1&ymd=${ymd}`
    );
}

function getMonthInfo(ym) {
    return get(
        API_ROOT +
            `/index.php?action=Action/Anchor.getMonthAnchorInfo&uid=${uid}&token=${token}&lang=${lang}&page=1&ym=${ym}`
    );
}

export { loadData, getGuildInfo, getDayInfo, getMonthInfo };
