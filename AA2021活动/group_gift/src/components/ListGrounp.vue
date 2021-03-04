<template>
  <div class="listGrounp">
    <a @click.prevent="onRefresh" href="" :class="{mb:type == 1}" :style="{transform:'rotate('+rotatePx+'deg)'}" id="refresh"></a>
    <div class="tabs">
      <span v-for="(item,index) in tabsArr" :class="{act:type == (index+1)}" :key="index" @click="tabClick(index) ">
        {{item}}
      </span>
    </div>
    <div class="time">
      <div class="peopleNums listTips" v-if="type == 1 || type ==2" v-html="lang.listGrounp_sucGroupNums.replace('$',finish)"> </div>
      <div class="timeTips listTips" v-if="type==1">
        <p v-if="step == 0">{{lang.listGrounp_timeTips1}}</p>
        <p v-else-if="step == 1">{{lang.listGrounp_timeTips2}}</p>
        <p v-else-if="step == 2">{{lang.listGrounp_timeTips3}}</p>
      </div>
      <div class="downTimeBox2">
        <div class="timeDown" v-if="surplusTime&& !surplusTime.end">
          <div class="day">
            <strong>{{surplusTime.day}}</strong>
            <em>{{lang.day}}</em>
          </div>
          <div class="hours">
            <strong>{{surplusTime.hour}}</strong>
            <em>{{lang.hour}}</em>
          </div>
          <div class="min">
            <strong>{{surplusTime.minute}}</strong>
            <em>{{lang.minute}}</em>
          </div>
          <div class="second">
            <strong>{{surplusTime.second}}</strong>
            <em>{{lang.second}}</em>
          </div>
        </div>
      </div>
      <div class="rankTips listTips" v-if="type==3">{{lang.listGrounp_coinsTips}}</div>
    </div>
    <keep-alive>
      <component :is="nowCom" ref="showCom"></component>
    </keep-alive>
    <!-- 邀請彈窗 -->
    <!-- 拼團 -->
    <div class="mask" v-show="showInvite">
      <transition name="slide">
        <div class="getGift" v-if="showInvite">
          <i class="close" @click="showInvite = false"></i>
          <div class="giftItemMsg">
            <div class="imgBox">
              <img :src="invite.ginfo.img" alt="">
            </div>
            <div class="msg">
              <div class="giftName">{{invite.ginfo.name}} <i>{{invite.ginfo.kind*1?lang.people_Kroom:lang.people_song}}</i></div>
              <div class="price">
                <span><em>{{invite.price}}</em></span> <i class="icon"></i><del>{{invite.max_price}}{{lang.list1_icon}}</del>
              </div>
              <div class="giftPupTips">{{lang.list2_buyFail}}</div>
            </div>
          </div>
          <div class="selectType2">
            <div class="buyTips" v-if="invite.status == 1">
              {{lang.listGrounp_noSucGroup1}}
            </div>
            <div class="buyTips" v-else-if="invite.status == 2">
              {{lang.listGrounp_noSucGroup2}}
            </div>
            <div class="buyTips" v-else>
              {{lang.listGrounp_noSucTips.replace('#',invite.nick).replace('$',invite.ginfo.name)}}
              <br />
              {{lang.listGrounp_noSucTips2.replace('#',invite.price).replace('$',invite.ginfo.name)}}
              {{lang.listGrounp_noSucTips3}}
            </div>
            <div class="go" :class="{over:invite.status != 0}" @click="getGift()">{{lang.list2_addGroup}}</div>
          </div>
        </div>
      </transition>
    </div>

  </div>
</template>
<script>

import downTime from '../utils/downTime.js'
import List1 from './List1'
import List2 from './List2'
import List3 from './List3'
import { mapState } from "vuex"

