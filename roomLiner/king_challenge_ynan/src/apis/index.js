import axios from 'axios'
import store from '../store'
import { urls } from '../config';
import { replaceUrl, getPostData, toast, getUrlString } from '../utils'
import { testGet } from './test';
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

// 初始化信息
function init(touid) {
    // return testGet('init');
    return get(replaceUrl(urls.init, { touid }));
}

function getDefaultData(uid1) {
    let uid = getUrlString('uid')
    return get(`/king_challenge/actData.php?uid=${uid}&uid1=${uid1}`);
}
export {
    loadData,
    init,
    getDefaultData
}