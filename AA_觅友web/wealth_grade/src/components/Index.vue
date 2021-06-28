<template>
  <div class="page pageIndex">
    <div class="mask"></div>
    <div class="app_top" :class="{app_top_fit:is_fix}" :style="{background:'linear-gradient(136deg, #381A53 0%, #252B68 15%, #381A53 47%, #252B68 100%);',height:navigatorHeight}"></div>
    <div class="con" v-if="wealth.cfg" :style="{marginTop:navigatorHeight}">
      <!-- <div class="mask"></div>
      <div class="app_top" :class="{app_top_fit:is_fix}" :style="{background:'linear-gradient(136deg, #381A53 0%, #252B68 15%, #381A53 47%, #252B68 100%);',height:navigatorHeight}"></div> -->
      <div class="top">
        <div class="banner">
          <img :src="getLvImg(getLevel)" alt="">
        </div>
        <div class="progress_box">
          <div class="lv">
            <span>
              <!-- <strong>lv{{wealth.wealthLv}}</strong> -->
              <!-- <strong></strong> -->
              <strong>{{lang.wealthExp}} {{wealth.wealthExp}}</strong>
            </span>
            <span v-html="lang.disc.replace('%s',wealth.nextWealthLvExp)"></span>
          </div>
          <div class="progress">
            <p :style="{width:getWidth+'rem'}" :class="{
              bg9:wealth.wealthLv>=1&&wealth.wealthLv<10,
              bg10:wealth.wealthLv>=10&&wealth.wealthLv<20,
              bg20:wealth.wealthLv>=20&&wealth.wealthLv<30,
              bg30:wealth.wealthLv>=30&&wealth.wealthLv<40,
              bg40:wealth.wealthLv>=40&&wealth.wealthLv<50,
              bg50:wealth.wealthLv>=50,}"></p>
          </div>
        </div>
      </div>

      <div class="privilege">
        <p>{{lang.privilege_title}}</p>
        <div class="icon_box">
          <div class="list" @click="pro_level_flag=true">
            <div>
              <div class="inner">
                <img :src="getIcon(getLevel)" alt="" class="icon_lv">
                <span :class="{gt:wealth.wealthLv>=10,
              bg9:wealth.wealthLv>=1&&wealth.wealthLv<10,
              bg10:wealth.wealthLv>=10&&wealth.wealthLv<20,
              bg20:wealth.wealthLv>=20&&wealth.wealthLv<30,
              bg30:wealth.wealthLv>=30&&wealth.wealthLv<40,
              bg40:wealth.wealthLv>=40&&wealth.wealthLv<50,
              bg50:wealth.wealthLv>=50,
              }">{{wealth.wealthLv}}</span>
              </div>
              <div class="bottom">
                <p>{{lang.privilege[0].title}}</p>
                <p v-if="wealth.wealthLv<1">{{lang.privilege[0].unlock}}</p>
              </div>
            </div>
          </div>
          <div class="list" @click="pro_float_flag=true">
            <div>

              <div class="inner">
                <img :src="images[getLevel]" alt="" class="float">
              </div>
              <div class="bottom">
                <p>{{lang.privilege[1].title}}</p>
                <p v-if="wealth.wealthLv<10">{{lang.privilege[1].unlock}}</p>
              </div>
            </div>

          </div>
          <div class="list" @click="pro_service_flag=true">
            <div>
              <div class="inner">
                <img src="../img/privilege3.png" alt="" class="privilege_icon">
              </div>
              <p>{{lang.privilege[2].title}}</p>
              <p v-if="wealth.wealthLv<30">{{lang.privilege[2].unlock}}</p>
            </div>
          </div>
          <div class="list">
            <div class="privilege4">
              <img src="../img/privilege4.png" alt="" class="">
            </div>
            <p id="p4">{{lang.privilege[3].title}}</p>
          </div>
        </div>
      </div>

      <div class="level_explain">
        <p class="title">{{lang.level_title}}</p>
        <p class="tips" v-html="lang.level_explain_tips"></p>
        <ul>
          <li v-for="(item,i) in lang.level_explain_ul" :key="i">{{item}}</li>
        </ul>
      </div>
      <div class="require">
        <p class="title">{{lang.require_title}}</p>
        <div class="table">
          <div class="type">
            <span>{{lang.type1}}</span>
            <span>{{lang.type2}}</span>
            <span>{{lang.type3}}</span>
          </div>
          <div class="val">
            <ul>
              <li v-for="(item,i) in wealth.cfg" :key="i">
                <span>Lv.{{i}}</span>
                <span>{{item}}</span>
                <span v-if="(i+1)==wealth.cfg.length">445500</span>
                <span v-else>{{wealth.cfg[i+1]-wealth.cfg[i]}}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <transition name="bounce">
      <div class="pro_level" v-if="pro_level_flag">
        <i @click="pro_level_flag=false" class="close_pro"></i>
        <div class="inner">
          <p class="title">
            <span>{{lang.privilege[0].title}}</span>
            <span v-if="wealth.wealthLv<1">{{lang.privilege[0].unlock}}</span>
          </p>
          <div class="img">
            <img :src="getPro(getLevel)" alt="">
          </div>
          <p class="tips">{{lang.privilege[0].tips}}</p>
          <ul class="pro_level_ul">
            <li v-for="(item,i) in lang.proLevelIcon.length" :key="i">
              <span>{{lang.proLevelIcon[i]}}</span>
              <span><img :src="getProLevel(i)" alt=""></span>
            </li>
          </ul>
        </div>
      </div>
    </transition>

    <transition name="bounce">
      <div class="pro_float" v-if="pro_float_flag">
        <i @click="pro_float_flag=false" class="close_pro"></i>
        <div class="inner">
          <p class="title">
            <span>{{lang.privilege[1].title}}</span>
            <span v-if="wealth.wealthLv<10">{{lang.privilege[1].unlock}}</span>
          </p>
          <div class="svga">
            <div class="svga_hit">
              <svga-preview :url="svgaLevel" :avatarInfo="wealth.avatar" />
            </div>
          </div>
          <p class="tips">{{lang.privilege[1].tips}}</p>
          <ul class="pro_float_ul">
            <li v-for="(item,i) in 5" :key="i">
              <span>{{lang.proLevel[i]}}</span>
              <span><img :src="images[i+2]" alt=""></span>
            </li>
          </ul>
        </div>
      </div>
    </transition>

    <transition name="bounce">
      <div class="pro_service" v-if="pro_service_flag">
        <i @click="pro_service_flag=false" class="close_pro"></i>
        <div class="inner">
          <p class="title">
            <span>{{lang.privilege[2].title}}</span>
            <span v-if="wealth.wealthLv<30">{{lang.privilege[2].unlock}}</span>
          </p>
          <div class="service"></div>
          <p class="tips">{{lang.privilege[2].tips}}</p>
          <div class="call_service" v-if="wealth.wealthLv<30">{{lang.call}}</div>
          <div class="call_service act" v-else @click="chat()">{{lang.call}}</div>
        </div>
      </div>
    </transition>

  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import { getUrlString, getAppVer, getPlatform } from '../utils';
