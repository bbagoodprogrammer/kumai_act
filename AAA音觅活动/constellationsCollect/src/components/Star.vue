<template>
  <div class="star">
    <div class="starBox">
      <div class="starItem" v-for="(item,index) in constellation" :key="index">
        <div class="imgBg" :class="{act:item.count > 0}">
          <img :src="item.count > 0?iconList[index].act_icon: iconList[index].defaultIcon" alt="" class="icon">
        </div>
        <strong>{{item.name}}</strong>
      </div>
    </div>
    <div class="openBtn">
      <div class="one" @click="luckStar(1)"></div>
      <div class="ten" @click="luckStar(10)">
      </div>
    </div>
    <div class="luckTurnTips" v-html="lang.star_luckTips">
      <!-- 點亮 <strong> 2、4、6、8、10、12</strong>個星座 分別可以抽獎一次，100%中獎 -->
    </div>
    <div class="mask" v-show="firstPup">
      <transition name="slide">
        <div class="queryCoins" v-if="firstPup">
          <i class="close" @click="firstPup = false"></i>
          <div class="title">{{lang.ok}}</div>
          <div class="tips">
            {{lang.star_starTips.replace('%n',nums).replace('%s',coin*nums)}}
          </div>
          <div class="openBtn">
            <div class="cancle" @click="firstPup = false"></div>
            <div class="ok" @click="luckStar(nums,'noFirst')">
            </div>
          </div>
        </div>
      </transition>
    </div>
    <div class="mask" v-show="showLuckPup">
      <transition name="slide">
        <div class="luckGiftList" v-if="showLuckPup" :class="{ten:nums > 1}">
          <i class="close" @click="showLuckPup  = false"></i>
          <div class="title">{{lang.star_luckTitle}}</div>
          <div class="luck_pup_bg">
            <div class="pup_con">
              <div class="giftList">
                <div class="luckItem" v-for="(item,index) in prizes.constellation" :key="index">
                  <div class="imgBox">
                    <img :src="iconList[item.pid -1].act_icon" alt="">
                    <img :src="numberArr[item.count]" alt="" class="gNums" v-if="nums > 1">
                  </div>
                  <strong>{{item.name}}</strong>
                </div>
              </div>
              <div class="giftList">
                <div class="luckItem" v-for="(item2,index2) in prizes.gift" :key="index2+'luck'">
                  <div class="imgBox">
                    <img :src="item2.image" alt="">
                    <img :src="numberArr[item2.count]" alt="" class="gNums" v-if="nums > 1">
                  </div>
                  <strong>{{item2.name}}</strong>
                </div>
              </div>
            </div>
            <div class="luckTips" v-if="luckDrawCount > 0">
              {{lang.star_linghtTips1.replace('%n',act_nums).replace('%s',luckDrawCount)}}
            </div>
            <div class="luckTips" v-else-if="empty_star.length">
              {{lang.star_linghtTips2.replace('%n',empty_star[0].name).replace('%s',prizes.gift[0].name)}}
            </div>
            <div class="next_btn" v-if="luckDrawCount > 0">
              <div class="turnLuck" @click="scorllTo()"> </div>
            </div>
            <div class="next_btn " v-else>
              <div class="cancel" v-if="empty_star" @click="showLuckPup  = false"></div>
              <div class="nextOpen" @click="luckStar(nums)"></div>
            </div>
          </div>

          <div class="buttom_icon"></div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>

import { mapState } from "vuex"
import { luck } from "../apis"

