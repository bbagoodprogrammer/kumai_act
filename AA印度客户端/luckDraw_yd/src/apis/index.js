import axios from 'axios'
import { getUrlString, toast } from '../utils'
import store from '../store'
import { testGet } from './test';
import qs from 'qs'


let API_ROOT = '';
const host = location.host;
if (/\d+\.\d+\.\d+\.\d+/.test(host) || /localhost/i.test(host) || /^t(est)?\./i.test(host)) {
    API_ROOT = '';
}

const defaultUid = 2233806;
const defaultToken = '7j_LhbO_hE7JJhgXy-UHuFfaBsgYz7rAxuF_EQpXQP5PQb8TK4DmuF4DtIpBTntqiwKjSFQaw97lgBZsqHC99pqoYlDDWwJGoCrQEyfRt_PFUf-eAbGnJaAdrCgBiZnVBLM4FVpQUatmRPXE-Xk8s3HqXW58jJzjGyyRDNkMKWzG-SiP0J_NPLRESSbnH7v9';
const isDebug = getUrlString('debug');
// const isDebug = true;
const uid = getUrlString('uid') || (isDebug ? defaultUid : '');
const token = getUrlString('token') || (isDebug ? defaultToken : '');
const rid = getUrlString('rid')
const app_lang = getUrlString('lang')
const lang = __lang;

function get(url, config) {
    return new Promise((resolve, reject) => {
        store.commit('updateLoading', true);
        axios.get(url, config).then(response => {
            store.commit('updateLoading', false);
            resolve(response);
        }).catch(error => {
            store.commit('updateLoading', false);
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
        if (typeof apiFunc == 'function' && commitName && typeof commitName == 'string') {
            const res = await apiFunc();
            if (res.data) {
                const { response_status, response_data } = res.data;
                if (response_status && response_status.error === '') {
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

//獲取自定義禮物
function getRoomDraw() {
    return axios.get(`/index.php?action=roomDraw.customDrawTicketList&token=${token}&rid=${rid}&uid=${uid}&lang=${app_lang}`)
}

//發起自定義抽獎
function createCustomDraw(ticket_id, prise_id, participator_limit, time_limit) {
    let data = {
        token,
        uid,
        rid,
        ticket_id,
        prise_id,
        participator_limit,
        time_limit,
        lang: app_lang
    }
    return axios({
        url: '/index.php?action=roomDraw.createCustomDraw',
        method: 'post',
        data: qs.stringify(data),
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    })
}

//發起固定抽獎
function createFixedDraw(fix_draw_prise_id, participator_limit) {
    let data = {
        token,
        uid,
        rid,
        fix_draw_prise_id,
        participator_limit,
        lang: app_lang
    }
    return axios({
        url: '/index.php?action=roomDraw.createFixedDraw',
        method: 'post',
        data: qs.stringify(data),
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    })
}

//獲取自定義獎品
function getcustomDrawPriseList(prise_type) {
    return axios.get(`/index.php?action=roomDraw.customDrawPriseList&token=${token}&rid=${rid}&uid=${uid}&prise_type=${prise_type}&lang=${app_lang}`)
}

//固定抽獎列表
function fixedDraw() {
    return axios.get(`/index.php?action=roomDraw.fixedDrawPriseList&token=${token}&rid=${rid}&uid=${uid}&lang=${app_lang}`)
}

//抽獎詳情
function getDrawDetil(draw_id) {
    return get(`/index.php?action=roomDraw.getDetail&token=${token}&rid=${rid}&uid=${uid}&draw_id=${draw_id}&lang=${app_lang}`)
}

//抽獎詳情
function getHistory(logid, from) {
    if (from) {
        return axios.get(`/index.php?action=roomDraw.getHistoryDetailList&token=${token}&rid=${rid}&uid=${uid}&log_id=${logid}&from=${from}&lang=${app_lang}`)
    }
    return get(`/index.php?action=roomDraw.getHistoryDetailList&token=${token}&rid=${rid}&uid=${uid}&log_id=${logid}&from=${from}&lang=${app_lang}`)
}

// 初始化
function getInitInfo() {
    // return testGet('getInitInfo');
    return get(replaceUrl(urls.getInitInfo));
}
export {
    loadData,
    getInitInfo,
    getRoomDraw,
    createCustomDraw,
    getcustomDrawPriseList,
    fixedDraw,
    createFixedDraw,
    getDrawDetil,
    getHistory
}