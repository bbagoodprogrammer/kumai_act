// import 'regenerator-runtime/runtime';
import { getUrlString, pageInited } from './utils';

const appData = {
    rid: 0,
    uid: 0,
    fid: 0,
    public: 0,
    mic_uid: 0,
    mic_uids: []
};

let obj = {};
let tempObj = {};
Object.defineProperty(obj, 'uid', {
    get() {
        return tempObj.uid;
    },
    set: function (newVal) {
        if (newVal !== tempObj.uid) {
            console.log(tempObj.uid, newVal);
            tempObj.uid = newVal;
        }
    },
});
obj.uid = 10;

const rid = getUrlString('rid') || '';
const uid = getUrlString('uid') || '';
const urlData = {rid, uid};

let cacheData = {};
window.onAppData = res => {
    const data = JSON.parse(res || '{}');
    cacheData = Object.assign(cacheData, urlData, data);
    document.getElementById('output').value = JSON.stringify(cacheData, null, 2);
};

window.onload = () => {
    pageInited();
};