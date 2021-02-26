import axios from 'axios'
import { getUrlString, toast } from '../utils'
import store from '../store'
import { testGet } from './test';

let API_ROOT = '';
const host = location.host;
if (/\d+\.\d+\.\d+\.\d+/.test(host) || /localhost/i.test(host) || /^t(est)?\./i.test(host)) {
    // API_ROOT = '/action';
}

const defaultUid = 2233806;
const defaultToken = '7j_LhbO_hE7JJhgXy-UHuFfaBsgYz7rAxuF_EQpXQP5PQb8TK4DmuF4DtIpBTntqiwKjSFQaw97lgBZsqHC99pqoYlDDWwJGoCrQEyfRt_PFUf-eAbGnJaAdrCgBiZnVBLM4FVpQUatmRPXE-Xk8s3HqXW58jJzjGyyRDNkMKWzG-SiP0J_NPLRESSbnH7v9';
const isDebug = getUrlString('debug');
// const isDebug = true;
const uid = getUrlString('uid') || (isDebug ? defaultUid : '');
const token = getUrlString('token') || (isDebug ? defaultToken : '');
const lang = __lang;
const order_id =  getUrlString('order_id') ||false;
const from =  getUrlString('from') || false;
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

function getInitInfo() {
    // return testGet('getInitInfo');
    return get(`/gift_group/init.php?token=${token}&from=${from}&order_id=${order_id}`);
}

function start(gid, num) {
    return get(`/gift_group/start.php?token=${token}&gid=${gid}&num=${num}`)
}

function search(gid) {
    if (gid) {
        return get(`/gift_group/search.php?token=${token}&gid=${gid}`)
    }
    return get(`/gift_group/search.php?token=${token}`)
}

function myFriend(from, more) {
    if (more) {
        return axios.get(`/gift_group/myFriend.php?token=${token}&from=${from}`)
    }
    return get(`/gift_group/myFriend.php?token=${token}&from=${from}`)
}

function invite(order_id, invite) {
    return get(`/gift_group/invite.php?token=${token}&order_id=${order_id}&invite=${invite}`)
}

function searchFriend(uid) {
    return get(`/gift_group/searchFriend.php?token=${token}&uid=${uid}`)
}

function join(order_id) {
    return get(`/gift_group/join.php?token=${token}&order_id=${order_id}`)
}

function rank(from, more) {
    if (more) {
        return axios.get(`/gift_group/list.php?token=${token}&from=${from}`)
    }
    return get(`/gift_group/list.php?token=${token}&from=${from}`)
}
export {
    loadData,
    getInitInfo,
    start,
    search,
    myFriend,
    invite,
    searchFriend,
    join,
    rank
}