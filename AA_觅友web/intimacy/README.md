# 觅友幸运礼物（支持多语言的国际版本）

## 蓝湖UI
[蓝湖UI](https://lanhuapp.com/web/#/item/project/board?pid=7a25188f-6025-4070-ac52-7f774e2ceb2e)

## 接口文档
[接口文档](http://t.act.udateapp.com/index.php?touid=106970&action=gift.rebackGiftRank&lang=zh-HK&token=NLtFEok8cromSPyuXXHMGO0j36nl3n9sf_Dmst6ULhg0mWYBndrKmrPTXxKP2Ta0NsjUkNOKl1v7P024MI9CQjFAuAWRiqCgV92Eg_vfsUiAaqOarh-CX31q97wHHayz)

## 项目地址
[http://act.udateapp.com/luckyGift](http://act.udateapp.com/luckyGift)

## 服务器目录
/home/17sing/web/act.miyou.tw/html/luckyGift


## 多语言网站开发技术参考
* [使用 vue-i18n 切换中英文](https://www.cnblogs.com/rogerwu/p/7744476.html)
* [基于Webpack的多语言解决方案](https://zhuanlan.zhihu.com/p/25590588)

## 增加新语言支持方法
 1. 参考local/子目录，拷贝一份，对相关文件进行修改
 2. build/webpack.dev.config.js build/webpack.prod.config.js打包入口文件配置增加配置项如下
    ```javascript
    entry: {
        zhcn: './src/local/zhcn',
    },
    ```
 3. local.js文件常量langs增加新的语言编码
    ```javascript
    const langs = ['zh-cn'];
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