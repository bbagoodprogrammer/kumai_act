# 本地化多语言网页开发模板

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
 * ReplaceStringPlugin.js插件主要用于对一些明文的配置进行编码，使得打包后的代码不易看出其它端的痕迹，目前主要对local.js的域名配置进行加密，如果加密内容较少可以直接手动转换而不使用此插件
 * utils/index.js提供了像replaceLang replaceLangBR toThousands getPlatform getAppVer callApp等常用方法，其中replaceLang replaceLangBR已全局注入，其它的自行按需添加；
 * 不同语言或APP差异化处理可依赖几个主要变量和方法：
   1. _local=zh 语言标识（与src/local/xx目录一致，也是package.json LANG列表的值）
   2. _app=hsing 可作为APP区分，如处理不同APP接口差异
   3. __area 地区配置常量，if(_area=='tw')可以写成if(_area==__area.TW)
   4. _area=tw 地区标识，建议替代_app处理代码差异（因为此值相对_app更简短，而且服务器合并代码处理差异也是用地区标识）
   5. _test 测试环境，可用于接口URL构建
   6. _host=17sing.tw 主域名（只保留域名最后两部分，可用于构建接口URL）
   7. 工具类方法getPlatform()操作系统
   8. 工具类方法getAppVer()应用版本
 * 本地化目录文件说明：
   1. img/为差异化图片文件存放目录，将在images.js导入，主要用于img标签绑定（如果是写在样式中不需要在images.js导入，直接在style.scss引用即可打包出去）
   2. lang.js文本语言包，里面的title用于页面标题
   3. images.js里面通过require载入差异化图片资源用于img标签引用
   4. style.scss用于编写差异化覆盖样式，顶级选择器这样开始：html.zh {}，不想写深层选择器路径可使用important关键字（如果同步到某个端UI大改，建议减少默认样式，把更多的样式实现放到对应的语言下面）
 * 多语言打包网站执行后，将在window全局增加十一个变量（有更多的配置可以参照以下对象添加方法增加，比如增加_apis，同时避免在别处修改此类全局变量）：
   1. __lang 当前语言完整编码，类似zh-CN，能匹配上时此值是未格式化的原始值，否则为LANG第一个值（当前打包策略还提供了默认语言支持，URL不传或传错语言编码都将自动采用默认语言）
   2. _local 当前语言标识：zh/vi/id/ar/en/hi
   3. _app 当前APP标识：hsing/singnow/wekara/gosing/singstar
   4. __area 地区配置常量：__area.TW|VI|VN|ID|AR|IN
   5. _area 地区标识：tw/vi/vn/id/ar/in
   6. _test 测试环境（本地devServer开发和带t或test开头域名环境，以及网页地址包含test=1参数，参数模式主要解决官网服务器无测试环境切换请求接口问题）
   7. _localTest 本地开发测试环境，主要解决devServer接口请求代理时，接口地址需要使用相对路径
   8. _platform 当前系统平台：pc|ios|android 可用于处理PC和APP适配，以及iOS需要增加一行提示“活动与苹果公司无关”等场景
   9. _host 当前主域名（测试时localhost或127.0.0.1域名是个特例，要真实模拟生产环境需自行配置host）
   10. _lang 文本语言包对象，已在main.js进行全局混合注入，可以在组件内或模板上直接使用，对于不在组件上下文访问的直接引用_lang（组件里尽量用this.lang访问，这样在_lang被第三方占用可减少_lang的替换数量）
   11. _images 差异化图片资源，已全局注入，可在各组件直接使用（style.scss使用的图片不需要配置）
 * 如果HTML模板也需要做差异化处理，利用html-webpack-plugin插件templateParameters选项把_app和_local等常量公开给ejs模板使用（短信验证码和塔罗牌项目是此种方式）
 * _短期内合并所有端的发布代码为一份的可能性较小，根据域名自动区分APP并设置默认语言的打包配置先注释，主要编辑local.js的hosts即可，合并一份代码更新发布风险高同时影响缓存策略，随着支持的国家越来越多，每次打包编译的文件和更新的资源相对多（觅友国际版可以根据域名设置默认语言，多端一份打包代码）_

---

