// https://segmentfault.com/a/1190000005848133
// https://segmentfault.com/a/1190000011231042
// https://segmentfault.com/a/1190000006929722

let conf = {};
const tips = 'Click the upper right corner...</br>select system default browser to open';
const tipsCN = '請點按右上角...</br>選擇系統默認瀏覽器打開';
switch (APP) { // 分端打包（非合并代码），利用Webpack Tree Shaking只打包指定端代码
    case 'hsing':
        conf = {
            androidSchema: 'hsing://17sing.tw',
            androidDown: 'http://17sing.tw/goto_googleplay',
            iosSchema: 'Gaoge://',
            iosDown: 'http://17sing.tw/goto_appstore',
            tips: tipsCN,
        };
        break;
    case 'singnow':
        conf = {
            androidSchema: 'singnowapp://',
            androidDown: 'http://singnowapp.com/goto_googleplay',
            iosSchema: 'singnowapp://',
            iosDown: 'http://singnowapp.com/goto_appstore',
            tips,
        };
        break;
    case 'wekara':
        conf = {
            androidSchema: 'wekara://',
            androidDown: 'https://wekarapp.com/goto_googleplay',
            iosSchema: '',
            iosDown: '',
            tips,
        };
        break;
    case 'gosing':
        conf = {
            androidSchema: 'gosingapp://gosingapp.com',
            androidDown: 'http://supervoice-app.com/goto_googleplay',
            iosSchema: 'KaraYo://',
            iosDown: 'http://supervoice-app.com/goto_appstore',
            tips,
        };
        break;
    case 'singstar':
        conf = {
            androidSchema: 'india://singstarapp.com',
            androidDown: 'http://singstarapp.com/goto_googleplay',
            iosSchema: '',
            iosDown: '',
            tips,
        };
        break;
    case 'miyou':
        conf = {
            androidSchema: 'yinmi://udateapp.com',
            androidDown: 'https://play.google.com/store/apps/details?id=com.km.udate',
            iosSchema: 'encore://',
            iosDown: 'https://apps.apple.com/app/id1506862116',
            tips: tipsCN,
        };
        break;
}

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

const Navigator = navigator.userAgent;
const ifChrome = Navigator.match(/Chrome/i) != null && Navigator.match(/Version\/\d+\.\d+(\.\d+)?\sChrome\//i) == null ? true : false;
const ifAndroid = (Navigator.match(/(Android);?[\s\/]+([\d.]+)?/)) ? true : false;
const ifIos = Navigator.match(/iPhone|iPad|iPd/i) ? true : false;
const ifSafari = ifIos && Navigator.match(/Safari/);
const ifWeixin = navigator.userAgent.indexOf('MicroMessenger') >= 0;
const ifLine = navigator.userAgent.indexOf('Line') >= 0;
const ifFb = navigator.userAgent.indexOf('FBAV') >= 0;
let iosVersion = Navigator.match(/OS\s*(\d+)/);
iosVersion = iosVersion ? (parseFloat(iosVersion[1], 10) || 0) : 0;
// let androidVersion = Navigator.match(/Android\s*(\d+)/);
// androidVersion = androidVersion ? (parseFloat(androidVersion[1], 10) || 0) : 0;

const timer = [];

function clearTimer() {
    for (let i = 0; i < timer.length; i++) {
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

// 所有端都有Android版本，印尼、印度暂时无iOS版本
export default function openApp(schemaUrl, androidDownUrl, iosDownUrl, iosSchemaUrl) {
    const inDisableApps = ifWeixin || ifLine || ifFb;
    if (inDisableApps && conf.tips) {
        toast(conf.tips);
        return;
    }

    schemaUrl = schemaUrl || conf.androidSchema;
    androidDownUrl = androidDownUrl || conf.androidDown;
    iosDownUrl = iosDownUrl || conf.iosDown;
    iosSchemaUrl = iosSchemaUrl || conf.iosSchema || schemaUrl;
    if (ifChrome) {
        if (ifAndroid) {
            setTimeout(() => {
                window.location.href = schemaUrl;
            }, 50);
        }
    }

    if (ifSafari && iosVersion >= 9) {
        setTimeout(() => {
            const link = document.createElement('a');
            link.setAttribute('href', iosSchemaUrl);
            link.style.display = 'none';
            document.body.appendChild(link);
            const event = document.createEvent('HTMLEvents');
            event.initEvent('click', false, false);
            if (iosSchemaUrl) {
                link.dispatchEvent(event);
            }
        }, 0);
    } else {
        // 低版本Android和iOS其它所有版本采用iframe
        const iframeId = '_downloadAppIframe_';
        let iframe = document.getElementById(iframeId);
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

    const time1 = Date.now();
    const delay = 1500;
    setTimeout(() => {
        const t = setTimeout(() => {
            const time2 = Date.now();
            if (time2 - time1 < delay + 200) {
                const url = ifIos ? iosDownUrl : androidDownUrl;
                if (url) {
                    window.location.href = url;
                }
            }
        }, delay);
        timer.push(t);
    }, 100);
};