import { setFullScreen, setStatusBarStyle, getStatusBarHeight, callAppNew } from '../utils/navigation';
import { postMakeup } from "../apis"
import SvgaPreview from "../components/SvgaPreview";
const uid = getUrlString('uid');
const token = getUrlString('token');
const ios = navigator.userAgent.match(/iPhone|iPod|ios|iPad/i);

export default {
  data () {
    return {
      is_fix: false,
      navigatorHeight: 0,
      toast_flag: false,
      toast_tips: "",
      pro_level_flag: false,
      pro_float_flag: false,
      pro_service_flag: false,
      float_flag: 'float0',
      svgaArr: [
        'http://fstatic.cat1314.com/uc/svga/98cc296ae42ad7d9f0044889bb08c207_1612324293.svga',
        'http://fstatic.cat1314.com/uc/svga/62e5de7fe9fb145ac911c6a677d3a49e_1612324306.svga',
        'http://fstatic.cat1314.com/uc/svga/667fe883f269c70067ae83ef483aa27d_1612324316.svga',
        'http://fstatic.cat1314.com/uc/svga/3604e65ba11e636de52fa34773c7c98e_1612324328.svga',
        'http://fstatic.cat1314.com/uc/svga/aafa8100f4285171ca1b91f528e4b856_1612324339.svga'
      ],
      svgaUrl: '',
    };
  },
  created () {
    const pt = getPlatform();
    const ver = getAppVer();
    if ((pt == 'ios' && ver >= 165) || pt == 'android') {
      setFullScreen();
      this.navigatorHeight = getStatusBarHeight() + 'px';
    }
  },
  computed: {
    ...mapState(["loading", "wealth"]),
    // getLvImg(){

    //   return require('../img/lv1.png');
    // },
    getWidth () {
      var prev = this.wealth.cfg[this.wealth.wealthLv];
      var next = this.wealth.cfg[this.wealth.wealthLv + 1];
      // console.log(prev,next,this.wealth.wealthExp);
      var w = (this.wealth.wealthExp - prev) / (next - prev) * 6.9;
      if (w <= 0) {
        w = .2;
      }
      return w;
    },
    getLevel () {
      const _lv = this.wealth.wealthLv;
      if (_lv == 0) {
        return '0'
      }
      if (_lv > 0 && _lv < 10) {
        return '1'
      }
      if (_lv >= 10 && _lv < 20) {
        return '2'
      }
      if (_lv >= 20 && _lv < 30) {
        return '3'
      }
      if (_lv >= 30 && _lv < 40) {
        return '4'
      }
      if (_lv >= 40 && _lv < 50) {
        return '5'
      }
      if (_lv >= 50) {
        return '6'
      }
    },
    svgaLevel () {
      const _lv = this.wealth.wealthLv;
      // const _lv = 50;
      var i = 0;
      if (_lv > 0 && _lv < 10) {
        i = 0;
      }
      if (_lv >= 10 && _lv < 20) {
        i = 0;
      }
      if (_lv >= 20 && _lv < 30) {
        i = 1;
      }
      if (_lv >= 30 && _lv < 40) {
        i = 2;
      }
      if (_lv >= 40 && _lv < 50) {
        i = 3;
      }
      if (_lv >= 50) {
        i = 4;
      }
      return this.svgaArr[i];
      // console.log(this.svgaUrl);
    },
  },
  mounted () {
    this.$store.dispatch('getWealthCfg');
    // let htmlFont= (document.documentElement.style.fontSize);
    // console.log(htmlFont);
    window.addEventListener('scroll', () => {
      let htmlFont = parseInt(document.documentElement.style.fontSize);
      let top = document.documentElement.scrollTop || document.body.scrollTop || window.pageYOffset
      // console.log(this.navigatorHeight,top,htmlFont*1.2);
      // if (top >= htmlFont*1.2+ parseInt(this.navigatorHeight)) {
      if (top >= htmlFont * 1.2) {
        // console.log('asdfas');
        this.is_fix = true;
      } else {
        this.is_fix = false;
        // this.scrollTag = false
      }
    })
  },
  methods: {
    getIcon (id) {
      return require('../img/icon' + id + '.png')
    },
    getLvImg (id) {
      return require('../img/lv' + id + '.png');
    },
    getPro (id) {
      if (id == 0) {
        id = 1;
      }
      return require('../img/pro' + (id - 1) + '.png');
    },
    getProLevel (id) {
      return require('../img/pro_level' + id + '.png')
    },
    chat () {
      if (ios) {
        sendJsData('app://chat=10');
      } else {
        javascript: JSInterface.sendJsData('app://chat?toUid=10');
      }
    },
  },
  components: {
    SvgaPreview,
  }
};
</script>