## 增加新语言支持方法
 1. 参考local/子目录，拷贝一份，对相关文件进行修改
 2. package.json参考已有的配置增加新的APP及相关语言打包配置，配置值用小写，支持多语言的端开发时把要测试的语言先放在第一位，或测试时主动传入对应的lang参数
    ```javascript
    "devHsing": "cross-env   NODE_ENV=development APP=hsing AREA=tw LANG=zh,zh-cn",
    "buildHsing": "cross-env NODE_ENV=production  APP=hsing AREA=tw LANG=zh,zh-cn"   
    ```
 3. config/urls.js请求接口增加动态lang参数（或利用axios.interceptors.request拦截请求统一处理）
    ```javascript
    {
       init: '/index.php?lang=' + __lang,
    },
    ```
 4. webpack.dev.config.js devServer代理根据开发需要临时修改（暂不实现根据APP名或地区AREA自动配置代理域名，因为有跨APP调试场景）
 5. 多页面及增加更多的全局变量支持方法参考前面的打包设计说明
 6. 执行npm run devXxx（不建议npm run dev，因为这是全语言包编译模式会比较慢）

---

## 现有Vue项目改造流程
 1. 复制模板项目以下相关文件替换旧的项目，根据需要修改或增删文件
    ```javascript
      build/
      src/html/ // 最新的模板文件是ejs格式，注意文件对比及清理旧的html文件
      src/local/
      src/local.js
      package.json // 复制模板项目scripts内容即可
    ```
 2. 复制模板项目src/utils/index.js replaceLang等方法合并到现有的文件
 3. 在src/main.js文件添加全局混合
    ```javascript
      import { getUrlString, replaceLang, replaceLangBR, profile } from './utils';
      Vue.mixin({
         computed: {
               app: () => _app,
               local: () => _local,
               lang: () => _lang,
               images: () => _images,
               isShare: () => !getUrlString('token'),
               rtl() {
                   return ['ar', 'ur'].indexOf(_local) != -1;
               },
         },
         methods: {
               replaceLang,
               replaceLangBR,
               profile,
         },
      })
    ```
 4. 删除旧的src/config/lang.js文件，移除各组件旧的lang导入，用this.lang或_lang代替（可以全文搜索“ lang.”替换）
 5. 清空src/html/index.html的title标签内容
 6. 如果使用了webpack.prod.config.js externals未包含的库自行增加，同时在src/html/app.html添加CDN地址，如果未使用某个库则从app.html移除
 7. 至此结构已与模板保持一致，后续按增加新语言支持方法操作

---

## 相同语言不同数据语言包处理方法
 1. 背景：早期不同地区项目语言不会窜端，所以有一些语言文案包含了数值没有提取出来，现在印度和中东都需要英语，但是这两个地区的数值是不一样的
 2. 最标准做法是把数值抽取出来，让服务器返回或写在src/config/data.js，内部通过APP==hsing方式处理不同地区数值差异，使用的地方调用replaceLang替换占位符，新项目建议采用此方案
 3. 旧的项目由于其它语言都翻译过了，原翻译带数值没有抽取出来，如果采用方法2改造，其它语言都要重新翻译，折中的方案是只处理窜端的语言，比如英语，处理方式有两种：
    * local/en/lang.js通过APP==hsing处理有数值差异的语言包条目，最后用扩展运算符把差异语言包合并到导出的语言包对象上，代码示例：
      ```javascript
      let obj = {};
      if (APP == 'singstar') {
          obj= { level: '' };
      } else if (APP == 'gosing') {
          obj= { level: '' };
      }
      export default {
          ...obj,
          // level: '',
      }
      ```
    * 在local/en/下面提供两个语言包文件langSingstar.js和langGosing.js，index.js根据APP打包对应的语言包，适合语言差异大或语言包用工具生成（帮助中心项目），代码示例：
      ```javascript
      import langSingstar from './langSingstar';
      import langGosing from './langGosing';
      window._lang = APP=='singstar' ? langSingstar : langGosing;
      ```
---

