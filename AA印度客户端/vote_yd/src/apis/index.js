import axios from 'axios'
import { getUrlString, toast } from '../utils'
import store from '../store'
import { testGet } from './test';
import qs from 'qs'


let API_ROOT = '';
const host = location.host;
if (/\d+\.\d+\.\d+\.\d+/.test(host) || /localhost/i.test(host) || /^t(est)?\./i.test(host)) {
    API_ROOT = '/action';
}

const defaultUid = 2233806;
const defaultToken = '7j_LhbO_hE7JJhgXy-UHuFfaBsgYz7rAxuF_EQpXQP5PQb8TK4DmuF4DtIpBTntqiwKjSFQaw97lgBZsqHC99pqoYlDDWwJGoCrQEyfRt_PFUf-eAbGnJaAdrCgBiZnVBLM4FVpQUatmRPXE-Xk8s3HqXW58jJzjGyyRDNkMKWzG-SiP0J_NPLRESSbnH7v9';
const isDebug = getUrlString('debug');
// const isDebug = true;
const uid = getUrlString('uid') || (isDebug ? defaultUid : '');
const token = getUrlString('token') || (isDebug ? defaultToken : '');
let rid = getUrlString("rid")
let vote_id = getUrlString("vote_id")
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

function getInitInfo() {
    // return testGet('getInitInfo');
    return get(`${API_ROOT}/index.php?action=kolExt.getInitInfo&uid=${uid}&token=${token}&lang=${lang}`);
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

//提交投票
function commitVote(descriptions, option_type, options, voter_type_limit, user_level_limit, time_limit) {
    let data = {
        // action: "roomVote.createVote",
        token,
        uid,
        rid,
        descriptions,
        option_type,
        options: JSON.stringify(options),
        voter_type_limit,
    }
    if (user_level_limit != '') {
        data['user_level_limit'] = user_level_limit
    }
    if (time_limit != '') {
        data['time_limit'] = time_limit
    }
    console.log(data)
    return axios({
        url: '/index.php?action=roomVote.createVote',
        method: 'post',
        data: qs.stringify(data),
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    })
}


//投票詳情
function voteMsg(reset) {
    if (reset) {
        axios.get(`/index.php?action=roomVote.voteDetail&uid=${uid}&token=${token}&rid=${rid}&vote_id=${vote_id}`)
    }
    return get(`/index.php?action=roomVote.voteDetail&uid=${uid}&token=${token}&rid=${rid}&vote_id=${vote_id}`)
}

//結束投票
function endVote() {
    let data = {
        token,
        uid,
        rid,
        vote_id
    }
    return axios({
        url: '/index.php?action=roomVote.closeVote',
        method: 'post',
        data: qs.stringify(data),
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    })
}

//投票
function commitChione(option) {
    let data = {
        token,
        uid,
        rid,
        vote_id,
        option
    }
    return axios({
        url: '/index.php?action=roomVote.vote',
        method: 'post',
        data: qs.stringify(data),
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    })
}

//投票記錄
function getVoteHistory(last_id, more) {
    if (more) {
        return axios.get(`/index.php?action=roomVote.getVoteHistory&uid=${uid}&token=${token}&rid=${rid}&last_id=${last_id}`)
    }
    return get(`/index.php?action=roomVote.getVoteHistory&uid=${uid}&token=${token}&rid=${rid}&last_id=${last_id}`)
}

const httpConfig = {
    getInitInfo,
    commitVote,
    voteMsg,
    endVote,
    commitChione,
    getVoteHistory
}
export default httpConfig