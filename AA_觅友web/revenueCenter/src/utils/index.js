import store from "../store";
function getUrlString(key) {
    const vars = {};
    window.location.search.replace(/[?&]+([^=&]+)=([^&]*)/gi, (m, k, v) => {
        vars[k] = v;
    });
    if (key && typeof vars[key] != "undefined") {
        return decodeURIComponent(vars[key]);
    }
    return null;
}

function htmlEncode(html) {
    return (html + "").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
function toast(message, time = 1000) {
    const cssTime = 1000;
    const div = document.createElement("div");
    div.style.cssText =
        "position:fixed; z-index:10000; left:0; top:0; right:0; bottom:0; text-align:center; pointer-events:none";
    div.innerHTML =
        '<span style="display:inline-block; padding:.1rem .2rem; max-width:80%; background:#212125; color:#fff; border-radius:.1rem; opacity:0; margin-top:' +
        Math.round(window.innerHeight / 2) +
        "px; transition:opacity " +
        cssTime / 1000 +
        's">' +
        htmlEncode(message) +
        "</span>";
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

function getLangHtml(text) {
    return (text + "").replace(/\n/g, "<br>");
}

function getTimeObj(ts) {
    const date = new Date(ts * 1000);
    return {
        year: date.getFullYear(),
        month:
            parseInt(date.getMonth() + 1) >= 10
                ? date.getMonth() + 1
                : "0" + parseInt(date.getMonth() + 1),
        day: date.getDate() >= 10 ? date.getDate() : "0" + date.getDate(),
        hour: date.getHours() >= 10 ? date.getHours() : "0" + date.getHours(),
        minute:
            date.getMinutes() >= 10
                ? date.getMinutes()
                : "0" + date.getMinutes(),
        second:
            date.getSeconds() >= 10
                ? date.getSeconds()
                : "0" + date.getSeconds()
    };
}

function getBase64Image(file, maxWidth = 750) {
    return new Promise((resolve, reject) => {
        if (
            file &&
            /^image/.test(file.type) &&
            typeof FileReader != "undefined"
        ) {
            const reader = new FileReader();
            reader.onload = e => {
                const img = new Image();
                img.onload = () => {
                    import(/*webpackChunkName:"exif"*/ "exif-js").then(
                        ({ default: EXIF }) => {
                            EXIF.getData(img, function() {
                                const orientation = EXIF.getTag(
                                    this,
                                    "Orientation"
                                );

                                const imgW = img.width;
                                const imgH = img.height;

                                const canvas = document.createElement("canvas");
                                const ctx = canvas.getContext("2d");
                                if (4 < orientation && orientation < 9) {
                                    canvas.width = imgH;
                                    canvas.height = imgW;
                                } else {
                                    canvas.width = imgW;
                                    canvas.height = imgH;
                                }

                                // https://github.com/recurser/exif-orientation-examples
                                // https://stackoverflow.com/questions/20600800/js-client-side-exif-orientation-rotate-and-mirror-jpeg-images
                                switch (orientation) {
                                    case 2:
                                        ctx.transform(-1, 0, 0, 1, imgW, 0);
                                        break;
                                    case 3:
                                        ctx.transform(-1, 0, 0, -1, imgW, imgH);
                                        break;
                                    case 4:
                                        ctx.transform(1, 0, 0, -1, 0, imgH);
                                        break;
                                    case 5:
                                        ctx.transform(0, 1, 1, 0, 0, 0);
                                        break;
                                    case 6:
                                        ctx.transform(0, 1, -1, 0, imgH, 0);
                                        break;
                                    case 7:
                                        ctx.transform(0, -1, -1, 0, imgH, imgW);
                                        break;
                                    case 8:
                                        ctx.transform(0, -1, 1, 0, 0, imgW);
                                        break;
                                    default:
                                        break;
                                }

                                ctx.drawImage(img, 0, 0);

                                const newImg = new Image();
                                newImg.onload = () => {
                                    const canvas = document.createElement(
                                        "canvas"
                                    );
                                    const ctx = canvas.getContext("2d");

                                    const scale =
                                        newImg.width > maxWidth
                                            ? maxWidth / newImg.width
                                            : 1;
                                    const width = parseInt(
                                        newImg.width * scale
                                    );
                                    const height = parseInt(
                                        newImg.height * scale
                                    );
                                    canvas.width = width;
                                    canvas.height = height;

                                    ctx.drawImage(newImg, 0, 0, width, height);
                                    const base64Str = canvas.toDataURL(
                                        file.type
                                    );
                                    resolve(base64Str);
                                };
                                newImg.src = canvas.toDataURL(file.type);
                            });
                        }
                    );
                };
                img.src = e.target.result;
            };
            reader.readAsDataURL(file);
        } else {
            resolve("");
        }
    });
}

function getHiddenMobile(mobile) {
    let txt = "";
    if (mobile) {
        const arr = mobile.split("-");
        if (arr.length >= 2) {
            const num = arr[1];
            const len = num.length;
            for (let i = 0; i < len; i++) {
                if (i > 2 && i < len - 4) {
                    txt += "*";
                } else {
                    txt += num[i];
                }
            }
        }
    }
    return txt;
}

// replaceLang('My name is %s %s', 'Guohui', 'Tang');
// replaceLang('My name is {1} {0}', 'Tang', 'Guohui');
function replaceLang(lang, ...args) {
    if (lang && typeof lang == "string" && args.length) {
        const s = /%s/.test(lang);
        for (let i = 0; i < args.length; i++) {
            const re = s ? /%s/ : new RegExp("\\{" + i + "\\}", "g");
            lang = lang.replace(re, args[i]);
        }
    }
    return lang;
}

function toThousands(num) {
    return parseFloat(num.toFixed(2)).toLocaleString();
}

function getPlatform() {
    let name = "pc";
    if (navigator.userAgent.match(/iPhone|iPod|ios|iPad/i)) {
        name = "ios";
    } else if (navigator.userAgent.match(/Android/i)) {
        name = "android";
    }
    return name;
}

function getVersionNum(verStr) {
    var num = 0;
    if (verStr && typeof verStr == "string") {
        verStr = verStr.replace("(", ".").replace(/[^\.\d]/g, "");
        var arr = verStr.split(".");
        var ver = arr.length ? arr[arr.length - 1] : 0;
        num = !isNaN(ver) ? parseInt(ver) : 0;
    }
    return num;
}
function getAppUaInfo(ua, key) {
    //Android_version=6.7.0.684;system=8.0.0,app=hsing
    //IOS,version=6.7.0(4499),system=13.1.3,app=hsing,bundleId=com.km.singnow
    var obj = {};
    var groups = ua.split(";");
    for (var a = 0; a < groups.length; a++) {
        var infos = groups[a].split(",");
        for (var b = 0; b < infos.length; b++) {
            var arr = infos[b].split("=");
            var k = arr[0];
            var v = arr[1] || "";
            obj[k] = v;

            if (/version/i.test(k)) {
                obj["ver"] = getVersionNum(v);
            }
        }
    }

    if (key) {
        return obj[key];
    }
    return obj;
}
function getAppVer() {
    return getAppUaInfo(navigator.userAgent, "ver");
}

function getVer() {
    let name = "pc";
    if (navigator.userAgent.match(/(Android);?[\s\/]+([\d.]+)?/)) {
        name = "android";
    } else if (!!navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)) {
        name = "ios";
    }
    return name;
}

function callApp(name, ...args) {
    if (name && typeof name == "string") {
        const isIOS = getPlatform() == "ios";
        try {
            args = args.length ? args : isIOS ? [""] : [];
            args = args.map(v => {
                if (typeof v == "object" && v !== null) {
                    return JSON.stringify(JSON.stringify(v));
                }
                return JSON.stringify(v);
            });
            args = args.join(",");
            const code = isIOS
                ? `window.webkit.messageHandlers.${name}.postMessage(${args});`
                : `window.JSInterface.${name}(${args});`;
            // console.log(code);
            return window.eval(code);
        } catch (e) {}
    }
}
function appToast(message) {
    callApp("toast", message + "");
}

function appClose() {
    callApp("closeWeb");
}

function pageInited() {
    callApp("pageInited");
}

function getDeviceId() {
    callApp("getDeviceId");
}
function vuexCommit(name, val) {
    store.commit(name, val);
}
export {
    getUrlString,
    toast,
    getVer,
    getLangHtml,
    getTimeObj,
    getBase64Image,
    getHiddenMobile,
    replaceLang,
    toThousands,
    getPlatform,
    getAppVer,
    callApp,
    appToast,
    appClose,
    pageInited,
    getDeviceId,
    vuexCommit
};
