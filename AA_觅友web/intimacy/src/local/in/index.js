/*
Webpack本地化相关资源打包入口，相关资源类型有：
1、差异化覆盖样式文件（<html class="zhcn">）
2、文本语言包文件
3、少数URL引用的图片资源（界面涉及图片尽量在样式里面完成）
*/
import './style.scss';

import lang from './lang';
import images from './images';

window._lang = lang;
window._images = images;

if (lang.title) {
    document.title = lang.title;
}