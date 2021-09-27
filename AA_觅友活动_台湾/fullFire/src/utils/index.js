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

function replaceUrl(url, data = {}, post = false) {
    // const rid = getUrlString('rid') || '';
    const uid = getUrlString('uid') || '';
    const token = getUrlString('token') || '';
    data = data ? Object.assign({}, data, { uid, token}) : {};

    if (post === true) {
        data.t = Date.now();
        data.room_id = rid;
        return data;
    }

    for (let key in data) {
        url = url.replace('{' + key + '}', encodeURIComponent(data[key]));
    }
    return url + '&t=' + Date.now();
}
function getPostData(data = {}) {
    return replaceUrl('', data, true);
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

function loadImage(image) {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = img.onerror = resolve;
        img.src = image;
    });
}
function loadImages(...images) {
    const list = [];
    for(let i = 0; i < images.length; i++) {
        list.push(loadImage(images[i]));
    }
    return Promise.all(list);
}

function htmlEncode(html) {
    return (html + '').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}
function toast(message, time = 1000) {
    const cssTime = 1000;
    const div = document.createElement('div');
    div.style.cssText = 'position:fixed; z-index:10000; left:0; top:0; right:0; bottom:0; text-align:center; pointer-events:none';
    div.innerHTML = '<span style="display:inline-block; padding:0.13333333333333333rem 0.26666666666666666rem; max-width:80%; background:#212125; color:#fff; border-radius:0.13333333333333333rem; opacity:0; margin-top:' + Math.round(window.innerHeight / 2) + 'px; transition:opacity ' + (cssTime / 1000) + 's">' + htmlEncode(message) + '</span>';
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

function getOffset(elem) {
    let offsetLeft = elem.offsetLeft;
    let offsetTop = elem.offsetTop;
    let offsetParent = elem.offsetParent;
    while(offsetParent) {
        offsetLeft += offsetParent.offsetLeft;
        offsetTop += offsetParent.offsetTop;
        offsetParent = offsetParent.offsetParent;
    }
    return {
        left: offsetLeft,
        top: offsetTop
    };
}

function tween(fromValue, toValue, duration, tick, complete, easing) {
    if (typeof easing != 'function') {
        easing = function(t) {
            return t;
        };
    }
    var start = 0;
    var end = parseInt(duration / 1000 * 60); //每秒60帧
    var requestAnimationFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame;
    var func = function() {
        var value = fromValue + easing(start++ / end) * (toValue - fromValue);
        if (typeof tick == 'function') {
            tick(value);
        }
        if (start > end && typeof complete == 'function') {
            complete(value);
        }
        if (start <= end) {
            requestAnimationFrame(func);
        }
    };
    func();
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

function appToast(message) {
    callApp('toast', message+'');
}

function appClose() {
    callApp('closeWeb');
}

function pageInited() {
    callApp('pageInited');
}

function getAppWebUrl(page = 'index') {
    return location.origin + location.pathname.replace(/\/[^\/]+\.html$/, `/${page}.html`) + '?rid=#RID#&uid=#ID#&token=#TOKEN#';
}

function appShowPage(data = {}, url = '', options = {}) {
    url = url || getAppWebUrl();
    const defaultOpts = {lwRatio:970/750, fullPage:0, showTitle:0};
    const opts = Object.assign(defaultOpts, options);
    opts.fullPage = opts.fullPage ? 1 : 0;
    opts.showTitle = opts.showTitle ? 1 : 0;
    callApp('showPage', Object.assign({ url, data }, opts));
}

function appShowDialog(data = {}, url = '') {
    url = url || getAppWebUrl('dialog');
    callApp('showDialog', { url, data });
}

function showAppDialog(callback, data) {
    const obj = Object.assign({}, data, {callback});
    appShowDialog(obj);
}

// https://www.jianshu.com/p/49fb78bca621
function dateFormat(fmt, date) {
     let ret;
     date = new Date(date)
     const opt = {
         "Y+": date.getFullYear().toString(),        // 年
         "m+": (date.getMonth() + 1).toString(),     // 月
         "d+": date.getDate().toString(),            // 日
         "H+": date.getHours().toString(),           // 时
         "M+": date.getMinutes().toString(),         // 分
         "S+": date.getSeconds().toString()          // 秒
         // 有其他格式化字符需求可以继续添加，必须转化成字符串
     };
     for (let k in opt) {
       ret = new RegExp("(" + k + ")").exec(fmt);
       if (ret) {
           fmt = fmt.replace(ret[1], (ret[1].length == 1) ? (opt[k]) : (opt[k].padStart(ret[1].length, "0")))
       }
     }
     return fmt;
 }

export {
    getUrlString,
    replaceUrl,
    getPostData,
    getPlatform,
    loadImages,
    toast,
    getOffset,
    tween,
    callApp,
    appToast,
    appClose,
    pageInited,
    getAppWebUrl,
    appShowPage,
    appShowDialog,
    showAppDialog,
    dateFormat
}