/**
 * 各端默认语言配置，不同的域名可以使用相同的语言，键和值全用小写
 * 主要用于合并所有端代码后根据域名覆盖针对单端的LANG默认语言设置
 * 目前针对各端单独打包发布代码，所以注释以下配置
 */
const hosts = {
    'localhost:8080': 'zh',
    'udateapp.com': 'zh',
    'alochatapp.com': 'vi',
};

function getMainHost() {
    const host = location.host;
    const parts = host.split('.');
    const len = parts.length;
    if (len >= 2) {
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

let langs = LANGS;
const mainHost = getMainHost();
if (typeof hosts != 'undefined' && hosts[mainHost] && langs.indexOf(hosts[mainHost]) != -1) {
    langs = [hosts[mainHost]].concat(langs);
}

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

const lang = matchAll ? langLC : (matchPart1 ? parts[0] : langs[0]);
// __lang常量，值类似zh-CN或zh，接口等场景需要此常量可以直接引用
window.__lang = __lang;
// _local常量，值类似zh-CN的第一部分zh
window._local = lang;
// _app常量，值类似hsing
window._app = APP_NAME;
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
// 加载覆盖样式
if (cssHash) {
    const link = document.createElement('link');
    link.href = `css/${lang}.css${cssHash}`;
    link.rel = 'stylesheet';
    document.getElementsByTagName('head')[0].appendChild(link);
}
// 加载语言包相关配置
document.write(`<script type="text/javascript" src="js/${lang}.js${jsHash}"></script>`);