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

export {
    getUrlString,
    replaceLang,
    toThousands,
    getPlatform,
    getAppVer,
    callApp,
    toast,
}