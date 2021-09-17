import axios from 'axios'
import store from '../store'
import getSign from '../utils/getSign'
import { urls } from '../config';
import { getUrlString } from '../utils'
import { testGet } from './test';

function appendParam(url, key, value) {
    if (!new RegExp('(\\?|&)' + key + '=').test(url)) {
        const arr = url.split('#');
        url = arr[0].replace(/(\?|&)+$/, '');
        url = url + (/\?/.test(url) ? '&' : '?') + key + '=' + encodeURIComponent(value);
        if (arr[1]) {
            url += '#' + encodeURIComponent(arr[1]);
        }
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
        const a2b = atob;
        const euc = encodeURIComponent;
        // console.log('axios.interceptors', config);
        let { method, url, data } = config;

        // 测试请求URL差异处理（更好的处理方式是编写config/urls.js文件）
        // if (_test && !/^http/i.test(url)) {
        //     url = '/action' + url;
        // }

        // 通过URL添加标准withCredentials=1参数（临时参数），请求启用withCredentials，适用登录需要支持Cookie场景
        // 此时服务器Access-Control-Allow-Origin需要设置指定域名而不能为*
        const re = /(\?|&)withCredentials=(1|true)/i;
        if (re.test(url)) {
            config.withCredentials = true;
            url = url.replace(re, '$1');
        }

        // 替换URL占位符
        if (url) {
            const rid = getUrlString('rid') || getUrlString('room_id') || '';
            const uid = getUrlString('uid') || '';
            const token = getUrlString('token') || '';
            url = url.replace('{rid}', euc(rid)).replace('{uid}', euc(uid)).replace('{token}', euc(token));
        }

        // 自动增加语言参数
        if (typeof __lang != 'undefined') { // 部分项目打包不需要多语言支持移除local的chunk时无此变量
            url = appendParam(url, 'lang', __lang);
        }
        // 自动增加随机参数
        url = appendParam(url, 't', Date.now());
        // 觅友开发测试增加忽略APP签名参数
        if (APP == 'miyou') {
            if (process.env.NODE_ENV == 'development') {
                // 本地开发环境自动附加signture参数
                url = appendParam(url, 'signture', 'innerserver');
            } else {
                // 生产环境透传signture参数
                const p = a2b('c2lnbnR1cmU');
                const signture = getUrlString(p) || '';
                if (signture) {
                    url = appendParam(url, p, signture);
                }
            }
        }
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

        // 觅友请求参数APP签名，根据规范POST请求时如果有同名参数URL参数优先
        if (APP == 'miyou') {
            const dataAll = Object.assign({}, data, getQueryParams(url));
            const callbackId = btoa((dataAll['action'] || '') + Date.now() + Math.floor(Math.random() * 1000));
            const signObj = await getSign(dataAll, callbackId);
            const {sign, timestamp} = signObj;
            config.headers = {
                sign,
                timestamp,
                ...config.headers,
            };
            // iOS旧版签名忽略空值参数兼容错误提示
            const arr = [];
            for(let key in dataAll) {
                if (dataAll[key] == '') {
                    arr.push(key);
                }
            }
            if (arr.length) {
                console.error(`[${arr.join(',')}] params empty`);
            }
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

// 初始化
function init() {
    // return testGet('init', null, false);
    return get(urls.init);
}

export {
    init,
}