export default {
  data () {
    return {
      firstPup: false,
      showLuckPup: false,
      nums: 1,
      //           constellation: [{ pid: 12, name: "白羊座", count: 5 }],
      // gift: [{ name: 'xxx' }]
      prizes: {},
      luckDrawCount: 0,
      numberArr: {
        0: require('../img/numbers/0.png'),
        1: require('../img/numbers/1.png'),
        2: require('../img/numbers/2.png'),
        3: require('../img/numbers/3.png'),
        4: require('../img/numbers/4.png'),
        5: require('../img/numbers/5.png'),
        6: require('../img/numbers/6.png'),
        7: require('../img/numbers/7.png'),
        8: require('../img/numbers/8.png'),
        9: require('../img/numbers/9.png'),
      }
    }
  },
  computed: {
    ...mapState(['constellation', 'coin', 'firstLight']),
    iconList () {
      let arr = []
      for (let i = 0; i < this.constellation.length; i++) {
        arr.push({
          defaultIcon: require(`../img/star${i + 1}.png`),
          act_icon: require(`../img/star${i + 1}_act.png`)
        })
      }
      return arr
    },
    empty_star () {
      let useCon = this.constellation
      let prizes_useCon = this.prizes.constellation
      let arr = []
      for (let i = 0; i < useCon.length; i++) {
        for (let j = 0; j < prizes_useCon.length; j++) {
          if (useCon[i].count == 0 && (prizes_useCon[j].pid == useCon[i].pid)) {
            arr.push(prizes_useCon[j])
          }
        }
      }
      console.log(arr)
      return arr
    },
    act_nums () {
      let nums = 0
      this.constellation.forEach(element => {
        if (element.count > 0) {
          nums++
        }
      });
      return nums
    }
  },
  methods: {
    luckStar (val, noFirst) {
      if (this.firstLight && !noFirst) {
        this.nums = val
        this.firstPup = true
      } else {
        this.nums = val

        luck(val).then(res => {
          if (res.data.response_status.code == 0) {
            this.firstPup = false
            this.vxc('setFirst')
            this.luckDrawCount = res.data.response_data.luckDrawCount
            this.vxc('addUserStar', res.data.response_data.prizes.constellation)
            this.vxc('setLuckDrawCount', res.data.response_data.luckDrawCount)
            this.prizes = res.data.response_data.prizes
            this.showLuckPup = true
          } else {
            this.toast(res.data.response_status.error)
          }
        })
      }
    },
    scorllTo () {
      this.showLuckPup = false
      this.firstPup = false
      let a = document.getElementsByClassName('table')[0].getBoundingClientRect().top
      let c = document.documentElement.scrollTop || document.body.scrollTop
      let e = a + c - 10
      this.timer = setInterval(() => {
        let scrollToBottom = (document.documentElement.scrollTop || document.body.scrollTop) + window.innerHeight >= document.body.scrollHeight - 0;
        let c = document.documentElement.scrollTop || document.body.scrollTop
        let t = (e - c) / 10
        window.scrollTo(0, c + t)
        console.log(t)
        if (t < 15 || scrollToBottom) {
          clearInterval(this.timer)
        }
      }, 10)
    }
  }
}
</script>

