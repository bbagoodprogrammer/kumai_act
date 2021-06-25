<template>
  <div id="app">
    <div class="con">
      <div class="top" :class="{bg1:level==1,bg2:level==2,bg3:level==3,bg4:level==4,bg5:level==5,bg6:level==6}">

        <div class="icon">
          <img :src="getIconUrl(nowIndex)" alt="">
        </div>

        <div class="avatar">
          <img :src="getAvatar(my_avatar)" alt="" @error="defaultImg">
          <img :src="getAvatar(your_avatar)" alt="" @error="defaultImg">
          <p v-if="score<350">{{lang.no_score}}</p>
        </div>

        <div class="line">
          <img :src="getLineUrl(nowIndex+1)" alt="">
          <div class="level" :class="{level_long:nowIndex>=10}" :style="{background:level_name_bg[level-1]}">
            <img :src="getImgMid(nowIndex)" alt="" :class="{short:nowIndex>=7&&nowIndex<=9,kong:score<350}">
            <span v-if="score>=350">{{name}}</span>
          </div>
          <div class="icon_box">
            <span class="first">
              <img :src="getImgUrl(nowIndex-2)" alt="">
            </span>
            <span class="second">
              <img :src="getImgUrl(nowIndex-1)" alt="">
            </span>
            <span class="third">
              <img :src="getImg(nowIndex+1)" alt="">
            </span>
            <span class="fourth">
              <img :src="getImg(nowIndex+2)" alt="">
            </span>
          </div>
        </div>
      </div>

      <div class="info" :style="{color:level_name_bg[level-1]}">
        <div class="score">
          <countTo class="countTo" :startVal='startVal' :endVal='endVal' :duration='1000' :separator='separator' :useEasing=false></countTo>
          <span class="txt">{{lang.txt_intimacy}}</span>
        </div>
        <p class="dice" :style="{background:level_bg[level-1]}">
          <span v-if="nowIndex<list.length" v-html="lang.dise.replace('%s',dis_score)"></span>
          <span v-else>{{lang.highest}}</span>
          <span @click="openRule()">
            <img :src="getRuleUrl(level)" alt="">
          </span>
        </p>
      </div>

      <div class="get">
        <p class="title">{{lang.get_score}}</p>
        <ul>
          <li>
            <span>
              <strong v-html="lang.rule1"></strong>
              <strong>{{lang.rule2}}</strong>
            </span>
          </li>
          <li>
            <span>
              <strong v-html="lang.rule3"></strong>
              <strong>{{lang.rule4}}</strong>
            </span>
          </li>
        </ul>
      </div>

      <div class="tips_box" v-if="is_show==1&&cp_res&&cp_res.length>0">
        <p class="title">{{lang.cp_title}}</p>
        <ul>
          <li v-for="(item,index) in cp_res" :key="index">
            <span :class="{lv1:index==0,lv3:index==2,lv4:index==3}"></span>
            <span>{{item.name}}</span>
            <span>{{item.intro}}</span>
          </li>
          <li class="last">
            <span></span>
            <span>{{lang.coming}}</span>
          </li>
        </ul>
      </div>
    </div>
    <!-- <div class="footer" v-if="cp_res&&cp_res.length>0"> -->
    <div class="footer" v-if="is_show==1&&is_ask_cp!=0">
      <div v-html="lang.tips.replace('%s',intimacy_name)" v-if="is_ask_cp==2" class="un_cp" :class="getFIcon(relation)"></div>
      <div v-if="is_ask_cp==1" class="cp" @click="openCp()">
        <em v-html="lang.cp"></em>
        <span></span>
        <span></span>
      </div>
    </div>
    <Loading v-show="loading" />
  </div>
</template>

<script>
import { mapState } from 'vuex';
// import { Player } from 'svga.lite';
import { urls } from './config';
import { toast, profile } from './utils';
import { init } from './apis';
// import { loadSvgaData } from './utils/svga';
import Loading from './components/common/Loading';
// import ScrollNotice from './components/common/ScrollNotice';

import { getUrlString } from './utils';
// import { getRankPrizeData } from './apis';
import { setTimeout } from 'timers';
// import { alert } from "./components/common/MessageBox";
import countTo from './components/countTo/vue-countTo';

