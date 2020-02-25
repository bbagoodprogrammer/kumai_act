//https://segmentfault.com/a/1190000005848133
//https://segmentfault.com/a/1190000011231042
//https://segmentfault.com/a/1190000006929722

function getConfig() {
    const tw = {
        name: '17sing',
        androidSchema: 'hsing://',
        androidDown: 'http://17sing.tw/goto_googleplay',
        iosSchema: 'encore://',
        iosDown: 'http://17sing.tw/goto_appstore',
    };

    const conf = {
        localhost: tw,

        '17sing': tw,
        oksing: {
            name: 'oksing',
            androidSchema: 'oksing://oksing.tw/goto_googleplay',
            androidDown: tw.androidDown,
            iosSchema: 'oksing://',
            iosDown: tw.iosDown,
        },

        singnowapp: {
            name: 'singnowapp',
            androidSchema: 'singnowapp://',
            androidDown: 'http://singnowapp.com/goto_googleplay',
            iosSchema: 'singnowapp://',
            iosDown: 'http://singnowapp.com/goto_appstore',
        },
        wekarapp: {
            name: 'wekarapp',
            androidSchema: 'wekara://',
            androidDown: 'https://wekarapp.com',
            iosSchema: 'wekara://',
            iosDown: 'https://wekarapp.com/goto_appstore',
        },
        gosingapp: {
            name: 'gosingapp',
            androidSchema: 'gosingapp://gosingapp.com',
            androidDown: 'http://gosingapp.com/goto_googleplay',
            iosSchema: 'supervoice://',
            iosDown: 'http://gosingapp.com/goto_appstore',
        },
    };

    const host = location.host;
    for (let key in conf) {
        if (new RegExp(key, 'i').test(host)) {
            return conf[key];
        }
    }

    return tw;
}

var Navigator = navigator.userAgent;
var ifChrome = Navigator.match(/Chrome/i) != null && Navigator.match(/Version\/\d+\.\d+(\.\d+)?\sChrome\//i) == null ? true : false;
var ifAndroid = (Navigator.match(/(Android);?[\s\/]+([\d.]+)?/)) ? true : false;
var ifIos = Navigator.match(/iPhone|iPad|iPd/i) ? true : false;
var ifSafari = ifIos && Navigator.match(/Safari/);
var ifWeixin = navigator.userAgent.indexOf('MicroMessenger') >= 0;
var iosVersion = Navigator.match(/OS\s*(\d+)/);
iosVersion = iosVersion ? (parseFloat(iosVersion[1], 10) || 0) : 0;
// var androidVersion = Navigator.match(/Android\s*(\d+)/);
// androidVersion = androidVersion ? (parseFloat(androidVersion[1], 10) || 0) : 0;

var timer = [];
function clearTimer() {
    for (var i = 0; i < timer.length; i++) {
        clearTimeout(timer[i]);
    }
}
function visibilityChange() {
    if (document.hidden) {
        clearTimer();
    }
}
window.addEventListener('blur', clearTimer, false);
window.addEventListener('pagehide', clearTimer, false);
document.addEventListener('visibilitychange', visibilityChange, false);

function showWeChatTips(lang) {
    const img = require('../assets/img/wechat/' + lang + '.png');
    const tips = document.createElement('div');
    tips.style.cssText = 'position:fixed; z-index:10001; left:0; top:0; right:0; bottom:0; background:rgba(0,0,0,.5) url(' + img + ') top right no-repeat; background-size:100% auto';
    document.body.appendChild(tips);
    tips.onclick = () => {
        document.body.removeChild(tips);
    };
}

export default function openApp(schemaUrl, androidDownUrl, iosDownUrl, iosSchemaUrl) {
    const conf = getConfig();

    if (ifWeixin) {
        const lang = ['17sing', 'oksing'].indexOf(conf.name) >= 0 ? 'tw' : conf.name;
        showWeChatTips(lang);
        return;
    }

    schemaUrl = schemaUrl || conf.androidSchema;
    androidDownUrl = androidDownUrl || conf.androidDown;
    iosDownUrl = iosDownUrl || conf.iosDown;
    iosSchemaUrl = iosSchemaUrl || conf.iosSchema || schemaUrl;
    if (ifChrome) {
        if (ifAndroid) {
            setTimeout(function () {
                window.location.href = schemaUrl;
            }, 50);
        }
    }
    if (ifSafari && iosVersion >= 9) {
        setTimeout(function () {
            var link = document.createElement('a');
            link.setAttribute('href', iosSchemaUrl);
            link.style.display = 'none';
            document.body.appendChild(link);
            var event = document.createEvent('HTMLEvents');
            event.initEvent('click', false, false);
            link.dispatchEvent(event);
        }, 0);
    } else {
        //低版本Android和iOS其它所有版本采用iframe
        var iframeId = '_downloadAppIframe_';
        var iframe = document.getElementById(iframeId);
        if (!iframe) {
            iframe = document.createElement('iframe');
            iframe.id = iframeId;
            iframe.style.width = 0;
            iframe.style.height = 0;
            iframe.style.display = 'none';
            document.body.appendChild(iframe);
        }
        iframe.src = ifIos ? iosSchemaUrl : schemaUrl;
    }
    var time1 = Date.now();
    var delay = 1500;
    setTimeout(function () {
        var t = setTimeout(function () {
            var time2 = Date.now();
            if (time2 - time1 < delay + 200) {
                window.location.href = ifIos ? iosDownUrl : androidDownUrl;
            }
        }, delay);
        timer.push(t);
    }, 100);
}