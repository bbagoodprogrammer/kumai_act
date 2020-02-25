<template>
  <div class="givingRank">
    <div class="query">
      <p class="msg1">عدد المصباح المتلقى: نذر بالجان+شراء بفول ذهبي </p>
      <p class="msg2">ممارسة النذر بالجان، سينال الطرفان 1-4 مصابيح سحرية</p>
      <div class="queryBar">
        <span class="title">ابحث UID</span>
        <input type="text" v-model="userId" oninput="this.value=this.value.replace(/[^0-9]/g,'');" @focus="focus()" onfocus="this.scrollIntoView(true);this.scrollIntoViewIfNeeded();" @blur="blur()" @change="changeInput()">
        <span class="goQuery" @click="goQuery()">ابحث</span>
      </div>
    </div>
    <ul class="rankList">
      <li v-for="(item,index) in shouliRank" :key="index" @click="goUser(item.sid)">
        <div class="rank" :class="'top'+ item.rank">{{item.rank}}</div>
        <div class="imgBox">
          <img v-lazy="item.avatar" alt="" class="img1" :class="{top1Img:item.rank === 1}">
          <img src="../assets/img/top1Bg.png" alt="" class="img2" v-if="item.rank === 1">
        </div>
        <div class="userMsg">
          <div class="name">{{item.nick}}</div>
          <div class="givingPeople">عدد المصباح المتلقى：<em>{{item.score}}</em></div>
          <div class="showMsg"> أغنية：<em>{{item.sname}}</em></div>
        </div>
        <span class="giving" @click.stop="blessing(item.uid,index)">النذر</span>
      </li>
      <!-- <li>
        <div class="rank top2">2</div>
        <div class="imgBox">
          <img src="../assets/img/default.png" alt="" class="img1">
        </div>
      </li>
      <li>
        <div class="rank top3">3</div>
        <div class="imgBox">
          <img src="../assets/img/default.png" alt="" class="img1">
        </div>
      </li>
      <li>
        <div class="rank">4</div>
        <div class="imgBox">
          <img src="../assets/img/default.png" alt="" class="img1">
        </div>
      </li> -->
    </ul>
    <transition name="slide">
      <div class="nowardsPup" v-show="showPup">
        <div class="nowardCon">
          <p class="pupMsg" v-if="pupTyle ===1">مبروك! تفتح هذه المصابيح السحرية</p>
          <p class="pupMsg mag" v-else>{{showMsg}}</p>
          <div class="lampNum" v-if="pupTyle ===1">
            <img src="../assets/img/pupLamp.png" alt="">
            <span>{{prayer_score}}<em>X</em></span>
          </div>
          <span class="sure" v-if="pupTyle ===1" @click="closePup()">عرفت</span>
          <span class="sure2" v-if="pupTyle ===2" @click="closePup()">عرفت</span>
          <span class="sure2" v-if="pupTyle ===3" @click="invitation()">اذهب للدعوة</span>
          <span class="close" v-if="pupTyle ===3" @click="closePup()"></span>
        </div>
      </div>
    </transition>
    <msg-toast :msg="tastMsg" @closeToast="closeToast()" v-show="showT"></msg-toast>
  </div>
</template>