const uid = getUrlString('uid') || '';
const lang = getUrlString('lang') || '';
const cpUid = getUrlString('cpUid') || '';
const token = getUrlString('token') || '';
const appScore = parseInt(getUrlString('score') || 0);
const appmy_avatar = decodeURIComponent(getUrlString('my_avatar'));
const appyour_avatar = decodeURIComponent(getUrlString('your_avatar'));
// const appmy_avatar = getUrlString('my_avatar');
// const appyour_avatar = getUrlString('your_avatar');
const ios = navigator.userAgent.match(/iPhone|iPod|ios|iPad/i);

export default {
  data () {
    return {
      is_cp: -1,
      sign: '',
      timestamp: '',
      animation: false,
      startVal: 0,
      endVal: appScore,
      separator: '',
      nowIndex: 1,
      bgId: 1,
      level: 1,
      name: '',
      score: appScore,
      dis_score: 0,
      my_avatar: appmy_avatar,
      your_avatar: appyour_avatar,
      level_name_bg: [
        '#66ADFF',
        '#3BDCA6',
        '#FCD019',
        '#FC8B19',
        '#FF6A47',
        '#FF4E80',
      ],
      level_bg: [
        'rgba(102,173,255,2);',
        'rgba(59,220,166,.2)',
        'rgba(252,208,25,.2)',
        'rgba(252,139,25,.2)',
        'rgba(255,106,71,.2)',
        'rgba(255,78,128,.2)',
      ],
      list: [
        {
          'score': 350,
          'name': _lang.name1,
          'rank': 1,
          'level': 2,
        },
        {
          'score': 1400,
          'name': _lang.name2,
          'rank': 2,
          'level': 2,
        },
        {
          'score': 3500,
          'name': _lang.name3,
          'rank': 3,
          'level': 2,
        },
        {
          'score': 7700,
          'name': _lang.name4,
          'rank': 4,
          'level': 3,
        },
        {
          'score': 12600,
          'name': _lang.name5,
          'rank': 5,
          'level': 3,
        },
        {
          'score': 18900,
          'name': _lang.name6,
          'rank': 6,
          'level': 3,
        },
        {
          'score': 26600,
          'name': _lang.name7,
          'rank': 7,
          'level': 4,
        },
        {
          'score': 36400,
          'name': _lang.name8,
          'rank': 8,
          'level': 4,
        },
        {
          'score': 46900,
          'name': _lang.name9,
          'rank': 9,
          'level': 4,
        },
        {
          'score': 59500,
          'name': _lang.name10,
          'rank': 10,
          'level': 5,
        },
        {
          'score': 73500,
          'name': _lang.name11,
          'rank': 11,
          'level': 5,
        },
        {
          'score': 89600,
          'name': _lang.name12,
          'rank': 12,
          'level': 5,
        },
        {
          'score': 107100,
          'name': _lang.name13,
          'rank': 13,
          'level': 6,
        },
        {
          'score': 126000,
          'name': _lang.name14,
          'rank': 14,
          'level': 6,
        },
        {
          'score': 147000,
          'name': _lang.name15,
          'rank': 15,
          'level': 6,
        },
      ]
    };
  },
  computed: {
    ...mapState(['loading', 'cp_res', 'is_ask_cp', 'is_show', 'intimacy_name', 'relation']),
    lang: () => _lang,
    images: () => _images,
    viewHeight: () => window.innerHeight,
  },
  created () {
    if (this.score < 350) {
      this.is_cp = 0;
    } else {
      this.is_cp = 1;
    }
    if (this.score < 350) {
      this.level = 1;
      this.name = '';
      this.nowIndex = 0;
      this.dis_score = 350 - this.score;
    } else {
      for (let i = 0; i < this.list.length; i++) {
        if (this.score >= this.list[i].score) {
          this.level = this.list[i].level;
          this.name = this.list[i].name;
          this.nowIndex = this.list[i].rank;
          if (this.score >= 147000) {
            this.dis_score = 0
          } else {
            this.dis_score = this.list[i + 1].score - this.score;
          }
        }
        // else if(this.score>this.list[i].score){
        //     this.level = this.list[i].level;
        //     this.name = this.list[i].name;
        //     this.nowIndex = this.list[i].rank;
        // }
      }
    }
  },
  filters: {
    rank (value) {
      return value < 10 ? '0' + value : value;
    },
  },
  mounted () {
    this.$store.dispatch('init');
    // this.initSvga();
    // this.loadData();
  },
  methods: {
    openCp () {
      if (ios) {
        //sendJsData('app://onGoToAskCouple?uid='+cpUid);
        onGoToAskCouple(cpUid);
      } else {
        window.JSInterface.onGoToAskCouple(cpUid);
        //javascript:JSInterface.sendJsData('app://onGoToAskCouple?uid='+cpUid);
      }
    },
    openRule () {
      location.href = "./rule.html?lang=" + lang;
    },
    getAvatar (url) {
      if (url == '%27%27') {
        return require('./img/default.png');
      } else {
        return url ? url : require('./img/default.png');
      }
    },
    getImgMid (index) {
      if (index > 0) {
        return require('./img/icon/b_i' + index + '.png');
      } else {
        return require('./img/bit.png');
      }
    },
    getImgUrl (index) {
      if (index > 0 && index <= 15) {
        return require('./img/icon/l_i' + index + '.png');
      }
    },
    getImg (index) {
      if (index <= 15) {
        return require('./img/icon/i' + index + '.png');
      }
    },
    getLineUrl (index) {
      return require('./img/line/' + index + '.png');
    },
    getIconUrl (index) {
      if (index > 0) {
        return require('./img/icon' + index + '.png');
      }
    },
    getRuleUrl (index) {
      if (index > 0) {
        return require('./img/rule' + index + '.png');
      } else {
        return require('./img/rule1.png');
      }
    },
    goIndex (uid) {
      if (ios) {
        sendJsData('app://userInfo?uid=' + uid);
      } else {
        javascript: JSInterface.sendJsData('app://userInfo?uid=' + uid);
      }
    },
    defaultImg (e) {
      e.currentTarget.src = require('./img/default.png')
    },
    getFIcon (i) {
      return 'icon' + i;
    },
  },
  components: {
    Loading,
    countTo,
  },
};
</script>

