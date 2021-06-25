function _btoa(input) {
    //https://github.com/davidchambers/Base64.js/blob/master/base64.js
    var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
    var str = String(input);
    for (
      // initialize result and counter
      var block, charCode, idx = 0, map = chars, output = '';
      // if the next str index does not exist:
      //   change the mapping table to "="
      //   check if d has no fractional digits
      str.charAt(idx | 0) || (map = '=', idx % 1);
      // "8 - idx % 1 * 8" generates the sequence 2, 4, 6, 8
      output += map.charAt(63 & block >> 8 - idx % 1 * 8)
    ) {
      charCode = str.charCodeAt(idx += 3/4);
      if (charCode > 0xFF) {
        throw new InvalidCharacterError("'btoa' failed: The string to be encoded contains characters outside of the Latin1 range.");
      }
      block = block << 8 | charCode;
    }
    return output;
}


function base64Encode(input) {
    let rv;
    rv = encodeURIComponent(input);
    rv = unescape(rv);
    rv = (window.btoa || _btoa)(rv);
    return rv;
}

function base64Decode(input) {
    //https://blog.csdn.net/abxn2002/article/details/50887594
    return decodeURIComponent(escape(window.atob(input)));
}

function getUrlString(key) {
    const reg = new RegExp('(^|&)' + key + '=([^&]*)(&|$)', 'i');
    const r = window.location.search.substr(1).match(reg);
    if(r != null) {
        return decodeURIComponent(r[2]);
    }
    return null;
}

function buildQuery(obj, encode = true) {
    const arr = [];
    for (let key in obj) {
        arr.push(`${key}=${encode ? encodeURIComponent(obj[key]) : obj[key]}`);
    }
    return arr.join('&');
}

function getPlatform() {
    let name = 'pc';
    if (navigator.userAgent.match(/(Android);?[\s\/]+([\d.]+)?/)) {
        name = 'android';
    } else if (navigator.userAgent.match(/iPhone|iPod|ios|iPad/i)) {
        name = 'ios';
    }
    return name;
}

function toast(message, time = 1000, pos = .26) {
    const cssTime = 1000;
    const div = document.createElement('div');
    div.style.cssText = 'position:fixed; z-index:10000; left:0; top:0; right:0; bottom:0; text-align:center; pointer-events:none';
    div.innerHTML = '<span style="display:inline-block; padding:.1rem .2rem; max-width:80%; background:#212125; color:#fff; border-radius:.1rem; opacity:0; margin-top:' + Math.round(window.innerHeight * pos) + 'px; transition:opacity ' + (cssTime / 1000) + 's">' + message + '</span>';
    document.body.appendChild(div);
    const span = div.firstChild;
    setTimeout(() => {
        span.style.opacity = 1;
    }, 0);
    setTimeout(() => {
        span.style.opacity = 0;
        setTimeout(() => {
            document.body.removeChild(div);
        }, cssTime);
    }, cssTime + time);
}

function xorEncode(str, key) {
    let txt = '';
    const strLen = str.length;
    const keyLen = key.length;
    for(let i=0; i<strLen; i++) {
        const k = i % keyLen;
        txt += String.fromCharCode(str.charCodeAt(i) ^ key.charCodeAt(k));
    }
    return txt;
}

function encodeData(obj, key) {
    return base64Encode(xorEncode(JSON.stringify(obj), key));
}

function decodeData(str, key) {
    let data = {};
    try {
        data = JSON.parse(xorEncode(base64Decode(str), key));
    } catch(e) {}
    return data;
}

function getUrlQuery() {
    const bid = getUrlString('bid');
    if (bid) {
        const data = getUrlString('data');
        if (data) {
            return decodeData(data, bid);
        }
    } else {
        const country = getUrlString('country');
        const mobile = getUrlString('mobile');
        const bundleId = getUrlString('bundleId');
        return {
            country,
            mobile,
            bundleId,
        };
    }
    return {};
}

function buildApiUrl(api, queryObj) {
    const bid = getUrlString('bid');
    let query = '';
    if (bid) {
        let obj = {bid};
        if (queryObj) {
            obj.data = encodeData(queryObj, bid);
        }
        query = buildQuery(obj);
    } else {
        query = buildQuery(queryObj);
    }
    if (query) {
        return api + (/\?/.test(api) ? '&' : '?') + query;
    }
    return api;
}

function getApiParams(queryObj) {
    const bid = getUrlString('bid');
    if (bid) {
        let obj = {bid};
        if (queryObj) {
            obj.data = encodeData(queryObj, bid);
        }
        return obj;
    }
    return queryObj;
}

function parseResponse(res) {
    if (typeof res == 'string') {
        const bid = getUrlString('bid');
        if (bid) {
            return decodeData(res, bid);
        }
    }
    return res;
}

// https://docs.qq.com/doc/DRnp0Q3RGZHFRT2pW
// https://docs.qq.com/sheet/DWG9sakdQd1RsUmZ0?tab=BB08J2&c=N48C0Y0
function appReport(id, num = 1, logname = 'user_click_event') {
    const _t = Math.round(new Date() / 1000);
    const item = [{id, num, _t}];
    const data = {
        logname,
        data: {item},
    };
    // console.log(id, data);
    const dataStr = JSON.stringify(data);
    try {
        if (getPlatform() == 'ios') {
            window.reportWebEvent(dataStr);
        } else {
            window.JSInterface.reportWebEvent(dataStr);
        }
    } catch(e) {}
}

// replaceLang('My name is %s %s', 'Guohui', 'Tang');
// replaceLang('My name is {1} {0}', 'Tang', 'Guohui');
function replaceLang(lang, ...args) {
    if (lang && typeof lang == 'string' && args.length) {
        const s = /%s/.test(lang);
        for(let i = 0; i < args.length; i++) {
            const re = s ? /%s/ : new RegExp('\\{'+i+'\\}', 'g');
            lang = lang.replace(re, args[i]);
        }
    }
    return lang;
}

function getVersionNum(verStr) {
    var num = 0;
    if (verStr && typeof verStr == 'string') {
        verStr = verStr.replace('(', '.').replace(/[^\.\d]/g, '');
        var arr = verStr.split('.');
        var ver = arr.length ? arr[arr.length - 1] : 0;
        num = !isNaN(ver) ? parseInt(ver) : 0;
    }
    return num;
}
function getAppUaInfo(ua, key) {
    //Android_version=6.7.0.684;system=8.0.0,app=hsing
    //IOS,version=6.7.0(4499),system=13.1.3,app=hsing,bundleId=com.km.singnow
    var obj = {};
    var groups = ua.split(';');
    for (var a = 0; a < groups.length; a++) {
        var infos = groups[a].split(',');
        for (var b = 0; b < infos.length; b++) {
            var arr = infos[b].split('=');
            var k = arr[0];
            var v = arr[1] || '';
            obj[k] = v;

            if (/version/i.test(k)) {
                obj['ver'] = getVersionNum(v);
            }
        }
    }

    if (key) {
        return obj[key];
    }
    return obj;
}
function getAppVer() {
    return getAppUaInfo(navigator.userAgent, 'ver');
}

export {
    base64Encode,
    base64Decode,
    getUrlString,
    buildQuery,
    getPlatform,
    toast,
    xorEncode,
    encodeData,
    decodeData,
    getUrlQuery,
    buildApiUrl,
    getApiParams,
    parseResponse,
    appReport,
    replaceLang,
    getAppVer,
}