<script>
import { mapState } from "vuex"
import APP from "../utils/openApp"
import api from "../api/apiConfig"
import MsgToast from "../components/commonToast"
export default {
  components: { MsgToast },
  data() {
    return {
      showPup: false,
      pupTyle: 2,
      prayer_score: null,
      userId: null,
      showMsg: '',
      userRank: [],
      cunId: '',
      tastMsg: '',
      showT: false,
    }
  },
  computed: {
    ...mapState(['shouliRank', 'shouliMsg', 'isShare', 'activeityState'])
  },
  methods: {
    goUser(sid) {
      location.href = 'songid:{"songlist":[' + sid + ' ],"index":0}';
    },
    blessing(toUid, index) {
      if (this.isShare) {
        APP()
        return
      } else if (this.activeityState === 0) {
        this.tastMsg = "لم يبدأ النشاط!"
        this.showT = true
      } else if (this.activeityState === 2) {
        this.tastMsg = "انتهى النشاط!"
        this.showT = true
      }
      if (toUid == this.shouliMsg.uid) {
        this.showMsg = `لا يمكن النذر لنفسك!`
        this.pupTyle = 2
        this.showPup = true
      } else {
        if (this.shouliMsg.spirit_counts > 0) { //有精灵球
          api.blessing(toUid).then((res) => {
            if (res.data.response_status.code === 0) {
              this.prayer_score = res.data.response_data.prayer_score
              this.pupTyle = 1
              this.showPup = true
              var newObj = {
                prayer_score: this.prayer_score,
                index0: index
              }
              this.$store.commit('reduceSpirit', newObj)
            } else if (res.data.response_status.code === 20012) { //给自己祈福
              this.showMsg = `لا يمكن النذر لنفسك!`
              this.pupTyle = 2
              this.showPup = true
            }
          })
        } else {
          this.showMsg = `ليس لديك جان كاف، أسرع إلى نيله`
          this.pupTyle = 2
          this.showPup = true
        }
      }
    },
    goQuery() {//查询id
      if (this.isShare) {
        APP()
        return
      } else if (this.activeityState === 0) {
        this.tastMsg = "لم يبدأ النشاط!"
        this.showT = true
      } else if (this.activeityState === 2) {
        this.tastMsg = "انتهى النشاط!"
        this.showT = true
      } else {
        if (this.userId === null) {
          return
        } else if (this.userId == this.shouliMsg.uid) {
          this.showMsg = `لا يمكن البحث عن نفسك`
          this.pupTyle = 2
          this.showPup = true
        } else {
          api.query(this.userId).then((res) => {
            const { response_status, response_data } = res.data
            if (response_status.code === 0) {
              if (response_data.search_msg.length == 0) {
                this.showMsg = `المستخدم الذي تبحث عنه لا يشترك في هذه المسابقة. تدعوه إلى الاشتراك!`
                this.pupTyle = 3
                this.showPup = true
              } else if (response_data.search_msg[0].uid) {
                var newMsg = response_data.search_msg
                if (this.shouliRank.length > 1) {
                  this.userRank = JSON.parse(JSON.stringify(this.shouliRank))
                }
                this.$store.commit('changShouliRank', newMsg)
              }
            } else if (response_status.code === 20011) { //查询自己
              this.showMsg = `لا يمكن البحث عن نفسك`
              this.pupTyle = 2
              this.showPup = true
            }
          })
        }
      }
    },
    invitation() {
      var u = navigator.userAgent;
      var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
      var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
      if (isiOS) {
        location.href = 'shareUserInfo://activity.gosingapp.com/static_html/2019/theStarOfPrayer/index.html&shareText=أشترك في مسابقة نجم النذر في Super Voice الآن، توجد فرصة لاكتساب جائزة الشارة السرية والهدايا الكثيرة! تشترك في هذه المسابقة معي سريعا!&userImg=http://activity.gosingapp.com/static_html/2019/theStarOfPrayer/share.jpg&title=نجم النذر، صوت لي!';
      } else {
        javascript: JSInterface.share('http://activity.gosingapp.com/static_html/2019/theStarOfPrayer/index.html', 'نجم النذر، صوت لي!', 'أشترك في مسابقة نجم النذر في Super Voice الآن، توجد فرصة لاكتساب جائزة الشارة السرية والهدايا الكثيرة! تشترك في هذه المسابقة معي سريعا!', 'http://activity.gosingapp.com/static_html/2019/theStarOfPrayer/share.jpg');
      }
      this.showPup = false
    },
    closePup() {
      this.showPup = false
    },
    focus() {
      this.userId = null
    },
    changeInput() {
      this.cunId = this.userId
    },
    blur() {
      this.userId = this.cunId
    },
    closeToast() {
      this.showT = false
    }
  },
  beforeDestroy() {
    if (this.userRank.length > 0) {
      this.$store.commit('changShouliRank', this.userRank)
    }
  }
}
</script>

