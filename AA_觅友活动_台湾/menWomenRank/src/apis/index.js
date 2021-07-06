import axios from 'axios'
import { getUrlString, toast, replaceUrl } from '../utils'
import store from '../store'
import api from './api'
// import { testGet } from './test';

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
function rank(data) {
    return get(replaceUrl(api.rank, data));
}
function register(data) {
    return get(replaceUrl(api.register, data));
}
function fansRank(data) {
    return get(replaceUrl(api.fansRank, data));
}
function notice(data) {
    return get(replaceUrl(api.notice, data));
}

export {
    loadData,
    init,
    fansRank,
    register,
    rank,
    notice
}