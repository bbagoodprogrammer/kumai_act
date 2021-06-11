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

function getMainHost() {
    const parts = location.host.split('.');
    const len = parts.length;
    if (len >= 2) {
        return parts[len - 2].toLowerCase() + '.' + parts[len - 1].toLowerCase();
    }
    return location.host;
}

function replaceLang(lang, ...args) {
    if (lang && typeof lang == 'string' && args.length) {
        for(let i = 0; i < args.length; i++) {
            lang = lang.replace(new RegExp('\\{'+i+'\\}', 'g'), args[i]);
        }
    }
    return lang;
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

function callApp(link, urlModel = false) {
    if (link) {
        if (urlModel) {
            location.href = link;
        } else {
            try {
                if (getPlatform() == 'ios') {
                    sendJsData(link);
                } else {
                    JSInterface.sendJsData(link);
                }
            } catch(e) {}
        }
    }
}

function profile(uid) {
    callApp('app://userInfo?uid=' + uid);
}

function replaceUrl(url, data = {}, post = false) {
    const rid = getUrlString('rid') || '';
    const uid = getUrlString('uid') || '';
    const token = getUrlString('token') || '';
    data = data ? Object.assign({}, data, {rid, uid, token}) : {};

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

function dateFormat(fmt, date) {
    let ret;
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
    getPlatform,
    loadImages,
    getMainHost,
    replaceLang,
    toast,
    callApp,
    profile,
    dateFormat,
    replaceUrl
}