<style lang="scss">
.givingRank {
  .query {
    margin-top: 0.32rem;
    .msg1 {
      font-size: 80%;
      font-weight: bold;
      color: #3effd4;
      text-align: center;
    }
    .msg2 {
      font-size: 80%;
      font-weight: bold;
      color: #ffd13f;
      text-align: center;
    }
    .queryBar {
      width: 4.91rem;
      height: 0.7rem;
      margin: 0.19rem auto 0;
      background: url(../assets/img/queryBg.png) no-repeat;
      background-size: 100% 100%;
      display: flex;
      align-items: center;
      .title {
        display: inline-block;
        color: #ffdfbf;
        margin-right: 0.38rem;
      }
      input {
        width: 1.7rem;
        margin-right: 0.15rem;
        background: none;
        outline: none;
        border: none;
        color: #fff;
      }
      .goQuery {
        margin-right: 0.5rem;
      }
    }
  }
  .rankList {
    margin-top: 0.24rem;
    padding: 0 0.29rem 0 0.35rem;
    li {
      display: flex;
      height: 1.16rem;
      align-items: center;
      border-bottom: 0.01rem solid rgba(120, 72, 189, 1);
      .rank {
        width: 0.75rem;
        height: 0.65rem;
        line-height: 0.65rem;
        text-align: center;
        color: #ffbb8d;
        font-size: 120%;
        &.top1 {
          text-indent: -999rem;
          background: url(../assets/img/top1.png);
          background-size: 100% 100%;
        }
        &.top2 {
          text-indent: -999rem;
          background: url(../assets/img/top2.png);
          background-size: 100% 100%;
        }
        &.top3 {
          text-indent: -999rem;
          background: url(../assets/img/top3.png);
          background-size: 100% 100%;
        }
      }
      .imgBox {
        width: 0.9rem;
        height: 0.9rem;
        margin-right: 0.11rem;
        position: relative;
        > .img1 {
          width: 0.9rem;
          height: 0.9rem;
          border-radius: 50%;
          border: 0.02rem solid #ffee78;
          position: absolute;
        }
        .img2 {
          width: 0.97rem;
          height: 1.14rem;
          position: absolute;
          top: -0.23rem;
          left: -0.01rem;
        }
        .top1Img {
          border: none;
        }
      }
      .userMsg {
        width: 3.2rem;
        margin-right: 0.16rem;
        display: flex;
        flex-direction: column;
        div {
          flex: 1;
          font-size: 70%;
        }
        .name {
          width: 100%;
          color: #fffcef;
          overflow: hidden; /*超出部分隐藏*/
          text-overflow: ellipsis; /* 超出部分显示省略号 */
          white-space: nowrap;
        }
        .givingPeople {
          color: #dac1ff;
          em {
            color: #fff8ab;
            font-size: 80%;
          }
        }
        .showMsg {
          width: 100%;
          color: #dac1ff;
          overflow: hidden; /*超出部分隐藏*/
          text-overflow: ellipsis; /* 超出部分显示省略号 */
          white-space: nowrap;
          em {
            color: #3effd4;
            font-size: 80%;
          }
        }
      }
      .giving {
        display: inline-block;
        width: 1.56rem;
        height: 0.6rem;
        margin-right: 0.1rem;
        background: url(../assets/img/colude.png) no-repeat;
        background-size: 100% 100%;
        color: #914800;
        font-weight: bold;
        text-align: center;
        line-height: 0.6rem;
        z-index: 10;
      }
    }
  }
  .nowardsPup {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.8);
    z-index: 10000;
    .nowardCon {
      width: 6.24rem;
      height: 3.96rem;
      background: url(../assets/img/pupBg.png) no-repeat;
      background-size: 100% 100%;
      margin: 2.2rem auto;
      padding-top: 2.72rem;
      text-align: center;
      position: relative;
      .pupMsg {
        width: 5.5rem;
        margin: 0 auto;
        color: #ffc960;
        font-weight: bold;
        text-align: center;
        font-size: 90%;
      }
      .mag {
        margin: 0.6rem auto;
      }
      .lampNum {
        height: 1.35rem;
        line-height: 1.35rem;
        display: flex;
        justify-content: center;
        margin-top: 0.45rem;
        img {
          width: 1.42rem;
          height: 1.19rem;
        }
        span {
          display: inline-block;
          font-size: 125%;
          em {
            font-size: 80%;
            margin: 0 0.1rem;
          }
        }
      }
      .sure {
        display: inline-block;
        width: 1.86rem;
        height: 0.72rem;
        color: #914800;
        font-weight: bold;
        margin-top: 0.4rem;
        line-height: 0.67rem;
        background: url(../assets/img/pupColude.png);
        background-size: 100% 100%;
        font-size: 80%;
      }
      .sure2 {
        display: inline-block;
        width: 1.86rem;
        height: 0.72rem;
        color: #914800;
        font-size: 70%;
        font-weight: bold;
        margin-top: 0.4rem;
        line-height: 0.67rem;
        background: url(../assets/img/pupColude.png);
        background-size: 100% 100%;
      }
      .close {
        display: inline-block;
        width: 0.71rem;
        height: 0.71rem;
        background: url(../assets/img/close.png);
        background-size: 100% 100%;
        position: absolute;
        top: 7rem;
        left: 2.8rem;
      }
    }
  }
  .slide-enter-active {
    animation-name: slideInUp;
    animation-duration: 0.2s;
    animation-fill-mode: both;
  }
  .slide-leave-active {
    animation-name: slideOutDown;
    animation-duration: 0.2s;
    animation-fill-mode: both;
  }
  @keyframes slideInUp {
    0% {
      transform: scale(0);
    }
    50% {
      transform: scale(1.2);
    }
    to {
      transform: scale(1);
    }
  }
  @keyframes slideOutDown {
    0% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.2);
    }
    to {
      transform: scale(0);
    }
  }
}
</style>