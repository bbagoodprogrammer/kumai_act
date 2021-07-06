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

window._lang = lang;
window._images = images;
window._coinConfig = 50;
window._notFirstDialog = true;
window._gifts = [
    { img: require("../../img/award_1.png"), show: true },
    { img: require("../../img/award_2.png"), show: true },
    { img: require("../../img/award_3.png"), show: true },
    { img: require("../../img/award_4.png"), show: true },
    { img: require("../../img/award_5.png"), show: true },
    { img: require("../../img/award_6.png"), show: true },
    { img: require("../../img/award_7.png"), show: true },
    { img: require("../../img/award_8.png") },
    { img: require("../../img/award_9.png") }
];

window._ruleGifts = [
    { img: require("../../img/rule_award_1.png"), show: true },
    { img: require("../../img/rule_award_2.png"), show: true },
    { img: require("../../img/rule_award_3.png"), show: true },
    { img: require("../../img/rule_award_4.png"), show: true },
    { img: require("../../img/rule_award_5.png"), show: true },
    { img: require("../../img/rule_award_6.png"), show: true },
    { img: require("../../img/rule_award_7.png"), show: true },
    { img: require("../../img/rule_award_8.png") },
    { img: require("../../img/rule_award_9.png") }
];

if (lang.title) {
    document.title = lang.title;
}
