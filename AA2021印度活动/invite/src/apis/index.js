import axios from "axios";
import store from "../store";
import { getUrlString, toast } from "../utils";
import { testGet } from "./test";

axios.interceptors.request.use(
    async config => {
        // console.log('axios.interceptors', config);
        let { method, url, data } = config;

        // 测试请求目录有差异启用以下代码
        // if (_test) {
        //     url = "/action" + url;
        // }

        // 替换URL占位符
        if (url) {
            const rid = getUrlString("rid") || getUrlString("room_id") || "";
            const uid = getUrlString("uid") || "";
            const token = getUrlString("token") || "";
            url = url
                .replace("{rid}", rid)
                .replace("{uid}", uid)
                .replace("{token}", token);
        }

        // 自动增加语言参数
        if (!/(\?|&)lang=/.test(url)) {
            url += (/\?/.test(url) ? "&" : "?") + "lang=" + __lang;
        }
        // 自动增加随机参数
        if (!/(\?|&)t=/.test(url)) {
            url += "&t=" + Date.now();
        }
        config.url = url;

        // 转换POST提交的数据格式
        if (method == "post" && !(data instanceof FormData)) {
            data = Object.assign({}, data);
            const formData = new FormData();
            for (let key in data) {
                formData.append(key, data[key]);
            }
            config.data = formData;
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

function getInitInfo() {
    // return testGet('getInitInfo');
    return get("/invite/init.php?token={token}");
}
//报名，开红包
function singUp() {
    return get("/invite/open.php?token={token}");
}
//填写邀请码
function inviteCode(code) {
    return get(`/invite/input.php?code=${code}&token={token}`);
}
//兑换
function exchange(type, money) {
    return get(
        `/invite/exchange.php?type=${type}&money=${money}&token={token}`
    );
}
//公告
function notice() {
    return axios.get(`/invite/notice.php?token={token}`);
}
//上报
function report(from) {
    return get(`/invite/report.php?from=${from}`);
}
export {
    get,
    post,
    loadData,
    getInitInfo,
    singUp,
    inviteCode,
    exchange,
    notice,
    report
};
