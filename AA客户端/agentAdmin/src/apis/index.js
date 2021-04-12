import axios from "axios";
import store from "../store";
import { getUrlString, toast } from "../utils";
import { testGet } from "./test";
import sha1 from "sha1";

const aid = getUrlString("aid") || "";
const token = getUrlString("token") || "";
function appendParam(url, key, value) {
    if (!new RegExp("(\\?|&)" + key + "=").test(url)) {
        url = url.replace(/(\?|&)+$/, "");
        return url + (/\?/.test(url) ? "&" : "?") + key + "=" + value;
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
        // console.log('axios.interceptors', config);
        let { method, url, data } = config;

        // 测试请求URL差异处理

        if (!_test) {
            url = "//act." + _host + url;
        }

        // 替换URL占位符
        // if (url) {
        //     const rid = getUrlString("rid") || getUrlString("room_id") || "";
        //     const uid = getUrlString("uid") || "";
        //     const token = getUrlString("token") || "";
        //     url = url
        //         .replace("{rid}", rid)
        //         .replace("{uid}", uid)
        //         .replace("{token}", token);
        // }

        // 自动增加语言参数
        url = appendParam(url, "lang", __lang);
        // 自动增加随机参数
        url = appendParam(url, "t", Date.now());
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

function login(account, password) {
    // return testGet('login');
    console.log(sha1(password));
    return get(
        `/index.php?action=Agent.login&account=${account}&password=${sha1(
            password
        )}`
    );
}

function list(page, start_date, end_date, uid) {
    let apiStr = `/index.php?action=Agent.signedAnchorIncomelist&aid=${aid}&token=${token}&page=${page}&limit=9`;
    if (start_date) {
        apiStr += `&start_date=${start_date}`;
    }
    if (end_date) {
        apiStr += `&end_date=${end_date}`;
    }
    if (uid) {
        apiStr += `&uid=${uid * 1}`;
    }
    return get(apiStr);
    // return get(
    //     `/index.php?action=Agent.signedAnchorIncomelist&aid=${aid}&token=${token}&page=${page}&limit=20&start_date=${start_date}&end_date=${end_date}&uid=${uid}`
    // );
}

export { get, post, login, list };
