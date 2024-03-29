import axios from 'axios'
import { replaceUrl } from '../utils'
import api from './api'
import store from '../store'

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
        for(let key in data) {
            formData.append(key, data[key]);
        }
        // store.commit('updateLoading', true);
        axios.post(url, formData, config).then(response => {
            // store.commit('updateLoading', false);
            resolve(response);
        }).catch(error => {
            // store.commit('updateLoading', false);
            reject(error);
        });
    });
}

function init () {
  return get(replaceUrl(api.init));
}

function roomRank(data) {
  return get(replaceUrl(api.roomRank, data));
}

function contributionRank (data) {
  return get(replaceUrl(api.contributionRank, data));
}

function attendParty (data) {
    return get(replaceUrl(api.attendParty, data));
  }

export {
    init,
    roomRank,
    contributionRank,
    attendParty
}

/* function loadData(apiFunc, commitName, loadOnce = false) {
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
} */
