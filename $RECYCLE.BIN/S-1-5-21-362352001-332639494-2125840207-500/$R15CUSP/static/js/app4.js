webpackJsonp([3],{"1IGW":function(t,s){},3:function(t,s,n){n("briU"),t.exports=n("hBc3")},AQYe:function(t,s,n){"use strict";var e=n("a3Yh"),o=n.n(e),a=n("aA9S"),i=n.n(a),r=n("+RKF"),c=n("bSIt");r.a.use(c.a);var u=new c.a.Store({state:{actStatus:0,registered:!1,isLoading:0,toast:!1,toastTitle:"",toastMsg:"",isShare:!1,inited:0,showType:1,totalDay:0,nowShowType:0,rankGroups:{0:{},1:{},2:{},3:{}},groupsUserMsg:{0:{},1:{},2:{},3:{}},nowDay:0,dateArr:[],nowTab:0,timeObj:{},oneNowDay:0},mutations:{isLoaging:function(t,s){s?++t.isLoading:--t.isLoading},setShareState:function(t,s){t.isShare=s},setActStatus:function(t,s){t.actStatus=s},setUserSingUp:function(t,s){t.registered=s},setToast:function(t,s){t.toast=!0,t.toastMsg=s.msg,s.title&&(t.toastTitle=s.title)},closeToast:function(t,s){t.toast=!1},setInited:function(t,s){t.inited=s},setShowType:function(t,s){t.showType=s},setDateArr:function(t,s){t.dateArr=s},setNowDay:function(t,s){t.nowDay=s},changTab:function(t,s){t.nowTab=s},setActiIme:function(t,s){t.timeObj=s},setTotalDay:function(t,s){t.totalDay=s},updateGroupsUserMsg:function(t,s){if(s&&void 0!==s.data.key){var n=s.data.key;delete s.key,t.groupsUserMsg[s.type]=i()({},t.groupsUserMsg[s.type],o()({},n,i()({},t.groupsUserMsg[s.type][n],s.data)))}},updateRankGroups:function(t,s){if(s&&void 0!==s.data.key){var n=s.data.key;delete s.key,t.rankGroups[s.type]=i()({},t.rankGroups[s.type],o()({},n,i()({},t.rankGroups[s.type][n],s.data)))}},setOneNowDay:function(t,s){t.oneNowDay=s},setnowShowType:function(t,s){t.nowShowType=s}},actions:{setloading:function(t,s){(0,t.commit)("isLoaging",s)}},getters:{}});s.a=u},IfHY:function(t,s,n){"use strict";var e=n("4YfN"),o=n.n(e),a=n("bSIt"),i={props:["msg"],computed:o()({},Object(a.b)(["toast","toastTitle","toastMsg"])),methods:{close:function(){this.vxc("closeToast")}}},r={render:function(){var t=this,s=t.$createElement,n=t._self._c||s;return n("div",{directives:[{name:"show",rawName:"v-show",value:t.toast,expression:"toast"}],staticClass:"toastBox"},[n("transition",{attrs:{name:"slide"}},[n("div",{directives:[{name:"show",rawName:"v-show",value:t.toast,expression:"toast"}],staticClass:"promptBox"},[n("i",{staticClass:"close",on:{click:function(s){return t.close()}}}),t._v(" "),n("div",{staticClass:"title"},[t._v(t._s(t.toastTitle))]),t._v(" "),n("p",{domProps:{innerHTML:t._s(t.toastMsg)}}),t._v(" "),n("div",{staticClass:"ok",on:{click:function(s){return t.close()}}},[t._v("\n        知道了\n      ")])])])],1)},staticRenderFns:[]};var c=n("C7Lr")(i,r,!1,function(t){n("rgHK")},null,null);s.a=c.exports},NxGh:function(t,s,n){"use strict";var e=n("4YfN"),o=n.n(e),a=n("bSIt"),i={name:"Loading",data:function(){return{}},computed:o()({},Object(a.b)(["isLoading"])),props:{text:{type:String,default:"Loading"},size:{type:Number,default:30}}},r={render:function(){var t=this.$createElement,s=this._self._c||t;return s("div",{directives:[{name:"show",rawName:"v-show",value:this.isLoading,expression:"isLoading"}],staticClass:"customLoading",attrs:{id:"customLoading"}},[s("div",{staticClass:"loading"})])},staticRenderFns:[]};var c=n("C7Lr")(i,r,!1,function(t){n("g0TR")},null,null);s.a=c.exports},g0TR:function(t,s){},hBc3:function(t,s,n){"use strict";Object.defineProperty(s,"__esModule",{value:!0});var e=n("+RKF"),o=n("yKQW"),a=n("NxGh"),i=n("IfHY"),r=(n("j60g"),{components:{Loading:a.a,msgToast:i.a},data:function(){return{songList:[],showPup:!1,songid:null,tastMsg:"",showT:!1,songIndex:null,tostTitle:"",back:!1}},computed:{isLength:function(){return this.songList.length>0}},created:function(){var t=this;document.title="家族名星賽",o.a.getSongList().then(function(s){console.log(s),0===s.data.response_status.code&&(t.songList=s.data.response_data.list)}),sessionStorage.setItem("need-refresh",!0)},methods:{goSing:function(){location.href="goto:songLibrary"},choiceSong:function(t,s){this.songid=t,this.showPup=!0,this.songIndex=s},changed:function(){var t=this;o.a.selectSong(this.songid).then(function(s){0===s.data.response_status.code?(t.showPup=!1,t.songList.splice(t.songIndex,1),t.back=!0):(t.showPup=!1,t.tastMsg=s.data.response_status.error,t.showT=!0)})},hdPup:function(){this.showPup=!1},closeToast:function(){this.showT=!1}}}),c={render:function(){var t=this,s=t.$createElement,n=t._self._c||s;return n("div",{staticClass:"song"},[t.isLength?n("h5",[t._v("選擇你最滿意的作品報名參賽吧")]):n("h5",{staticClass:"noSong"},[t._v("你還沒有符合參賽要求的參賽作品喔")]),t._v(" "),t.isLength?n("div",{staticClass:"songList"},[n("ul",t._l(t.songList,function(s,e){return n("li",{key:e},[n("div",{staticClass:"songLeft"},[n("span",{staticClass:"name"},[t._v(t._s(s.name))]),t._v(" "),n("span",{staticClass:"tm"},[t._v(t._s(s.time))])]),t._v(" "),n("span",{staticClass:"joinBtn",on:{click:function(n){return t.choiceSong(s.sid,e)}}},[t._v("選擇參賽")])])}),0)]):t._e(),t._v(" "),n("div",{staticClass:"goSing",class:{border:t.isLength}},[t.isLength>0?n("p",[t._v("沒有符合心意的歌曲嗎？")]):t._e(),t._v(" "),n("div",{staticClass:"sing",on:{click:function(s){return t.goSing()}}},[t._v("去唱一首")]),t._v(" "),n("span",[t._v("唱完記得回來完成報名喔")])]),t._v(" "),t._m(0),t._v(" "),n("p",{staticClass:"tips"},[t._v("2.可上傳多首作品參賽，報名後作品收禮才會被計算")]),t._v(" "),t.showPup?n("div",{staticClass:"determinePup"},[n("div",{staticClass:"determinCon"},[n("p",[t._v("確認提交這一首作品參賽嗎？")]),t._v(" "),n("div",{staticClass:"chang"},[n("span",{staticClass:"no",on:{click:function(s){return t.hdPup()}}},[t._v("取消")]),t._v(" "),n("span",{staticClass:"ok",on:{click:function(s){return t.changed()}}},[t._v("確定")])])])]):t._e(),t._v(" "),n("transition",{attrs:{name:"slide"}},[n("msg-toast",{directives:[{name:"show",rawName:"v-show",value:t.showT,expression:"showT"}],attrs:{msg:t.tastMsg,tostTitle:t.tostTitle,back:t.back},on:{closeToast:function(s){return t.closeToast()}}})],1),t._v(" "),n("Loading")],1)},staticRenderFns:[function(){var t=this.$createElement,s=this._self._c||t;return s("p",{staticClass:"tips"},[this._v("1.參賽作品需為"),s("em",[this._v("活動期間")]),this._v(" 後發佈的任意公開作品(清唱5分鐘除外)")])}]};var u=n("C7Lr")(r,c,!1,function(t){n("1IGW")},null,null).exports,l=n("AQYe");e.a.config.productionTip=!1,new e.a({el:"#app",components:{main3:u},store:l.a,template:"<main3/>"})},j60g:function(t,s,n){"use strict";s.a=function(t){var s=new RegExp("(^|&)"+t+"=([^&]*)(&|$)"),n=window.location.search.substr(1).match(s);if(null!=n)return decodeURIComponent(n[2])}},rgHK:function(t,s){},yKQW:function(t,s,n){"use strict";var e=n("rVsN"),o=n.n(e),a=n("I29D"),i=n.n(a),r=n("AQYe"),c=n("j60g"),u=Object(c.a)("token");function l(t,s){return new o.a(function(n,e){r.a.dispatch("setloading",!0),i.a.get(t,s).then(function(t){r.a.dispatch("setloading",!1),n(t)}).catch(function(t){r.a.dispatch("setloading",!1),e(t)})})}var g={getDefault:function(){return l(u?"/family_star/init.php?token="+u:"/family_star/init.php")},singUp:function(){return l("/family_star/singUp.php?token="+u)},getPeopleList:function(t){return l("/gift_contest/getRecord.php?uid="+t)},getLastRank:function(t,s){return s?i.a.get("/family_star/guard.php?token="+u+"&from="+t):l("/family_star/guard.php?token="+u+"&from="+t)},getSongList:function(){return l("/family_star/getSong.php?token="+u)},selectSong:function(t){return l("/family_star/pushSong.php?token="+u+"&sid="+t)},fCards:function(t,s){return l("/family_star/getAttr.php?token="+u+"&type="+t+"&fid="+s)},getHistory:function(t){return l("/family_star/getRecord.php?token="+u+"&from="+t)}};s.a=g}},[3]);