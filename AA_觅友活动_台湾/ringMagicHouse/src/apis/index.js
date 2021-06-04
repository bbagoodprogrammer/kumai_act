import axios from 'axios'
import { getUrlString, toast, replaceUrl } from '../utils'
import store from '../store'
import api from './api'
import { testGet } from './test';

let API_ROOT = '';
const host = location.host;
if (/\d+\.\d+\.\d+\.\d+/.test(host) || /localhost/i.test(host) || /^t(est)?\./i.test(host)) {
    API_ROOT = '/action';
}

const defaultUid = 10012475;
const defaultToken = 'GF9O84K7tw0sEr2OBLIUjSMi-tiHk_tl4FbBRcP07Y48LpgYAJzSTMRMWFjBhmPQv5h-lnVLwBQjU0je_0z4dNYhts-v5H2lI6bVyx4Y0klsP6vuZ37LlGpd6aOC31a8';
const isDebug = getUrlString('debug');
// const isDebug = true;
const uid = getUrlString('uid') || (isDebug ? defaultUid : '');
const token = getUrlString('token') || (isDebug ? defaultToken : '');
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
    for(let key in data) {
        formData.append(key, data[key]);
    }
    return axios.post(url, formData, config);
}

function loadData(apiFunc, commitName) {
    return new Promise(async (resolve, reject) => {
        if (typeof apiFunc == 'function' && commitName && typeof commitName == 'string') {
            const res = await apiFunc();
            if (res.data) {
                const {response_status, response_data} = res.data;
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

function init(data) {
    return get(replaceUrl(api.init, data));
}
function subscribe(data) {
    return get(replaceUrl(api.subscribe, data));
}
function acceptableInvita(data) {
    return get(replaceUrl(api.acceptableInvita, data));
}
function friends(data) {
    return get(replaceUrl(api.friends, data));
}
function cooperateClick(data) {
    return get(replaceUrl(api.cooperateClick, data));
}
function sayHello(data) {
    return get(replaceUrl(api.sayHello, data));
}
function rank(data) {
    return get(replaceUrl(api.rank, data));
}
function invite(data) {
    return get(replaceUrl(api.invite, data));
}
function reject(data) {
    return get(replaceUrl(api.reject, data));
}
function accept(data) {
    return get(replaceUrl(api.accept, data));
}
function relieve(data) {
    return get(replaceUrl(api.relieve, data));
}
function rejectRelieve(data) {
    return get(replaceUrl(api.rejectRelieve, data));
}
function acceptRelieve(data) {
    return get(replaceUrl(api.acceptRelieve, data));
}
function history(data) {
    return get(replaceUrl(api.history, data));
}
function notice(data) {
    return get(replaceUrl(api.notice, data));
}
function invitedMail(data) {
    return get(replaceUrl(api.invitedMail, data));
}
function otherMail(data) {
    return get(replaceUrl(api.otherMail, data));
}
function finishTheTask(data) {
    return get(replaceUrl(api.finishTheTask, data));
}
function makingRings(data) {
    return get(replaceUrl(api.makingRings, data));
}

export {
    loadData,
    init,
    subscribe,
    acceptableInvita,
    friends,
    cooperateClick,
    sayHello,
    rank,
    invite,
    reject,
    accept,
    relieve,
    rejectRelieve,
    acceptRelieve,
    history,
    notice,
    invitedMail,
    otherMail,
    finishTheTask,
    makingRings
}