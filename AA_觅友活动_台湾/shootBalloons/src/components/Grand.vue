<template>
  <div class="grand">
    <div class="peopleList">
      <div class="pItem" v-for="(item,index) in comPrizes" :key="index" :class="{noPeople:!item.uid}">
        <img v-lazy="item.avatar" alt="" class="av">
        <div class="nick">{{item.nick?item.nick:'虛位以待'}}</div>
        <div class="score" v-if="item.uid"><i></i></div>
      </div>
    </div>
    <div class="grandTips">
      <i></i>
      在射氣球的過程中，有可能射中氣球大獎喔
      <span>飛鏢砲台射中機率更高</span>
    </div>
  </div>
</template>

<script>

import { mapState } from "vuex"
export default {
  computed: {
    ...mapState(['grand_prizes']),
    comPrizes () {
      let arr = JSON.parse(JSON.stringify(this.grand_prizes))
      for (let i = 0; i < 3 - this.grand_prizes.length; i++) {
        arr.push({
          uid: 0,
          nick: ''
        })
      }
      return arr
    }
  },
}
</script>

<style lang="scss">
.grand {
  .peopleList {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 0.36rem;
    .pItem {
      width: 1.96rem;
      height: 2.69rem;
      background: url(../img/luckPeopleBg.png);
      background-size: 100% 100%;
      &.noPeople {
        background: url(../img/luckPeopleBg_noOpen.png);
        background-size: 100% 100%;
        img {
          opacity: 0;
        }
      }
      img {
        width: 1.25rem;
        height: 1.25rem;
        border-radius: 50%;
        margin: 0.34rem auto 0;
        box-sizing: border-box;
        border: 0.03rem solid #FEEB8E;
      }
      .nick {
        width: 2.09rem;
        height: 0.33rem;
        margin-left: -0.06rem;
        background: url(../img/nickBg.png);
        background-size: 100% 100%;
        text-align: center;
        line-height: 0.33rem;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        margin-top: 0.08rem;
        font-size: 0.22rem;
        color: #ECE7BD;
      }
      .score {
        text-align: center;
        font-size: 0.27rem;
        color: #FFF8BD;
        margin-top: 0.15rem;
        display: flex;
        align-items: center;
        justify-content: center;
        i {
          width: 0.24rem;
          height: 0.24rem;
          background: url(../img/coins.png);
          background-size: 100% 100%;
          margin-right: 0.06rem;
        }
      }
    }
  }
  .grandTips {
    text-align: center;
    font-size: 0.24rem;
    color: #A9650A;

    i {
      display: inline-block;
      width: 0.22rem;
      height: 0.22rem;
      background: url(../img/point.png);
      background-size: 100% 100%;
    }
    span {
      display: block;
      color: #862A09;
    }
  }
}
</style>