<template>
  <div class="myStandings">
    <div class="title">我的战绩 <i class="questIcon" @click="tipsClick()"></i></div>
    <div class="userMsg">
      <img v-lazy="" alt="">
      <div class="msg">
        <div class="nick">飞不上蓝天的猪 <i>Lv.88</i> </div>
        <div class="tips">
          <span>本賽季打擂場數：<em>3場</em> </span>
          <span>支持率：<em>79%</em></span>
        </div>
      </div>
    </div>
    <div class="preSong" v-for="(item,index) in hList" :key="index">
      <div class="preMsg">
        <span class="pre">第{{item.pre}}期
          <strong class="time">{{item.stime}}-{{item.etime}}</strong>
        </span>
        <span class="score">本場得分 <em>{{item.score>0?`+${item.score}`:item.score}}</em> </span>
      </div>
      <FightSong :list="item.list"></FightSong>
    </div>
    <div class="mask" v-show="showTips">
      <transition name="slide">
        <div class="lvTips" v-show="showTips">
          <i class="close" @click="tipsClick()"></i>
          <h3>等級說明</h3>
          <div class="tipsItem">
            <p>1、每個賽季，選手默認的等級為Lv.0,且Lv.0為最低級，不會降級</p>
            <p>2、選手升級模式為集滿4星升一級；每一次獲勝的選手（選手獲勝的評判標準為支持率大於50%），會獲得1顆星星，當滿4顆星星自動升級，而失敗的則失去一顆星星，且可降級</p>
          </div>
          <p>賽季結束時，前100名選手將獲得有效期為1個月的徽章獎勵：</p>
          <img src="../../assets/img/lvTab.png" alt="" class="lvTab">
          <span class="ok" @click="tipsClick()">我知道啦</span>
        </div>
      </transition>
    </div>
  </div>
</template>
<script>
import FightSong from "../../components/FightSong"
export default {
  components: { FightSong },
  data() {
    return {
      showTips: false,
      hList: [
        {
          pre: 1,
          stime: "7.24",
          etime: "7.27",
          score: 8,
          list: [
            {
              sname: '雪落下的聲音',
              user: {
                1: {
                  avatar: '',
                  num: 88,
                  nick: '飞不上蓝天的你'
                },
                2: {
                  avatar: '',
                  num: 12,
                  nick: '飞不上蓝天的豬豬'
                }
              },
              status: 0,
              top: 0
            },
            {
              sname: '雪落下的聲音',
              user: {
                1: {
                  avatar: '',
                  num: 88,
                  nick: '飞不上蓝天的你'
                },
                2: {
                  avatar: '',
                  num: 12,
                  nick: '飞不上蓝天的豬豬'
                }
              },
              status: 0,
              top: 0
            },
            {
              sname: '雪落下的聲音',
              user: {
                1: {
                  avatar: '',
                  num: 88,
                  nick: '飞不上蓝天的你'
                },
                2: {
                  avatar: '',
                  num: 12,
                  nick: '飞不上蓝天的豬豬'
                }
              },
              status: 0,
              top: 0
            },
            {
              sname: '雪落下的聲音',
              user: {
                1: {
                  avatar: '',
                  num: 88,
                  nick: '飞不上蓝天的你'
                },
                2: {
                  avatar: '',
                  num: 12,
                  nick: '飞不上蓝天的豬豬'
                }
              },
              status: 0,
              top: 0
            }
          ],
        },
        {
          pre: 2,
          stime: "7.24",
          etime: "7.27",
          score: -1,
          list: [
            {
              sname: '雪落下的聲音',
              user: {
                1: {
                  avatar: '',
                  num: 88,
                  nick: '飞不上蓝天的你'
                },
                2: {
                  avatar: '',
                  num: 12,
                  nick: '飞不上蓝天的豬豬'
                }
              },
              status: 0,
              top: 0
            },
            {
              sname: '雪落下的聲音',
              user: {
                1: {
                  avatar: '',
                  num: 88,
                  nick: '飞不上蓝天的你'
                },
                2: {
                  avatar: '',
                  num: 12,
                  nick: '飞不上蓝天的豬豬'
                }
              },
              status: 0,
              top: 0
            },
            {
              sname: '雪落下的聲音',
              user: {
                1: {
                  avatar: '',
                  num: 88,
                  nick: '飞不上蓝天的你'
                },
                2: {
                  avatar: '',
                  num: 12,
                  nick: '飞不上蓝天的豬豬'
                }
              },
              status: 0,
              top: 0
            },
            {
              sname: '雪落下的聲音',
              user: {
                1: {
                  avatar: '',
                  num: 88,
                  nick: '飞不上蓝天的你'
                },
                2: {
                  avatar: '',
                  num: 12,
                  nick: '飞不上蓝天的豬豬'
                }
              },
              status: 0,
              top: 0
            }
          ],
        },
        {
          pre: 3,
          stime: "7.24",
          etime: "7.27",
          score: -9,
          list: [
            {
              sname: '雪落下的聲音',
              user: {
                1: {
                  avatar: '',
                  num: 88,
                  nick: '飞不上蓝天的你'
                },
                2: {
                  avatar: '',
                  num: 12,
                  nick: '飞不上蓝天的豬豬'
                }
              },
              status: 0,
              top: 0
            },
            {
              sname: '雪落下的聲音',
              user: {
                1: {
                  avatar: '',
                  num: 88,
                  nick: '飞不上蓝天的你'
                },
                2: {
                  avatar: '',
                  num: 12,
                  nick: '飞不上蓝天的豬豬'
                }
              },
              status: 0,
              top: 0
            },
            {
              sname: '雪落下的聲音',
              user: {
                1: {
                  avatar: '',
                  num: 88,
                  nick: '飞不上蓝天的你'
                },
                2: {
                  avatar: '',
                  num: 12,
                  nick: '飞不上蓝天的豬豬'
                }
              },
              status: 0,
              top: 0
            },
            {
              sname: '雪落下的聲音',
              user: {
                1: {
                  avatar: '',
                  num: 88,
                  nick: '飞不上蓝天的你'
                },
                2: {
                  avatar: '',
                  num: 12,
                  nick: '飞不上蓝天的豬豬'
                }
              },
              status: 0,
              top: 0
            }
          ],
        }
      ]
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
  .myStandings {
    padding: 0.29rem 0 0;
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
      padding-left: 0.5rem;
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
          i {
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
    .preSong {
      margin: 0.25rem auto 0.8rem;
      width: 6.86rem;
      .preMsg {
        padding: 0 0.22rem;
        height: 0.5rem;
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: 0.26rem;
        margin-bottom: 0.12rem;
        .score {
          em {
            color: rgba(255, 197, 25, 1);
            font-weight: bold;
          }
        }
      }
    }
  }
  .lvTips {
    width: 4.91rem;
    height: 6.96rem;
    background: rgba(116, 68, 255, 1);
    border: 0.04rem solid rgba(213, 197, 255, 1);
    border-radius: 0.4rem;
    padding: 0.33rem 0.37rem;
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
      font-size: 0.36rem;
      text-align: center;
    }
    .tipsItem {
      margin: 0.2rem 0 0.23rem;
    }
    p {
      color: #e5deff;
      font-size: 0.24rem;
    }
    .lvTab {
      width: 4.67rem;
      height: 2.33rem;
      margin-top: 0.1rem;
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
