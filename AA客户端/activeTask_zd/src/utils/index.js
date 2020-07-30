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

function getType(obj) {
    return Object.prototype.toString.call(obj).toLowerCase().match(/\s(.+)\]/)[1];
}

function isArray(obj) {
    return getType(obj) == 'array';
}

function isObject(obj) {
    return getType(obj) == 'object';
}

function getUrlString(key) {
    const vars = {};
    window.location.search.replace(/[?&]+([^=&]+)=([^&]*)/gi, (m, k, v) => {
        vars[k] = v;
    });
    if (key && typeof vars[key] != 'undefined') {
        return decodeURIComponent(vars[key]);
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

function trim(text) {
    if (text && typeof text == 'string') {
        return text.replace(/^\s+|\s+$/, '');
    }
    return text;
}

function toThousands(num) {
    return parseFloat(num.toFixed(2)).toLocaleString();
}

function getPlatform() {
    let name = 'pc';
    if (navigator.userAgent.match(/iPhone|iPod|ios|iPad/i)) {
        name = 'ios';
    } else if (navigator.userAgent.match(/Android/i)) {
        name = 'android';
    }
    return name;
}

function scrollToAnchor(name) {
    const anchorElement = document.querySelector('a[name=' + name + ']');
    if (anchorElement) {
        anchorElement.scrollIntoView();
    }
}

function htmlEncode(html) {
    return (html + '').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function toast(message, time = 1000) {
    const cssTime = 1000;
    const div = document.createElement('div');
    div.style.cssText = 'position:fixed; z-index:10000; left:0; top:0; right:0; bottom:0; text-align:center; pointer-events:none';
    div.innerHTML = '<span style="display:inline-block; padding:.1rem .2rem; max-width:80%; background:#212125; color:#fff; border-radius:.1rem; opacity:0; margin-top:' + Math.round(window.innerHeight / 2) + 'px; transition:opacity ' + (cssTime / 1000) + 's">' + htmlEncode(message) + '</span>';
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

function getAppNameByHost() {
    let name = '';
    const arr = location.host.split('.');
    if (arr.length > 1) {
        name = arr[arr.length - 2].replace(/app$/, '').toLowerCase();
    } else {
        name = arr[0];
    }
    return name == '17sing' || /localhost/i.test(name) ? 'gaoge' : name;
}

function getNumState(key, newValue = 0) {
    let oldValue = sessionStorage.getItem(key);
    const first = oldValue === null;
    oldValue = first ? 0 : parseInt(oldValue);
    newValue = isNaN(newValue) ? 0 : parseInt(newValue);
    let changedValue = newValue - oldValue;
    if (changedValue != 0) {
        sessionStorage.setItem(key, newValue);
    }
    if (first) {
        oldValue = newValue;
        changedValue = 0;
    }
    return {oldValue, newValue, changedValue};
}

function getRedirectMessage(key = 'msg') {
    const msg = getUrlString(key);
    if (msg !== null && history.replaceState) {
        const re = new RegExp('&?' + key + '=[^&]+', 'i');
        history.replaceState(null, document.title, location.href.replace(re, ''));
    }
    return msg || '';
}

function buildInnerUrl(url, replaceParams) {
    const obj = {
        uid: getUrlString('uid') || '',
        token: getUrlString('token') || '',
        from: getUrlString('from') || 'app',
    };
    if (replaceParams && isObject(replaceParams)) {
        for(let key in replaceParams) {
            url = url.replace('{' + key + '}', encodeURIComponent(replaceParams[key]));
        }
    }
    return url + (/\?/.test(url) ? '&' : '?') + buildQuery(obj);
}

function buildInnerUrl2(url) {
    const obj = {
        from: 'newpay',
        uid: getUrlString('uid') || '',
        token: getUrlString('token') || '',
    };
    const payType = getUrlString('pay_type');
    if (payType) {
        obj.pay_type = payType;
    }
    return url + (/\?/.test(url) ? '&' : '?') + buildQuery(obj);
}

function callApp(name, ...args) {
    if (name && typeof name == 'string') {
        const isIOS = getPlatform() == 'ios';
        try {
            args = args.length ? args : (isIOS ? [''] : []);
            args = args.map(v => {
                if (typeof v == 'object' && v !== null) {
                    return JSON.stringify(JSON.stringify(v));
                }
                return JSON.stringify(v);
            });
            args = args.join(',');
            const code = isIOS ? `window.webkit.messageHandlers.${name}.postMessage(${args});` : `window.JSInterface.${name}(${args});`;
            // console.log(code);
            return window.eval(code);
        } catch(e) {}
    }
}

function hideAppLoading() {
    callApp('onLoadPageFinish');
}

function resetWindowSize(ratio) {
    callApp('onWindowSizeChanged', ratio);
}

function getNativeItems() {
    callApp('onGetProductList');
}

function startNativePay(id) {
    callApp('onPayProduct', id);
}

export {
    base64Encode,
    getType,
    isArray,
    isObject,
    getUrlString,
    buildQuery,
    trim,
    toThousands,
    getPlatform,
    scrollToAnchor,
    toast,
    getVersionNum,
    getAppUaInfo,
    getAppNameByHost,
    getNumState,
    getRedirectMessage,
    buildInnerUrl,
    buildInnerUrl2,
    callApp,
    hideAppLoading,
    resetWindowSize,
    getNativeItems,
    startNativePay,
}
