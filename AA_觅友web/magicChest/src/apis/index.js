import axios from 'axios'
import { getUrlString, toast } from '../utils'
import store from '../store'
import { testGet } from './test';

let API_ROOT = '';
const host = location.host;
if (/\d+\.\d+\.\d+\.\d+/.test(host) || /localhost/i.test(host) || /^t(est)?\./i.test(host)) {
    //是否加上action测试环境
    // API_ROOT = '/action';
}

const defaultUid = 2233806;
const defaultToken = '7j_LhbO_hE7JJhgXy-UHuFfaBsgYz7rAxuF_EQpXQP5PQb8TK4DmuF4DtIpBTntqiwKjSFQaw97lgBZsqHC99pqoYlDDWwJGoCrQEyfRt_PFUf-eAbGnJaAdrCgBiZnVBLM4FVpQUatmRPXE-Xk8s3HqXW58jJzjGyyRDNkMKWzG-SiP0J_NPLRESSbnH7v9';
const isDebug = getUrlString('debug');
// const isDebug = true;
const uid = getUrlString('uid') || (isDebug ? defaultUid : '');
const token = getUrlString('token') || (isDebug ? defaultToken : '');
const rid = getUrlString("rid");
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

function getTask() {
    return get(API_ROOT+`/index.php?signture=innerserver&action=Action/MagicBox.getUserTaskList&uid=${uid}&token=${token}&lang=${lang}&rid=${rid}`);
}

function getGift() {
    return get(API_ROOT+`/index.php?signture=innerserver&action=Action/MagicBox.getMagicGiftList&uid=${uid}&token=${token}&lang=${lang}&rid=${rid}`);
}

function getEnergy(type) {
    return get(API_ROOT+`/index.php?signture=innerserver&action=Action/MagicBox.collectEnergy&uid=${uid}&token=${token}&lang=${lang}&rid=${rid}&type=${type}`);
}

function openBox() {
    return get(API_ROOT+`/index.php?signture=innerserver&action=Action/MagicBox.openMagicBox&uid=${uid}&token=${token}&lang=${lang}&rid=${rid}`);
}


export {
    loadData,
    getTask,
    getGift,
    getEnergy,
    openBox,
}