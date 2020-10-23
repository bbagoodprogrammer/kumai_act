<template>
  <div class="box">
    <div class="shareBar" v-if="isShare">
      <div class="bar" @click="downApp()"></div>
    </div>
    <div class="header">
      <span class="ruleTips" :class="{top:isShare}" @click="goRule()"></span>
    </div>
    <div class="wards">
      <i class="left" @click="rollAmi('left')"></i>
      <i class="right" @click="rollAmi('right')"></i>
      <div class="gifts" ref="giftBox">
        <div class="gItem" v-for="(item,index) in wardsArr" :key="index">
          <div class="imgbox">
            <div class="bg"></div>
            <img :src="item.img" alt="">
          </div>
          <strong>{{item.name}}</strong>
        </div>
      </div>
    </div>
    <div class="tabs">
      <span class="title1" :class="{act:tab_index == 'Stars'}" @click="tabClick('Stars')"><i></i></span>
      <span class="title2" :class="{act:tab_index == 'People'}" @click="tabClick('People')"> <i></i> </span>
    </div>
    <keep-alive>
      <component :is="tab_index"></component>
    </keep-alive>

    <!-- <Stars /> -->
    <!-- <act-footer></act-footer> -->
    <div href="" class="refresh circle" @click.prevent="refrsh()" :style="{transform:'rotate('+rotatePx+'deg)'}"></div>
  </div>
</template>

<script>

import getString from "../utils/getString"
import APP from "../utils/openApp"
import api from "../api/apiConfig"
import ActFooter from "../components/ActFooter"
import MsgToast from "../components/commonToast"
import { globalBus } from '../utils/eventBus'
import Stars from "../components/Stars"
import People from "../components/people"


