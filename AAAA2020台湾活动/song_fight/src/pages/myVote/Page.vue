<template>
  <div class="myVote">
    <div class="title">我的战绩 <i class="questIcon" @click="tipsClick()"></i></div>
    <div class="userMsg">
      <img v-lazy="" alt="">
      <div class="msg">
        <div class="nick">飞不上蓝天的猪 <em>Lv.88</em> <i class="star" v-for="i in 2" :key="i"></i></div>
        <div class="tips">
          <span>累計投選<em> 3 </em>組</span>
          <span>總投中率：<em>79%</em></span>
        </div>
      </div>
    </div>
    <div class="preResTime">
      <div class="timeTips">
        <p class="noRes">8月3日 20:00:00 公佈投票結果</p>
        <p><span class="time">7月24日-7月27日</span>投選55組，投中率80%，獲得金耳朵稱號<br />2次連投8組投中</p>
      </div>
      <VoteSongList :list="list" />
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
  </div>
</template>
<script>
import VoteSongList from "../../components/VoteSongList"
export default {
  components: { VoteSongList },
  data() {
    return {
      list: [
        {
          avatar: '',
          nick: '方方方法付付付',
          songName: '雪落下的聲音',
          isMark: true,
          users: {
            1: {
              avatar: '',
              score: 88
            },
            2: {
              avatar: '',
              score: 33
            }
          }
        },
        {
          avatar: '',
          nick: '方方方法付付付',
          songName: '雪落下的聲音',
          isMark: true,
          users: {
            1: {
              avatar: '',
              score: 88
            },
            2: {
              avatar: '',
              score: 33
            }
          }
        },
        {
          avatar: '',
          nick: '方方方法付付付',
          songName: '雪落下的聲音',
          isMark: true,
          users: {
            1: {
              avatar: '',
              score: 88
            },
            2: {
              avatar: '',
              score: 33
            }
          }
        },
        {
          avatar: '',
          nick: '方方方法付付付',
          songName: '雪落下的聲音',
          isMark: true,
          users: {
            1: {
              avatar: '',
              score: 88
            },
            2: {
              avatar: '',
              score: 33
            }
          }
        },
        {
          avatar: '',
          nick: '方方方法付付付',
          songName: '雪落下的聲音',
          isMark: true,
          users: {
            1: {
              avatar: '',
              score: 88
            },
            2: {
              avatar: '',
              score: 33
            }
          }
        }
      ],
      showTips: false
    }
  },
  methods: {
    tipsClick() {
      this.showTips = !this.showTips
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
