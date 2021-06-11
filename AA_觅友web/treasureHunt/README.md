# 觅友幸运礼物（支持多语言的国际版本）

## 项目地址
 * 测试服：[http://t.act.udateapp.com/luckyGift](http://t.act.udateapp.com/luckyGift)
 * 正式服：[http://act.udateapp.com/luckyGift](http://act.udateapp.com/luckyGift)

## 部署目录
/home/17sing/web/act.miyou.tw/html/luckyGift

## 蓝湖设计
[蓝湖UI](https://lanhuapp.com/web/#/item/project/board?pid=7a25188f-6025-4070-ac52-7f774e2ceb2e)

## 请求接口
[http://t.act.udateapp.com/index.php?lang={lang}&action=gift.rebackGiftRank&touid={touid}&token={token}](http://t.act.udateapp.com/index.php?lang=zh-CN&action=gift.rebackGiftRank&touid=106970&token=NLtFEok8cromSPyuXXHMGO0j36nl3n9sf_Dmst6ULhg0mWYBndrKmrPTXxKP2Ta0NsjUkNOKl1v7P024MI9CQjFAuAWRiqCgV92Eg_vfsUiAaqOarh-CX31q97wHHayz)

---

## Webpack多语言打包设计
 * 语言代码像这样zh-CN，前面部分是语言，后面部分是国家或地区，觅友目前语言唯一性以第一部分作为区分即可（因为不会提供更细的语言包，像zh-CN、zh-HK、zh-TW统一采用繁体）；
 * 把每个语言变化的内容单独打包成独立的文件进行加载（不把所有语言配置信息打包一起是考虑按需加载），如语言包文本配置脚本和本地化需要覆盖的样式文件（如果多端只需要修改文案，不需要调整样式，通过配置可以禁用样式打包）；
 * 图片等静态资源通过设置hash文件名统一打包到dist/img/；
 * 数据请求接口目前采用相对路径，这样打包一次一份代码直接部署多端，其中默认语言也会根据域名和语言的配置自动识别；
 * 打包出来的独立语言配置文件，通过编写Webpack插件，实现自动hash版本号，从而支持缓存策略；
 * 多页面项目打包参考app入口点增加配置项即可；
 * 本地化目录文件说明：
   1. img/为差异化图片文件存放目录，将在images.js导入
   2. lang.js文本语言包，里面的title用于页面标题
   3. images.js里面通过require载入差异化图片资源
   4. style.scss用于编写差异化覆盖样式，顶级选择器这样开始：html.zh {}
 * 多语言打包网站执行后，将在window全局增加三个变量（有更多的配置可以参照以下对象添加方法增加，比如增加_apis）：
   1. _clang 当前语言编码，类似zh-CN，可以说是从URl参数获取的值（当前打包策略还提供了默认语言支持，URL不传或传错语言编码都将自动设置默认语言）
   2. _lang 文本语言包对象，在组件内通过计算属性返回后可以在组件里面使用
   3. _images 差异化图片资源，通过计算属性返回使用

---

## 增加新语言支持方法
 1. 参考local/子目录，拷贝一份，对相关文件进行修改
 2. build/webpack.dev.config.js build/webpack.prod.config.js打包入口文件配置增加配置项如下
    ```javascript
    entry: {
        zh: './src/local/zh',
    },
    ```
 3. local.js文件常量hosts增加新的语言编码（域名对应语言编码，域名只保留最后两部分）
    ```javascript
    const hosts = {
        'udateapp.com': 'zh',
    };
    ```
 4. config/urls.js请求接口增加动态lang参数
    ```javascript
    {
       init: '/index.php?lang=' + _clang,
    },
    ```
 5. 组件内通过计算属性获取lang images
    ```javascript
    computed: {
        lang: () => _lang,
        images: () => _images,
    },
    ```

---

## 多语言网站开发技术参考
* [使用 vue-i18n 切换中英文](https://www.cnblogs.com/rogerwu/p/7744476.html)
* [基于Webpack的多语言解决方案](https://zhuanlan.zhihu.com/p/25590588)