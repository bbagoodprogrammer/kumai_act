<template>
  <div class="card">
    <!-- <img src="../assets/img/cardLoading.gif" alt=""> -->
    <span class="giftMsg" :class="{black:!item.tid}" @click="goCard()">
      <img :src="require(`../assets/img/gifts/ward${item.tid}.png`)" v-if="item.tid" alt="">
      <span class="carLoading" v-if="loading"></span>
      <strong>{{getNewName(item.pname)}}</strong>
    </span>
    <span class="animation" :class="{am:showAm}" v-show="showAm"></span>
    <transition name="slide">
      <msg-toast :msg="tastMsg" @closeToast="closeToast()" v-show="showT"></msg-toast>
    </transition>
    <!-- 神秘任务弹窗 -->
    <div class="mask" v-show="showCode">
      <transition name="slide">
        <div class="myTask" v-if="showCode">
          <div class="title"></div>
          <i class="close" @click="closeCode()"></i>
          <h3>{{lang.showCodeTitle}}</h3>
          <div class="tips">
            {{lang.codeTips1}}
          </div>
          <div class="code">{{lang.inivCode}} <strong>{{luckGift.invite_code}}</strong> </div>
          <div class="rev" @click="share(luckGift.invite_code)">{{lang.goIniv}}</div>
          <div class="tips2">{{lang.inivTips1}}</div>
          <div class="lastTips">{{lang.inivTips2}}</div>
        </div>
      </transition>
    </div>
    <!-- 其他礼物弹窗 -->
    <div class="mask" v-show="showLuckGift">
      <transition name="slide">
        <div class="luckGift" v-if="showLuckGift">
          <span class="title"></span>
          <i class="close" @click="closeLuck()"></i>
          <p class="luckTips">{{luckGift.tid == 1?lang.zsGift:lang.otherGift}}</p>
          <div class="giftItem">
            <span>
              <img :src="require(`../assets/img/gifts/${luckGift.pid}.png`)" alt="" v-if="luckGift.tid == 1">
              <img :src="require(`../assets/img/gifts/ward${luckGift.tid}.png`)" alt="" v-else>
              <strong>{{luckGift.pname}}</strong>
            </span>
          </div>
          <span class="ok" @click="closeLuck()">{{lang.zsOk}}</span>
        </div>
      </transition>
    </div>
    <!-- 邀请弹窗 -->
    <div class="mask" v-show="showShare">
      <transition name="slide">
        <div class="shareCon" v-show="showShare">
          <span class="title"></span>
          <i class="close" @click="closeShare()"></i>
          <p class="shareTitle">{{lang.shareTips}}</p>
          <textarea type="text" v-model.trim="shareLink" class="shareLink" onfocus="this.select()" onmouseover="this.focus()" autofocus="autofocus" ref="link"></textarea>
        </div>
      </transition>
    </div>
  </div>
