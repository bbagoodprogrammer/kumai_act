<template>
  <div class="box">
    <div class="shareBar" v-if="isShare">
      <div class="bar" @click="downApp()"></div>
    </div>
    <div class="header">
      <div class="tipsBox" :class="{top:isShare}">
        <span class="ruleTips" @click="showRules()">{{lang.rules}}</span>
        <span class="ruleTips" @click="goBar()" v-if="is_admin">{{lang.myAct}}</span>
        <span class="ruleTips" @click="goRank()">BXH Party</span>
      </div>
      <div class="actTitle"></div>
      <div class="giftTips" :class="{act:giftStates != 2}" @click="getGift()"></div>
    </div>
    <Actlist />
    <act-footer></act-footer>
    <!-- <div class="mask" v-show="showRule">
      <transition name="slide">
        <div class="rules" v-if="showRule">
          <i class="close" @click="closeRule()"></i>
          <div class="type1" v-if="is_admin">
            <h6>Cách mở tiệc:</h6>
            <p>1. Chủ phòng hoặc quản lý phòng Kara có thể đăng ký mở tiệc, nhấn [Đăng ký] và điền thông tin yêu cầu, nhấn gửi để đăng ký mở tiệc, cần đăng ký trước khi mở tiệc từ 5 – 30 ngày, mỗi bữa tiệc kéo dài từ 1 – 3 giờ, mỗi phòng 1 tháng được tổ chức tối đa 4 lần.</p>
            <p>2. Nếu muốn người tham dự phải báo danh trước hãy chọn [Cần báo danh], danh sách xem tại [Tiệc của tôi]</p>
            <p>3. Sau khi gửi thông tin đăng ký vui lòng đợi kết quả từ ban điều hành, chi tiết xem tại [Tiệc của tôi]</p>
            <p>4. Nhấn chỉnh sửa tại [Tiệc của tôi] để điều chỉnh thông tin tiệc nếu vẫn chưa được duyệt, tiệc đã được duyệt sẽ không thể chỉnh sửa.</p>
            <p>5. Tiệc chưa được duyệt có thể chỉnh sửa 1 lần, sau khi sửa và gửi lại nếu vẫn không được duyệt sẽ không được chỉnh sửa nữa.</p>
            <h6>Cách dự tiệc:</h6>
            <p>1. Nhấn theo dõi để nhận được thông báo trước khi tiệc bắt đầu 5 phút, đừng bỏ lỡ chương trình đặc sắc.</p>
            <p>2. Để tham dự tiệc cần báo danh phải nhấn báo danh và điền thông tin, người tổ chức sẽ liên hệ bạn để thông báo kết quả, nếu được duyệt sẽ có thể tham gia sự kiện.</p>
            <p>3. Tích cực chia sẻ và theo dõi để thu hút càng nhiều khán giả tham dự tiệc.</p>
            <p>4. Nội dung tiệc do người tổ chức quyết định, nếu có thắc mắc mời liên hệ người tổ chức.
              Quyết định của ban tổ chức là quyết định cuối cùng</p>
            <p class="lastTips">Quyết định của ban tổ chức là quyết định cuối cùng</p>
          </div>
          <div class="type2" v-else>
            <h6>Cách dự tiệc:</h6>
            <p>1. Nhấn theo dõi để nhận được thông báo trước khi tiệc bắt đầu 5 phút, đừng bỏ lỡ chương trình đặc sắc.</p>
            <p>2. Để tham dự tiệc cần báo danh phải nhấn báo danh và điền thông tin, người tổ chức sẽ liên hệ bạn để thông báo kết quả, nếu được duyệt sẽ có thể tham gia sự kiện.</p>
            <p>3. Tích cực chia sẻ và theo dõi để thu hút càng nhiều khán giả tham dự tiệc.</p>
            <p>4. Nội dung tiệc do người tổ chức quyết định, nếu có thắc mắc mời liên hệ người tổ chức.
              Quyết định của ban tổ chức là quyết định cuối cùng</p>
            <p class="lastTips">Quyết định của ban tổ chức là quyết định cuối cùng</p>
          </div>
        </div>
      </transition>
    </div> -->
    <div class="mask" v-show="showGiftPup">
      <transition name="slide">
        <div class="giftPup" v-if="showGiftPup">
          <i class="close" @click="closeGift()"></i>
          <p v-if="giftStates == 0">Mỗi ngày theo dõi 2 hoạt động nhận 20 đậu</p>
          <p v-else-if="giftStates == 1">20 đậu đã gửi vào tài khoản, mời chú ý kiểm tra</p>
          <p v-else>Mỗi ngày chỉ nhận 1 lần, mai lại đến nhé!</p>
          <div class="num" v-if="giftStates == 0">
            {{day_gift.num}}/{{day_gift.limit}}
          </div>
          <div class="btn" @click="closeGift()" v-else>Xác nhận</div>
        </div>
      </transition>
    </div>
    <div href="" class="refresh circle" @click.prevent="refrsh()" :style="{transform:'rotate('+rotatePx+'deg)'}"></div>
    <div class="goTop" @click="scorllGO()"></div>
  </div>
