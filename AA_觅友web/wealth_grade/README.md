# 欢歌KOL签约

## 项目地址
 * 测试服：[http://test.17sing.tw/signing2/index.html](http://test.17sing.tw/signing2/index.html)
 * 正式服：[http://act.17sing.tw/signing2/index.html](http://act.17sing.tw/signing2/index.html)

## 目录位置
   * /home/17sing/web/act.17sing.tw/signing2

## SVN地址
   * [https://hsing.wicp.net:20086/svn/hsing_server/web/act.17sing.tw/signing2](https://hsing.wicp.net:20086/svn/hsing_server/web/act.17sing.tw/signing2)

## 需求文档
   * [产品原型文档](https://hsing.wicp.net:20086/svn/ProductDesign/产品文档/75.【7.7】需求集合/KOL2.0)

## 接口文档
   * [服务器接口文档](https://note.youdao.com/ynoteshare1/index.html?id=fd1dccf39dd566c4cb8807ab87aac719)

## 蓝湖UI
   * [欢歌7.7设计图](https://lanhuapp.com/url/Cf2Uk-qnLWk)

## 测试帐号
   * uid=6960941&token=LPc7DM7lH59sMQZZh2jVFerYJRh3K_AjvmeRx-WpDmO3GQU_rQCrE17Pt3BZ1ixfb0uzpvqP7Vd62OZMKTJLMW0Skaeiy0OlBNzsohNit4QhwlnFfsZ7D2fffHoxCfGy

---

## Webpack多语言网页打包设计
 * 语言代码像这样zh-CN，前面部分是语言，后面部分是国家或地区，语言唯一性以第一部分作为区分即可（因为不会提供更细的语言包，像zh-CN、zh-HK、zh-TW统一采用繁体）；
 * 把每种语言变化的内容单独打包成独立的文件进行加载，如语言包文本配置和本地化需要覆盖的样式文件（不把所有语言配置信息打包一起是考虑按需加载，以及提升Webpack开发编译和打包速度，同时单端SVN部署的代码文件也不会冗余）
 * 实现单独打包按需加载的主要方法是把相关独立资源在local/lang/index.js中导入，并以全局变量方式在别的组件使用；
 * 如果某端只需要修改文案，不需要调整增加覆盖样式，通过注释lang/index.js样式导入可禁用样式打包输出；
 * 如果合并所有端代码，各端发布从同一个SVN地址拉资源，最终打包需要包含所有语言，目前dev build为打包所有资源模式，buildHsing、buildSingnow等为指定端模式（适用目前SVN代码未合并情况），另外像储值网页由于不同国家接入的渠道千差万别不适合合并代码，单个地区像印度可以使用此模板达到渠道一样仅换语言的目的；
 * 如果合并代码，由于各APP版本同步时间会有差异，源码需要通过SVN等版本管理软件做好版本管理，主要考虑新功能在开发时，旧的版本又需要修复bug的情况，可以根据版本切换处理；
 * 打包命令行参数增加LANG选项，当前端要支持多种语言用逗号隔开，像印度LANG=en,hi，LANG配置值不支持通过打包时传入，降低打包某端输错配置风险；
 * 语言列表基于当前域名配置，如果出现临时切换域名情况，因为APP网页参数始终有传入语言编码，如果传的语言找不到，将根据浏览器语言继续匹配，并用英文作为最后的默认语言（需要翻译支持，并在package.json打包各APP的LANG和local.js中hosts配置增加en）；
 * 图片等静态资源通过设置hash文件名统一打包到dist/img/，这样像觅友、欢歌印度一个APP同时支持多种语言打包同类资源不会出现重名覆盖；
 * 数据请求接口尽量采用相对路径，这样打包一次一份代码直接部署多端，其中默认语言也会根据域名和语言的配置自动识别（如果各端接口地址有差异，需要像lang、images这样配置）；
 * 像用户协议网页这种有大量文本的组件，不适合抽成语言包也可以像lang、images把它导出到全局，然后在需要用到的地方进行引用；
 * 打包出来的独立语言配置文件，通过编写Webpack插件，实现自动hash版本号，从而支持缓存策略；
 * 多页面项目打包参考app入口点增加配置项，以及修改LocalFilesHashPlugin.js（尽量采用单页面应用开发模式，避免页内跳转还要把lang参数传递下去）；
 * utils/index.js提供了像replaceLang toThousands getPlatform getAppVer callApp等常用方法，其中replaceLang已全局注入，其它的自行按需添加；
 * 不同语言或APP差异化处理可依赖几个主要变量和方法：
   1. __lang=zh-CN取第一部分zh可作为语言区分
   2. _chost=17sing.tw取第一部分可作为APP区分
   3. 工具类方法getPlatform()操作系统
   4. 工具类方法getAppVer()应用版本
 * 本地化目录文件说明：
   1. img/为差异化图片文件存放目录，将在images.js导入，主要用于img标签绑定（如果是写在样式中不需要在images.js导入，直接在style.scss引用即可打包出去）
   2. lang.js文本语言包，里面的title用于页面标题
   3. images.js里面通过require载入差异化图片资源用于img标签引用
   4. style.scss用于编写差异化覆盖样式，顶级选择器这样开始：html.zh {}，不想写深层选择器路径可使用important关键字（如果同步到某个端UI大改，建议减少默认样式，把更多的样式实现放到对应的语言下面）
 * 多语言打包网站执行后，将在window全局增加四个变量（有更多的配置可以参照以下对象添加方法增加，比如增加_apis，同时避免在别处修改此类全局变量）：
   1. __lang 当前语言完整编码，类似zh-CN，可以说是从URL参数获取的值（当前打包策略还提供了默认语言支持，URL不传或传错语言编码都将自动采用默认语言，另外通过计算属性取出第一部分可用于组件模板渲染逻辑）
   2. _chost 当前主域名，可以用域名作为APP区分处理一些差异化逻辑（测试时localhost域名是个特例，要真实模拟生产环境需自行配置host）
   3. _lang 文本语言包对象，已在main.js进行全局混合注入，可以在组件内或模板上直接使用，对于不在组件上下文访问的直接引用_lang（组件里尽量用this.lang访问，这样在_lang被第三方占用可减少_lang的替换数量）
   4. _images 差异化图片资源，已全局注入，可在各组件直接使用

---

## 增加新语言支持方法
 1. 参考local/子目录，拷贝一份，对相关文件进行修改
 2. package.json参考已有的配置增加新的APP及相关语言打包配置（如果多端合并代码，新增语言也要附加到dev build的LANG选项，最终打包用build）
    ```javascript
    "devHsing": "cross-env    NODE_ENV=development LANG=zh",
    "buildHsing": "cross-env  NODE_ENV=production  LANG=zh"   
    ```
 3. local.js文件常量hosts增加新的语言编码（域名对应语言编码，域名只保留最后两部分，全部用小写，语言列表不要有空格）
    ```javascript
    const hosts = {
        'inapp.com': 'en,hi',
    };
    ```
 4. config/urls.js请求接口增加动态lang参数
    ```javascript
    {
       init: '/index.php?lang=' + __lang,
    },
    ```
 5. webpack.dev.config.js devServer代理根据开发需要临时修改
 6. 多页面及增加更多的全局变量支持方法参考前面的打包设计说明
 7. 修改local.js的testLang，然后执行npm run devXxx（不建议npm run dev，因为这是全语言包编译模式会比较慢）