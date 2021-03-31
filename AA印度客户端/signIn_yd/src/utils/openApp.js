//https://segmentfault.com/a/1190000005848133
//https://segmentfault.com/a/1190000011231042
//https://segmentfault.com/a/1190000006929722
function toast(message, time) {
    time = time || 1000;
    var cssTime = 1000;
    var div = document.createElement("div");
    div.style.cssText =
        "position:fixed; z-index:10000; left:0; top:0; right:0; bottom:0; text-align:center; pointer-events:none";
    div.innerHTML =
        '<span style="display:inline-block; padding:.1rem .2rem; max-width:80%; background:#212125; color:#fff; border-radius:.1rem; opacity:0; margin-top:' +
        Math.round(window.innerHeight / 2) +
        "px; transition:opacity " +
        cssTime / 1000 +
        's">' +
        message +
        "</span>";
    document.body.appendChild(div);
    var span = div.firstChild;
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
    return {
        name: "singstarapp",
        androidSchema: "india://singstarapp.com",
        androidDown: "http://singstarapp.com/goto_googleplay",
        iosSchema: "",
        iosDown: "",
        tips:
            "Click the upper right corner...</br>select system default browser to open"
    };
}

var Navigator = navigator.userAgent;
var ifChrome =
    Navigator.match(/Chrome/i) != null &&
    Navigator.match(/Version\/\d+\.\d+(\.\d+)?\sChrome\//i) == null
        ? true
        : false;
var ifAndroid = Navigator.match(/(Android);?[\s\/]+([\d.]+)?/) ? true : false;
var ifIos = Navigator.match(/iPhone|iPad|iPd/i) ? true : false;
var ifSafari = ifIos && Navigator.match(/Safari/);
var ifWeixin = navigator.userAgent.indexOf("MicroMessenger") >= 0;
var ifLine = navigator.userAgent.indexOf("Line") >= 0;
var ifFb = navigator.userAgent.indexOf("FBAV") >= 0;
var iosVersion = Navigator.match(/OS\s*(\d+)/);
iosVersion = iosVersion ? parseFloat(iosVersion[1], 10) || 0 : 0;
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
window.addEventListener("blur", clearTimer, false);
window.addEventListener("pagehide", clearTimer, false);
document.addEventListener("visibilitychange", visibilityChange, false);

function showWeChatTips(conf) {
    toast(conf.tips);
    // var img = require('../assets/img/wechat/' + lang + '.png');
    // var tips = document.createElement('div');
    // tips.style.cssText = 'position:fixed; z-index:10001; left:0; top:0; right:0; bottom:0; background:rgba(0,0,0,.5) url(' + img + ') top right no-repeat; background-size:100% auto';
    // document.body.appendChild(tips);
    // tips.onclick = () => {
    //     document.body.removeChild(tips);
    // };
}

export default function openApp(
    schemaUrl,
    androidDownUrl,
    iosDownUrl,
    iosSchemaUrl
) {
    console.log(schemaUrl, iosSchemaUrl);
    var conf = getConfig();
    if (ifWeixin || ifLine || ifFb) {
        var lang =
            ["17sing", "oksing"].indexOf(conf.name) >= 0 ? "tw" : conf.name;
        showWeChatTips(conf);
        return;
    }

    schemaUrl = schemaUrl || conf.androidSchema;
    androidDownUrl = androidDownUrl || conf.androidDown;
    iosDownUrl = iosDownUrl || conf.iosDown;
    iosSchemaUrl = iosSchemaUrl || conf.iosSchema || schemaUrl;
    if (ifChrome) {
        if (ifAndroid) {
            setTimeout(function() {
                window.location.href = schemaUrl;
            }, 50);
        }
    }
    if (ifSafari && iosVersion >= 9) {
        setTimeout(function() {
            var link = document.createElement("a");
            link.setAttribute("href", iosSchemaUrl);
            link.style.display = "none";
            document.body.appendChild(link);
            var event = document.createEvent("HTMLEvents");
            event.initEvent("click", false, false);
            link.dispatchEvent(event);
        }, 0);
    } else {
        var iframeId = "_downloadAppIframe_";
        var iframe = document.getElementById(iframeId);
        if (!iframe) {
            iframe = document.createElement("iframe");
            iframe.id = iframeId;
            iframe.style.width = 0;
            iframe.style.height = 0;
            iframe.style.display = "none";
            document.body.appendChild(iframe);
        }
        iframe.src = ifIos ? iosSchemaUrl : schemaUrl;
    }
    var time1 = Date.now();
    var delay = 1500;
    setTimeout(function() {
        var t = setTimeout(function() {
            var time2 = Date.now();
            if (time2 - time1 < delay + 200) {
                window.location.href = ifIos ? iosDownUrl : androidDownUrl;
            }
        }, delay);
        timer.push(t);
    }, 100);
}
