import axios from 'axios'
import { buildApiUrl, getApiParams } from '../utils'
import store from '../store'
import getSign from '../utils/getSign'
import conf from '../config'
const apis = conf.apis;

//包装axios.get，实现统一处理Loading
function get(url, config) {
    return new Promise((resolve, reject) => {
        store.commit('updateLoading', true);
        axios.get(url, config)
        .then(response => {
            store.commit('updateLoading', false);
            resolve(response);
        })
        .catch(error => {
            store.commit('updateLoading', false);
            reject(error);
        });
    });
}

async function request(api, callbackId, data = {}, loading = true) {
    Object.assign(data, {lang:__lang});
    let config = {};
    const signObj = await getSign(getApiParams(data), callbackId);
    const sign = signObj.sign;
    const timestamp = signObj.timestamp;
    config = {headers: {sign, timestamp}};
    if (loading) {
        return get(buildApiUrl(api, data), config);
    }
    return axios.get(buildApiUrl(api, data), config);
}

function getArea() {
    return request(apis.getArea, 'getArea');
}

function getCode(country, mobile, bundleId, vcode, rand) {
    return request(apis.getCode, 'getCode', {country, mobile, bundleId, vcode, rand});
}

function checkCode(country, mobile, code) {
    return request(apis.checkCode, 'checkCode', {country, mobile, code});
}

function report(country, mobile) {
    return request(apis.report, 'report', {country, mobile}, false);
}

export {
    getArea,
    getCode,
    checkCode,
    report,
}