<template>
  <div class="box" :class="{bg:!showBannerBg}">
    <canvas id="bannerBg" v-show="!showBannerBg"></canvas>
    <div class="shareBar" v-if="isShare">
      <div class="bar" @click="downApp()"></div>
    </div>
    <div class="header">

      <div class="tipsBox">
        <span class="ruleTips" :class="{top:isShare}" @click="goRule()">活動攻略 <i class="arr"></i></span>
        <span class="ruleTips" :class="{top:isShare}" @click="goDays()">簽到日曆 <i class="arr"></i></span>
      </div>
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
      <component :is="tab_index" ref="contant"></component>
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

import { Downloader, Parser, Player } from 'svga.lite'

const downloader = new Downloader()
const parser = new Parser({ disableWorker: true })

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
      showBannerBg: true,
      wardsArr: [
        {
          img: require('../assets/img/gifts/1.png'),
          name: '現金大獎'
        },
        {
          img: require('../assets/img/gifts/2.png'),
          name: '四位專屬靚號'
        },
        {
          img: require('../assets/img/gifts/3.png'),
          name: '人物認證'
        },
        {
          img: require('../assets/img/gifts/4.png'),
          name: '人物徽章'
        },
        {
          img: require('../assets/img/gifts/5.png'),
          name: '高級頭飾'
        },
        {
          img: require('../assets/img/gifts/6.png'),
          name: '封面邊框'
        },
        {
          img: require('../assets/img/gifts/7.png'),
          name: '禮物冠名權'
        },
        {
          img: require('../assets/img/gifts/8.png'),
          name: '家族主頁背景'
        },
        {
          img: require('../assets/img/gifts/9.png'),
          name: '珍稀禮物'
        },
        {
          img: require('../assets/img/gifts/10.png'),
          name: '紅毯座駕'
        },
        {
          img: require('../assets/img/gifts/11.png'),
          name: '海量金幣'
        },
        {
          img: require('../assets/img/gifts/12.png'),
          name: '海量金豆'
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
    this.bannerGo()
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
          let data = data_list
          // [
          //   {                act_id: 0, name: "人物評選", stime: "2020-11-15 18:00:00", etime: "2020-11-27 20:00:00", show: true, list: [
          //       [
          //         {
          //           "uid": "100861",
          //           "avatar": "http://img.17sing.tw/uc/img/head_100861_1543577175.png_small",
          //           "nick": "ＭＩＮＧＦＵＮＮＮＮ",
          //           "rank": 1,
          //           uid: 1111
          //         }
          //       ],
          //       [
          //         {
          //           "uid": "100861",
          //           "avatar": "http://img.17sing.tw/uc/img/head_100861_1543577175.png_small",
          //           "nick": "ＭＩＮＧＦＵＮＮＮＮ",
          //           "rank": 1
          //         }
          //       ],
          //       [
          //         {
          //           "uid": "100861",
          //           "avatar": "http://img.17sing.tw/uc/img/head_100861_1543577175.png_small",
          //           "nick": "ＭＩＮＧＦＵＮＮＮＮ",
          //           "rank": 1
          //         }
          //       ],
          //       [
          //         {
          //           "uid": "100861",
          //           "avatar": "http://img.17sing.tw/uc/img/head_100861_1543577175.png_small",
          //           "nick": "ＭＩＮＧＦＵＮＮＮＮ",
          //           "rank": 1
          //         }
          //       ]
          //     ]              },
          //   { act_id: 1, name: "嘉年華", stime: "2020-01-09 18:00:00", etime: "2020-01-18 20:00:00" },
          //   {                act_id: 2, name: "魅力歌王大賽", stime: "2020-01-13 12:00:00", etime: "2020-01-22 23:00:00", show: true, list: [
          //       [
          //         {
          //           "uid": "100861",
          //           "avatar": "http://img.17sing.tw/uc/img/head_100861_1543577175.png_small",
          //           "nick": "ＭＩＮＧＦＵＮＮＮＮ",
          //           "rank": 1,
          //           uid: 1111
          //         },
          //         {
          //           "uid": "100861",
          //           "avatar": "http://img.17sing.tw/uc/img/head_100861_1543577175.png_small",
          //           "nick": "ＭＩＮＧＦＵＮＮＮＮ",
          //           "rank": 2,
          //           uid: 1111
          //         },
          //         {
          //           "uid": "100861",
          //           "avatar": "http://img.17sing.tw/uc/img/head_100861_1543577175.png_small",
          //           "nick": "ＭＩＮＧＦＵＮＮＮＮ",
          //           "rank": 3,
          //           uid: 1111
          //         }
          //       ],
          //     ]              },
          //   {                act_id: 3, name: "K房男神女神", stime: "2020-01-17 18:00:00", etime: "2020-01-24 20:00:00", show: true, list: [
          //       [
          //         {
          //           "uid": "100861",
          //           "avatar": "http://img.17sing.tw/uc/img/head_100861_1543577175.png_small",
          //           "nick": "ＭＩＮＧＦＵＮＮＮＮ",
          //           "rank": 1,
          //           uid: 1111
          //         },
          //         {
          //           "uid": "100861",
          //           "avatar": "http://img.17sing.tw/uc/img/head_100861_1543577175.png_small",
          //           "nick": "ＭＩＮＧＦＵＮＮＮＮ",
          //           "rank": 2,
          //           uid: 1111
          //         },
          //         {
          //           "uid": "100861",
          //           "avatar": "http://img.17sing.tw/uc/img/head_100861_1543577175.png_small",
          //           "nick": "ＭＩＮＧＦＵＮＮＮＮ",
          //           "rank": 3,
          //           uid: 1111
          //         }
          //       ],
          //       [
          //         {
          //           "uid": "100861",
          //           "avatar": "http://img.17sing.tw/uc/img/head_100861_1543577175.png_small",
          //           "nick": "ＭＩＮＧＦＵＮＮＮＮ",
          //           "rank": 1,
          //           uid: 1111
          //         },
          //         {
          //           "uid": "100861",
          //           "avatar": "http://img.17sing.tw/uc/img/head_100861_1543577175.png_small",
          //           "nick": "ＭＩＮＧＦＵＮＮＮＮ",
          //           "rank": 2,
          //           uid: 1111
          //         },
          //         {
          //           "uid": "100861",
          //           "avatar": "http://img.17sing.tw/uc/img/head_100861_1543577175.png_small",
          //           "nick": "ＭＩＮＧＦＵＮＮＮＮ",
          //           "rank": 3,
          //           uid: 1111
          //         }
          //       ],
          //     ]              },
          //   {                act_id: 4, name: "C位爭奪賽", stime: "2020-01-19 14:30:00", etime: "2020-01-27 19:00:00", show: true, list: [
          //       [
          //         {
          //           "uid": "100861",
          //           "avatar": "http://img.17sing.tw/uc/img/head_100861_1543577175.png_small",
          //           "nick": "ＭＩＮＧＦＵＮＮＮＮ",
          //           "rank": 1,
          //           uid: 1111
          //         },
          //         {
          //           "uid": "100861",
          //           "avatar": "http://img.17sing.tw/uc/img/head_100861_1543577175.png_small",
          //           "nick": "ＭＩＮＧＦＵＮＮＮＮ",
          //           "rank": 2,
          //           uid: 1111
          //         },
          //         {
          //           "uid": "100861",
          //           "avatar": "http://img.17sing.tw/uc/img/head_100861_1543577175.png_small",
          //           "nick": "ＭＩＮＧＦＵＮＮＮＮ",
          //           "rank": 3,
          //           uid: 1111
          //         }
          //       ],
          //     ]              },
          //   {                act_id: 5, name: "主持人巔峰戰", stime: "2020-02-07 20:00:00", etime: "2020-02-07 23:00:00", rank_keys: [], show: true, list: [
          //       [
          //         {
          //           "uid": "100861",
          //           "avatar": "http://img.17sing.tw/uc/img/head_100861_1543577175.png_small",
          //           "nick": "ＭＩＮＧＦＵＮＮＮＮ",
          //           "rank": 1,
          //           uid: 1111
          //         },
          //         {
          //           "uid": "100861",
          //           "avatar": "http://img.17sing.tw/uc/img/head_100861_1543577175.png_small",
          //           "nick": "ＭＩＮＧＦＵＮＮＮＮ",
          //           "rank": 2,
          //           uid: 1111
          //         },
          //         {
          //           "uid": "100861",
          //           "avatar": "http://img.17sing.tw/uc/img/head_100861_1543577175.png_small",
          //           "nick": "ＭＩＮＧＦＵＮＮＮＮ",
          //           "rank": 3,
          //           uid: 1111
          //         }
          //       ],
          //     ]              },
          //   {                act_id: 6, name: "最強音", stime: "2020-02-07 20:00:00", etime: "2020-02-07 23:00:00", rank_keys: [], show: true, list: [
          //       [
          //         {
          //           "uid": "100861",
          //           "avatar": "http://img.17sing.tw/uc/img/head_100861_1543577175.png_small",
          //           "nick": "ＭＩＮＧＦＵＮＮＮＮ",
          //           "rank": 1,
          //           uid: 1111
          //         },
          //         {
          //           "uid": "100861",
          //           "avatar": "http://img.17sing.tw/uc/img/head_100861_1543577175.png_small",
          //           "nick": "ＭＩＮＧＦＵＮＮＮＮ",
          //           "rank": 2,
          //           uid: 1111
          //         },
          //         {
          //           "uid": "100861",
          //           "avatar": "http://img.17sing.tw/uc/img/head_100861_1543577175.png_small",
          //           "nick": "ＭＩＮＧＦＵＮＮＮＮ",
          //           "rank": 3,
          //           uid: 1111
          //         }
          //       ],
          //     ]              },
          //   {                act_id: 7, name: "最強家族戰", stime: "2020-02-07 20:00:00", etime: "2020-02-07 23:00:00", rank_keys: [], show: true, list: [
          //       [
          //         {
          //           "uid": "100861",
          //           "avatar": "http://img.17sing.tw/uc/img/head_100861_1543577175.png_small",
          //           "nick": "ＭＩＮＧＦＵＮＮＮＮ",
          //           "rank": 1,
          //           uid: 1111
          //         },
          //         {
          //           "uid": "100861",
          //           "avatar": "http://img.17sing.tw/uc/img/head_100861_1543577175.png_small",
          //           "nick": "ＭＩＮＧＦＵＮＮＮＮ",
          //           "rank": 2,
          //           uid: 1111
          //         },
          //         {
          //           "uid": "100861",
          //           "avatar": "http://img.17sing.tw/uc/img/head_100861_1543577175.png_small",
          //           "nick": "ＭＩＮＧＦＵＮＮＮＮ",
          //           "rank": 3,
          //           uid: 1111
          //         }
          //       ],
          //     ]              },
          //   { act_id: 8, name: "演唱會", stime: "2020-02-07 20:00:00", etime: "2020-02-07 23:00:00", rank_keys: [] }
          // ]
          this.vxc('setActList', list)
          let obj = {
            a_index: 0,
            data_list
          }
          this.vxc('setDataList', obj)
          this.vxc('setUserMsg', uinfo)
          // if (val) {
          //   setTimeout(() => {
          //     this.$refs.contant.aning = true
          //     this.$refs.contant.startAni(2000)
          //   }, 1000)
          // }
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
    goDays() {
      let regstr = getString('token')
      location.href = `./index3.html?token=${regstr}`
    },
    refrsh() { //刷新
      this.rotatePx = 540 * ++this.rotatec  //旋转动画
      this.$refs.contant.clearTimer()
      this.$refs.contant.aning = false
      window.removeEventListener("scroll", this.onScroll)
      this.getDefaultData('ref')
    },
    async bannerGo() {
      let canvas = document.getElementById('bannerBg')
      const fileData = await downloader.get(`	http://fstatic.cat1314.com/uc/anner/4491cbb331779c06beee636dac7637ff_1605146717banner`);
      const data = await parser.do(fileData);
      let player = new Player(canvas)
      await player.mount(data)
      this.showBannerBg = false
      player.start()
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
  background: url(../assets/img/banner.png) center 0 no-repeat;
  background-size: 100% auto;
  padding-bottom: 2rem;
  &.bg {
    background: url(../assets/img/banner1.png) center 0 no-repeat;
    background-size: 100% auto;
  }
  #bannerBg {
    width: 7.5rem;
    height: auto;
    position: absolute;
    top: 0;
    left: 0;
  }
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
    height: 7.43rem;
    position: relative;
    .tipsBox {
      position: absolute;
      right: 0;
      top: 5.84rem;
      .ruleTips {
        display: block;
        width: 1.76rem;
        height: 0.79rem;
        text-indent: 0.3rem;
        background: url(../assets/img/tips.png);
        background-size: 100% 100%;
        text-align: center;
        color: rgba(69, 28, 31, 1);
        font-size: 0.28rem;
        font-weight: 600;
        display: flex;
        align-items: flex-start;
        line-height: 0.6rem;
        justify-content: center;
        i {
          width: 0.24rem;
          height: 0.23rem;
          background: url(../assets/img/arr.png);
          background-size: 100% 100%;
          margin: 0.19rem 0 0 0.06rem;
        }
      }
    }
  }
  .wards {
    width: 6.94rem;
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
      width: 5.85rem;
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
          width: 120%;
          margin-left: -0.13rem;
          font-size: 0.2rem;
          color: rgba(255, 234, 170, 1);
          display: block;
          text-align: center;
          margin-top: 0.15rem;
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
    justify-content: space-between;
    width: 6.76rem;
    height: 0.88rem;
    padding: 0 0.05rem;
    background: url(../assets/img/tabs.png) no-repeat;
    background-size: 100% 100%;
    margin: 0.8rem auto 0;
    span {
      width: 3.36rem;
      height: 0.78rem;
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
  right: 0.08rem;
  bottom: 1.35rem;
  background: url(../assets/img/refresh.png) no-repeat;
  background-size: contain;
  transition: transform 1s;
  z-index: 1000;
}
</style>


