import axios from 'axios';
import { isObject, getUrlString, base64Encode } from '../utils';

const appName = 'gosing';
const reportUrl = 'http://r.gosingapp.com/api/v1/report/single';

const key = '_web_report_';
const timeout = 3000;
const timers = {};

function guid() {
    //https://stackoverflow.com/questions/105034/create-guid-uuid-in-javascript
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

function setCookie(key, value) {
    const days = 365;
    const exp = new Date();
    exp.setTime(exp.getTime() + days*24*60*60*1000);
    document.cookie = key + '=' + escape(value) + ';expires=' + exp.toGMTString();
}

function getCookie(key) {
    let arr;
    const regx = new RegExp('(^| )' + key + '=([^;]*)(;|$)');
　　return (arr = document.cookie.match(regx)) ? unescape(arr[2]) : null;
}

function saveData(key, value) {
    if (localStorage) {
        localStorage.setItem(key, value);
    } else {
        setCookie(key, value);
    }
}

function getData(key) {
    if (localStorage) {
        return localStorage.getItem(key);
    }
    return getCookie(key);
}

const platform = navigator.userAgent.match(/iPhone|iPod|ios|iPad/i) ? 'ios' : 'android';
const lg = navigator.language || '';
const tz = 'GMT ' + new Date().getTimezoneOffset() / 60;
const net = navigator.connection ? navigator.connection.effectiveType : '';
const info = navigator.userAgent;

export default function report(v, cb) {
    if (!isObject(v) || !v.id) {
        return;
    }

    // let oldGuid = getData(key);
    // if (!oldGuid) {
    //     const newGuid = guid();
    //     saveData(key, newGuid);
    //     oldGuid = newGuid;
    // }

    let _v = 1;
    let logintype = 1;
    let logname = 'page_report';

    const date = new Date();
    const ctime = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + ' ' +date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();

    let appname = appName;
    let id = v.id;
    let uid = getUrlString('uid') || '';
    let account = '';
    for(let k in v) {
        if (k == 'appname') {
            appname = v[k];
            delete v[k];
        }
        if (k == 'id') {
            id = v[k];
            delete v[k];
        }
        if (k == 'uid') {
            uid = v[k];
            delete v[k];
        }
        if (k == 'account') {
            account = v[k];
            delete v[k];
        }
    }

    const data = JSON.stringify({
        appname,
        uid,
        account,
        platform,
        ctime,
        guid,
        lg,
        tz,
        net,
        info,
        logintype,
        logname,
        oversion: '',
        pversion: '',
        data: JSON.stringify({
            item: [{
                id,
                _v,
                v: JSON.stringify(v),
                _t: Date.parse(date),
            }],
        }),
    });
    const config = {
        headers: {
           'Content-Type' : 'text/plain; charset=UTF-8',
        },
    };

    if (typeof cb == 'function') {
        let timerName = '';
        for(let k in v) {
            timerName += v[k];
        }
        timerName = base64Encode(timerName);
        clearTimeout(timers[timerName]);
        timers[timerName] = setTimeout(cb, timeout);
        const func = () => {
            clearTimeout(timers[timerName]);
            cb();
        };
        axios.post(reportUrl, data, config).then(func).catch(func);
    } else {
        axios.post(reportUrl, data, config);
    }
}
