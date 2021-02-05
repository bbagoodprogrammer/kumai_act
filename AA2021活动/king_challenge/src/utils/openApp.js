//https://segmentfault.com/a/1190000005848133
//https://segmentfault.com/a/1190000011231042
//https://segmentfault.com/a/1190000006929722
function toast(message, time = 1000) {
    const cssTime = 1000;
    const div = document.createElement('div');
    div.style.cssText = 'position:fixed; z-index:10000; left:0; top:0; right:0; bottom:0; text-align:center; pointer-events:none';
    div.innerHTML = '<span style="display:inline-block; padding:.1rem .2rem; max-width:80%; background:#212125; color:#fff; border-radius:.1rem; opacity:0; margin-top:' + Math.round(window.innerHeight / 2) + 'px; transition:opacity ' + (cssTime / 1000) + 's">' + message + '</span>';
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
function getConfig() {
    const tw = {
        name: '17sing',
        androidSchema: 'hsing://17sing.tw',
        androidDown: 'http://17sing.tw/goto_googleplay',
        iosSchema: 'Gaoge://',
        iosDown: 'http://17sing.tw/goto_appstore',
        tips: '請點按右上角...</br>選擇系統默認瀏覽器打開'
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
            tips: '請點按右上角...</br>選擇系統默認瀏覽器打開'
        },

        singnowapp: {
            name: 'singnowapp',
            androidSchema: 'singnowapp://',
            androidDown: 'http://singnowapp.com/goto_googleplay',
            iosSchema: 'singnowapp://',
            iosDown: 'http://singnowapp.com/goto_appstore',
            tips: 'Hãy nhấn ... ở phía trên bên phải</br>Dùng lịch trình hệ thống mặc định để mở'
        },
        wekarapp: {
            name: 'wekarapp',
            androidSchema: 'wekara://',
            androidDown: 'https://wekarapp.com',
            iosSchema: 'wekara://',
            iosDown: 'https://wekarapp.com/goto_appstore',
            tips: 'silakan kilk pojok kanan atas...</br>pilih beowser default utk bukanya'
        },
        karaing: {
            name: 'karaing',
            androidSchema: 'india://singstarapp.com',
            androidDown: 'https://play.google.com/store/apps/details?id=com.km.ikara',
            iosSchema: '',
            iosDown: '',
            tips: 'Click the upper right corner...</br>select system default browser to open'
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
var ifLine = navigator.userAgent.indexOf('Line') >= 0;
var ifFb = navigator.userAgent.indexOf('FBAV') >= 0;
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

function showWeChatTips(conf) {
    toast(conf.tips);
    // const img = require('../assets/img/wechat/' + lang + '.png');
    // const tips = document.createElement('div');
    // tips.style.cssText = 'position:fixed; z-index:10001; left:0; top:0; right:0; bottom:0; background:rgba(0,0,0,.5) url(' + img + ') top right no-repeat; background-size:100% auto';
    // document.body.appendChild(tips);
    // tips.onclick = () => {
    //     document.body.removeChild(tips);
    // };
}

export default function openApp(schemaUrl, androidDownUrl, iosDownUrl, iosSchemaUrl) {
    const conf = getConfig();

    if (ifWeixin || ifLine || ifFb) {
        const lang = ['17sing', 'oksing'].indexOf(conf.name) >= 0 ? 'tw' : conf.name;
        showWeChatTips(conf);
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