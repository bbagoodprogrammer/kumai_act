webpackJsonp([1],{"0YNe":function(t,s){},AQYe:function(t,s,e){"use strict";var i=e("7+uW"),n=e("NYxO");i.a.use(n.a);var a=new n.a.Store({state:{isLoading:0,isShare:!1,historyList:{},wardsList:{}},mutations:{isLoaging:function(t,s){s?++t.isLoading:--t.isLoading},changShareState:function(t,s){t.isShare=s},changHistoryList:function(t,s){t.historyList=s},changWardsList:function(t,s){t.wardsList=s}},actions:{setloading:function(t,s){(0,t.commit)("isLoaging",s)}},getters:{}});s.a=a},FKo1:function(t,s){},KJfm:function(t,s){},MruX:function(t,s,e){t.exports=e.p+"static/img/9c46fcb.png"},NHnr:function(t,s,e){"use strict";Object.defineProperty(s,"__esModule",{value:!0});var i=e("7+uW"),n=e("j60g"),a=e("yKQW"),o=e("NxGh"),c={render:function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("div",{staticClass:"toastBox"},[e("div",{staticClass:"promptBox"},[e("p",{domProps:{innerHTML:t._s(t.msg)}}),t._v(" "),e("div",{staticClass:"ok"},[1===t.colued?e("a",{staticClass:"noBuy",attrs:{href:"javascript:;"},on:{click:function(s){return t.close()}}},[t._v("取消購買")]):t._e(),t._v(" "),1===t.colued?e("a",{staticClass:"nowBuy",attrs:{href:"javascript:;"},on:{click:function(s){return t.buyWard()}}},[t._v("確定購買")]):e("a",{attrs:{href:"javascript:;"},on:{click:function(s){return t.close()}}},[t._v("確定")])]),t._v(" "),e("a",{staticClass:"close",attrs:{href:"javascript:;"},on:{click:function(s){return t.close()}}})])])},staticRenderFns:[]};var r=e("VU/8")({props:["msg","colued"],data:function(){return{}},methods:{close:function(){this.$emit("closeToast")},buyWard:function(){1===this.colued?this.$emit("buyWard"):this.$emit("closeToast")}}},c,!1,function(t){e("KJfm")},null,null).exports,u=navigator.userAgent,d=null!=u.match(/Chrome/i)&&null==u.match(/Version\/\d+\.\d+(\.\d+)?\sChrome\//i),l=!!u.match(/(Android);?[\s\/]+([\d.]+)?/),h=!!u.match(/iPhone|iPad|iPd/i),f=h&&u.match(/Safari/),p=u.match(/OS\s*(\d+)/);p=p&&parseFloat(p[1],10)||0;var g=[];function v(){for(var t=0;t<g.length;t++)clearTimeout(g[t])}function m(t,s,e,i){if(t=t||"hsing://",s=s||"http://17sing.tw",e=e||"http://17sing.tw/goto_appstore",i=i||"encore://",d&&l&&setTimeout(function(){window.location.href=t},50),f&&p>=9)setTimeout(function(){var t=document.createElement("a");t.setAttribute("href",i),t.style.display="none",document.body.appendChild(t);var s=document.createEvent("HTMLEvents");s.initEvent("click",!1,!1),t.dispatchEvent(s)},0);else{var n=document.getElementById("_downloadAppIframe_");n||((n=document.createElement("iframe")).id="_downloadAppIframe_",n.style.width=0,n.style.height=0,n.style.display="none",document.body.appendChild(n)),n.src=h?i:t}var a=Date.now();setTimeout(function(){var t=setTimeout(function(){Date.now()-a<1700&&(window.location.href=h?e:s)},1500);g.push(t)},100)}window.addEventListener("blur",v,!1),window.addEventListener("pagehide",v,!1),document.addEventListener("visibilitychange",function(){document.hidden&&v()},!1);var _={components:{Loading:o.a,MsgToast:r},data:function(){return{isShare:!1,activite:1,showT:!1,tastMsg:"",balance:0,buyWardId:0,gifts:{},colued:0,imgArr:["",e("Ofxr"),e("VqUz"),e("gEmg"),e("pDPW"),e("kKtH"),e("zUGv"),e("MruX")]}},created:function(){this.judgeShare(),this.getDefaultData()},mounted:function(){},methods:{judgeShare:function(){var t=Object(n.a)("token");this.isShare=!t,this.$store.commit("changShareState",this.isShare)},getDefaultData:function(t){var s=this;a.a.getDefault().then(function(t){if(0===t.data.response_status.code){var e=t.data.response_data,i=e.step,n=e.gifts,a=e.balance;for(var o in n)1==n[o].type?n[o].type="作品":2==n[o].type&&(n[o].type="K房");s.activite=i,s.gifts=n,s.balance=a,s.$store.commit("changHistoryList",n)}})},buyWards:function(t){this.isShare?m():0===this.activite?(this.tastMsg="活動未開始",this.colued=0,this.showT=!0):2===this.activite?(this.tastMsg="活動已結束",this.colued=0,this.showT=!0):this.balance<this.gifts[t].price?(this.tastMsg="抱歉，您的金幣餘額不足，無法購買</br>快去儲值吧！",this.colued=0,this.showT=!0):this.balance>=this.gifts[t].price&&(this.tastMsg='您即將購買"'+this.gifts[t].name+'"'+this.gifts[t].type+"背包禮物,</br>購買後不可取消唷~ ",this.colued=1,this.showT=!0,this.buyWardId=t)},buyed:function(){var t=this;this.showT=!1,a.a.buy(this.buyWardId).then(function(s){0===s.data.response_status.code?(t.balance-=t.gifts[t.buyWardId].price,t.tastMsg="購買成功,請在我-背包中查看哦~",t.colued=0,t.showT=!0):20005===s.data.response_status.code&&(t.tastMsg="抱歉，您的金幣餘額不足，無法購買</br>快去儲值吧！",t.colued=0,t.showT=!0)})},share:function(){m()},goHistory:function(){if(this.isShare)m();else{var t=Object(n.a)("token");location.href="./index3.html?token="+t}},refrsh:function(){this.rotatePx=540*++this.rotatec,this.getDefaultData()},closeToast:function(){this.showT=!1}}},y={render:function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("div",{staticClass:"box"},[e("div",{staticClass:"header"},[e("a",{staticClass:"history",on:{click:function(s){return s.preventDefault(),t.goHistory()}}},[e("em",[t._v("購買明細")])]),t._v(" "),t._m(0),t._v(" "),t.isShare?e("a",{staticClass:"shareBar",attrs:{href:""},on:{click:function(s){return s.preventDefault(),t.share()}}}):t._e()]),t._v(" "),e("div",{staticClass:"discountCon"},[e("div",{staticClass:"discountTitle"}),t._v(" "),e("ul",{staticClass:"wardsList"},t._l(t.gifts,function(s,i,n){return e("li",{class:{astTop:"K房"==s.type}},[e("div",{staticClass:"imgBox"},[e("img",{class:{minImg:"K房"==s.type},attrs:{src:t.imgArr[i],alt:""}}),t._v(" "),"K房"==s.type?e("span",{staticClass:"wardsType"}):t._e()]),t._v(" "),e("div",{staticClass:"wardsMsg"},[e("div",{staticClass:"wardName"},[t._v(t._s(s.name))]),t._v(" "),e("div",{staticClass:"priceBox"},[e("span",{staticClass:"shandian"}),t._v(" "),e("span",{staticClass:"zhe"},[t._v(t._s(s.discount)+"折")]),e("del",{staticClass:"originalPrice"},[t._v("原價"+t._s(s.original)+"金幣")])]),t._v(" "),e("div",{staticClass:"termOfValidity"},[t._v("有效期"+t._s(s.period)+"天")])]),t._v(" "),e("div",{staticClass:"nowPriceBox"},[e("div",{staticClass:"nowPrice"},[t._v("\n                        "+t._s(s.price)+"金幣/一個\n                    ")]),t._v(" "),e("span",{on:{click:function(s){return t.buyWards(i)}}},[t._v("點擊購買")])])])}),0)]),t._v(" "),e("loading"),t._v(" "),e("msg-toast",{directives:[{name:"show",rawName:"v-show",value:t.showT,expression:"showT"}],attrs:{msg:t.tastMsg,colued:t.colued},on:{closeToast:function(s){return t.closeToast()},buyWard:function(s){return t.buyed()}}})],1)},staticRenderFns:[function(){var t=this.$createElement,s=this._self._c||t;return s("a",{staticClass:"rules",attrs:{href:"./index2.html"}},[s("em",[this._v("活動詳情")])])}]};var w={name:"App",components:{LuckWednesday:e("VU/8")(_,y,!1,function(t){e("0YNe")},null,null).exports}},b={render:function(){var t=this.$createElement,s=this._self._c||t;return s("div",{attrs:{id:"app"}},[s("luck-wednesday")],1)},staticRenderFns:[]};var C=e("VU/8")(w,b,!1,function(t){e("YkCX")},null,null).exports,x=e("AQYe");i.a.config.productionTip=!1,new i.a({el:"#app",store:x.a,components:{App:C},template:"<App/>"})},NxGh:function(t,s,e){"use strict";var i=e("Dd8w"),n=e.n(i),a=e("NYxO"),o={name:"Loading",data:function(){return{}},computed:n()({},Object(a.b)(["isLoading"])),props:{text:{type:String,default:"Loading"},size:{type:Number,default:30}}},c={render:function(){var t=this.$createElement,s=this._self._c||t;return s("div",{directives:[{name:"show",rawName:"v-show",value:this.isLoading,expression:"isLoading"}],staticClass:"customLoading",attrs:{id:"customLoading"}},[s("div",{staticClass:"loading"})])},staticRenderFns:[]};var r=e("VU/8")(o,c,!1,function(t){e("FKo1")},null,null);s.a=r.exports},Ofxr:function(t,s,e){t.exports=e.p+"static/img/31b41cd.png"},VqUz:function(t,s,e){t.exports=e.p+"static/img/e5c8c15.png"},YkCX:function(t,s){},gEmg:function(t,s,e){t.exports=e.p+"static/img/6ebdf7f.png"},j60g:function(t,s,e){"use strict";s.a=function(t){var s=new RegExp("(^|&)"+t+"=([^&]*)(&|$)"),e=window.location.search.substr(1).match(s);if(null!=e)return decodeURIComponent(e[2])}},kKtH:function(t,s,e){t.exports=e.p+"static/img/984651b.png"},pDPW:function(t,s,e){t.exports=e.p+"static/img/e140dbc.png"},yKQW:function(t,s,e){"use strict";var i=e("//Fk"),n=e.n(i),a=e("mtWM"),o=e.n(a),c=e("AQYe"),r=e("j60g"),u=Object(r.a)("token");function d(t,s){return new n.a(function(e,i){c.a.dispatch("setloading",!0),o.a.get(t,s).then(function(t){c.a.dispatch("setloading",!1),e(t)}).catch(function(t){c.a.dispatch("setloading",!1),i(t)})})}var l={getDefault:function(){return d(u?"/lucky_wednesday/init.php?token="+u:"/lucky_wednesday/init.php")},buy:function(t){return d("/lucky_wednesday/buy.php?id="+t+"&token="+u)},bugHistory:function(){return d("/lucky_wednesday/history.php?token="+u)}};s.a=l},zUGv:function(t,s,e){t.exports=e.p+"static/img/6521eb6.png"}},["NHnr"]);