/*!
 * Created by Guohui
 * User: webflash2007@gmail.com
 * Version: 1.0.0
 */
(window.webpackJsonp=window.webpackJsonp||[]).push([["tips"],{"+MiA":function(t,n,e){"use strict";e.d(n,"d",(function(){return b})),e.d(n,"c",(function(){return C})),e.d(n,"b",(function(){return k})),e.d(n,"a",(function(){return x}));var i=e("zr5I"),r=e.n(i),o=e("Q2AE"),a="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},s=navigator.userAgent.match(/iPhone|iPod|ios|iPad/i),c={},u=!1;window.onClientReady=function(){u=!0};var l=void 0,p=[];function f(){clearInterval(l),l=setInterval((function(){var t=p.shift();if(t)try{window.getSign(t)}catch(t){}}),200)}function d(t){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"";return new Promise((function(e,i){var r=Math.round(Date.now()/1e3);"object"==(void 0===t?"undefined":a(t))&&n&&"string"==typeof n||e({sign:"",timestamp:r});var o=JSON.stringify({callbackId:n,data:t});if(s){if(window.signCallbacks[n]=function(t){e(t)},!/bundleId/.test(navigator.userAgent))return void finishSign(JSON.stringify({callbackId:n,data:{sign:"",timestamp:r}}));try{u?(c={},p.push(o)):(clearInterval(c[n]),c[n]=setInterval((function(){u&&(clearInterval(c[n]),p.push(o))}),100))}catch(t){finishSign(JSON.stringify({callbackId:n,data:{sign:"",timestamp:r}}))}}else try{var l=window.JSInterface.getSign(o);e(JSON.parse(l))}catch(t){e({sign:"",timestamp:r})}}))}f(),document.addEventListener("visibilitychange",(function(){!1===document.hidden?f():clearInterval(l)})),window.signCallbacks={},window.finishSign=function(t){var n=JSON.parse(t),e=n.callbackId;window.signCallbacks&&"function"==typeof window.signCallbacks[e]&&window.signCallbacks[e](n.data,t)};var g=e("7Qib");var v,_=Object.assign||function(t){for(var n=1;n<arguments.length;n++){var e=arguments[n];for(var i in e)Object.prototype.hasOwnProperty.call(e,i)&&(t[i]=e[i])}return t};function m(t){return function(){var n=t.apply(this,arguments);return new Promise((function(t,e){return function i(r,o){try{var a=n[r](o),s=a.value}catch(t){return void e(t)}if(!a.done)return Promise.resolve(s).then((function(t){i("next",t)}),(function(t){i("throw",t)}));t(s)}("next")}))}}function h(t,n,e){return new RegExp("(\\?|&)"+n+"=").test(t)?t:(t=t.replace(/(\?|&)+$/,""))+(/\?/.test(t)?"&":"?")+n+"="+encodeURIComponent(e)}function y(t){var n={};if(t&&"string"==typeof t){var e=t.replace(/#[^#]*$/,"").split("?");if(2==e.length)for(var i=e[1].split("&"),r=0;r<i.length;r++){var o=i[r].split("="),a=o[0],s=o[1];n[a]=decodeURIComponent(s)}}return n}function w(t,n){return new Promise((function(e,i){o.a.commit("updateLoading",!0),r.a.get(t,n).then((function(t){o.a.commit("updateLoading",!1),e(t)})).catch((function(t){o.a.commit("updateLoading",!1),i(t)}))}))}function b(t,n){var e,i=this,r=arguments.length>2&&void 0!==arguments[2]&&arguments[2],a=arguments[3];return new Promise((e=m(regeneratorRuntime.mark((function e(s,c){var u,l,p,f;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if("function"!=typeof t||!n||"string"!=typeof n){e.next=10;break}if(!(r&&o.a.state.loadDataCount&&o.a.state.loadDataCount[n])){e.next=4;break}return s(),e.abrupt("return");case 4:return e.next=6,t(a);case 6:(u=e.sent).data?(l=u.data,p=l.response_status,f=l.response_data,p&&""===p.error?(o.a.commit(n,f),o.a.state.loadDataCount=o.a.state.loadDataCount||{},o.a.state.loadDataCount[n]?o.a.state.loadDataCount[n]++:o.a.state.loadDataCount[n]=1,s(f)):(p.error&&Object(g.e)(p.error),c(u.data))):c(u),e.next=11;break;case 10:c();case 11:case"end":return e.stop()}}),e,i)}))),function(t,n){return e.apply(this,arguments)}))}function C(t){return w("/index.php?action=jewel.getMyJewelWallet&_login_uid={uid}&token={token}&lang={lang}&is_pink="+t)}function k(t,n,e,i){return i?n?r.a.get("/index.php?action=jewel.getMyDailyJewelBill&_login_uid={uid}&token={token}&lang={lang}&is_pink="+t+"&from="+e+"&year="+n):r.a.get("/index.php?action=jewel.getMyDailyJewelBill&_login_uid={uid}&token={token}&lang={lang}&is_pink="+t+"&from="+e):w(n?"/index.php?action=jewel.getMyDailyJewelBill&_login_uid={uid}&token={token}&lang={lang}&is_pink="+t+"&from="+e+"&year="+n:"/index.php?action=jewel.getMyDailyJewelBill&_login_uid={uid}&token={token}&lang={lang}&is_pink="+t+"&from="+e)}function x(t,n){return w("/index.php?action=jewel.getJewelGoods&_login_uid={uid}&token={token}&lang={lang}&is_pink="+t+"&gid="+n)}r.a.interceptors.request.use((v=m(regeneratorRuntime.mark((function t(n){var e,i,r,o,a,s,c,u,l,p,f,v,m,w,b,C,k,x,S,I,j;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(e=atob,i=encodeURIComponent,r=n.method,o=n.url,a=n.data,o&&(s=Object(g.c)("rid")||Object(g.c)("room_id")||"",c=Object(g.c)("uid")||"",u=Object(g.c)("token")||"",l=Object(g.c)("lang")||"",o=o.replace("{rid}",i(s)).replace("{uid}",i(c)).replace("{token}",i(u)).replace("{lang}",i(l))),o=h(o,"lang",__lang),o=h(o,"t",Date.now()),p=e("c2lnbnR1cmU"),(f=Object(g.c)(p)||"")&&(o=h(o,p,f)),n.url=o,a instanceof FormData&&(v={},a.forEach((function(t,n){v[n]=t})),a=v),"post"==r&&a){for(w in m=new FormData,a)m.append(w,a[w]);n.data=m}return b=_({},a,y(o)),C=btoa((b.action||"")+Date.now()+Math.floor(1e3*Math.random())),t.next=15,d(b,C);case 15:for(j in k=t.sent,x=k.sign,S=k.timestamp,n.headers=_({sign:x,timestamp:S},n.headers),I=[],b)""==b[j]&&I.push(j);I.length&&console.error("["+I.join(",")+"] params empty");case 21:return t.abrupt("return",n);case 22:case"end":return t.stop()}}),t,void 0)}))),function(t){return v.apply(this,arguments)}),(function(t){return Promise.reject(t)}))},"4bjo":function(t,n,e){"use strict";e.r(n);e("5+t+"),e("iQY/"),e("edCo");var i=e("i7/w"),r=e.n(i),o=e("7Qib"),a=e("d1/2"),s={data:function(){return{navigatorHeight:0}},mounted:function(){var t=this;setTimeout((function(){document.title=t.lang.tips_title;var n=Object(o.b)(),e=Object(o.a)();("ios"==n&&e>=165||"android"==n)&&Object(a.b)(!1)}),0)}},c=(e("bhj3"),e("XSKF")),u=Object(c.a)(s,(function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("div",{staticClass:"tips"},[e("div",{staticClass:"app_top",style:{height:t.navigatorHeight}}),t._v(" "),e("h3",[t._v("01")]),t._v(" "),e("h6",[t._v(t._s(t.lang.h6_1))]),t._v(" "),e("p",[t._v(t._s(t.lang.p_1))]),t._v(" "),e("h3",{staticClass:"mt"},[t._v("02")]),t._v(" "),e("h6",[t._v(t._s(t.lang.h6_2))]),t._v(" "),e("p",{staticClass:"mt2"},[t._v(t._s(t.lang.p_2))]),t._v(" "),e("p",[t._v(t._s(t.lang.p_3))]),t._v(" "),e("p",{staticClass:"mt2"},[t._v(t._s(t.lang.p_4))]),t._v(" "),e("p",[t._v(t._s(t.lang.p_5))]),t._v(" "),e("p",{staticClass:"mt2"},[t._v(t._s(t.lang.p_6))]),t._v(" "),e("p",[t._v(t._s(t.lang.p_7))]),t._v(" "),e("p",{staticClass:"mt2"},[t._v(t._s(t.lang.p_8))]),t._v(" "),e("p",[t._v(t._s(t.lang.p_9))]),t._v(" "),e("p",{staticClass:"mt2"},[t._v(t._s(t.lang.p_10))]),t._v(" "),e("p",[t._v(t._s(t.lang.p_11))]),t._v(" "),e("p",{staticClass:"mt2"},[t._v(t._s(t.lang.p_12))]),t._v(" "),e("p",[t._v(t._s(t.lang.p_13))]),t._v(" "),e("h3",{staticClass:"mt"},[t._v("03")]),t._v(" "),e("h6",[t._v(t._s(t.lang.h6_3))]),t._v(" "),e("p",[t._v(t._s(t.lang.p_14))])])}),[],!1,null,null,null).exports;r.a.prototype.toast=o.e,r.a.config.productionTip=!1,r.a.mixin({computed:{lang:function(){return _lang},images:function(){return _images}},methods:{replaceLang:o.d}}),new r.a({el:"#app",components:{tips:u},render:function(t){return t(u)}})},"5+t+":function(t,n,e){},"7Qib":function(t,n,e){"use strict";e.d(n,"c",(function(){return r})),e.d(n,"e",(function(){return a})),e.d(n,"d",(function(){return s})),e.d(n,"b",(function(){return c})),e.d(n,"a",(function(){return l})),e.d(n,"f",(function(){return p}));var i=e("Q2AE");"function"==typeof Symbol&&Symbol.iterator;function r(t){var n={};return window.location.search.replace(/[?&]+([^=&]+)=([^&]*)/gi,(function(t,e,i){n[e]=i})),t&&void 0!==n[t]?decodeURIComponent(n[t]):null}function o(t){return(t+"").replace(/</g,"&lt;").replace(/>/g,"&gt;")}function a(t){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:1e3,e=1e3,i=document.createElement("div");i.style.cssText="position:fixed; z-index:10000; left:0; top:0; right:0; bottom:0; text-align:center; pointer-events:none",i.innerHTML='<span style="display:inline-block; padding:.1rem .2rem; max-width:80%; background:#212125; color:#fff; border-radius:.1rem; opacity:0; margin-top:'+Math.round(window.innerHeight/2)+"px; transition:opacity "+e/1e3+'s">'+o(t)+"</span>",document.body.appendChild(i);var r=i.firstChild;setTimeout((function(){r.style.opacity=1}),0),setTimeout((function(){r.style.opacity=0,setTimeout((function(){document.body.removeChild(i)}),e)}),e+n)}function s(t){for(var n=arguments.length,e=Array(n>1?n-1:0),i=1;i<n;i++)e[i-1]=arguments[i];if(t&&"string"==typeof t&&e.length)for(var r=/%s/.test(t),o=0;o<e.length;o++){var a=r?/%s/:new RegExp("\\{"+o+"\\}","g");t=t.replace(a,e[o])}return t}function c(){var t="pc";return navigator.userAgent.match(/iPhone|iPod|ios|iPad/i)?t="ios":navigator.userAgent.match(/Android/i)&&(t="android"),t}function u(t){var n=0;if(t&&"string"==typeof t){var e=(t=t.replace("(",".").replace(/[^\.\d]/g,"")).split("."),i=e.length?e[e.length-1]:0;n=isNaN(i)?0:parseInt(i)}return n}function l(){return function(t,n){for(var e={},i=t.split(";"),r=0;r<i.length;r++)for(var o=i[r].split(","),a=0;a<o.length;a++){var s=o[a].split("="),c=s[0],l=s[1]||"";e[c]=l,/version/i.test(c)&&(e.ver=u(l))}return n?e[n]:e}(navigator.userAgent,"ver")}function p(t,n){i.a.commit(t,n)}},CGEr:function(t,n,e){},Q2AE:function(t,n,e){"use strict";var i,r,o=e("i7/w"),a=e.n(o),s=e("WIBD"),c=e.n(s),u=e("+MiA"),l=Object.assign||function(t){for(var n=1;n<arguments.length;n++){var e=arguments[n];for(var i in e)Object.prototype.hasOwnProperty.call(e,i)&&(t[i]=e[i])}return t};a.a.use(c.a),n.a=new c.a.Store({state:{loading:!1},mutations:{updateLoading:function(t,n){t.loading=n},setInitInfo:function(t,n){l(t,n)}},actions:{getInitInfo:(i=regeneratorRuntime.mark((function t(n,e){return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,Object(u.d)(u.c,"setInitInfo",!1,e);case 3:t.next=8;break;case 5:t.prev=5,t.t0=t.catch(0),console.log("getInitInfo",t.t0);case 8:case"end":return t.stop()}}),t,this,[[0,5]])})),r=function(){var t=i.apply(this,arguments);return new Promise((function(n,e){return function i(r,o){try{var a=t[r](o),s=a.value}catch(t){return void e(t)}if(!a.done)return Promise.resolve(s).then((function(t){i("next",t)}),(function(t){i("throw",t)}));n(s)}("next")}))},function(t,n){return r.apply(this,arguments)})}})},WIBD:function(t,n){t.exports=Vuex},XSKF:function(t,n,e){"use strict";function i(t,n,e,i,r,o,a,s){var c,u="function"==typeof t?t.options:t;if(n&&(u.render=n,u.staticRenderFns=e,u._compiled=!0),i&&(u.functional=!0),o&&(u._scopeId="data-v-"+o),a?(c=function(t){(t=t||this.$vnode&&this.$vnode.ssrContext||this.parent&&this.parent.$vnode&&this.parent.$vnode.ssrContext)||"undefined"==typeof __VUE_SSR_CONTEXT__||(t=__VUE_SSR_CONTEXT__),r&&r.call(this,t),t&&t._registeredComponents&&t._registeredComponents.add(a)},u._ssrRegister=c):r&&(c=s?function(){r.call(this,(u.functional?this.parent:this).$root.$options.shadowRoot)}:r),c)if(u.functional){u._injectStyles=c;var l=u.render;u.render=function(t,n){return c.call(n),l(t,n)}}else{var p=u.beforeCreate;u.beforeCreate=p?[].concat(p,c):[c]}return{exports:t,options:u}}e.d(n,"a",(function(){return i}))},bhj3:function(t,n,e){"use strict";e("CGEr")},"d1/2":function(t,n,e){"use strict";e.d(n,"b",(function(){return o})),e.d(n,"a",(function(){return r}));var i=navigator.userAgent.match(/iPhone|iPod|ios|iPad/i);function r(){return a("getStatusBarHeight",void 0,!0)||0}function o(t){a("setFullScreen",t=!1!==t)}function a(t,n){var e=arguments.length>2&&void 0!==arguments[2]&&arguments[2];if(t&&"string"==typeof t){var r="string"==typeof n||"boolean"==typeof n||"number"==typeof n||null===n?n:JSON.stringify(n),o=void 0!==r&&null!=n;try{if(!i)return o?JSInterface[t](r):JSInterface[t]();if(e)return prompt(JSON.stringify({method:t,data:n}));o?window[t](r):window[t]()}catch(t){}}}},edCo:function(t,n){t.exports=regeneratorRuntime},"i7/w":function(t,n){t.exports=Vue},"iQY/":function(t,n){t.exports=ES6Promise},zr5I:function(t,n){t.exports=axios}},[["4bjo","runtime"]]]);