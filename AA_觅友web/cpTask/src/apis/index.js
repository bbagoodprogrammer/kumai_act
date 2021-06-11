import axios from 'axios'
import store from '../store'
import getSign from '../utils/getSign'
import { urls } from '../config';
import { getUrlString, toast } from '../utils'
import { testGet } from './test';

function getFormData(data) {
    const formData = new FormData();
    for(let key in data) {
        formData.append(key, data[key]);
    }
    return formData;
}
function buildQueryString(obj) {
    const arr = [];
    for (let key in obj) {
        arr.push(`${key}=${encodeURIComponent(obj[key])}`);
    }
    return arr.join('&');
}

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
        store.commit('updateLoading', true);
        axios.post(url, getFormData(data), config).then(response => {
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
                const {response_status, response_data} = res.data;
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

const rid = getUrlString('rid') || '';
const uid = getUrlString('uid') || '';
const token = getUrlString('token') || '';

async function request(api, data = {}, loading = true, post = false) {
    if (!api || typeof api != 'string') return;

    // 自动提取拼接在URL上的参数
    let action = '';
    const parts = api.split('?');
    if (parts.length == 2) {
        api = parts[0];
        data = data || {};
        const params = parts[1].split('&');
        for(let i = 0; i < params.length; i++) {
            const arr = params[i].split('=');
            const key = arr[0];
            const value = arr[1];
            data[key] = decodeURIComponent(value);
            if (key.toLowerCase() == 'action') {
                action = value;
            }
        }
    }

    // GET url 或 POST data 中 {name} 占位符替换
    for(let key in data) {
        const value = data[key];
        if (value == '{uid}') {
            data[key] = uid;
        } else if (value == '{token}') {
            data[key] = token;
        } else if (value == '{rid}') {
            data[key] = rid;
        }
    }

    // APP 请求参数加密签名
    const callbackId = btoa(api + action);
    const signObj = await getSign(data, callbackId);
    const sign = signObj.sign;
    const timestamp = signObj.timestamp;
    const config = {headers: {sign, timestamp}};

    const url = api + '?' + buildQueryString(data);
    if (loading) {
        return post ? post(api, data, config) : get(url, config);
    }
    return post ? axios.post(api, getFormData(data), config) : axios.get(url, config);
}

// 初始化
function init() {
    // return testGet('init', null, false);
    return request(urls.init);
}

function clockIn() {
    return request(urls.clockIn);
}

export {
    loadData,
    request,
    init,
    clockIn
}