export default {
  components: { List1, List2, List3 },
  data () {
    return {
      type: 1,
      //   tabsArr: [
      //     '禮物櫥窗',
      //     '禮物拼團',
      //     '拼團榜'
      //   ],
      surplusTime: {},
      showInvite: false,
      rotatePx: 0,    //刷新旋转动画
      rotatec: 0,
      first: true
    }
  },
  computed: {
    ...mapState(['load', 'finish', 'invite', 'ctime', 'etime', 'step']),
    nowCom () {
      return `List${this.type}`
    },
    tabsArr () {
      return this.lang.tabsArr
    }
  },
  watch: {
    load (val) {
      console.log(val)
      this.downTimeGo('time' + 1, val)
    },
    type (val) {
      if (val == 3) {
        this.downTimeGo('time' + 3, this.etime - this.ctime)
      } else {
        this.downTimeGo('time' + 1)
      }
    },
    invite (val) {
      if (val && this.first) {
        this.first = false
        setTimeout(() => {
          this.tabClick(1)
          this.showInvite = true
        })
      }
    }
  },
  methods: {
    tabClick (index) {
      this.type = index + 1
      this.vxc('setType', this.type)
    },
    downTimeGo (timeName, val) {
      console.log(timeName, val)
      clearInterval(this.timer)
      if (!downTime(timeName)) {
        downTime(timeName, val);
      }
      this.surplusTime = downTime(timeName);
      this.timer = setInterval(() => {
        this.surplusTime = downTime(timeName);
        if (this.surplusTime && this.surplusTime.end) {
          clearInterval(this.timer)
          // this.$store.commit("changday_down_time", 0)  //當天剩餘時間
        }
      }, 1000)
    },
    getGift () {
      if (this.invite.status != 0) { return }
      this.$refs.showCom.showGetGiftPup(this.invite)
      this.showInvite = false
    },
    onRefresh () {
      this.rotatePx = 540 * ++this.rotatec  //旋转动画
      this.$store.dispatch('getInitInfo');
      this.vxc('clearInvite')
      if (this.type == 2 || this.type == 3) {
        this.$refs.showCom.refresh()
      }
    },
  }
}
</script>
<style lang="scss" scoped>
.listGrounp {
  .tabs {
    width: 7.18rem;
    height: 0.88rem;
    background: #ffffff;
    border-radius: 0.44rem;
    margin: 0.37rem auto 0;
    display: flex;
    align-items: center;
    span {
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      line-height: 0.25rem;
      flex: 1;
      color: rgba(133, 90, 55, 1);
      font-size: 0.32rem;
      text-align: center;
      border-radius: 0.44rem;
      &.act {
        color: #fff;
        background: linear-gradient(-90deg, #ff885a, #ff6957);
      }
    }
  }
  .time {
    color: rgba(133, 90, 55, 1);
    font-size: 0.28rem;
    .listTips {
      height: 0.8rem;
      line-height: 0.8rem;
      text-align: center;
      em {
        color: rgba(255, 106, 87, 1);
      }
      &.timeTips {
        font-size: 0.32rem;
      }
    }
  }
  .downTimeBox2 {
    margin: 0.11rem auto 0;
    width: 6.98rem;
    text-align: center;
    position: relative;
    .timeDown {
      width: 5.15rem;
      padding: 0 0.09rem;
      margin: 0.17rem auto 0;
      display: flex;
      justify-content: space-between;
      > div {
        height: 100%;
        line-height: 0.6rem;
        display: flex;
        align-items: center;
        strong {
          display: block;
          text-align: center;
          width: 0.88rem;
          height: 0.88rem;
          background: rgba(255, 255, 255, 0.6);
          border-radius: 0.16rem;
          line-height: 0.88rem;
          font-size: 0.5rem;
        }
        em {
          font-size: 0.24rem;
          margin: 0.15rem 0.05rem 0 0.05rem;
        }
      }
    }
    .timeTips {
      font-size: 0.24rem;
      text-align: center;
      margin: 0.13rem auto 0;
    }
    .noTime {
      line-height: 0.6rem;
    }
  }
}
.getGift {
  width: 6.6rem;
  // height: 7.1rem;
  padding-bottom: 0.32rem;
  background: #ffffff;
  border-radius: 0.12rem;
  position: relative;
  .giftItemMsg {
    height: 2.24rem;
    display: flex;
    align-items: center;
    .imgBox {
      width: 1.6rem;
      height: 1.6rem;
      background: rgba(255, 245, 237, 0.92);
      border-radius: 0.06rem;
      margin: 0 0.14rem 0 0.2rem;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .msg {
      width: 3.8rem;
      .giftName {
        display: flex;
        align-items: center;
        // justify-content: center;
        font-size: 0.32rem;
        color: rgba(133, 90, 55, 1);
        i {
          padding: 0 0.08rem;
          height: 0.3rem;
          line-height: 0.3rem;
          border: 1px solid #ff7959;
          border-radius: 0.06rem;
          font-size: 0.22rem;
          color: rgba(255, 121, 89, 1);
          margin-left: 0.05rem;
        }
      }
      .price {
        font-size: 0.18rem;
        display: flex;
        align-items: center;
        // justify-content: center;
        span {
          color: rgba(255, 121, 89, 1);
          em {
            color: rgba(255, 121, 89, 1);
            font-size: 0.26rem;
            font-weight: 600;
            margin-left: 0.05rem;
          }
        }
        i {
          width: 0.28rem;
          height: 0.28rem;
          background: url(../img/coins.png);
          background-size: 100% 100%;
          margin: 0 0.06rem;
        }
        del {
          font-size: 0.18rem;
        }
      }
      .giftPupTips {
        font-size: 0.18rem;
        color: rgba(188, 168, 155, 1);
      }
    }
  }
  .selectSet {
    height: 0.9rem;
    padding: 0 0.32rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: rgba(133, 90, 55, 1);
    font-size: 0.26rem;
    .numsInput {
      display: flex;
      align-items: center;
      justify-content: center;
      input {
        width: 0.84rem;
        height: 0.36rem;
        line-height: 0.36rem;
        background: #fff6ee;
        border-radius: 0.06rem;
        border: none;
        text-align: center;
      }
      .reduex {
        margin-right: 0.05rem;
      }
      .add {
        margin-left: 0.05rem;
      }
    }
  }
  .peopleList {
    padding: 0 0.32rem;
    margin-top: 0.3rem;
    .peopleTips {
      font-size: 0.26rem;
      color: rgba(133, 90, 55, 1);
      em {
        font-size: 0.26rem;
        color: rgba(255, 107, 87, 1);
      }
    }
    .pList {
      margin-top: 0.2rem;
      img {
        width: 0.56rem;
        height: 0.56rem;
        margin-right: 0.12rem;
        border-radius: 50%;
      }
    }
  }
  .go {
    width: 5.2rem;
    height: 0.8rem;
    background: linear-gradient(-90deg, #ff885a, #ff6957);
    border-radius: 0.4rem;
    text-align: center;
    line-height: 0.8rem;
    color: #fff;
    font-size: 0.32rem;
    margin: 0.4rem auto 0;
    &.no {
      margin: 0 auto;
    }
    &.over {
      background: rgba(188, 188, 188, 1);
    }
  }
  .close {
    display: block;
    width: 0.27rem;
    height: 0.27rem;
    background: url(../img/close.png);
    background-size: 100% 100%;
    position: absolute;
    top: 0.32rem;
    right: 0.26rem;
  }
}
.selectType2 {
  .buyTips {
    height: 1.3rem;
    display: flex;
    align-items: center;
    justify-content: center;
    color: rgba(133, 90, 55, 1);
    font-size: 0.26rem;
    padding: 0 0.4rem;
    em {
      color: rgba(255, 121, 89, 1);
    }
    &.left {
      display: block;
      justify-content: flex-start;
      padding: 0 0.3rem;
      height: 0.8rem;
      margin-top: 0.15rem;
    }
  }
  .btn {
    display: flex;
    align-items: center;
    justify-content: center;
    span {
      width: 2.8rem;
      height: 0.8rem;
      background: linear-gradient(
        -90deg,
        rgba(255, 136, 90, 0.1),
        rgba(255, 105, 87, 0.1)
      );
      border-radius: 0.4rem;
      text-align: center;
      line-height: 0.8rem;
      color: rgba(255, 133, 90, 1);
      &.qurey {
        color: #fff;
        background: linear-gradient(-90deg, #ff885a, #ff6957);
        margin-left: 0.43rem;
      }
    }
  }
}
#refresh {
  display: block;
  width: 0.94rem;
  height: 0.94rem;
  position: fixed;
  right: 0.08rem;
  bottom: 1.35rem;
  background: url(../img/refresh.png) no-repeat;
  background-size: contain;
  transition: transform 1s;
  text-indent: -999rem;
  z-index: 100;
  &.mb {
    bottom: 2.8rem;
  }
}
</style>
