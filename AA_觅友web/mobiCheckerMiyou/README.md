# 觅友短信验证码网页（多端合并代码版本）

## 项目地址
 * 台湾测试：[http://t.act.udateapp.com/api/sms_kit/index.php](http://t.act.udateapp.com/api/sms_kit/index.php)
 * 台湾正式：[http://act.udateapp.com/api/sms_kit/index.php](http://act.udateapp.com/api/sms_kit/index.php)
 * 越南测试：[http://t.act.alochatapp.com/api/sms_kit/index.php](http://t.act.alochatapp.com/api/sms_kit/index.php)
 * 越南正式：[http://act.alochatapp.com/api/sms_kit/index.php](http://act.alochatapp.com/api/sms_kit/index.php)
 * 国际正式：[http://act.dateume.com/api/sms_kit/index.php](http://act.dateume.com/api/sms_kit/index.php)

## 目录位置
 * /home/17sing/php/api/sms_kit

## SVN地址
 * [https://hsing.wicp.net:20086/svn/kumaiPhp/miyou/trunk/php/api/sms_kit](https://hsing.wicp.net:20086/svn/kumaiPhp/miyou/trunk/php/api/sms_kit)

## 产品文档
 * [产品文档](https://www.tapd.cn/54156343/prong/stories/view/1154156343001000192?url_cache_key=0859244ada533acc29e422cd076f906d&action_entry_type=story_tree_list)

## 蓝湖设计
 * [蓝湖设计](https://lanhuapp.com/url/mUKFh-woyMk)
 * [设计新版](https://lanhuapp.com/url/ulKyv-Mwxoq)

## 接口文档
 * [接口文档](https://docs.qq.com/doc/DRU5kSUNNY0Fyd01D)

## 使用方法
 1. 增加样式主题
    * 增加样式主题文件css/xxx.scss，并修改主题颜色
    * 组件内样式使用SCSS逻辑语法增加样式@if $name==xxx {}，$name为主题名称 $app为应用名称
    * 通用Loading组件增加新主题gif动画及修改样式
 2. 增加新的语言
    * 参考 [欢歌KOL签约（多语言支持模板）](https://github.com/tangguohui/kolSigning)
 3. 修改package.json打包配置
 4. html/index.ejs模板加入差异化打包逻辑
    * 模板可访问2个变量 app prod

## 注意事项
 * 此项目从欢歌短信验证码项目精简而来，根据合并代码要求，主要增加了根据域名设置默认语言逻辑（因为页面是PHP文件也可以利用PHP环境变量来设置默认语言）；
 * 交互埋点上报，通过调app提供的方法进行上报；
 * 接口请求带APP签名逻辑，外部浏览器访问网页，getSign.js返回空的签名；
 * 觅友台湾、越南已合并代码，代码提交到SVN后需要用发布系统发布。