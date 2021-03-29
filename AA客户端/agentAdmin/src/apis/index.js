import axios from 'axios'
import store from '../store'
import { getUrlString, toast } from '../utils';
import { testGet } from './test';

function appendParam(url, key, value) {
    if (!new RegExp('(\\?|&)' + key + '=').test(url)) {
        url = url.replace(/(\?|&)+$/, '');
        return url + (/\?/.test(url) ? '&' : '?') + key + '=' + value;
    }
    return url;
}
function getQueryParams(url) {
    const obj = {};
    if (url && typeof url == 'string') {
        const parts = url.replace(/#[^#]*$/, '').split('?');
        if (parts.length == 2) {
            const params = parts[1].split('&');
            for(let i = 0; i < params.length; i++) {
                const arr = params[i].split('=');
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
        // if (_test) {
        //     url = '/action' + url;
        // }

        // 替换URL占位符
        if (url) {
            const rid = getUrlString('rid') || getUrlString('room_id') || '';
            const uid = getUrlString('uid') || '';
            const token = getUrlString('token') || '';
            url = url.replace('{rid}', rid).replace('{uid}', uid).replace('{token}', token);
        }

        // 自动增加语言参数
        url = appendParam(url, 'lang', __lang);
        // 自动增加随机参数
        url = appendParam(url, 't', Date.now());
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
        if (method == 'post' && data) {
            const formData = new FormData();
            for(let key in data) {
                formData.append(key, data[key]);
            }
            config.data = formData;
        }

        return config;
    },
    err => {
        return Promise.reject(err);
    },
);

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
        axios.post(url, data, config).then(response => {
            store.commit('updateLoading', false);
            resolve(response);
        }).catch(error => {
            store.commit('updateLoading', false);
            reject(error);
        });
    });
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

function login(account) {
    // return testGet('login');
    return get(`/index.php?action=agnet.login&account=${account}`);
}

function list(stime = '', etime = '', keyword = '') {
    // return testGet('list');
    return get(`/index.php?action=agnet.list&stime=${stime}&etime=${etime}&keyword=${keyword}`);
}

export {
    get,
    post,
    login,
    list,
}