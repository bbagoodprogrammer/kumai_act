/**
 * 各端应用、地区和默认语言配置，不同的域名可以使用相同的配置，键和值全用小写，值不要有空格
 * 主要用于合并所有端代码后根据域名覆盖针对单端打包的APP、AREA和默认LANG设置
 * 欢歌目前针对各端单独打包发布代码，所以注释以下配置
 * 像觅友如果需要合并代码，仅保留当前APP相关域名配置
 */
const hosts = {
    'localhost:8080': 'miyou,tw,zh', // APP AREA LANG
    // '17sing.tw': 'hsing,tw,zh',
    // 'singnowapp.com': 'singnow,vi,vi',
    // 'wekarapp.com': 'wekara,id,id',
    // 'supervoice-app.com': 'gosing,ar,ar',
    // 'singstarapp.com': 'singstar,in,en',
    'udateapp.com': 'miyou,tw,zh',
    'alochatapp.com': 'miyou,vn,vi',
    'newstarapp.com': 'miyou,id,id',
};

/**
 * 本文件生成以下常量
 * __area 地区常量
 * _test 测试
 * _localTest 本地测试
 * _platform 系统平台
 * _app 应用名称
 * _area 地区
 * _local 语言ID
 * __lang 语言编码
 * _host 当前主域名
 */
const host = location.host;
function getMainHost() {
    const parts = host.split('.');
    const len = parts.length;
    if (len >= 2 && !/:\d+$/.test(host)) {
        return (parts[len - 2] + '.' + parts[len - 1]).toLowerCase();
    }
    return host;
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
function getPlatform() {
    // 简单规则，主要兼容Hsing APP WebView
    let name = 'pc';
    const ua = navigator.userAgent;
    if (ua.match(/iPhone|iPod|ios|iPad/i)) {
        name = 'ios';
    } else if (ua.match(/Android/i)) {
        name = 'android';
    }
    return name;
}

// 生成地区配置常量供逻辑判断用
window.__area = {
    TW: 'tw',
    VI: 'vi',
    VN: 'vn', // 觅友越南
    ID: 'id',
    AR: 'ar',
    IN: 'in',
};

// 测试环境常量
const localTest = /localhost/i.test(host) || /\d+\.\d+\.\d+\.\d+/.test(host);
const serverTest = /^t(est)?\./i.test(host);
const paramTest = getUrlString('test') !== null;
window._test = localTest || serverTest || paramTest;
window._localTest = localTest;

// 当前系统平台 ios|android|pc
window._platform = getPlatform();

// 应用、地区和默认语言处理（优先顺序：服务器输出配置 > 域名匹配 > 打包设置）
window._app = APP;
window._area = AREA;
let langs = LANGS;
const mainHost = getMainHost();
// 根据域名配置匹配
if (typeof hosts != 'undefined') {
    const cfg = hosts[mainHost] || hosts[btoa(mainHost)] || '';
    if (cfg) {
        const arr = cfg.split(',');
        if (arr.length == 3 && langs.indexOf(arr[2]) != -1) {
            _app = arr[0];
            _area = arr[1];
            langs = [arr[2]].concat(langs);
        }
    }
}
// 根据服务器输出的全局变量_env匹配
if (typeof window._env != 'undefined') {
    _env = Object.assign({}, _env);
    if (_env.app) {
        _app = _env.app;
    }
    if (_env.area) {
        _area = _env.area;
    }
    if (_env.lang && langs.indexOf(_env.lang) != -1) {
        langs = [_env.lang].concat(langs);
    }
    if (typeof _env.test != 'undefined') {
        _test = _env.test;
    }
}

// 符合条件的原始完整语言编码（供接口透传）
let __lang = langs[0];
const langCode = getUrlString('lang') || navigator.language || '';
const langLC = langCode.toLowerCase();
const parts = langLC.split('-');
const matchAll = langs.indexOf(langLC) != -1;
const matchPart1 = langs.indexOf(parts[0]) != -1;
// 全匹配zh-CN或前面部分匹配zh-xx的zh，使用原始的语言编码
if (matchAll || matchPart1) {
    __lang = langCode;
}
// 原始语言编码，值类似zh-CN或zh
window.__lang = __lang;

const lang = matchAll ? langLC : (matchPart1 ? parts[0] : langs[0]);
// 用于资源区分的语言ID，值类似zh-CN的第一部分zh或全匹配zh-cn
window._local = lang;
// 当前主域名
window._host = mainHost;

// 添加Hash版本号用于缓存策略（只对生产环境生效）
let cssHash = '';
let jsHash = '';
if (typeof _hash != 'undefined') {
    const cssKey = lang + 'css';
    if (typeof _hash[cssKey] != 'undefined') {
        cssHash = '?' + _hash[cssKey];
    }
    jsHash = '?' + _hash[lang + 'js'];
}
// 根节点增加语言编码样式名用于编写覆盖样式
const doc = document.documentElement;
doc.className = doc.className ? doc.className+' '+lang : lang;
// doc.setAttribute('data-app', _app);
// doc.setAttribute('data-area', _area);
// 加载覆盖样式
if (cssHash) {
    const link = document.createElement('link');
    link.href = `css/${lang}.css${cssHash}`;
    link.rel = 'stylesheet';
    document.getElementsByTagName('head')[0].appendChild(link);
}
// 加载语言包相关配置
document.write(`<script type="text/javascript" src="js/${lang}.js${jsHash}"></script>`);