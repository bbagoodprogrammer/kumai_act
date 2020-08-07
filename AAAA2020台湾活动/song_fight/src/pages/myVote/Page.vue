<template>
  <div class="myVote">
    <div class="title">我的投票 <i class="questIcon" @click="tipsClick()"></i></div>
    <div class="userMsg">
      <img v-lazy="userinfo.avatar" alt="">
      <div class="msg">
        <!-- <em>Lv.{{star}}</em> -->
        <div class="nick"><strong>{{userinfo.nick}}</strong> </div>
        <div class="tips">
          <span>累計投選<em> {{dat.all}} </em>組</span>
          <span>總投中率：<em>{{dat.right}}%</em></span>
        </div>
      </div>
    </div>
    <div class="preResTime" v-for="(item,index) in list " :key="index">
      <div class="timeTips">
        <p class="noRes" v-if="item.result == 0">{{getDate(item.etime,2)}}公佈投票結果</p>
        <p v-else><span class="time">{{getDate(item.stime,1)}}-{{getDate(item.etime,1)}}</span>投選{{item.counts}}組，投中率{{item.right}}%<span v-if="item.title!=0">，獲得{{err[item.title]}}稱號</span> <br /> <strong v-if="item.eight">2次連投8組投中</strong> </p>
      </div>
      <VoteSongList :list="item.list" :index="index" v-if="item.list" />
    </div>
    <div class="mask" v-show="showTips">
      <transition name="slide">
        <div class="lvTips" v-show="showTips">
          <i class="close" @click="tipsClick()"></i>
          <h3>評委稱號及特權</h3>
          <img src="../../assets/img/chTab.png" alt="" class="chTab">
          <p>PS.</p>
          <p>1、稱號展示在下一期的活動中</p>
          <p>2、如本期獲得金耳朵稱號，下期每投一票相當於普通用戶投2票</p>
          <p>3、本期獲得的評委稱號及投票特權僅在下一期活動中生效</p>
        </div>
      </transition>
    </div>
    <loading />
  </div>
</template>
<script>
import VoteSongList from "../../components/VoteSongList"
import loading from "../../components/Loading"
import api from "../../api/apiConfig"
import getDate from "../../utils/getDate"
export default {
  components: { VoteSongList, loading },
  data() {
    return {
      list: [],
      showTips: false,
      userinfo: {},
      star: 0,
      dat: {},
      err: ['', '鐵耳朵', '銅耳朵', '銀耳朵', '金耳朵', '白金耳朵']
    }
  },
  created() {
    document.title = '我的投票'
    api.myJun().then(res => {
      const { data, star, userinfo, dat } = res.data.response_data
      this.userinfo = userinfo
      this.star = star
      this.list = data
      this.dat = dat
    })
  },
  methods: {
    tipsClick() {
      this.showTips = !this.showTips
    },
    getDate(val, type) {
      return getDate(new Date(val * 1000), type)
    }
  }
}
</script>
<style lang="scss">
body {
  background: rgba(117, 67, 240, 1) url(../../assets/img/htmlBg.png) no-repeat;
  background-size: 100% auto;
  .myVote {
    padding: 0.5rem 0.35rem 0 0.5rem;
    .title {
      text-align: center;
      color: rgba(255, 213, 86, 1);
      font-size: 0.48rem;
      font-weight: bold;
      .questIcon {
        display: block;
        width: 0.58rem;
        height: 0.58rem;
        background: url(../../assets/img/standIcon.png);
        background-size: 100% 100%;
        position: absolute;
        top: 0.29rem;
        right: 0.26rem;
      }
    }
    .userMsg {
      display: flex;
      align-items: center;
      margin-top: 0.41rem;
      img {
        width: 1rem;
        height: rem;
        border-radius: 50%;
      }
      .msg {
        margin-left: 0.13rem;
        .nick {
          display: flex;
          align-items: center;
          strong {
            width: 2rem;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
          }
          em {
            display: inline-block;
            vertical-align: bottom;
            font-size: 0.24rem;
            width: 0.81rem;
            height: 0.33rem;
            background: rgba(251, 162, 91, 1);
            border-radius: 0.1rem;
            text-align: center;
            line-height: 0.4rem;
            margin-left: 0.11rem;
          }
          .star {
            width: 0.33rem;
            height: 0.31rem;
            background: url(../../assets/img/star.png);
            background-size: 100% 100%;
            margin: 0 0.04rem;
          }
        }
        .tips {
          span {
            font-size: 0.24rem;
            margin-right: 0.2rem;

            em {
              color: rgba(251, 162, 91, 1);
              font-weight: bold;
            }
          }
        }
      }
    }
    .preResTime {
      margin-top: 0.4rem;
      .timeTips {
        text-align: center;
        color: rgba(110, 255, 216, 1);
        .noRes {
          font-weight: bold;
        }
        .time {
          font-weight: bold;
          display: block;
        }
      }
    }
  }
  .lvTips {
    width: 5.6rem;
    height: 7.16rem;
    background: rgba(116, 68, 255, 1);
    border: 0.04rem solid rgba(213, 197, 255, 1);
    border-radius: 0.4rem;
    padding: 0.36rem 0.26rem;
    position: relative;
    .close {
      display: block;
      width: 0.6rem;
      height: 0.6rem;
      background: url(../../assets/img/close.png);
      background-size: 100% 100%;
      position: absolute;
      right: 0;
      top: -0.9rem;
    }
    h3 {
      font-size: 0.48rem;
      color: rgba(255, 213, 86, 1);
      text-align: center;
    }
    .tipsItem {
      margin: 0.2rem 0 0.23rem;
    }
    p {
      color: #e5deff;
      font-size: 0.24rem;
    }
    .chTab {
      width: 5.65rem;
      height: 4.22rem;
      margin: 0.29rem auto 0.22rem;
    }
    .ok {
      display: block;
      width: 2.24rem;
      height: 0.74rem;
      background: url(../../assets/img/ok.png);
      background-size: 100% 100%;
      text-align: center;
      line-height: 0.74rem;
      color: rgba(174, 72, 0, 1);
      margin: 0.2rem auto 0;
    }
  }
}
</style>
