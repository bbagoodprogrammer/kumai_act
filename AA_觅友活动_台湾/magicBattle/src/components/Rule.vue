<template>
  <div class="rule">
    <i class="close" @click="$parent.showRule = false"></i>
    <p class="actTm">{{lang.rule_tm}}{{aTimer}}</p>
    <div class="tab">
      <span :class="{act:type == 1}" @click="type = 1">{{lang.rule_tab1}}</span>
      <span :class="{act:type == 2}" @click="type = 2">{{lang.rule_tab2}}</span>
    </div>
    <div class="con">
      <div class="ruleItem" v-if="type == 1">
        <div v-for="(item,index) in lang.ruleItem" :key="index">
          <h6>{{item.h6}}</h6>
          <p v-html="item.p"></p>
          <p v-html="item.p2" v-if="item.p2"></p>
          <div class="rule_table" v-if="index == 1"></div>
          <div class="giftArr" v-if="index == 0">
            <div class="giftItem" v-for="(item,index) in giftArr" :key="index">
              <div class="imgBox">
                <img :src="item.img" alt="">
              </div>
              <strong v-html="item.name"></strong>
            </div>
          </div>
        </div>
      </div>
      <div class="giftItem" v-else>
        <h6>{{lang.rank_giftTitle}}</h6>
        <div class="giftArr two">
          <div class="giftItem" v-for="(item,index) in giftArr2" :key="index">
            <div class="imgBox">
              <img :src="item.img" alt="">
            </div>
            <strong v-html="item.name"></strong>
          </div>
        </div>
        <div v-for="(item,index) in lang.giftItem" :key="index">
          <h6>{{item.h6}}</h6>
          <p v-html="item2" v-for="(item2,index2) in item.p" :key="index2"></p>
        </div>
      </div>
      <p class="lastTips">{{lang.lastTips}}</p>
    </div>

  </div>
</template>

<script>
import getDate from "../utils/getDate"
import { mapState } from "vuex"

export default {
  data () {
    return {
      type: 1
    }
  },
  computed: {
    ...mapState(['activity']),
    aTimer () {
      if (AREA == 'tw') {
        return getDate(new Date(this.activity.stime * 1000), 1) + '-' + getDate(new Date(this.activity.etime * 1000), 1)
      } else if (AREA == 'vn') {
        return getDate(new Date(this.activity.stime * 1000), 2) + '-' + getDate(new Date(this.activity.etime * 1000), 2)
      }

    },
    giftArr () {
      return this.lang.giftArr
    },
    giftArr2 () {
      return this.lang.giftArr2
    }
  }

}
</script>

<style lang="scss" scoped>
.rule {
  width: 6.36rem;
  height: 7.33rem;
  padding: 0.69rem 0.45rem 0;
  background: url(../img/ruleBg.png);
  background-size: 100% 100%;
  position: relative;
  .actTm {
    text-align: center;
    color: #96451D;
    font-size: 0.26rem;
  }
  .giftArr {
    padding: 0 0.2rem;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    margin-top: 0.25rem;
    &.two {
      .giftItem:nth-child(1) {
        margin-left: 1rem;
      }
      .giftItem:nth-child(2) {
        margin-right: 1rem;
      }
    }
    .giftItem {
      width: 1.54rem;
      .imgBox {
        width: 1.54rem;
        height: 1.54rem;
        background: url(../img/ruleImgBg.png);
        background-size: 100% 100%;
        img {
          width: 1.54rem;
          height: 1.54rem;
        }
      }
      strong {
        display: block;
        color: #613610;
        font-size: 0.26rem;
        text-align: center;
      }
    }
  }
  .tab {
    height: 0.68rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 0.3rem auto;
    span {
      width: 2.94rem;
      height: 0.78rem;
      text-align: center;
      line-height: 0.78rem;
      background: url(../img/notAct.png);
      background-size: 100% 100%;
      &.act {
        background: url(../img/singBtn.png);
        background-size: 100% 100%;
      }
    }
  }
  .con {
    height: 5rem;
    overflow-y: scroll;
    h6 {
      color: #330D0E;
      margin: 0.2rem 0;
    }
    p {
      font-size: 0.28rem;
      color: #96451D;
    }
  }
  .close {
    display: block;
    width: 0.79rem;
    height: 0.78rem;
    background: url(../img/close.png);
    background-size: 100% 100%;
    position: absolute;
    right: 0.44rem;
    top: 0;
  }
}
.lastTips {
  text-align: center;
  margin-top: 0.25rem;
}
</style>