<style lang="scss">
html,
body {
  width: 100%;
}
.con {
  padding-bottom: 1.4rem;
  .top {
    width: 7.5rem;
    height: 4.56rem;
    background: url('./img/bg1.png') no-repeat;
    background-size: 100% 100%;
    position: relative;
    &.bg1 {
      background-image: url('./img/bg1.png');
    }
    &.bg2 {
      background-image: url('./img/bg2.png');
    }
    &.bg3 {
      background-image: url('./img/bg3.png');
    }
    &.bg4 {
      background-image: url('./img/bg4.png');
    }
    &.bg5 {
      background-image: url('./img/bg5.png');
    }
    &.bg6 {
      background-image: url('./img/bg6.png');
    }
    .icon {
      width: 3rem;
      height: 3rem;
      position: absolute;
      right: 0.75rem;
      top: 0.67rem;
      img {
        width: 100%;
      }
    }

    .avatar {
      width: 7.5rem;
      height: 1.3rem;
      text-align: center;
      position: absolute;
      top: 2.07rem;
      img {
        display: inline-block;
        width: 1.3rem;
        height: 1.3rem;
        border-radius: 50%;
        position: absolute;
        border: 0.04rem solid #fff;
        background: #e5e5e5;
        box-sizing: border-box;
        top: 0;
      }
      img:nth-of-type(1) {
        z-index: 1;
        left: 2.6rem;
      }
      img:nth-of-type(2) {
        right: 2.6rem;
      }
      p {
        font-size: 0.28rem;
        color: #66ADFF;
        padding-top: 1.38rem;
      }
    }
    @keyframes role1 {
      0% {
        left: -1.3rem;
        opacity: 0;
      }
      100% {
        left: 2.6rem;
        opacity: 1;
      }
    }
    @-webkit-keyframes role1 {
      0% {
        left: -1.3rem;
        opacity: 0;
      }
      100% {
        left: 2.6rem;
        opacity: 1;
      }
    }
    @keyframes role2 {
      0% {
        right: -1.3rem;
        opacity: 0;
      }
      100% {
        right: 2.6rem;
        opacity: 1;
      }
    }
    @-webkit-keyframes role2 {
      0% {
        right: -1.3rem;
        opacity: 0;
      }
      100% {
        right: 2.6rem;
        opacity: 1;
      }
    }

    .line {
      width: 7.5rem;
      height: 1.8rem;
      padding-top: 3rem;
      position: relative;
      .icon_box {
        width: 7.5rem;
        height: 1.8rem;
        position: absolute;
        bottom: 0;
        left: 0;
        span {
          position: absolute;
          width: 0.58rem;
          height: 0.58rem;
          img {
            width: 100%;
          }
        }
        .first {
          top: 0.47rem;
          left: 0.54rem;
        }
        .second {
          top: 0.95rem;
          left: 1.64rem;
        }
        .third {
          top: 0.95rem;
          right: 1.64rem;
        }
        .fourth {
          top: 0.47rem;
          right: 0.54rem;
        }
      }
      > img {
        width: 7.5rem;
        height: 1.8rem;
      }
      .level {
        min-width: 1.84rem;
        height: 0.9rem;
        background: #3BDCA6;
        border-radius: 0.46rem;
        display: flex;
        align-items: center;
        // justify-content: center;
        position: absolute;
        left: 50%;
        bottom: -0.1rem;
        margin-left: -0.92rem;
        &.level_long {
          width: 2.14rem;
          margin-left: -1.07rem;
        }
        img {
          width: 0.6rem;
          height: 0.6rem;
          margin-left: 0.2rem;
          margin-right: 0.1rem;
          &.short {
            margin-right: 0.23rem;
          }
          &.kong {
            margin: 0 auto;
          }
        }
        span {
          font-size: 0.26rem;
          font-family: PingFang SC;
          color: #fff;
        }
      }
    }
  }

  .info {
    margin-top: 0.79rem;
    color: #66ADFF;
    .score {
      text-align: center;
      font-size: 0;
      span {
        // display: inline-block;
        // vertical-align: middle;
      }
      // span:nth-of-type(1){
      //     font-size: .6rem;
      //     line-height: .49rem;
      // }
      .countTo {
        display: inline-block;
        vertical-align: middle;
        font-size: 0.6rem;
        line-height: 0.49rem;
      }
      .txt {
        font-size: 0.36rem;
        line-height: 0.42rem;
        display: inline-block;
        vertical-align: middle;
        padding-top: 0.05rem;
      }
    }
    .dice {
      width: 3.76rem;
      height: 0.4rem;
      background: rgba(102, 173, 255, 0.2);
      border-radius: 0.21rem;
      margin: 0.18rem auto 0;
      text-align: center;
      display: flex;
      align-items: center;
      justify-content: center;
      span {
        display: inline-block;
        vertical-align: middle;
      }
      span:nth-of-type(1) {
        font-size: 0.24rem;
        line-height: 0.49rem;
      }
      span:nth-of-type(2) {
        width: 0.42rem;
        height: 0.42rem;
        img {
          width: 0.42rem;
          height: 0.42rem;
        }
        // background: url('./img/rule2.png') no-repeat;
        // background-size: 100% 100%;
      }
    }
  }

  .get {
    margin-top: 0.65rem;
    .title {
      color: #333;
      font-size: 0.32rem;
      font-weight: bold;
      padding-bottom: 0.2rem;
      padding-left: 0.3rem;
    }
    ul {
      li {
        // padding-left: .3rem;
        width: 6.9rem;
        height: 1.38rem;
        background: #F5F5F5;
        border-radius: 0.18rem;
        margin: 0 auto;
        display: flex;
        align-items: center;
        span {
          display: inline-block;
          padding-left: 0.2rem;
        }
        span:nth-of-type(1) {
          strong {
            display: block;
          }
          strong:nth-of-type(1) {
            // color: #333;
            // font-size: .32rem;
            // font-weight: bold;
            padding-bottom: 0.02rem;
            vertical-align: middle;
          }
          strong:nth-of-type(2) {
            color: #999;
            font-size: 0.28rem;
          }
          em:nth-of-type(1) {
            display: inline-block;
            vertical-align: middle;
            color: #333;
            font-size: 0.32rem;
            font-weight: bold;
          }
          i {
            font-size: 0.32rem;
            color: #7A68F8;
            display: inline-block;
            vertical-align: middle;
          }
          em:nth-of-type(2) {
            display: inline-block;
            vertical-align: middle;
            width: 0.36rem;
            height: 0.36rem;
            background: url('./img/coin.png') center center no-repeat;
            background-size: 100% 100%;
          }
        }
      }
      li:nth-of-type(1) {
        margin-bottom: 0.2rem;
      }
    }
  }

  .tips_box {
    margin-top: 0.6rem;
    .title {
      color: #333;
      font-size: 0.36rem;
      font-weight: bold;
      padding-bottom: 0.2rem;
      padding-left: 0.3rem;
    }
    ul {
      display: flex;
      flex-wrap: wrap;
      padding-left: 0.15rem;
      padding-bottom: 0.4rem;
      li {
        width: 2.2rem;
        text-align: center;
        margin-left: 0.15rem;
        margin-bottom: 0.3rem;
        font-size: 0;
        span {
          display: inline-block;
        }
        span:nth-of-type(1) {
          width: 2.2rem;
          height: 1.6rem;
          background: url('./img/lv2.png');
          background-size: 100% 100%;
          &.lv3 {
            background-image: url('./img/lv3.png');
          }
          &.lv4 {
            background-image: url('./img/lv4.png');
          }
        }
        span:nth-of-type(2) {
          // width: 2rem;
          font-size: 0.28rem;
          font-weight: 400;
          line-height: 0.46rem;
          color: #333;
          opacity: 1;
          text-align: center;
          margin-top: 0.1rem;
        }
        span:nth-of-type(3) {
          width: 2.2rem;
          font-size: 0.24rem;
          font-weight: 400;
          line-height: 0.33rem;
          color: #999;
          opacity: 1;
          text-align: center;
        }
        &.last {
          span:nth-of-type(1) {
            width: 2.2rem;
            height: 1.6rem;
            background: url('./img/lv5.png');
            background-size: 100% 100%;
          }
          // span:nth-of-type(2){
          //     width: 2rem;
          //     height: .28rem;
          //     font-size: .2rem;
          //     font-weight: 400;
          //     line-height: .28rem;
          //     color: #999;
          //     opacity: 1;
          //     text-align: center;
          // }
        }
      }
    }
  }
}

