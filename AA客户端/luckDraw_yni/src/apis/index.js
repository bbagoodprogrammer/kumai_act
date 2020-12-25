import axios from 'axios'
import store from '../store'
import { urls } from '../config';
import { replaceUrl, toast, getUrlString } from '../utils'
import { testGet } from './test';
import qs from 'qs'


const uid = getUrlString('uid')
const token = getUrlString('token')
const rid = getUrlString('rid')


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
    return new Promise((resolve, reject) => {
        const formData = new FormData();
        for (let key in data) {
            formData.append(key, data[key]);
        }
        store.commit('updateLoading', true);
        axios.post(url, formData, config).then(response => {
            store.commit('updateLoading', false);
            resolve(response);
        }).catch(error => {
            store.commit('updateLoading', false);
            reject(error);
        });
    });
}

function loadData(apiFunc, commitName, loadOnce = false) {
    return new Promise(async (resolve, reject) => {
        if (typeof apiFunc == 'function' && commitName && typeof commitName == 'string') {
            if (loadOnce && store.state.loadDataCount && store.state.loadDataCount[commitName]) {
                resolve();
                return;
            }

            const res = await apiFunc();
            if (res.data) {
                const { response_status, response_data } = res.data;
                if (response_status && response_status.error === '') {
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
    return get(replaceUrl(urls.getInitInfo));
}


//獲取自定義禮物
function getRoomDraw() {
    return axios.get(`/index.php?action=roomDraw.customDrawTicketList&token=${token}&rid=${rid}&uid=${uid}`)
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
        time_limit
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
        participator_limit
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
    return axios.get(`/index.php?action=roomDraw.customDrawPriseList&token=${token}&rid=${rid}&uid=${uid}&prise_type=${prise_type}`)
}

//固定抽獎列表
function fixedDraw() {
    return axios.get(`/index.php?action=roomDraw.fixedDrawPriseList&token=${token}&rid=${rid}&uid=${uid}`)
}

//抽獎詳情
function getDrawDetil(draw_id) {
    return get(`/index.php?action=roomDraw.getDetail&token=${token}&rid=${rid}&uid=${uid}&draw_id=${draw_id}`)
}

//抽獎詳情
function getHistory(logid, from) {
    if (from) {
        return axios.get(`/index.php?action=roomDraw.getHistoryDetailList&token=${token}&rid=${rid}&uid=${uid}&log_id=${logid}&from=${from}`)
    }
    return get(`/index.php?action=roomDraw.getHistoryDetailList&token=${token}&rid=${rid}&uid=${uid}&log_id=${logid}&from=${from}`)
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