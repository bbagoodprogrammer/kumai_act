<template>
  <div class="hpxRank">
    <div class="title"></div>
    <p class="tips">
      依據擂臺模式下給參賽者貢獻的金幣魅力值排名！</br>
      贈送擂臺禮物獲得5%加成
    </p>
    <ul class="ranklist">
      <li v-for="(item,index) in list" :key="index" :class="'rank'+item.rank" @click="goHtml(item.rstatus,item.uid)">
        <div class="rank" :class="{challenger:item.winner == 1}">{{item.rank}}</div>
        <div class="imgBox">
          <img src="../../assets/img/HPXtop1.png" alt="" class="top1Img" v-if="item.rank == 1">
          <img v-lazy="item.avatar" alt="" class="userImg">
          <span class="live" v-if="item.rstatus > 0"></span>
        </div>
        <div class="userMsg">
          <div class="name">{{item.nick}}</div>
          <div class="uid">UID:{{item.uid}}</div>
        </div>
        <div class="scoreBox">
          <em>貢獻值: {{item.score}}</em>
        </div>
      </li>
    </ul>
    <div class="noData" v-if="list.length == 0">暫無數據！</div>
    <div class="footerBar">
      <div class="acrStatus">
        <span class="noAct" v-if="astState === 0">活動未開始</span>
        <span class="noAct" v-if="astState === 2">活動已結束</span>
        <span class="goAct" v-if="astState === 1" @click="singUp()">報名參賽</span>
        <div class="actIng" v-if="astState === 3">
          <div class="rank">
            <!-- <em v-if="userMsg.winner" class="winnerTips"></em> -->
            <em>{{userMsg.rank}}</em>
          </div>
          <img v-lazy="userMsg.avatar" alt="">
          <div class="userMsg">
            <div class="name">{{userMsg.nick}}</div>
            <div class="uid">UID:{{userMsg.uid}}</div>
          </div>
          <div class="score">
            <em>貢獻值：{{userMsg.score}}</em>
          </div>
        </div>
      </div>
      <transition name="slide">
        <div class="singUpSuccess" v-show="singUpSuccess">
          <div class="content">
            <span class="close" @click="closeSucPup()"></span>
            <p>您已報名參與擂臺之王爭霸賽</p>
            <span class="goPk" @click="goPk()">匹配K房</span>
          </div>
        </div>
      </transition>
    </div>
    <transition name="slide">
      <msg-toast :msg="tastMsg" @closeToast="closeToast()" v-show="showT"></msg-toast>
    </transition>
    <div href="" class="refresh circle" @click.prevent="refrsh()" :style="{transform:'rotate('+rotatePx+'deg)'}"></div>
    <loading></loading>
  </div>