.footer {
  position: fixed;
  width: 7.5rem;
  height: 1.48rem;
  background: #FFFFFF;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  border-top: 0.01rem solid #E5E5E5;
  .un_cp {
    width: 6.26rem;
    height: 0.88rem;
    text-align: center;
    background: #CCC;
    border-radius: 0.44rem;
    font-size: 0.28rem;
    font-family: PingFang SC;
    font-weight: 400;
    color: #FFFFFF;
    // display: flex;
    // flex-wrap: wrap;
    // justify-content: center;
    // align-items: center;
    i {
      display: inline-block;
      vertical-align: text-top;
      width: 0.32rem;
      height: 0.32rem;
      // background: url('./img/icon4.png');
      background-repeat: no-repeat;
      background-size: 100% 100%;
    }
    &.icon1 {
      i {
        background-image: url('./img/icon1.png');
      }
    }
    &.icon2 {
      i {
        background-image: url('./img/icon2.png');
      }
    }
    &.icon3 {
      i {
        background-image: url('./img/icon3.png');
      }
    }
    &.icon4 {
      i {
        background-image: url('./img/icon4.png');
      }
    }
    &.icon5 {
      i {
        background-image: url('./img/icon5.png');
      }
    }
    &.icon6 {
      i {
        background-image: url('./img/icon6.png');
      }
    }
    &.icon7 {
      i {
        background-image: url('./img/icon7.png');
      }
    }
  }
  .cp {
    width: 6.1rem;
    height: 0.88rem;
    line-height: 0.88rem;
    text-align: center;
    background: linear-gradient(135deg, #F597E3 0%, #FF6A98 100%);
    border-radius: 0.44rem;
    text-align: center;
    position: relative;
    em {
      font-size: 0.28rem;
      font-family: PingFang SC;
      color: #FFFFFF;
    }
    span {
      display: inline-block;
      position: absolute;
    }
    span:nth-of-type(1) {
      width: 0.6rem;
      height: 0.6rem;
      background: url('./img/love1.png') no-repeat;
      background-size: 100% 100%;
      left: -0.2rem;
      bottom: -0.2rem;
    }
    span:nth-of-type(2) {
      width: 0.78rem;
      height: 0.78rem;
      background: url('./img/love2.png') no-repeat;
      background-size: 100% 100%;
      right: -0.3rem;
      top: -0.3rem;
    }
  }
}
</style>