## 一些技巧
 1. 定义在src/css/var.scss的sass变量可以在组件样式直接使用，Webpack打包已注入
 2. 可以运行多个不同端devServer实例，然后用不同的浏览器窗口进行加载，实现同时检查不同端适配效果目的
 3. 由于项目依赖的打包工具版本相对一致，可以把打包依赖安装在项目父级，cross-env webpack webpack-dev-server安装到全局，babel-loader缓存目录设置成../node_modules/.cache/babel-loader或os.tmpdir()，这样每个项目源码会相对干净，方便转移和版本管理
 4. 考虑中东阿语反方向版本适配，应该多用inline-block和flex布局，同时margin和padding左右值保持一致，类似箭头图标换向可以用transform:rotateY(180deg)实现；对于旧的项目增加阿语支持，不方便增加标签实现排版的应该多写覆盖样式来实现；对于原来设置的头尾背景图标，可以用伪元素和flex实现改造
 5. 全局混合包含app和local计算属性，这些变量方便Vue模板做差异化处理，比如处理不同APP的规则说明条目数量不一致问题等
 6. 全局混合包含rtl计算属性，此变量可以简单快速处理反向语言，使用方法类似这样:class={rtl}，再配合样式实现差异化处理，这种比编写语言差异覆盖样式更高效，不过差异样式也会被打包到其它语言中，对于差异小的，少量的代码冗余是完全可以接受的
 7. 对于__lang/_local/_app/_area/_host等全局变量，使用时建议先用本地临时变量接住再使用，这不仅代码阅读性更好，同时Webpack打包也会压缩变量
 8. webpack打包配置设置了四个全局代码替换常量：LANGS/APP/AREA/PROD，建议只在src/local.js使用，合并代码时此文件会根据域名匹配修改这些常量。PROD主要考虑开发和打包使用同一个模板时做差异化逻辑，比如打包时输出一段PHP代码，短信验证码项目有类似场景。打包模式提供给模板使用的变量cdn暂未进行全局注入，这种场景相对少，有需要自己通过APP判断区分。另外网页如果是php文件，可以读取服务器的env配置设置window._env={app,area,lang,test}，此设置将优先打包和域名匹配，静态页面也可以考虑用脚本标签引入env.php，或统一从一个地址引入site.js
 9. 此模板src/apis/index.js利用axios.interceptors.request拦截请求自动附加了lang以及觅友测试环境忽略签名signture等参数，同时替换{rid}、{uid}、{token}三个占位符，请求URL根据需要使用
 10. 请求接口增加临时参数（非POST参数）withCredentials=1启用withCredentials，适用登录需要支持Cookie场景，此时服务器Access-Control-Allow-Origin需要设置指定域名而不能为*
 11. 如果语言种类多于皮肤主题数量，而且主题差异化资源特别多，比如欢歌塔罗牌，台湾、越南、印尼同一套主题，中东、印度各一套主题，此时差异化图片资源可以通过增加以下目录结构来组织，同时SCSS全局也注入了$app和$area变量供差异化样式编写（比如印度和中东英语主题资源不一样）：
    * /local/img/skins/skin1
    * /local/img/skins/skin2
 12. 如果项目请求接口包含多个域名，甚至有些场景服务器需要前端传完整请求URL，同时又要实现本地开发能成功代理主要域名接口请求，可以参考以下代码实现自动切换：
     ```javascript
       let mainHost = _host;
       mainHost = '17sing.tw'; //本地测试启用
       const protocol = location.protocol;
       let origin = `${protocol}//act.${mainHost}`;
       if (_test) {
          origin = `${protocol}//t.act.${mainHost}`;
       }
       const httpApiRoot = _localTest ? '' : origin;
       const api = httpApiRoot + '/index.php';
     ```

---

## 注意事项
 1. src/local.js最好不要有外部依赖，src/local/*也应该减少外部依赖，保证本地化文件相对独立和轻量。应该避免使用src/utils/index.js工具类方法，因为这个类被大量应用在app入口相关模块，如果在本地化文件也使用，那么各个本地化文件将包含全部有使用到的工具类方法，这是Webpack多入口打包策略问题。如果一定要使用工具类方法，有两种方法可以优化打包体积：
    * 通过splitChunks.cacheGroups把utils作为通用共享代码抽离出来（因为工具类不大也不小，增加文件请求或内联到页面都不优雅，此方法不推荐）；
    * 把utils复制一份放到local/utils.js仅供相关本地化文件引用（复制的工具类可以不用精简，Webpack Tree Shaking可以实现只打包使用到的方法）；
 2. 类似apis或urls是跟APP有关跟语言无关，不适合放到local/下，应该在src/config/urls.js通过_app进行判断（此类配置应该要求服务器各端保持一致）
 3. 如果某种语言无覆盖样式，并且已经注释src/local/xx/index.js样式导入，但是脚本还引入了带样式的组件，依然会有样式文件被打包出来，而且是重复打包的，像协议这种放到本地语言目录的组件，不变的样式应该抽到src/css/main.scss
 4. 考虑部分地区代码发布不能出现中文，特别是印度地区，LocalFilesHashPlugin.js插件增加中文检查提示，请留意打包输出信息
 5. 因为语言文件是单独入口打包的，为了生成简洁的语言包文件，应该尽量减少依赖；如果整个组件抽成语言包，而且组件内还使用了async await，需要在local/xx/index.js导入regenerator-runtime
 6. 尽量少编写涉及打包环境变量的代码逻辑，比如代码包含APP或AREA，这种代码虽然能利用Webpack Tree Shaking，但不利于代码合并，比如环境变量根据域名确定，目前活动分享模板及openApp是此种模式，其中apis/针对觅友的区分可忽略，因为合并代码也不会考虑把欢歌跟觅友一起合并

---

## 多页面打包配置说明
 1. 多语言打包主要针对印度新版本，建议APP WebView都支持网页锚点路由，修复因页面地址与首次加载不一致而无法退出页面问题，减少多页面打包项目
 2. 多页面打包参考app入口点，本地化内容全部在local/xx/index.js导入并挂载到全局变量（为了简化打包配置，减少生成的文件数，本地化文件不根据页面细分）

---

## 觅友项目说明
 1. 本模板支持觅友项目，同时支持APP请求签名逻辑，默认打包模式与欢歌一致，即分端打包，禁用src/local.js的hosts配置；
 2. 因为觅友国际版是同一个APP，所以打包的APP台湾、越南都是miyou，此值不能修改，请求拦截有使用此标识；
 3. 地区标识AREA越南端是vn，与欢歌的vi不一样，注意区分，此设计与觅友服务器ENV一致；
 4. 觅友如果采用合并代码打包，需要启用local.js的hosts配置，同时打包只用buildMiyou（越南端也是用此命令，而不是buildMiyouvn）；
 5. 为了安全，生产环境不会根据特定的参数（如debug）自动附加完整的忽略签名参数，需要在URL增加signture=innerserver参数，框架会附加到接口上
 6. src/apis/index.js的APP=='miyou'判断利用Webpack Tree Shaking精简打包代码体积。

## 输出分享META打包说明
 1. 因为项目打包输出的是静态页面，所以分享META信息只能依据APP端的默认语言打包输出；
 2. 觅友活动项目拆成两个APP调整默认语言顺序完成不同语言分享信息打包输出；
 3. 印度打包META语言是默认英文EN，如果需要根据语言动态展示分享信息，让运营设置分享地址为：[http://activity.singstarapp.com/share/index.php?aid=4](http://activity.singstarapp.com/share/index.php?aid=4)
 4. 像觅友、印度用户同时可见两种语言以上，如果用户当前语言跟默认语言不一致，用户会看到标题闪动，此种场景建议网页不设置分享信息，前置提供一个动态服务器文件处理跳转，目前印度是此方式，觅友活动一个地区可以只打包一种语言，比如台湾LANG=zh,vi改为LANG=zh
 5. 为了简化html模板代码，facebook的og:url, og:type, fb:app_id缺失警告忽略
 6. 部分第三方平台可能会识别body标签下第一张大图，如有必须自行测试添加
 7. 由于项目代码采用ES6编写，而当前依赖的node版本小于9只支持CommonJS规范，src/local/xx/lang.js无法直接在打包配置中处理合并，所以通过ejs模板语法实现逻辑输出
 8. 测试发现部分国家地区的社交平台对分享图片地址的抓取不支持相对路径（Facebook支持），所以app_share.ejs顶部提供folder配置变量实现分享图片全路径输出
 9. 分享打包涉及文件如下：
    * html/app_share.ejs  新语言及分享图片路径修改
    * build/webpack.prod.config.js  HtmlPlugin插件模板文件修改
    * local/xx/lang.js  增加share_title、share_desc语言包
    * local/xx/img/share.png  增加 [600*600分享图片](https://developers.facebook.com/docs/sharing/best-practices) （注意：图片太小会受url-loader统一处理变成base64）