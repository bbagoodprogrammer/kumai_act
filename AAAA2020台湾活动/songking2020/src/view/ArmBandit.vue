<template>
  <div class="box">
    <div class="shareBar" v-if="isShare">
      <div class="bar" @click="downApp()"></div>
    </div>
    <div class="header">
      <div class="tipsBox">
        <span class="ruleTips ruleTips2" :class="{top:isShare}" @click="goMain()"></span>
        <span class="ruleTips" :class="{top:isShare}" @click="goRule()"></span>
      </div>
    </div>
    <TrunMsg />
    <Box />
    <RedPackets />
    <TabsScrollLoadList ref="scorll" />
    <act-footer></act-footer>
    <!-- <div href="" class="refresh circle" @click.prevent="refrsh()" :style="{transform:'rotate('+rotatePx+'deg)'}"></div> -->
  </div>
</template>

<script>

import getString from "../utils/getString"
import APP from "../utils/openApp"
import api from "../api/apiConfig"
import ActFooter from "../components/ActFooter"
import MsgToast from "../components/commonToast"
import { globalBus } from '../utils/eventBus'
import TrunMsg from "../components/TrunMsg"
import Box from "../components/Box"
import RedPackets from "../components/RedPackets"
import TabsScrollLoadList from "../components/TabsScrollLoadList"
export default {
  components: { MsgToast, ActFooter, TrunMsg, Box, RedPackets, TabsScrollLoadList },
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
          const { step, reg, packet, redPacket, naming, owner, notice } = response_data
          this.vxc('setActStatus', step)
          this.vxc("changGroupsUserMsg", {//初始当前日榜个人信息
            key: 'total',
            msg: owner
          })
          this.vxc('setReg', reg)
          this.vxc('setPacket', packet
            // {
            //   "level": 2, //我的等级
            //   "score": 3000, //闪耀值
            //   "levels": { // 宝箱等级配置 等级 => 分值
            //     "1": 100,
            //     "2": 1000,
            //     "3": 10000,
            //     "4": 50000,
            //     "5": 100000
            //   },
            //   "prizes": { // 宝箱等级奖励
            //     "1": [
            //       {
            //         "id": 1,
            //         "name": "放飛心情",
            //         "image": "http://img.17sing.tw/uc/gift/old/1.png",
            //         "type": "gift",
            //         "count": 2,
            //         "coin": 1, // 礼物价值
            //         "day": 14
            //       },
            //       {
            //         "type": "coupon", // 储值返利券
            //         "id": 1,
            //         "ratio": 1, // 返利比例
            //         "day": 14
            //       },
            //       {
            //         "type": "vip",
            //         "day": 2
            //       },
            //       {
            //         "type": "bean",
            //         "count": 100
            //       }
            //     ],
            //     "2": [
            //       {
            //         "id": 1,
            //         "name": "放飛心情",
            //         "image": "http://img.17sing.tw/uc/gift/old/1.png",
            //         "type": "gift",
            //         "count": 2,
            //         "coin": 3,
            //         "day": 14
            //       },
            //       {
            //         "type": "coupon",
            //         "id": 1,
            //         "ratio": 1,
            //         "day": 14
            //       },
            //       {
            //         "type": "vip",
            //         "day": 3
            //       },
            //       {
            //         "type": "bean",
            //         "count": 150
            //       }
            //     ],
            //     "3": [
            //       {
            //         "id": 1,
            //         "name": "放飛心情",
            //         "image": "http://img.17sing.tw/uc/gift/old/1.png",
            //         "type": "gift",
            //         "count": 2,
            //         "coin": 18,
            //         "day": 14
            //       },
            //       {
            //         "type": "coupon",
            //         "id": 1,
            //         "ratio": 2,
            //         "day": 14
            //       },
            //       {
            //         "type": "vip",
            //         "day": 5
            //       },
            //       {
            //         "type": "coin",
            //         "count": 10
            //       }
            //     ],
            //     "4": [
            //       {
            //         "id": 1,
            //         "name": "放飛心情",
            //         "image": "http://img.17sing.tw/uc/gift/old/1.png",
            //         "type": "gift",
            //         "count": 2,
            //         "coin": 68,
            //         "day": 14
            //       },
            //       {
            //         "type": "coupon",
            //         "id": 1,
            //         "ratio": 2,
            //         "day": 14
            //       },
            //       {
            //         "type": "vip",
            //         "day": 7
            //       },
            //       {
            //         "type": "coin",
            //         "count": 30
            //       }
            //     ],
            //     "5": [
            //       {
            //         "id": 1,
            //         "name": "放飛心情",
            //         "image": "http://img.17sing.tw/uc/gift/old/1.png",
            //         "type": "gift",
            //         "count": 2,
            //         "coin": 128,
            //         "day": 14
            //       },
            //       {
            //         "type": "coupon",
            //         "id": 1,
            //         "ratio": 3,
            //         "day": 14
            //       },
            //       {
            //         "type": "vip",
            //         "day": 9
            //       },
            //       {
            //         "type": "coin",
            //         "count": 100
            //       }
            //     ]
            //   },
            //   "status": { // 宝箱开启状态 等级 => 状态
            //     "1": 1,
            //     "2": 0,
            //     "3": 0,
            //     "4": 0,
            //     "5": 0
            //   }
            // }
          )
          this.vxc('setRedPacket', redPacket
            //  { // 红包信息
            //   "total": 1088, // 每个红包金币数
            //   "step": 100, // 每轮爆红包收礼数
            //   "current": 0, // 当前轮收礼进度
            //   "subscribe": false, // 是否预约了红包提醒
            //   "status": 3, // 红包状态 1倒计时 2可抢 3抢完 0其它
            //   "time": 5, // 有红包开抢前3分钟倒计时（单位：秒）
            //   "coins": 0, // 本轮已抢得金币数
            //   "size": 0, // 红包剩余量
            //   "lose": false, // 没有抢到
            //   "hide": false, // 是否主动关闭了红包弹窗
            //   "record": [ // 本轮收礼前30名用户动态
            //     {
            //       "uid": 100880,
            //       "nick": "啾咪、欣戀撒大大大大大所多",
            //       "avatar": "http://img.17sing.tw/uc/img/head_100880_1591328073.png_small",
            //       "sex": 0,
            //       "noble": 100,
            //       "frame": "http://img.17sing.tw/uc/avatarFrame/resource_url_1589524839.png",
            //       "count": 100
            //     },
            //     {
            //       "uid": 100880,
            //       "nick": "啾咪、欣戀撒大大大大大所多",
            //       "avatar": "http://img.17sing.tw/uc/img/head_100880_1591328073.png_small",
            //       "sex": 0,
            //       "noble": 100,
            //       "frame": "http://img.17sing.tw/uc/avatarFrame/resource_url_1589524839.png",
            //       "count": 100
            //     },
            //     {
            //       "uid": 100880,
            //       "nick": "啾咪、欣戀撒大大大大大所多",
            //       "avatar": "http://img.17sing.tw/uc/img/head_100880_1591328073.png_small",
            //       "sex": 0,
            //       "noble": 100,
            //       "frame": "http://img.17sing.tw/uc/avatarFrame/resource_url_1589524839.png",
            //       "count": 100
            //     }
            //   ]
            // }
          )
          this.vxc('setNaming', naming)
          this.vxc('setUserMsg', owner)
          this.vxc('setNotice', notice)
        } else {
          this.toast(response_status.error)
        }
      })
    },
    downApp() {
      APP()
    },
    goRule() {
      let regstr = getString('token')
      location.href = `./index2.html?token=${regstr}`
    },
    goMain() {
      let regstr = getString('token')
      let uid = getString('uid')
      let aid = getString('aid')
      location.href = `/static_html/2020/ceremony202000/index.html?token=${regstr}&uid=${uid}&aid=${aid}`
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
  background: RGBA(34, 33, 30, 1) url(../assets/img/banner.png) center 0
    no-repeat;
  background-size: 100% auto;
  padding-bottom: 2rem;
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
    height: 7.34rem;
    position: relative;
    .tipsBox {
      position: absolute;
      right: 0;
      top: 1rem;
      .ruleTips {
        display: block;
        width: 1.97rem;
        height: 0.56rem;
        background: url(../assets/img/ruleTips1.png);
        background-size: 100% 100%;
        &.ruleTips2 {
          background: url(../assets/img/ruleTips2.png);
          background-size: 100% 100%;
          margin-bottom: 0.15rem;
        }
      }
      &.top {
        top: 1.5rem;
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