<style lang="scss">
.star {
  position: relative;
  padding-top: 0.4rem;
  .starBox {
    width: 5.08rem;
    height: 8.06rem;
    padding: 0 0.8rem;
    background: url(../img/star.png);
    background-size: 100% 100%;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    .starItem {
      .imgBg {
        width: 1.5rem;
        height: 1.5rem;
        background: url(../img/star_bg.png);
        background-size: 100% 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        &.act {
          background: url(../img/star_actBg.png);
          background-size: 100% 100%;
        }
        .icon {
          width: 1.05rem;
          height: 1.05rem;
        }
      }
      strong {
        display: block;
        text-align: center;
        color: RGBA(172, 170, 191, 1);
        font-size: 0.26rem;
        text-shadow: rgba(108, 4, 152, 1) 1px 0 0, rgba(108, 4, 152, 1) 0 1px 0,
          rgba(108, 4, 152, 1) -1px 0 0, rgba(108, 4, 152, 1) 0 -1px 0;
      }
    }
  }
  .openBtn {
    padding: 0 0.32rem;
    margin-top: 0.3rem;
    display: flex;
    align-items: center;
    justify-content: center;
    justify-content: space-between;
  }
  .queryCoins {
    width: 5.89rem;
    height: 3.06rem;
    background: url(../img/qureyIcon.png);
    background-size: 100% 100%;
    position: relative;
    .title {
      height: 0.8rem;
      text-align: center;
      line-height: 0.8rem;
      font-size: 0.32rem;
      color: #fff;
    }
    .tips {
      height: 1.2rem;
      line-height: 1.2rem;
      display: flex;
      justify-content: center;
      align-items: center;
      color: rgba(246, 223, 254, 1);
      font-size: 0.28rem;
    }
    .openBtn {
      margin-top: 0;
    }
  }
  .luckTurnTips {
    margin: 0 auto;
    width: 6.16rem;
    height: 1.21rem;
    background: url(../img/luckTurnTips.png);
    background-size: 100% 100%;
    color: rgba(236, 186, 255, 1);
    text-align: center;
    padding-top: 0.67rem;
    line-height: 0.4rem;
    strong {
      color: rgba(254, 235, 167, 1);
    }
  }
  .luckGiftList {
    width: 7.07rem;
    // height: 4.88rem;
    // background: url(../img/luckGiftPup.png);
    // background-size: 100% 100%;
    position: relative;
    &.ten {
      //   height: 11.46rem;
      //   background: url(../img/tenLuck.png);
      //   background-size: 100% 100%;
      .pup_con {
        display: block !important;
      }
      .giftList {
        padding: 0 0.1rem 0 0.27rem;
        justify-content: start;
        .luckItem {
          width: 1.21rem;
          margin: 0 0.13rem 0.15rem 0;
          .imgBox {
            width: 1.21rem;
            height: 1.07rem;
            padding-top: 0.2rem;
            background: url(../img/tenGiftBg.png);
            background-size: 100% 100%;
          }
        }
      }
      .next_btn {
        margin-top: 0.1rem;
      }
    }
    .close {
      top: -0.15rem;
      right: -0.15rem;
    }
    .title {
      height: 0.8rem;
      text-align: center;
      line-height: 0.8rem;
      font-size: 0.32rem;
      color: #fff;
      background: url(../img/pup_top.png);
      background-size: 100% 100%;
    }
    .luck_pup_bg {
      padding: 0.24rem 0;
      background: url(../img/pup_con.png);
      background-size: 100% 100%;
    }
    .pup_con {
      display: flex;
      justify-content: center;
    }
    .buttom_icon {
      height: 0.65rem;
      background: url(../img/pup_button.png);
      background-size: 100% 100%;
    }
    .giftList {
      //   padding: 0 1.7rem;
      padding: 0 0.4rem;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      margin-bottom: 0.2rem;
      .luckItem {
        width: 1.37rem;
        .imgBox {
          width: 1.37rem;
          padding-top: 0.24rem;
          height: 1.2rem;
          background: url(../img/luckItemBg.png);
          background-size: 100% 100%;
          position: relative;
          img {
            width: 0.9rem;
            height: 0.9rem;
            display: block;
            margin: 0 auto;
          }
          .gNums {
            width: 0.27rem;
            height: 0.31rem;
            position: absolute;
            right: 0.15rem;
            bottom: 0.15rem;
          }
        }
        strong {
          display: block;
          text-align: center;
          font-size: 0.24rem;
          color: rgba(90, 224, 248, 1);
        }
      }
    }
    .luckTips {
      text-align: center;
      color: rgba(246, 223, 254, 1);
      font-size: 0.28rem;
      padding: 0 0.3rem;
    }
    .next_btn {
      display: flex;
      align-items: center;
      justify-content: center;
      margin-top: 0.1rem;
      .cancel {
        margin-right: 0.25rem;
      }
      > div {
        width: 2.42rem;
        height: 0.71rem;
      }
    }
  }
  .close {
    width: 0.69rem;
    height: 0.69rem;
    background: url(../img/close.png);
    background-size: 100% 100%;
    position: absolute;
    right: -0.3rem;
    top: -0.3rem;
  }
}
</style>