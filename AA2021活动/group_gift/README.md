# 欢歌KOL签约（多语言支持模板）

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
 * 语言代码像这样zh-CN，前面部分是语言，后面部分是国家或地区，目前语言唯一性以第一部分作为区分即可（像zh-CN、zh-HK、zh-TW统一采用繁体，打包模板也实现了全匹配优先，如LANG=zh,zh-cn，其中zh-cn为全匹配）；
 * 根据查阅资料显示[《每个国家对应的语言Locale和国家代码对照表》](https://www.cnblogs.com/lobtao/articles/11365639.html)，有部分国家语言代码可能只有第一部分，比如阿语ar，目前此打包模板默认值就是只保留第一部分（即package.json LANG列表的值）；
 * 把每种语言变化的内容单独打包成独立的文件进行加载，如语言包文本配置和本地化需要覆盖的样式文件（不把所有语言配置信息打包一起是考虑按需加载，以及提升Webpack开发编译和打包速度，同时单端SVN部署的代码文件也不会冗余）
 * 实现单独打包按需加载的主要方法是把相关独立资源在local/lang/index.js中导入，并以全局变量方式在别的组件使用；
 * 如果某端只需要修改文案，不需要调整增加覆盖样式，通过注释lang/index.js样式导入可禁用样式打包输出（空文件也会创建问题未解决）；
 * ~~如果合并所有端代码，各端发布从同一个SVN地址拉资源，最终打包需要包含所有语言~~，目前dev build为打包所有资源模式，buildHsing、buildSingnow等为指定端模式（适用目前SVN代码未合并情况），另外像储值网页由于不同国家接入的渠道千差万别不适合合并代码，单个地区像印度可以使用此模板达到渠道一样仅换语言的目的；
 * 如果合并代码，由于各APP版本同步时间会有差异，源码需要通过SVN等版本管理软件做好版本分支管理，主要考虑新功能在开发时，旧的版本又需要修复bug的情况，可以根据版本切换处理；
 * 目前最新的打包设计，因为不再根据域名设置默认语言，而是把打包时LANG语言列表的第一个语言作为默认值，所以无法针对APP指定默认语言，此时默认语言只适合像英语en这种适用所有端的语言，目前的构架是源码一份，但是打包出来的代码还是分开发布到各APP，各端本身有版本迭代差异，完全用一份发布代码也是不现实；
 * 打包命令行参数增加LANG选项，当前端要支持多种语言用逗号隔开，像印度LANG=en,hi，全用小写，LANG配置值不支持通过打包时传入，降低打包某端输错配置风险；
 * 各端语言列表读取package.json LANG配置，列表第一个语言为此APP端的默认语言，如果网页lang参数及浏览器语言都无法匹配到将采用此语言作为默认语言；
 * 图片等静态资源通过设置hash文件名统一打包到dist/img/，这样像觅友、欢歌印度一个APP同时支持多种语言打包同类资源不会出现重名覆盖；
 * 数据请求接口尽量采用相对路径，~~这样打包一次一份代码直接部署多端，其中默认语言也会根据域名和语言的配置自动识别~~（如果各端接口地址有差异，需要像lang、images这样配置）；
 * 像用户协议网页这种有大量文本的组件，不适合抽成语言包也可以像lang、images把它导出到全局，然后在需要用到的地方进行引用；组件内不变的样式特别多的话可以抽取到src/css/main.scss中，这样可以避免在本地化样式文件中重复输出；
 * 打包出来的独立语言配置文件，通过编写Webpack插件，实现自动hash版本号，从而支持缓存策略；
 * 多页面项目打包参考app入口点增加配置项，以及修改LocalFilesHashPlugin.js（尽量采用单页面应用开发模式，避免页内跳转还要把lang参数传递下去）；
 * utils/index.js提供了像replaceLang toThousands getPlatform getAppVer callApp等常用方法，其中replaceLang已全局注入，其它的自行按需添加；
 * 不同语言或APP差异化处理可依赖几个主要变量和方法：
   1. _local=zh 语言标识（与src/local/xx目录一致，也是package.json LANG列表的值）
   2. _app=hsing 可作为APP区分，如处理不同APP接口差异
   3. _host=17sing.tw（只保留域名最后两部分，可用于构建接口URL）
   4. 工具类方法getPlatform()操作系统
   5. 工具类方法getAppVer()应用版本
 * 本地化目录文件说明：
   1. img/为差异化图片文件存放目录，将在images.js导入，主要用于img标签绑定（如果是写在样式中不需要在images.js导入，直接在style.scss引用即可打包出去）
   2. lang.js文本语言包，里面的title用于页面标题
   3. images.js里面通过require载入差异化图片资源用于img标签引用
   4. style.scss用于编写差异化覆盖样式，顶级选择器这样开始：html.zh {}，不想写深层选择器路径可使用important关键字（如果同步到某个端UI大改，建议减少默认样式，把更多的样式实现放到对应的语言下面）
 * 多语言打包网站执行后，将在window全局增加六个变量（有更多的配置可以参照以下对象添加方法增加，比如增加_apis，同时避免在别处修改此类全局变量）：
   1. __lang 当前语言完整编码，类似zh-CN，能匹配上时此值是未格式化的原始值，否则为LANG第一个值（当前打包策略还提供了默认语言支持，URL不传或传错语言编码都将自动采用默认语言）
   2. _local 当前语言标识：zh/vi/id/ar/en/hi
   3. _app 当前APP标识：hsing/singnow/wekara/gosing/india
   4. _host 当前主域名（测试时localhost或127.0.0.1域名是个特例，要真实模拟生产环境需自行配置host）
   5. _lang 文本语言包对象，已在main.js进行全局混合注入，可以在组件内或模板上直接使用，对于不在组件上下文访问的直接引用_lang（组件里尽量用this.lang访问，这样在_lang被第三方占用可减少_lang的替换数量）
   6. _images 差异化图片资源，已全局注入，可在各组件直接使用（style.scss使用的图片不需要配置）
 * 如果HTML模板也需要做差异化处理，利用html-webpack-plugin插件templateParameters选项把_app和_local等常量公开给ejs模板使用（短信验证码和塔罗牌项目有使用此种方式）
 * _短期内合并所有端的发布代码为一份的可能性较小，根据域名自动区分APP并设置默认语言的打包配置先注释，主要编辑local.js的hosts即可，合并一份代码更新发布风险高同时影响缓存策略，随着支持的国家越来越多，每次打包编译的文件和更新的资源相对多（觅友国际版暂时使用旧的打包配置，即根据域名设置默认语言，多端一份打包代码的设计）_

---

## 增加新语言支持方法
 1. 参考local/子目录，拷贝一份，对相关文件进行修改
 2. package.json参考已有的配置增加新的APP及相关语言打包配置，LANG值用小写，支持多语言的端开发时把要测试的语言先放在第一位，或测试时主动传入对应的lang参数
    ```javascript
    "devHsing": "cross-env    NODE_ENV=development APP=hsing LANG=zh,zh-cn",
    "buildHsing": "cross-env  NODE_ENV=production  APP=hsing LANG=zh,zh-cn"   
    ```
 3. config/urls.js请求接口增加动态lang参数
    ```javascript
    {
       init: '/index.php?lang=' + __lang,
    },
    ```
 4. webpack.dev.config.js devServer代理根据开发需要临时修改
 5. 多页面及增加更多的全局变量支持方法参考前面的打包设计说明
 6. 执行npm run devXxx（不建议npm run dev，因为这是全语言包编译模式会比较慢）

---

## 现有Vue项目改造流程
 1. 复制模板项目以下相关文件替换旧的项目，根据需要修改或增删文件
    ```javascript
      build/
      src/html/
      src/local/
      src/local.js
      package.json // 复制模板项目scripts内容即可
    ```
 2. 复制模板项目src/utils/index.js replaceLang方法之后的相关代码合并到现有的文件
 3. 在src/main.js文件添加全局混合
    ```javascript
      import { replaceLang } from './utils';
      Vue.mixin({
         computed: {
               lang: () => _lang,
               images: () => _images,
         },
         methods: {
               replaceLang,
         },
      })
    ```
 4. 删除旧的src/config/lang.js文件，移除各组件旧的lang导入，用this.lang或_lang代替（可以全文搜索“ lang.”替换）
 5. 清空src/html/index.html的title标签内容
 6. 如果使用了webpack.prod.config.js externals未包含的库自行增加，同时在src/html/app.html添加CDN地址，如果未使用某个库则从app.html移除
 7. 至此结构已与模板保持一致，后续按增加新语言支持方法操作

---

## 一些技巧
 1. 定义在src/css/var.scss的sass变量可以在组件样式直接使用，Webpack打包已注入
 2. 可以运行多个不同端devServer实例，然后用不同的浏览器窗口进行加载，实现同时检查不同端适配效果目的
 3. 由于项目依赖的打包工具版本相对一致，可以把打包依赖安装在项目父级，cross-env webpack webpack-dev-server安装到全局，babel-loader缓存目录设置成../node_modules/.cache/babel-loader，这样每个项目源码会相对干净，方便转移和版本管理
 4. 考虑中东阿语反方向版本适配，应该多用inline-block和flex布局，同时margin和padding左右值保持一致，类似箭头图标换向可以用transform:rotateY(180deg)实现；对于旧的项目增加阿语支持，不方便增加标签实现排版的应该多写覆盖样式来实现；对于原来设置的头尾背景图标，可以用伪元素和flex实现改造
 5. 对于__lang/_local/_app/_host等全局变量，使用时建议先用本地临时变量接住再使用，这不仅代码阅读性更好，同是Webpack打包也会压缩变量

---

## 注意事项
 1. src/local.js最好不要有外部依赖，src/local/*也应该减少外部依赖，保证本地化文件相对独立和轻量。应该避免使用src/utils/index.js工具类方法，因为这个类被大量应用在app入口相关模块，如果在本地化文件也使用，那么各个本地化文件将包含全部有使用到的工具类方法，这是Webpack多入口打包策略问题。如果一定要使用工具类方法，有两种方法可以优化打包体积：
    * 通过splitChunks.cacheGroups把utils作为通用共享代码抽离出来（因为工具类不大也不小，增加文件请求或内联到页面都不优雅，此方法不推荐）；
    * 把utils复制一份放到local/utils.js仅供相关本地化文件引用（复制的工具类可以不用精简，Webpack Tree Shaking可以实现只打包使用到的方法）；
 2. 类似apis或urls是跟APP有关跟语言无关，不适合放到local/下，应该在src/config/urls.js通过_app进行判断（此类配置应该要求服务器各端保持一致）
 3. 如果某种语言无覆盖样式，并且已经注释src/local/xx/index.js样式导入，但是脚本还引入了带样式的组件，依然会有样式文件被打包出来，而且是重复打包的，像协议这种放到本地语言目录的组件，不变的样式应该抽到src/css/main.scss

---

## 多页面打包配置说明
 1. 多语言打包主要针对印度新版本，建议APP WebView都支持网页锚点路由，修复因页面地址与首次加载不一致而无法退出页面问题，减少多页面打包项目
 2. 多页面打包参考app入口点，本地化内容全部在local/xx/index.js导入并挂载到全局变量（为了简化打包配置，减少生成的文件数，本地化文件不根据页面细分）