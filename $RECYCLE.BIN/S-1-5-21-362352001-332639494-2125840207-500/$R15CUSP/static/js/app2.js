webpackJsonp([4],{1:function(t,_,v){v("briU"),t.exports=v("mBGK")},RpLG:function(t,_,v){"use strict";_.a=function(t,_){var v=t.getFullYear(),e=t.getMonth()+1<10?"0"+(t.getMonth()+1):t.getMonth()+1,s=t.getDate()<10?"0"+t.getDate():t.getDate(),i=t.getHours(),n=t.getMinutes()<10?"0"+t.getMinutes():t.getMinutes(),p=t.getSeconds()<10?"0"+t.getSeconds():t.getSeconds();return"~"==_?i+"h  "+s+"/"+e:"pai"==_?(n<10&&(n="0"+n),i+":"+n+"   "+s+"/"+e):1==_?e+"."+s:2==_?e+"."+s+" "+i+"h":3==_?e+"月"+s+"日"+i+":"+n+":"+p:4==_?""+v+e+s:void 0}},USEU:function(t,_){},dyzQ:function(t,_,v){t.exports=v.p+"static/img/giftImg.png?48cc319"},mBGK:function(t,_,v){"use strict";Object.defineProperty(_,"__esModule",{value:!0});var e=v("+RKF"),s=v("RpLG"),i={data:function(){return{type:1,stime:"",etime:""}},computed:{timer:function(){return Object(s.a)(new Date(1e3*this.stime),3)+"-"+Object(s.a)(new Date(1e3*this.etime),3)}},created:function(){document.title="家族名星賽",this.stime=sessionStorage.getItem("stime"),this.etime=sessionStorage.getItem("etime")},methods:{tabClick:function(t){this.type=t}}},n={render:function(){var t=this,_=t.$createElement,e=t._self._c||_;return e("div",{staticClass:"rule"},[e("div",{staticClass:"tabs"},[e("span",{class:{act:1==t.type},on:{click:function(_){return t.tabClick(1)}}},[t._v("活動獎勵")]),t._v(" "),e("span",{class:{act:2==t.type},on:{click:function(_){return t.tabClick(2)}}},[t._v("活動規則")])]),t._v(" "),e("div",{staticClass:"actTime"},[t._v("活動時間："+t._s(t.timer))]),t._v(" "),1==t.type?e("div",{staticClass:"ruleItem"},[e("h3",[t._v("名星誕生榜獎勵")]),t._v(" "),e("h6",[t._v("第1名家族")]),t._v(" "),e("p",[t._v("1.新家族禮物冠名權30天")]),t._v(" "),e("p",[t._v("2.所有家族成員獎勵名星家族徽章（1個月）")]),t._v(" "),e("p",[t._v("3.家族等級積分10000+K房主題名星家族30天")]),t._v(" "),e("p",[t._v("4.所有家族成員獎勵500金豆")]),t._v(" "),e("p",[t._v("5.名星誕生榜家族星光值前10名：")]),t._v(" "),e("p",[t._v("第1名：仲夏夜之夢*1（3520金幣/個）+1000金幣+2000金豆+戰神GTR座駕30天+冰雪之心頭飾30天")]),t._v(" "),e("p",[t._v("第2名：星河遊輪*1（2288金幣/個）+800金幣+1000金豆+戰神GTR座駕30天+冰雪之心頭飾30天")]),t._v(" "),e("p",[t._v("第3名：天使降臨*1（1380金幣/個）+500金幣+500金豆+戰神GTR座駕30天+冰雪之心頭飾30天")]),t._v(" "),e("p",[t._v("第4-10名：煙火燦爛 *1（588金幣/個）+200金幣+500金豆+戰神GTR座駕30天+冰雪之心頭飾30天")]),t._v(" "),e("h6",[t._v("第2名家族")]),t._v(" "),e("p",[t._v("1.所有家族成員獎勵名星家族徽章（1個月）")]),t._v(" "),e("p",[t._v("2.家族等級積分8000+K房主題名星家族30天")]),t._v(" "),e("p",[t._v("3.所有家族成員獎勵500金豆")]),t._v(" "),e("p",[t._v("4.名星誕生榜家族星光值前10名：")]),t._v(" "),e("p",[t._v("第1名：星河遊輪*1（2288金幣/個）+800金幣+1000金豆+戰神GTR座駕30天+冰雪之心頭飾30天")]),t._v(" "),e("p",[t._v("第2名：天使降臨*1（1380金幣/個）+500金幣+500金豆+戰神GTR座駕30天+冰雪之心頭飾30天")]),t._v(" "),e("p",[t._v("第3名：愛心泡泡雨*1（820金幣/個）+200金幣+500金豆+戰神GTR座駕30天+冰雪之心頭飾30天")]),t._v(" "),e("p",[t._v("第4-10名：爲你撐腰*1（299金幣/個）+200金幣+500金豆+戰神GTR座駕30天+冰雪之心頭飾30天")]),t._v(" "),e("h6",[t._v("第3名家族")]),t._v(" "),e("p",[t._v("1.所有家族成員獎勵名星家族徽章（1個月） ")]),t._v(" "),e("p",[t._v("2.家族等級積分5000+K房主題名星家族30天")]),t._v(" "),e("p",[t._v("3所有家族成員獎勵300金豆")]),t._v(" "),e("p",[t._v("4.名星誕生榜家族星光值前10名：")]),t._v(" "),e("p",[t._v("第1名：天使降臨*1（1380金幣/個）+800金幣+1000金豆+戰神GTR座駕30天+冰雪之心頭飾30天")]),t._v(" "),e("p",[t._v("第2名：愛心泡泡雨*1（820金幣/個）+500金幣+500金豆+戰神GTR座駕30天+冰雪之心頭飾30天")]),t._v(" "),e("p",[t._v("第3名：煙火燦爛 *1（588金幣/個）+200金幣+500金豆+戰神GTR座駕30天+冰雪之心頭飾30天")]),t._v(" "),e("p",[t._v("第4-10名：爲你撐腰*1（299金幣/個）+200金幣+500金豆+戰神GTR座駕30天+冰雪之心頭飾30天")]),t._v(" "),e("h6",[t._v("第4-10名家族")]),t._v(" "),e("p",[t._v("1.所有家族成員獎勵名星家族徽章（1個月）")]),t._v(" "),e("p",[t._v("2.家族等級積分2000+K房主題名星家族30天")]),t._v(" "),e("p",[t._v("3.所有家族成員獎勵200金豆")]),t._v(" "),e("p",[t._v("4.名星誕生榜家族星光值前10名：")]),t._v(" "),e("p",[t._v("第1名：愛心泡泡雨*1（820金幣/個）+800金幣+500金豆+戰神GTR座駕30天+冰雪之心頭飾30天")]),t._v(" "),e("p",[t._v("第2名：煙火燦爛 *1（588金幣/個）+500金幣+500金豆+戰神GTR座駕30天+冰雪之心頭飾30天")]),t._v(" "),e("p",[t._v("第3名：爲你撐腰*1（299金幣/個）+200金幣+500金豆+戰神GTR座駕30天+冰雪之心頭飾30天")]),t._v(" "),e("p",[t._v("第4-10名：家族之星*1（233金幣/個）+100金幣+500金豆")]),t._v(" "),e("h3",[t._v("家族守護榜獎勵")]),t._v(" "),e("p",[t._v("第1名：單次5%儲值返利券（1天）+戰神GTR座駕（30天）+守護達人徽章（30天）+10000金豆")]),t._v(" "),e("p",[t._v("第2名：單次4%儲值返利券（1天）+戰神GTR座駕（30天）+守護達人徽章（30天）+5000金豆")]),t._v(" "),e("p",[t._v("第3名：單次3%儲值返利券（1天）+戰神GTR座駕（30天）+守護達人徽章（30天）+3000金豆")]),t._v(" "),e("p",[t._v("第4-10名：守護達人徽章（30天）+2000金豆")]),t._v(" "),e("h3",[t._v("家族禮包獎勵")]),t._v(" "),e("img",{staticClass:"giftBox",attrs:{src:v("dyzQ"),alt:""}}),t._v(" "),e("p",{staticClass:"giftTIps"},[t._v("所有背包獎勵由系統隨機發放，表格僅展示部分稀有獎勵")]),t._v(" "),e("h3",{staticClass:"other"},[t._v("備註：")]),t._v(" "),e("p",[t._v("1、名星誕生榜晉級家族成員不足10位則多餘獎勵視為無效")]),t._v(" "),e("p",[t._v("2、家族積分已達到滿值則該獎項視為無效")]),t._v(" "),e("p",[t._v("3、K房人數上限提升自獎勵發放之日起計算")]),t._v(" "),e("p",[t._v("4、活動結束後7個工作日內工作人員將聯繫家族長統計獎勵資訊，逾期未提交視為自動放棄")]),t._v(" "),e("p",[t._v("5、家族成員資訊統計於活動截止時為準，獎勵於活動結束後7個工作日內發放")]),t._v(" "),e("p",[t._v("6、活動所有背包獎勵有效期為7天，請及時使用！")])]):e("div",{staticClass:"wardItem"},[e("h3",[t._v("活動規則")]),t._v(" "),e("p",[t._v("家族名星賽分爲三個賽程：星光閃耀—眾星爭輝—名星誕生，活動僅限家族用戶報名參與")]),t._v(" "),e("h3",[t._v("星光閃耀")]),t._v(" "),t._m(0),t._v(" "),e("p",[t._v("2、家族用戶點擊報名即可參與活動，星光值=作品/K房收禮金幣魅力值+名星任務值，星光總榜前500名可代表家族晉級")]),t._v(" "),e("p",[t._v("3、星光日榜依據當日星光值排名，前100名可參與抽獎，每天抽送20個星光閃耀背包禮物（68金幣/個），日榜中獎概率=當日星光值/前100名總星光值")]),t._v(" "),e("p",[t._v("4、星光閃耀期間退出家族則榜單數據清除，不參與抽獎，重新加入家族重新累計星光值")]),t._v(" "),e("h3",[t._v("眾星爭輝")]),t._v(" "),t._m(1),t._v(" "),e("h3",[t._v("名星誕生")]),t._v(" "),t._m(2),t._v(" "),e("h3",{staticClass:"other"},[t._v("備註")]),t._v(" "),t._m(3)]),t._v(" "),e("p",{staticClass:"lastTips"},[t._v("活動最終解釋權歸主辦方所有")])])},staticRenderFns:[function(){var t=this.$createElement,_=this._self._c||t;return _("p",[this._v("1、比賽時間："),_("em",{staticClass:"tm"},[this._v("3月29日12:00-4月1日22:00")])])},function(){var t=this.$createElement,_=this._self._c||t;return _("p",[this._v("\n      1、比賽時間："),_("em",{staticClass:"tm"},[this._v("4月1日22:05-4月5日18:00")]),_("br"),this._v("\n      2、同一家族晉級者組成團隊，代表家族參與PK，PK雙方（隨機匹配）依據總星光值判定勝負，勝方晉級並獲得家族大禮包獎勵，星光值=作品/K房收禮金幣魅力值+名星任務值"),_("br"),this._v("\n      3、賽段結束時分數相同PK雙方將同時淘汰，PK失敗但總星光值大於等於30萬也可晉級"),_("br"),this._v("\n      4、晉級用戶退出家族總星光值不扣減，再次加入家族時保留退出前數據可繼續累計，加入其他家族則視為未晉級，無法繼續參與活動"),_("br"),this._v("\n      5、每個家族大禮包含獎勵30份，每人最多獲得1份，賽段結束時向晉級家族自動派發\n    ")])},function(){var t=this.$createElement,_=this._self._c||t;return _("p",[this._v("1、比賽時間："),_("em",{staticClass:"tm"},[this._v("4月5日18:05-4月7日22:00")]),this._v(" "),_("br"),this._v("\n      2、星光值=作品/K房收禮金幣魅力值+名星任務值，活動最後一天20-22點可獲得10%魅力值加成"),_("br"),this._v("\n      3、晉級家族依據總星光值排名，前十名家族和家族代表成為家族名星，獲得豐厚獎勵"),_("br"),this._v("\n      4、總星光值達到指定數值則家族升級，升級時系統自動發放大禮包，Ⅰ、Ⅱ、Ⅲ級對應星光值10萬、30萬、100萬，禮包獎勵份數分別為30、50、80份（所有禮包獎勵自動發放，家族中星光值越高的用戶獲得稀有獎勵的概率越大）"),_("br"),this._v("\n      5、晉級用戶退出家族總星光值不扣減，再次加入家族時保留退出前數據可繼續累計，加入其他家族則視為未晉級，無法繼續參與活動\n    ")])},function(){var t=this.$createElement,_=this._self._c||t;return _("p",[this._v("\n      1、家族守護榜依據活動期間為報名用戶贈送金幣禮物魅力值排名，前10名可獲得豐厚獎勵，榜單分數相同則先到達者排名靠前"),_("br"),this._v("\n      2、家族大禮包獎勵發放詳情展示在開獎明細中，可點擊查看"),_("br"),this._v("\n      3、星光閃耀賽段日榜獎勵每日24點發放，最後一天於22點發放"),_("br"),this._v("\n      4、報名活動后，星光閃耀和眾星爭輝賽段中會自動開始計算作品收禮星光值，無需上傳作品；"),_("br"),this._v("\n      5、名星誕生參賽作品需為活動期間發佈的任意公開作品(清唱5分鐘除外)，可上傳多首作品參賽，報名後作品收禮才會被計算"),_("br"),this._v("\n      6、所有禮包獎勵自動發放，家族中星光值越高的用戶獲得稀有獎勵的概率越大，每人每次最多可獲得1份獎勵，當家族人數少於禮包中的獎勵數時，多餘的獎勵視為無效"),_("br"),this._v("\n      7、活動期間如有任何刷分行為，將取消參賽資格和獎勵，嚴重者封號處理\n    ")])}]};var p=v("C7Lr")(i,n,!1,function(t){v("USEU")},null,null).exports;e.a.config.productionTip=!1,new e.a({el:"#app",components:{main2:p},template:"<main2/>"})}},[1]);