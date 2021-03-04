import axios from "axios";
import { getUrlString, toast } from "../utils";
import store from "../store";
import { testGet } from "./test";

let API_ROOT = "spring_flower";
const host = location.host;
if (
    /\d+\.\d+\.\d+\.\d+/.test(host) ||
    /localhost/i.test(host) ||
    /^t(est)?\./i.test(host)
) {
    // API_ROOT = '/action';
}

const defaultUid = 2233806;
const defaultToken =
    "7j_LhbO_hE7JJhgXy-UHuFfaBsgYz7rAxuF_EQpXQP5PQb8TK4DmuF4DtIpBTntqiwKjSFQaw97lgBZsqHC99pqoYlDDWwJGoCrQEyfRt_PFUf-eAbGnJaAdrCgBiZnVBLM4FVpQUatmRPXE-Xk8s3HqXW58jJzjGyyRDNkMKWzG-SiP0J_NPLRESSbnH7v9";
const isDebug = getUrlString("debug");
// const isDebug = true;
const uid = getUrlString("uid") || (isDebug ? defaultUid : "");
const token = getUrlString("token") || (isDebug ? defaultToken : "");
const lang = __lang;

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

// function getInitInfo() {
//     // return testGet('getInitInfo');
//     return get(`${API_ROOT}/index.php?action=kolExt.getInitInfo&uid=${uid}&token=${token}&lang=${lang}`);
// }

function init() {
    return get(`${API_ROOT}/init.php?token=${token}`);
}

function singUp() {
    return get(`${API_ROOT}/register.php?token=${token}`);
}

//扩建
function extension() {
    return get(`${API_ROOT}/extension.php?token=${token}`);
}

//种植
function plant(no, type, num) {
    return get(
        `${API_ROOT}/plant.php?token=${token}&no=${no}&type=${type}&num=${num}`
    );
}

//用加速器
function spring_flower(no, num) {
    return get(`${API_ROOT}/hoping.php?token=${token}&num=${num}&no=${no}`);
}

//摘
function mature(no) {
    return get(`${API_ROOT}/mature.php?token=${token}&no=${no}`);
}

//列表
function allList(from) {
    return get(`${API_ROOT}/allList.php?token=${token}&from=${from}`);
}

//抽奖
function lottery(track) {
    return get(`${API_ROOT}/lottery.php?token=${token}&track=${track}`);
}

//抽奖列表
function lotteryRecord(track) {
    return get(`${API_ROOT}/lotteryRecord.php?token=${token}&from=${from}`);
}
//领取签到礼包
function getDayGift(gift_id) {
    return get(`${API_ROOT}/getDayGift.php?token=${token}&gift_id=${gift_id}`);
}

//抽奖列表
function getChargeGift(track) {
    return get(`${API_ROOT}/getChargeGift.php?token=${token}`);
}

export {
    loadData,
    init,
    singUp,
    extension,
    plant,
    spring_flower,
    mature,
    allList,
    lottery,
    lotteryRecord,
    getDayGift,
    getChargeGift
};