</template>
<script>
import { setTimeout } from 'timers';
import MsgToast from "../components/commonToast"
import { globalBus } from '../utils/eventBus'
import { mapState } from "vuex"
import api from "../api/apiConfig"
import getAppUaInfo from "../utils/getAppUaInfo"
export default {
  components: { MsgToast },
  props: ['item'],
  data() {
    return {
      showT: false,
      imgindex: 0,
      timer: null,
      showAm: false,
      showT: false,  //提示弹窗显示
      tastMsg: "",  //基础弹窗提示信息
      showCode: false,
      luckGift: {},
      luckIng: false,   //当前正在抽奖
      loading: false,    //当前Loading
      showLuckGift: false, // 专属礼物弹窗
      showShare: false, //分享链接  
    }
  },
  computed: {
    ...mapState(['userMsg', 'oLuckIng']),
    shareLink() {
      return `http://activity.17sing.tw/static_html/2020/vip_lottery/index.html?code=${this.luckGift.invite_code}`
    }
  },
  methods: {
    goCard() {
      globalBus.$emit('commonEvent', () => {
        if (this.userMsg.chances > 0 && !this.luckIng && !this.item.tid && !this.oLuckIng) {
          this.luckIng = true
          this.loading = true
          this.vux('setLickIng', true)   //控制全局抽奖
          api.lottery(this.item.posi).then(res => {
            const { response_data, response_status } = res.data
            if (response_status.code == 0) {
              this.loading = false
              this.showAm = true
              this.vux('addMy_record', response_data.prize)
              this.luckGift = response_data.prize
              setTimeout(() => {
                this.showAm = false
                this.luckIng = false
                if (this.luckGift.tid == 8) {
                  this.showCode = true
                } else {
                  this.showLuckGift = true
                }
                // if (this.luckGift.tid == 1) {
                //   this.showLuckGift = true
                // }
                this.vux('setLickIng', false)
              }, 500)
            } else {
              this.tastMsg = response_status.error
              this.showT = true
            }
          })
        }
      })
    },
    closeToast() {
      this.showT = false
    },
    closeCode() {
      this.vux('setAnmiate', this.luckGift)   //关闭弹窗后显示动画
      this.showCode = false
    },
    closeLuck() {
      this.luckGift = {}
      this.showLuckGift = false
      this.vux('setAnmiate', this.luckGift)   //关闭弹窗后显示动画
    },
    share(code) {
      globalBus.$emit('commonEvent', callback => {
        var ios = navigator.userAgent.match(/iPhone|iPod|ios|iPad/i);
        var ua = navigator.userAgent;
        var data = {
          "share_title": "會員特權週等著你來~",
          "share_content": "成為會員，享受會員專享福利~",
          "share_image": "http://activity.17sing.tw/static_html/2020/vip_lottery/share.jpg",
          "link": `http://activity.17sing.tw/static_html/2020/vip_lottery/index.html?uid=${this.userMsg.uid}&code=${code}&v=2`,
          "image": "http://activity.17sing.tw/static_html/2020/vip_lottery/share2.jpg",
          "share_url": `http://activity.17sing.tw/static_html/2020/vip_lottery/index.html?uid=${this.userMsg.uid}&code=${code}&v=2`
        }
        if (ios) {
          this.showShare = true
          this.$refs.link.select()
        } else {
          javascript: JSInterface.share(JSON.stringify(data));
        }
      })
    },
    getNewName(val) {
      return val && val.replace(/\([^\)]*\)/g, "");
    },
    closeShare() {
      this.showShare = false
    }
  }
}
</script>
<style lang="scss" scoped>
.card {
  display: inline-block;
  width: 1.58rem;
  height: 1.81rem;
  margin: 0 0 0.25rem 0.59rem;
  position: relative;
  .giftMsg {
    display: inline-block;
    width: 1.58rem;
    height: 1.81rem;
    position: absolute;
    top: 0;
    left: 0;
    background: url(../assets/img/carItemBg.png);
    background-size: 100% 100%;
    img {
      width: 1.2rem;
      height: 1.2rem;
      display: block;
      margin: 0.1rem auto 0;
    }
    .carLoading {
      display: block;
      width: 1rem;
      height: 1rem;
      background: url(../assets/img/cardLoading.gif) no-repeat;
      background-size: 100% 100%;
      position: absolute;
      left: 0.29rem;
      top: 0.41rem;
    }
    > strong {
      width: 1.34rem;
      padding: 0 0.12rem;
      height: 0.4rem;
      line-height: 0.2rem;
      text-align: center;
      font-size: 0.2rem;
      font-weight: 500;
      display: flex;
      align-items: center;
      justify-content: center;
      position: absolute;
      bottom: 0.15rem;
      text-align: center;
    }
    &.black {
      background: url(../assets/img/blackCardBg.png);
      background-size: 100% 100%;
    }
  }
}
.card:nth-child(3n + 3) {
  margin-left: 0;
}
.myTask {
  width: 5.23rem;
  height: 7rem;
  padding: 0.41rem 0.38rem 0;
  background: url(../assets/img/myTask.png);
  background-size: 100% 100%;
  position: absolute;
  left: 0.76rem;
  top: 3.2rem;
  .title {
    width: 5.49rem;
    height: 2.07rem;
    background: url(../assets/img/pupTitle.png);
    background-size: 100% 100%;
    position: absolute;
    left: 0.25rem;
    top: -2.07rem;
  }
  .close {
    display: block;
    width: 0.8rem;
    height: 0.8rem;
    background: url(../assets/img/close.png);
    background-size: 100% 100%;
    position: absolute;
    right: 0;
    top: -1rem;
  }
  h3 {
    font-size: 0.36rem;
    font-weight: bold;
    text-align: center;
  }
  .tips {
    margin: 0.16rem auto 0.17rem;
    width: 4.75rem;
    height: 1.37rem;
    padding: 0.22rem 0.24rem;
    background: rgba(255, 164, 196, 0.5);
    border-radius: 0.2rem;
    font-size: 0.24rem;
  }
  .code {
    text-align: center;
    strong {
      font-size: 0.48rem;
      font-weight: bold;
    }
  }
  .rev {
    width: 2.43rem;
    height: 0.8rem;
    line-height: 0.8rem;
    background: url(../assets/img/goVip.png);
    background-size: 100% 100%;
    margin: 0.1rem auto 0.25rem;
    text-align: center;
    color: #ae4800;
    font-weight: bold;
    font-size: 0.36rem;
  }
  .tips2 {
    text-align: center;
    color: #ffda9a;
    font-size: 0.24rem;
  }
  .lastTips {
    color: #ffc87b;
    font-size: 0.24rem;
    margin-top: 0.35rem;
  }
}
.luckGift {
  width: 6.21rem;
  height: 5.48rem;
  background: url(../assets/img/pup1.png);
  background-size: 100% 100%;
  position: absolute;
  left: 0.69rem;
  top: 4.2rem;
  .title {
    width: 5.49rem;
    height: 2.07rem;
    background: url(../assets/img/pupTitle.png);
    background-size: 100% 100%;
    position: absolute;
    left: 0.36rem;
    top: -2.07rem;
  }
  .close {
    display: block;
    width: 0.8rem;
    height: 0.8rem;
    background: url(../assets/img/close.png);
    background-size: 100% 100%;
    position: absolute;
    right: 0;
    top: -1rem;
  }
  .luckTips {
    padding: 0 0.3rem;
    font-size: 0.36rem;
    font-weight: bold;
    margin: 0.65rem auto 0.3rem;
    text-align: center;
  }
  .giftItem {
    padding: 0 0.36rem;
    display: flex;
    align-items: center;
    justify-content: center;
    span {
      width: 1.6rem;
      height: 1.6rem;
      background: url(../assets/img/giftBg.png);
      background-size: 100% 100%;
      img {
        width: 1.2rem;
        height: 1.2rem;
        display: block;
        margin: 0.21rem auto;
      }
    }
    strong {
      font-weight: bold;
      font-size: 0.24rem;
      color: #ffe6ce;
      display: block;
      text-align: center;
      width: 130%;
      margin-right: -0.25rem;
    }
  }
  .ok {
    display: block;
    width: 2.43rem;
    height: 0.8rem;
    background: url(../assets/img/goVip.png);
    background-size: 100% 100%;
    margin: 0.84rem auto;
    color: #ae4800;
    font-size: 0.34rem;
    text-align: center;
    line-height: 0.8rem;
  }
}
.shareCon {
  width: 6.21rem;
  height: 5.48rem;
  background: url(../assets/img/pup1.png);
  background-size: 100% 100%;
  position: absolute;
  left: 0.69rem;
  top: 4.2rem;
  .title {
    width: 5.49rem;
    height: 2.07rem;
    background: url(../assets/img/pupTitle.png);
    background-size: 100% 100%;
    position: absolute;
    left: 0.36rem;
    top: -2.07rem;
  }
  .close {
    display: block;
    width: 0.8rem;
    height: 0.8rem;
    background: url(../assets/img/close.png);
    background-size: 100% 100%;
    position: absolute;
    right: 0;
    top: -1rem;
  }
  .shareTitle {
    font-size: 0.36rem;
    font-weight: bold;
    padding: 0 0.4rem;
    margin-top: 0.92rem;
    text-align: center;
  }
  .shareLink {
    outline: none;
    border: none;
    background: rgba(196, 39, 131, 0.5);
    border-radius: 0.2rem;
    width: 5.23rem;
    height: 1.15rem;
    margin: 0.41rem 0.5rem 0;
    color: #fff;
    text-align: center;
    padding: 0.4rem 0;
  }
}
.animation {
  width: 1.83rem;
  height: 2.1rem;
  position: absolute;
  left: -0.12rem;
  top: -0.1rem;
  background: url(../assets/img/css_sprites.png);
  background-size: 500% 100%;
  background-position: 500% 0%;
  &.am {
    -webkit-animation: bird-slow 0.5s steps(1, start); /*发生了3次位移steps就是3*/
    animation: bird-slow 0.5s steps(1, start);
    animation-fill-mode: forwards;
  }
}
@-webkit-keyframes bird-slow {
  0% {
    background-position: 500% 0%;
  }
  25% {
    background-position: 400% 0%;
  }
  50% {
    background-position: 300% 0%;
  }
  75% {
    background-position: 200% 0%;
  }
  100% {
    background-position: 100% 0%;
  }
}
</style>