</template>
<script>
import api from "../../api/apiConfig"
import Loading from "../../components/Loading"
import { globalBus } from '../../utils/eventBus'
import MsgToast from "../../components/commonToast"
export default {
  components: { Loading, MsgToast },
  data() {
    return {
      list: [],
      userMsg: {},
      step: null,
      loaded: false,
      isMore: true,
      singUpSuccess: false,
      tastMsg: '',
      showT: false,
      rotatePx: 0,    //刷新旋转动画
      rotatec: 0,
    }
  },
  computed: {
    astState() {
      if (this.actStatus === 0) { //活动未开始
        return 0
      } else if (this.actStatus === 2) { //活动已结束
        return 2
      } else if (this.userMsg && !this.userMsg.registered) { //活动开始未报名，或者分享
        return 1
      } else if (this.userMsg.registered) { //活动开始已报名
        return 3
      }
    }
  },
  created() {
    this.step = sessionStorage.getItem('actStep')
    this.defaluteGetData()
  },
  mounted() {
    window.addEventListener('scroll', this.onScroll)
  },
  methods: {
    goHtml(rstatus, uid) {
      if (rstatus > 0) {
        location.href = `rid:${rstatus}`
      } else {
        location.href = `uid:${uid}`
      }
    },
    onScroll() {
      console.log(this.loaded)
      if (this.isMore) {
        const scrollToBottom = (document.documentElement.scrollTop || document.body.scrollTop) + window.innerHeight >= document.body.scrollHeight - 100
        if (scrollToBottom && !this.loaded) { //加載更多
          this.isMore = false
          api.getRank(3, this.list.length).then((res) => {
            this.isMore = true
            var newArr = res.data.response_data.list
            if (newArr.length > 0) {
              this.list = this.list.concat(newArr)
            } else if (newArr.length == 0 && this.list.length > 20) {
              this.loaded = true
            }
          })
        }
      }
    },
    singUp() {
      // globalBus.$emit('commonEvent', () => {
      api.singUp(3).then(res => {
        if (res.data.response_status.code == 0) {
          this.singUpSuccess = true
          this.userMsg = res.data.response_data.owner
        } else {
          this.tastMsg = res.data.response_status.error
          this.showT = true
        }
      })
      sessionStorage.setItem("need-refresh", true);
      // })
    },
    goPk() {
      // globalBus.$emit('commonEvent', () => {
      api.goPk().then(res => {
        if (res.data.response_status.code == 0) {
          if (res.data.response_data.rid > 0) {
            location.href = `rid:${res.data.response_data.rid}`
          } else {    //目前没有公开的PK房间哦
            this.tastMsg = `目前没有公开的PK房间哦!`
            this.showT = true
          }
        } else {
          this.tastMsg = res.data.response_status.error
          this.showT = true
        }
      })
      // })
    },
    defaluteGetData() {
      api.getRank(3, 0).then(res => {
        if (res.data.response_status.code == 0) {
          this.list = res.data.response_data.list
          this.userMsg = res.data.response_data.owner
        }
      })
    },
    refrsh() { //刷新
      this.rotatePx = 540 * ++this.rotatec  //旋转动画
      this.loaded = false
      this.defaluteGetData()
    },
    closeSucPup() {
      this.singUpSuccess = false
    },
    closeToast() {
      this.showT = false
    }
  }
}
</script>
<style lang="scss">
body {
  background: #190e06;
}
.hpxRank {
  padding: 0.51rem 0.19rem 2rem;
  .title {
    width: 4.2rem;
    height: 0.97rem;
    background: url(../../assets/img/rankTitle.png);
    background-size: 100% 100%;
    margin: 0 auto;
  }
  .tips {
    font-size: 71%;
    color: #d89d58;
    text-align: center;
    margin-top: 0.29rem;
  }
  .ranklist {
    margin-top: 0.39rem;
    li {
      height: 1rem;
      background: url(../../assets/img/rankItemBg.png);
      background-size: 100% 100%;
      margin-top: 0.05rem;
      display: flex;
      align-items: center;
      .rank {
        width: 0.84rem;
        height: 0.72rem;
        margin-left: 0.12rem;
        text-align: center;
        line-height: 0.72rem;
        font-size: 111%;
        color: #864e22;
        &.challenger {
          width: 0.83rem;
          height: 0.85rem;
          text-indent: -999rem;
          background: url(../../assets/img/rankLei.png);
          background-size: 100% 100%;
        }
      }
      .imgBox {
        width: 0.78rem;
        height: 0.78rem;
        margin-left: 0.2rem;
        position: relative;
        .top1Img {
          width: 0.78rem;
          height: 0.89rem;
          position: absolute;
          top: -0.11rem;
          left: 0rem;
        }
        .userImg {
          width: 0.78rem;
          height: 0.78rem;
          border-radius: 50%;
          border: 0.02rem solid rgba(232, 157, 23, 1);
          box-sizing: border-box;
        }
        .live {
          width: 0.64rem;
          height: 0.28rem;
          background: url(../../assets/img/live.png);
          background-size: 100% 100%;
          position: absolute;
          bottom: 0;
          left: 0.07rem;
        }
      }
      .userMsg {
        width: 2.2rem;
        // height: 0.64rem;
        margin-left: 0.12rem;
        .name {
          font-size: 98%;
          color: #fff9d6;
          max-width: 2.2rem;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
        .uid {
          font-size: 80%;
          color: #fff9d6;
          margin-top: 0.05rem;
        }
      }
      .scoreBox {
        display: flex;
        align-items: center;
        margin-left: 0.24rem;
        .Microphone {
          display: block;
          width: 0.39rem;
          height: 0.4rem;
          background: url(../../assets/img/Microphone.png);
          background-size: 100% 100%;
          &.leizhu {
            width: 0.43rem;
            height: 0.44rem;
            background: url(../../assets/img/leizhu.png);
            background-size: 100% 100%;
          }
        }
        em {
          color: #fff88e;
          font-size: 98%;
          margin-left: 0.09rem;
        }
      }

      &.rank1 {
        background: url(../../assets/img/rankTopBg.png);
        background-size: 100% 100%;
        .rank {
          text-indent: -999rem;
          background: url(../../assets/img/top1.png);
          background-size: 100% 100%;
        }
      }
      &.rank2 {
        background: url(../../assets/img/rankTopBg.png);
        background-size: 100% 100%;
        .rank {
          text-indent: -999rem;
          background: url(../../assets/img/top2.png);
          background-size: 100% 100%;
        }
      }
      &.rank3 {
        background: url(../../assets/img/rankTopBg.png);
        background-size: 100% 100%;
        .rank {
          text-indent: -999rem;
          background: url(../../assets/img/top3.png);
          background-size: 100% 100%;
        }
      }
    }
  }
  .noData {
    text-align: center;
    margin-top: 0.8rem;
  }
}
.footerBar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  .acrStatus {
    width: 7.5rem;
    height: 1.55rem;
    margin: auto;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    background: url(../../assets/img/footer.png) no-repeat;
    background-size: 100% 100%;
    span {
      display: inline-block;
    }
    .noAct {
      margin-top: 0.5rem;
    }
    .goAct {
      width: 2.89rem;
      height: 0.79rem;
      margin-top: 0.5rem;
      color: #532e01;
      font-size: 98%;
      text-align: center;
      line-height: 0.79rem;
      background: url(../../assets/img/singUpBg.png);
      background-size: 100% 100%;
    }
    .actIng {
      width: 7.5rem;
      height: 1.2rem;
      margin-top: 0.3rem;
      display: flex;
      align-items: center;
      .rank {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        margin-left: 0.32rem;
        width: 1rem;
        .winnerTips {
          display: block;
          width: 0.83rem;
          height: 0.85rem;
          background: url(../../assets/img/rankLei.png);
          background-size: 100% 100%;
        }
        em {
          color: #864e22;
        }
      }
      img {
        width: 0.78rem;
        height: 0.77rem;
        margin-left: 0.07rem;
        border-radius: 50%;
        border: 0.02rem solid rgba(232, 157, 23, 1);
      }
      .userMsg {
        width: 2.2rem;
        // height: 0.64rem;
        margin-left: 0.12rem;
        text-align-last: left;
        .name {
          font-size: 98%;
          color: #fff9d6;
          max-width: 2.2rem;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
        .uid {
          font-size: 80%;
          color: #fff9d6;
          margin-top: 0.05rem;
        }
      }
      .score {
        width: 1.6rem;
        display: flex;
        align-items: center;
        margin-left: 0.17rem;
        i {
          display: block;
          width: 0.39rem;
          height: 0.4rem;
          margin-right: 0.1rem;
          background: url(../../assets/img/Microphone.png);
          background-size: 100% 100%;
          &.leitai {
            width: 0.43rem;
            height: 0.44rem;
            background: url(../../assets/img/leizhu.png);
            background-size: 100% 100%;
          }
        }
        em {
          color: #fff88e;
          font-size: 98%;
        }
      }
      .default {
        width: 0.99rem;
        height: 0.39rem;
        margin: 0 0.15rem;
        &.promotionTips {
          background: url(../../assets/img/promotionTips.png);
          background-size: 100% 100%;
        }
      }
      .goPk {
        width: 2.04rem;
        height: 0.71rem;
        line-height: 0.71rem;
        text-align: center;
        color: #532e01;
        background: url(../../assets/img/goPk.png);
        background-size: 100% 100%;
      }
    }
  }
  .singUpSuccess {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.8);
    z-index: 1000;
    .content {
      width: 5.34rem;
      height: 3.28rem;
      background: url(../../assets/img/successPup.png);
      background-size: 100% 100%;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      .close {
        display: block;
        width: 0.58rem;
        height: 0.58rem;
        background: url(../../assets/img/close.png);
        background-size: 100% 100%;
        top: 0.15rem;
        right: 0.15rem;
        position: absolute;
      }
      p {
        width: 100%;
        color: #583500;
        text-align: center;
        position: absolute;
        top: 1.1rem;
      }
      .goPk {
        width: 2.04rem;
        height: 0.71rem;
        line-height: 0.71rem;
        text-align: center;
        color: #532e01;
        position: absolute;
        bottom: 0.36rem;
        left: 1.65rem;
        background: url(../../assets/img/goPk.png);
        background-size: 100% 100%;
      }
    }
  }
}
.refresh {
  display: block;
  width: 0.94rem;
  height: 1rem;
  position: fixed;
  right: 0.08rem;
  bottom: 1.35rem;
  background: url(../../assets/img/refresh.png) no-repeat;
  background-size: contain;
  transition: transform 1s;
  z-index: 100;
}
@import "../../assets/scss/common.scss";
</style>
