import axios from 'axios'
import { getUrlString, toast } from '../utils'
import store from '../store'
import { testGet } from './test';

let API_ROOT = '';
const host = location.host;
if (/\d+\.\d+\.\d+\.\d+/.test(host) || /localhost/i.test(host) || /^t(est)?\./i.test(host)) {
    API_ROOT = '';
}

const defaultUid = 2233806;
const defaultToken = '7j_LhbO_hE7JJhgXy-UHuFfaBsgYz7rAxuF_EQpXQP5PQb8TK4DmuF4DtIpBTntqiwKjSFQaw97lgBZsqHC99pqoYlDDWwJGoCrQEyfRt_PFUf-eAbGnJaAdrCgBiZnVBLM4FVpQUatmRPXE-Xk8s3HqXW58jJzjGyyRDNkMKWzG-SiP0J_NPLRESSbnH7v9';
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
function getDefault() {
    return get(`/index.php?action=signInTask.getMedalTask&uid=${uid}&token=${token}`);

}
//補簽
function sateSingIn() {
    return get(`/index.php?action=signInTask.compensateSignIn&uid=${uid}&token=${token}`)
}

//獲取KEY
function gerKey() {
    return get(`/index.php?action=signInTask.inviteFriends&uid=${uid}&token=${token}`)
}

//查詢邀請信息
function queryShre(inviteCode) {
    return get(`/index.php?action=signInTask.getInvitedFriends&inviteCode=${inviteCode}`) //&uid=${uid}&token=${token}
}

const httpConfig = {
    getDefault,
    sateSingIn,
    gerKey,
    queryShre
}
export default httpConfig