</template>

<script>

import getString from "../utils/getString"
import APP from "../utils/openApp"
import api from "../api/apiConfig"
import ActFooter from "../components/ActFooter"
import MsgToast from "../components/commonToast"
import { globalBus } from '../utils/eventBus'
import Actlist from "../components/Actlist"
import { fail } from 'assert';
export default {
  components: { MsgToast, ActFooter, Actlist },
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
      showRule: false,
      is_admin: null,
      day_gift: {},
      showGiftPup: false
    }
  },
  computed: {
    giftStates() {
      if (this.day_gift.get) {
        return 2
      } else if (this.day_gift.num >= this.day_gift.limit) {
        return 1
      } else {
        return 0
      }
    }
  },
  created() {
    this.judgeShare()  //判断是否为分享环境,请求相应的接口 
    this.getDefaultData()
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
          const { is_admin, list, day_gift } = response_data
          this.is_admin = is_admin
          this.day_gift = day_gift
          this.vxc('setActStatus', 1)
          this.vxc('setIs_admin', is_admin)
          this.vxc('setList', list)
        } else {
          this.toast(response_status.error)
        }
      })
    },
    downApp() {
      APP()
    },
    refrsh() { //刷新
      this.rotatePx = 540 * ++this.rotatec  //旋转动画
      window.removeEventListener("scroll", this.onScroll)
      this.getDefaultData('ref')
    },
    goBar() {
      let regstr = getString('token')
      location.href = `./index3.html?token=${regstr}`
    },
    goRank() {
      let regstr = getString('token')
      location.href = `./index4.html?token=${regstr}`
    },
    showRules() {
      let regstr = getString('token')
      location.href = `./index5.html?is_admin=${this.is_admin}`
    },
    closeRule() {
      this.showRule = false
    },
    scorllGO() {
      this.timer = setInterval(() => {
        var scorllTop = document.documentElement.scrollTop || document.body.scrollTop
        var step = scorllTop / 10
        window.scrollTo(0, scorllTop - step)
        if (scorllTop < 1) {//速度小于3或者滚动条到底了
          clearInterval(this.timer)
        }
      }, 10)
    },
    getGift() {
      if (this.giftStates == 1) {
        api.getBeat().then(res => {
          if (res.data.response_status.code == 0) {
            this.showGiftPup = true
          } else {
            this.toast(res.data.response_status.error)
          }
        })
      } else {
        this.showGiftPup = true
      }
    },
    closeGift() {
      if (this.giftStates == 1) {
        this.day_gift.get = true
      }
      this.showGiftPup = false
    },
    addCount() {
      this.day_gift.num++
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
  background: #5b16ba url(../assets/img/banner.png) center 0 no-repeat;
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
    height: 5.1rem;
    position: relative;
    .tipsBox {
      position: absolute;
      right: 0;
      top: 3.13rem;
      // &.top {
      //   top: 1.5rem;
      // }
      .ruleTips {
        display: block;
        width: 1.42rem;
        height: 0.53rem;
        background: url(../assets/img/ruleTips.png);
        background-size: 100% 100%;
        text-align: center;
        line-height: 0.53rem;
        font-size: 0.2rem;
        margin-bottom: 0.11rem;
        white-space: nowrap;
      }
    }
    .actTitle {
      width: 3.04rem;
      height: 0.39rem;
      background: url(../assets/img/actTitleTips.png);
      background-size: 100% 100%;
      position: absolute;
      bottom: 0.16rem;
      left: 2.23rem;
    }
    .giftTips {
      width: 1.36rem;
      height: 1.51rem;
      background: url(../assets/img/giftIconBlack.png);
      background-size: 100% 100%;
      position: absolute;
      top: 3.69rem;
      left: 0.09rem;
      &.act {
        background: url(../assets/img/giftIcon.png);
        background-size: 100% 100%;
        animation: jiggle 2s ease-in-out infinite;
        -o-animation: jiggle 2s ease-in infinite;
        -webkit-animation: jiggle 2s ease-in infinite;
        -moz-animation: jiggle 2s ease-in infinite;
        -ms-animation: jiggle 2s ease-in infinite;
      }
    }
  }
  .guaBox {
    position: relative;
  }
  .rules {
    width: 5.32rem;
    padding: 0 0.29rem 0.26rem;
    background: rgba(104, 30, 181, 1);
    border-radius: 0.4rem;
    position: relative;
    .close {
      display: block;
      width: 0.58rem;
      height: 0.58rem;
      background: url(../assets/img/close.png);
      background-size: 100% 100%;
      position: absolute;
      right: 0;
      top: -0.7rem;
    }
    h6 {
      font-size: 0.26rem;
      margin: 0.24rem 0 0.14rem;
    }
    p {
      font-size: 0.24rem;
      color: #bffffe;
    }
    .lastTips {
      text-align: center;
      font-size: 0.24rem;
      color: #a884d8;
      margin-top: 0.28rem;
    }
  }
}
.giftPup {
  width: 5.9rem;
  height: 2.54rem;
  background: rgba(104, 30, 181, 1);
  border-radius: 0.4rem;
  position: relative;
  padding-top: 1.24rem;
  p {
    text-align: center;
    font-size: 0.28rem;
    color: rgba(191, 255, 254, 1);
  }
  .num {
    font-size: 0.4rem;
    color: rgba(255, 250, 100, 1);
    margin: 0.31rem auto 0;
    text-align: center;
  }
  .btn {
    width: 2.74rem;
    height: 0.9rem;
    background: url(../assets/img/commitBtn.png);
    background-size: 100% 100%;
    text-align: center;
    line-height: 0.9rem;
    font-size: 0.32rem;
    margin: 0.25rem auto 0;
  }
  .close {
    display: block;
    width: 0.58rem;
    height: 0.58rem;
    background: url(../assets/img/close.png);
    background-size: 100% 100%;
    position: absolute;
    right: 0;
    top: -0.7rem;
  }
}
.goTop {
  display: block;
  width: 0.94rem;
  height: 0.94rem;
  position: fixed;
  right: 0.08rem;
  bottom: 1.35rem;
  background: url(../assets/img/goTop.png) no-repeat;
  background-size: contain;
  z-index: 1000;
}
.refresh {
  display: block;
  width: 0.94rem;
  height: 0.94rem;
  position: fixed;
  left: 0.08rem;
  bottom: 1.35rem;
  background: url(../assets/img/refresh.png) no-repeat;
  background-size: contain;
  transition: transform 1s;
  z-index: 1000;
}
</style>


