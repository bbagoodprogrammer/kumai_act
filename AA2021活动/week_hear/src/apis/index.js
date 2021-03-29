import axios from "axios";
import store from "../store";
import { getUrlString, toast } from "../utils";
import { testGet } from "./test";
import jsonp from "jsonp";

const uid = getUrlString("uid") || "";
const token = getUrlString("token") || "";

let APP_api = "";
if (_app == "hsing") {
    APP_api = "http://act.17sing.tw";
} else if (_app == "singnow") {
    APP_api = "http://act.singnowapp.com";
}

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
            const qid = getUrlString("qid") || "";
            url = url
                .replace("{rid}", rid)
                .replace("{uid}", uid)
                .replace("{token}", token)
                .replace("{qid}", qid);
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
    if (token) {
        return get(`/week_hear/init.php?qid={qid}&token={token}`);
    } else {
        return get(`/week_hear/init.php?qid={qid}`);
    }
}

function linsten(sid) {
    return axios.get(
        `/week_hear/clickBottle.php?token={token}&sid=${sid}&qid={qid}`
    );
}

function hearBottle(sid, s_key) {
    return axios.get(
        `/week_hear/hearBottle.php?token={token}&sid=${sid}&s_key=${s_key}&qid={qid}`
    );
}

//APP關注
function appAttemsion(touid) {
    return new Promise((resolve, reject) => {
        jsonp(
            `${APP_api}/index.php?&uid=${uid}&action=FocusExt&singerUid=${touid}&token=${token}`,
            null,
            (err, res) => {
                err ? reject(err) : resolve(res);
            }
        );
    });
}

//收藏歌曲
function collectSong(sid) {
    return new Promise((resolve, reject) => {
        jsonp(
            //  `${APP_api}/index.php?&uid={uid}&action=AddCollect&token={token}&sid=${sid}`,
            `${APP_api}/index.php?&uid=${uid}&action=AddCollect&token=${token}&sid=${sid}`,
            null,
            (err, res) => {
                err ? reject(err) : resolve(res);
            }
        );
    });
}
export {
    get,
    post,
    loadData,
    getInitInfo,
    hearBottle,
    linsten,
    appAttemsion,
    collectSong
};
