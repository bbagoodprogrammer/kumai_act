/*
Webpack本地化相关资源打包入口，相关资源类型有：
1、差异化覆盖样式文件（<html class="zh">）
2、文本语言包文件
3、少数URL引用的图片资源（界面涉及图片尽量在样式里面完成）
*/

// 如果此语言无覆盖样式，注释样式导入
import "./style.scss";

import lang from "./lang";
import images from "./images";
import _rule from "./rule.vue";

window._lang = lang;
window._images = images;
window._rule = _rule;
if (lang.title) {
    document.title = lang.title;
}
