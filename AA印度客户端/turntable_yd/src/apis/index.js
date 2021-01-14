import axios from 'axios'
import { getUrlString, toast } from '../utils'
import store from '../store'
import { testGet } from './test';

let API_ROOT = '';
const host = location.host;
if (/\d+\.\d+\.\d+\.\d+/.test(host) || /localhost/i.test(host) || /^t(est)?\./i.test(host)) {
    API_ROOT = '/action';
}

const jsonp = require('jsonp');
const defaultUid = 2233806;
const defaultToken = '7j_LhbO_hE7JJhgXy-UHuFfaBsgYz7rAxuF_EQpXQP5PQb8TK4DmuF4DtIpBTntqiwKjSFQaw97lgBZsqHC99pqoYlDDWwJGoCrQEyfRt_PFUf-eAbGnJaAdrCgBiZnVBLM4FVpQUatmRPXE-Xk8s3HqXW58jJzjGyyRDNkMKWzG-SiP0J_NPLRESSbnH7v9';
const isDebug = getUrlString('debug');
// const isDebug = true;
const uid = getUrlString('uid') || (isDebug ? defaultUid : '');
const token = getUrlString('token') || (isDebug ? defaultToken : '');
let entryType = sessionStorage.getItem('entryType')


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

//获取活动基础信息
function getDefault(status) {
    return axios.get(`/big_turntable/init.php?token=${token}&status=${status}&page=${entryType}`);
}
//抽奖
function luckDraw(status) {
    return axios.get(`/big_turntable/go.php?token=${token}&status=${status}&page=${entryType}`);
}
//抽奖记录
function getHistroy(from) {
    return axios.get(`/big_turntable/userrecord.php?token=${token}&from=${from}&page=${entryType}`);
}

// 获取礼物列表
function getGiftList(type) {
    return axios.get(`/big_turntable/getpuzzlegiftlist.php?token=${token}&gift_type=${type}&page=${entryType}`)
}

//兌換禮物
function getGift(type, gid) {
    return get(`/big_turntable/getpuzzlegift.php?token=${token}&gift_type=${type}&gift_id=${gid}&page=${entryType}`)
}

//獲取表情包SVGA
function getSvga(bid) {
    // return axios.jsonp(`http://test.17sing.tw/action/index.php?action=emoticon.getEmoticonBagById&bid=${bid}&uid=${uid}&token=${token}`, "test")
    return new Promise((resolve, reject) => {
        jsonp(`http://act.17singapp.com/index.php?action=emoticon.getEmoticonBagById&bid=${bid}&uid=${uid}&token=${token}`, null, (err, data) => {
            if (err) {
                reject(err);
            } else {
                resolve(data)
            }
        })
    })
}
const httpConfig = {
    getDefault,
    luckDraw,
    getHistroy,
    getGiftList,
    getGift,
    getSvga
}
export default httpConfig