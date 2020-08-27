<template>
  <div class="box">
    <img src="../assets/img/header.png" alt="" class="header">
    <div class="before">
      <img src="../assets/img/img1.png" alt="" class="img1 tips">
    </div>
    <div class="before">
      <img src="../assets/img/img2.png" alt="" class="img2 tips">
    </div>
    <div class="before">
      <img src="../assets/img/img3.png" alt="" class="img3 tips">
    </div>
    <img src="../assets/img/img4.png" alt="" class="img4 tips">
    <img src="../assets/img/img5.png" alt="" class="img5">
  </div>
</template>

<script>

import getString from "../utils/getString"
import APP from "../utils/openApp"
import api from "../api/apiConfig"
import ActFooter from "../components/ActFooter"
import MsgToast from "../components/commonToast"
import { globalBus } from '../utils/eventBus'
export default {
  components: { MsgToast, ActFooter },
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
      // api.getDefault().then(res => {
      //   const { response_status, response_data } = res.data
      //   if (response_status.code == 0) {

      //   } else {
      //     this.toast(response_status.error)
      //   }
      // })
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
  background: url(../assets/img/banner.png) center 0 no-repeat;
  background-size: 100% auto;
  img {
    display: block;
    width: 100%;
  }
  .tips {
    width: 6.88rem;
    margin: 0.1rem auto;
  }
  .before {
    position: relative;
  }
  .before::before {
    content: "";
    display: block;
    width: 5.77rem;
    height: 1.06rem;
    background: url(../assets/img/liner.png);
    background-size: 100% 100%;
    position: absolute;
    left: 0.95rem;
    bottom: -0.5rem;
    z-index: 1000;
  }
  .img5 {
    margin-top: -0.6rem;
  }
}
</style>