export default {
  components: { MsgToast, ActFooter, Stars, People },
  data() {
    return {
      isShare: false, //是否分享
      isMore: true,   //加载更多
      activite: 1,    //活动状态
      showT: false,  //提示弹窗显示
      tastMsg: "提示信息",  //基础弹窗提示信息
      userState: 0,   //用户状态（是否报名）
      rotatePx: 0,    //刷新旋转动画
      rotatec: 0,
      wardsArr: [
        {
          img: '',
          name: 'xxxxxx'
        },
        {
          img: '',
          name: 'xxxxxx'
        },
        {
          img: '',
          name: 'xxxxxx'
        },
        {
          img: '',
          name: 'xxxxxx'
        },
        {
          img: '',
          name: 'xxxxxx'
        },
        {
          img: '',
          name: 'xxxxxx'
        },
        {
          img: '',
          name: 'xxxxxx'
        },
        {
          img: '',
          name: 'xxxxxx'
        },
        {
          img: '',
          name: 'xxxxxx'
        },
        {
          img: '',
          name: 'xxxxxx'
        },
        {
          img: '',
          name: 'xxxxxx'
        },
        {
          img: '',
          name: 'xxxxxx'
        },
        {
          img: '',
          name: 'xxxxxx'
        },
        {
          img: '',
          name: 'xxxxxx'
        }
      ],
      tab_index: 'Stars',
      timer: null
    }
  },
  created() {
    this.judgeShare()  //判断是否为分享环境,请求相应的接口 
    this.getDefaultData()
  },
  mounted() {
  },
  methods: {
    judgeShare() {//判断是否为分享环境,请求相应的接口 
      this.isShare = getString('token') ? false : true
      this.vxc('setShareState', this.isShare) //分享状态
    },
    getDefaultData(val) { //初始化
      api.getDefault().then(res => {
        const { response_status, response_data } = res.data
        if (response_status.code == 0) {
          const { data_list, list, uinfo } = response_data
          this.vxc('setActList', list)
          let obj = {
            a_index: 0,
            data_list
          }
          this.vxc('setDataList', obj)
          this.vxc('setUserMsg', uinfo)
        } else {
          this.toast(response_status.error)
        }
      })
    },
    tabClick(val) {
      this.tab_index = val
    },
    rollAmi(t) {
      clearInterval(this.timer)
      let scorllEnd = document.getElementsByClassName('gItem')[0].getBoundingClientRect().width * 2
      let scorllLeft = this.$refs.giftBox.scrollLeft
      let c = t == 'right' ? scorllEnd : -scorllEnd
      this.timer = setInterval(() => {
        scorllLeft = this.$refs.giftBox.scrollLeft
        this.$refs.giftBox.scrollTo(scorllLeft + (c / 6), 0)
        c -= c / 6
        if ((t == 'left' && c > -10) || (t == 'right' && c < 1)) {
          clearInterval(this.timer)
        }
      }, 25)
    },
    downApp() {
      APP()
    },
    goRule() {
      let regstr = getString('token')
      location.href = `./index2.html?token=${regstr}`
    },
    refrsh() { //刷新
      this.rotatePx = 540 * ++this.rotatec  //旋转动画
      window.removeEventListener("scroll", this.onScroll)
      this.getDefaultData('ref')
    }
  }
}
</script>
<style lang='scss'>
body::-webkit-scrollbar {
  width: 0;
}
.box {
  max-width: 750px;
  overflow-x: hidden;
  position: relative;
  margin: auto;
  // background:url(../assets/img/主视觉.png) center 0 no-repeat;
  background-size: 100% auto;
  .shareBar {
    position: fixed;
    z-index: 1000;
    top: 0;
    left: 0;
    right: 0;
    text-align: center;
    .bar {
      width: 7.5rem;
      height: 1.2rem;
      margin: auto;
      background: url(../assets/img/share_bar.png) no-repeat;
      background-size: 100% 100%;
    }
  }
  .header {
    height: 9.16rem;
    position: relative;
    .ruleTips {
      width: 1.7rem;
      height: 0.56rem;
      // background: url(../assets/img/ruleTips.png);
      background-size: 100% 100%;
      position: absolute;
      right: 0;
      top: 0.17rem;
      &.top {
        top: 1.5rem;
      }
    }
  }
  .wards {
    width: 6.49rem;
    height: 3.67rem;
    background: url(../assets/img/wards.png) no-repeat;
    background-size: 100% 100%;
    margin: 0 auto;
    position: relative;
    .left {
      display: block;
      width: 0.78rem;
      height: 0.79rem;
      background: url(../assets/img/left.png);
      background-size: 100% 100%;
      position: absolute;
      top: 1.81rem;
      left: -0.27rem;
    }
    .right {
      display: block;
      width: 0.78rem;
      height: 0.79rem;
      background: url(../assets/img/right.png);
      background-size: 100% 100%;
      position: absolute;
      top: 1.81rem;
      right: -0.27rem;
    }
    .gifts {
      width: 5.4rem;
      height: 2rem;
      white-space: nowrap;
      overflow-x: scroll;
      position: absolute;
      top: 1.42rem;
      left: 0.56rem;
      .gItem {
        display: inline-block;
        width: 1.3rem;
        margin-right: 0.21rem;
        .imgbox {
          width: 1.3rem;
          height: 1.3rem;
          position: relative;
          .bg {
            width: 100%;
            height: 100%;
            position: absolute;
            background: url(../assets/img/giftBg.png);
            background-size: 100% 100%;
          }
          img {
            width: 100%;
            height: 100%;
            position: absolute;
          }
        }
        strong {
          display: block;
          text-align: center;
        }
      }
    }
    .gifts::-webkit-scrollbar {
      display: none;
    }
  }
  .tabs {
    display: flex;
    align-items: center;
    width: 6.86rem;
    height: 0.78rem;
    background: url(../assets/img/tabs.png) no-repeat;
    background-size: 100% 100%;
    margin: 0.8rem auto 0.4rem;
    span {
      flex: 1;
      height: 100%;
      text-align: center;
      line-height: 0.78rem;
      display: flex;
      align-items: center;
      justify-content: center;
      &.title1 {
        i {
          width: 1.41rem;
          height: 0.34rem;
          background: url(../assets/img/tabTitle1.png) no-repeat;
          background-size: 100% 100%;
        }
        &.act {
          background: url(../assets/img/actTabs.png) no-repeat;
          background-size: 100% 100%;
          i {
            background: url(../assets/img/tabTitle2.png) no-repeat;
            background-size: 100% 100%;
          }
        }
      }
      &.title2 {
        i {
          width: 1.41rem;
          height: 0.34rem;
          background: url(../assets/img/tabTitle3.png) no-repeat;
          background-size: 100% 100%;
        }
        &.act {
          background: url(../assets/img/actTabs.png) no-repeat;
          background-size: 100% 100%;
          i {
            background: url(../assets/img/tabTitle4.png) no-repeat;
            background-size: 100% 100%;
          }
        }
      }
    }
  }
  .guaBox {
    position: relative;
  }
}
.refresh {
  display: block;
  width: 0.94rem;
  height: 1rem;
  position: fixed;
  left: 0.08rem;
  bottom: 1.35rem;
  background: url(../assets/img/refresh.png) no-repeat;
  background-size: contain;
  transition: transform 1s;
  z-index: 1000;
}
</style>


