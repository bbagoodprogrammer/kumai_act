/*
Webpack本地化相关资源打包入口，相关资源类型有：
1、差异化覆盖样式文件（<html class="zh">）
2、文本语言包文件
3、少数URL引用的图片资源（界面涉及图片尽量在样式里面完成）
*/

// 如果此语言无覆盖样式，注释样式导入
// import './style.scss';

import lang from './lang';
import images from './images';

window._lang = lang;
window._images = images;
window._roomUrl = 'https://activity.udateapp.com/static_html/chat_explain/index.html?aid=42'
window._gifts = [
    {
        coin: 100,
        score: 200
    },
    {
        coin: 1000,
        score: 2000
    },
    {
        coin: 1500,
        score: 3000
    }
]

if (lang.title) {
    document.title = lang.title;
}