<style lang="scss">
body {
  width: 7.5rem;
  background: linear-gradient(
    136deg,
    #381A53 0%,
    #252B68 15%,
    #381A53 47%,
    #252B68 100%
  );
  opacity: 1;
  padding-bottom: 0.5rem;
  line-height: 1;
}
.app_top {
  width: 100%;
  position: fixed;
  // background-color: red;
  top: 0;
  z-index: 2;
  &.app_top_fit {
    position: fixed;
    background-color: #2e1b4d;
  }
}
.mask {
  width: 7.5rem;
  height: 5.85rem;
  background: url('../img/mask.png') no-repeat;
  background-size: 100% 100%;
}
.con {
  // margin-top: 1.8rem;
  .top {
    .banner {
      // width: 2rem;
      // height: 2rem;
      // margin: 1.2rem auto;
      width: 2rem;
      height: 2rem;
      margin: 0rem auto 1.2rem;
      padding-top: 1.2rem;
      img {
        width: 100%;
      }
    }
    .progress_box {
      padding: 0 0.3rem;
      .lv {
        display: flex;
        justify-content: space-between;
        align-items: center;
        span:nth-of-type(1) {
          font-size: 0;
          strong {
            display: inline-block;
            vertical-align: middle;
          }
          strong:nth-of-type(1),
          strong:nth-of-type(3) {
            line-height: 0.4rem;
            font-weight: bold;
            font-size: 0.28rem;
            font-family: PingFang SC;
            color: #FFFFFF;
          }
          // strong:nth-of-type(2){
          //   width: 1px;
          //   height: .18rem;
          //   background: #D1D0DC;
          //   margin: 0 .1rem;
          // }
        }
        span:nth-of-type(2) {
          font-size: 0.28rem;
          font-family: PingFang SC;
          color: #BCBBC7;
        }
      }
      .progress {
        margin-top: 0.16rem;
        width: 6.9rem;
        height: 0.2rem;
        background: rgba(255, 255, 255, 0.1);
        border-radius: 0.16rem;
        position: relative;
        p {
          width: 0.2rem;
          height: 0.2rem;
          min-width: 0.2rem;
          background: linear-gradient(92deg, #FFFFFF 0%, #B2EFFF 100%);
          border-radius: 0.16rem;
          &.bg9 {
            background: linear-gradient(270deg, #259FFB 0%, #B2EFFF 100%);
          }
          &.bg10 {
            background: linear-gradient(322deg, #E3F9FB 0%, #14C0EB 100%);
          }
          &.bg20 {
            background: linear-gradient(322deg, #E3F7E8 0%, #21DAA7 100%);
          }
          &.bg30 {
            background: linear-gradient(322deg, #F9EDE1 0%, #F4D01E 100%);
          }
          &.bg40 {
            background: linear-gradient(322deg, #FCE7DB 0%, #E5481D 100%);
          }
          &.bg50 {
            background: linear-gradient(322deg, #F6E0DE 0%, #FF424F 100%);
          }
        }
      }
    }
  }

  .privilege {
    margin-top: 0.61rem;
    padding-bottom: 0.06rem;
    > p {
      padding: 0 0.3rem 0.3rem;
      font-size: 0.32rem;
      font-family: PingFang SC;
      font-weight: 600;
      line-height: 0.45rem;
      color: #FFFFFF;
    }
    .icon_box {
      padding: 0 0.45rem;
      font-size: 0;
      .list {
        display: inline-block;
        vertical-align: text-top;
        width: 2rem;
        height: 2.93rem;
        background: linear-gradient(
          180deg,
          rgba(114, 88, 254, 0) 0%,
          rgba(114, 88, 254, 0.2) 100%
        );
        margin: 0 0.3rem 0.2rem 0;
        border-radius: 0.2rem;
        > div {
          width: 2rem;
          height: 2.93rem;
          padding-bottom: 0.1rem;
          box-sizing: border-box;
        }
        .inner {
          width: 2rem;
          height: 2rem;
          display: flex;
          justify-content: center;
          box-sizing: border-box;
          .icon_lv {
            display: inline-block;
            width: 0.5rem;
            height: 0.5rem;
            position: relative;
          }
          span {
            display: inline-block;
            width: 0.67rem;
            height: 0.5rem;
            line-height: 0.5rem;
            background: linear-gradient(322deg, #8C8995 0%, #BCBBC7 100%);
            border-radius: 0px 0.25rem 0.25rem 0;
            margin-left: -0.25rem;
            font-size: 0.33rem;
            font-family: PingFang SC;
            font-weight: bold;
            color: #FFFFFF;
            box-sizing: border-box;
            text-align: center;
            padding-left: 0.16rem;
            &.gt {
              width: 0.87rem;
            }
            &.bg9 {
              background: linear-gradient(322deg, #4A85B2 0%, #7BABD2 100%);
            }
            &.bg10 {
              background: linear-gradient(322deg, #40ABA1 0%, #69C9D2 100%);
            }
            &.bg20 {
              background: linear-gradient(322deg, #4AC96C 0%, #94E9AB 100%);
            }
            &.bg30 {
              background: linear-gradient(322deg, #BF883B 0%, #E4C396 100%);
            }
            &.bg40 {
              background: linear-gradient(322deg, #CE7445 0%, #D29473 100%);
            }
            &.bg50 {
              background: linear-gradient(322deg, #C55451 0%, #D46B71 100%);
            }
          }
          .privilege_icon {
            width: 2rem;
            height: 1.6rem;
          }
          .privilege4 {
            width: 2rem;
            height: 2rem;
          }
          .float {
            width: 2rem;
            height: 0.88rem;
          }
        }
        .bottom {
          height: 1.13rem;
          text-align: center;
          // display: flex;
          // justify-content: center;
          // box-sizing: border-box;
          // align-items: flex-end;
          // flex-wrap: wrap;
        }
        p {
          text-align: center;
        }
        p:nth-of-type(1) {
          font-size: 0.28rem;
          font-family: PingFang SC;
          line-height: 0.4rem;
          color: #FFFFFF;
          line-height: 0.3rem;
          // height: .7rem;
        }
        p:nth-of-type(2) {
          font-size: 0.24rem;
          font-family: PingFang SC;
          line-height: 0.33rem;
          color: rgba(255, 255, 255, 0.3);
        }
      }
      .list:nth-of-type(1) {
        background-image: url('../img/icon_bg1.png');
        background-size: 100% 100%;
        .inner {
          padding-top: 0.75rem;
        }
      }
      .list:nth-of-type(2) {
        background: url('../img/icon_bg.png') no-repeat;
        background-size: 100% 100%;
        .inner {
          padding-top: 0.56rem;
        }
        p:nth-of-type(1) {
          line-height: 0.3rem;
        }
      }
      .list:nth-of-type(3) {
        margin-right: 0;
      }
      .list:nth-of-type(4) {
        .privilege4 {
          width: 2rem;
          height: 1.6rem;
          padding-bottom: 0;
          img {
            width: 2rem;
            height: 1.6rem;
          }
        }
        #p4 {
          height: 1.33rem;
          line-height: 1.33rem;
          padding: 0;
        }
      }
    }
  }

  .level_explain {
    margin-top: 0.4rem;
    padding: 0 0.3rem;
    .title {
      padding: 0 0rem 0.2rem;
      font-size: 0.32rem;
      font-family: PingFang SC;
      font-weight: 600;
      line-height: 0.45rem;
      color: #FFFFFF;
    }
    .tips {
      font-size: 0.26rem;
      font-family: PingFang SC;
      line-height: 0.46rem;
      color: #BCBBC7;
      i {
        color: #7A68F8;
      }
    }
    ul {
      margin-top: 0.46rem;
      li {
        font-size: 0.26rem;
        font-family: PingFang SC;
        line-height: 0.46rem;
        color: #BCBBC7;
      }
    }
  }

  .require {
    margin-top: 0.57rem;
    padding: 0 0.3rem;
    .title {
      padding: 0 0rem 0.3rem;
      font-size: 0.32rem;
      font-family: PingFang SC;
      font-weight: 600;
      line-height: 0.45rem;
      color: #FFFFFF;
    }
    .table {
      .type {
        width: 6.9rem;
        height: 0.88rem;
        background: rgba(255, 255, 255, 0.1);
        border-radius: 0.1rem 0.1rem 0 0;
        display: flex;
        justify-content: space-around;
        align-items: center;
        span {
          width: 33.33%;
          text-align: center;
          font-size: 0.26rem;
          font-family: PingFang SC;
          color: #FFFFFF;
        }
      }
      .val {
        ul {
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 0 0 0.1rem 0.1rem;
          li {
            height: 0.77rem;
            display: flex;
            justify-content: space-around;
            align-items: center;
            box-sizing: border-box;
            border-bottom: 1px solid rgba(255, 255, 255, 0.1);
            span {
              width: 33.33%;
              text-align: center;
              font-size: 0.26rem;
              font-family: PingFang SC;
              color: #BCBBC7;
            }
          }
          li:last-child {
            border: none;
          }
        }
      }
    }
  }
}

.svga_hit {
  width: 5.4rem;
  height: 3rem;
}

.pro_level,
.pro_float,
.pro_service {
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.4);
  z-index: 10000;
  display: flex;
  justify-content: center;
  align-items: center;
  .inner {
    width: 6rem;
    background: #FFFFFF;
    border-radius: 0.32rem;
    padding: 0.6rem 0 0.5rem 0;
    position: relative;
    z-index: 1;
    .title {
      text-align: center;
      span {
        display: block;
      }
      span:nth-of-type(1) {
        font-size: 0.36rem;
        font-family: PingFang SC;
        font-weight: bold;
        line-height: 0.42rem;
        color: #2C2B36;
      }
      span:nth-of-type(2) {
        font-size: 0.28rem;
        font-family: PingFang SC;
        line-height: 0.33rem;
        color: #999999;
        // padding-bottom: .1rem;
      }
    }
    .img {
      width: 5.4rem;
      height: 3rem;
      margin: 0.19rem auto 0;
      img {
        display: inline-block;
        width: 100%;
      }
    }
    .tips {
      padding: 0.3rem 0.3rem 0.21rem 0.3rem;
      font-size: 0.26rem;
      font-family: PingFang SC;
      line-height: 0.46rem;
      color: #2C2B36;
    }
    .pro_float_ul {
      width: 5.4rem;
      border: 1px solid #F7F7F7;
      border-radius: 0.1rem;
      margin: 0 auto;
      overflow: hidden;
      li {
        width: 5.4rem;
        height: 0.88rem;
        border-bottom: 1px solid #F7F7F7;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 0.07rem 0 0.3rem;
        box-sizing: border-box;
        span:nth-of-type(1) {
          font-size: 0.26rem;
          font-family: PingFang SC;
          color: #2C2B36;
        }
        span:nth-of-type(2) {
          width: 2rem;
          height: 0.88rem;
          img {
            width: 100%;
          }
        }
      }
      li:last-child {
        border: none;
      }
    }
    .pro_level_ul {
      width: 5.4rem;
      border: 1px solid #F7F7F7;
      border-radius: 0.1rem;
      margin: 0 auto;
      overflow: hidden;
      li {
        width: 5.4rem;
        height: 0.88rem;
        border-bottom: 1px solid #F7F7F7;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 0.3rem 0 0.3rem;
        box-sizing: border-box;
        span:nth-of-type(1) {
          font-size: 0.26rem;
          font-family: PingFang SC;
          color: #2C2B36;
        }
        span:nth-of-type(2) {
          width: 0.68rem;
          height: 0.3rem;
          img {
            width: 100%;
          }
        }
      }
      li:nth-of-type(1) {
        span:nth-of-type(2) {
          width: 0.56rem;
          height: 0.3rem;
        }
      }
      li:last-child {
        border: none;
      }
    }
  }
}

.pro_float {
  .inner {
    .svga {
      width: 5.4rem;
      height: 3rem;
      background: url('../img/pro_mask.png') no-repeat;
      background-size: 100% 100%;
      margin: 0.19rem auto 0;
    }
  }
}
.pro_service {
  .service {
    width: 5.4rem;
    height: 3rem;
    margin: 0.19rem auto 0;
    background: url('../img/service.png');
    background-size: 100% 100%;
  }
  .call_service {
    width: 4.2rem;
    height: 0.88rem;
    background: #D1D0DC;
    border-radius: 0.44rem;
    color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 auto;
    &.act {
      background: #7258FE;
    }
  }
}
.close_pro {
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  z-index: 0;
}

.toast {
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0);
  z-index: 10000;
  display: flex;
  justify-content: center;
  align-items: center;
  span {
    display: inline-block;
    padding: 0.2rem 0.7rem;
    max-width: 5rem;
    text-align: center;
    background: rgba(0, 0, 0, 0.8);
    border-radius: 0.12rem;
    font-size: 0.32rem;
    font-family: PingFang SC;
    color: #ffffff;
    z-index: 1;
  }
}
.bounce-enter-active {
  animation: bounce-in 0.5s;
}
.bounce-leave-active {
  animation: bounce-in 0.5s reverse;
}
@keyframes bounce-in {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
</style>