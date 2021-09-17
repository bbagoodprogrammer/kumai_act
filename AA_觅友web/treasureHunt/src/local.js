// 支持的语言列表，支持不同的域名使用相同的默认语言（健和值全用小写字母）
const hosts = {
    "localhost:8080": "zh", // 修改此值可用于开发测试指定语言版本
    "udateapp.com": "zh",
    "alochatapp.com": "vi",
    "newstarapp.com": "id"
};

function getMainHost() {
    const parts = location.host.split(".");
    const len = parts.length;
    if (len >= 2) {
        return (
            parts[len - 2].toLowerCase() + "." + parts[len - 1].toLowerCase()
        );
    }
    return location.host;
}
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

// 生成语言列表，并把第一个值设置为默认语言
let langs = [];
const mainHost = getMainHost();
for (let host in hosts) {
    if (host != mainHost) {
        langs.push(hosts[host]);
    }
}
if (hosts[mainHost]) {
    langs = [hosts[mainHost]].concat(langs);
}

let lang = getUrlString("lang");
let code = lang || "";
lang = code.toLowerCase();
const parts = lang.split("-");
if (parts.length == 2) {
    lang = parts[0];
    code = lang + "-" + parts[1].toUpperCase();
}
lang = langs.indexOf(lang) != -1 ? lang : langs[0];
// 向Window添加一个_clang常量，值类似zh-CN，接口等场景需要此常量可以直接引用
window._clang = code;
// 添加Hash版本号用于缓存策略（只对生产环境生效）
let cssHash = "";
let jsHash = "";
if (typeof _hash != "undefined") {
    const cssKey = lang + "css";
    if (typeof _hash[cssKey] != "undefined") {
        cssHash = "?" + _hash[cssKey];
    }
    jsHash = "?" + _hash[lang + "js"];
}

// 越南语很长，需要走马灯效果，lang来判断控制js逻辑
window.lang = lang;

// 根节点增加语言编码样式名用于编写覆盖样式
const doc = document.documentElement;
doc.className = doc.className ? doc.className + " " + lang : lang;
// 加载覆盖样式
if (cssHash) {
    const link = document.createElement("link");
    link.href = `css/${lang}.css${cssHash}`;
    link.rel = "stylesheet";
    document.getElementsByTagName("head")[0].appendChild(link);
}
// 加载语言包相关配置
document.write(
    `<script type="text/javascript" src="js/${lang}.js${jsHash}"></script>`
);
