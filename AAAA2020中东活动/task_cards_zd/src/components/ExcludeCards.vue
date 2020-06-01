<template>
  <div class="excludeCards">
    <p class="excludeTitle">{{lang.excludeTips}}</p>
    <div class="carbBox">
      <div class="cardItem" v-for="(item,index) in cardTypes" :key="index">
        <img :src="getImg(item)" alt="" class="imgItem">
        <p class="giftName">{{getName(item)}}</p>
        <span class="excludeBtn" @click="exclude(item)">{{lang.exclude}}</span>
      </div>
    </div>
    <span class="cancelBtn" @click="qux(1)">{{lang.excludeUse}}</span>
    <div class="mask" v-if="succedEx">
      <transition name="slide">
        <div class="succEx" v-show="succedEx">
          <div class="tipsBox">
            <p class="exTitle">{{lang.userType}}</p>
            <p class="giftType">{{getName(showType)}}</p>
            <p class="exTips">{{lang.nextTips}}</p>
            <span class="query" @click="closeGiftpUP()">{{lang.query}}</span>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex"
import excludeGiftImg from "../config/excludeGiftImg"
import api from "../api/apiConfig"
export default {
  data() {
    return {
      succedEx: false,
      showType: ''
    }
  },
  computed: {
    ...mapState(['initData', 'type', 'newCards']),
    cardTypes() {
      let typeArr = []
      this.newCards.forEach(element => {
        if (element.etype) {
          typeArr.push(element.etype)
        }
      });
      //new Set(typeArr)去重，array.from将类数组或者可遍历对象转为真正的数组
      return Array.from(new Set(typeArr))
    }
  },
  methods: {
    setType() {
      this.vxc('setType', 1)
    },
    exclude(type) {
      api.userCard(1, type).then(res => {
        if (res.data.response_status.code == 0) {
          this.vxc('setExclude', type)
          this.showType = type
          this.succedEx = true
        } else {
          this.toast = res.data.response_status.error
        }
      })
    },
    qux() {
      this.vxc('redxExclude')
      this.setType()
    },
    closeGiftpUP() {
      this.succedEx = false
      this.setType()
    },
    getImg(type) {
      return excludeGiftImg[type].img
    },
    getName(type) {
      return excludeGiftImg[type].name
    }
  }
}
</script>
<style lang= "scss" scoped>
.excludeCards {
  padding: 0.66rem 0.16rem 0;
  height: 5.45rem;
  background: url(../assets/img/turnBg.png);
  background-size: 100% 100%;
  position: relative;
  .excludeTitle {
    color: #fcf16a;
    text-align: center;
    font-weight: 600;
  }
  .carbBox {
    display: flex;
    justify-content: center;
    margin-top: 0.15rem;
    .cardItem {
      width: 1.75rem;
      height: 2.44rem;
      background: url(../assets/img/ExcludeCardsBg.png);
      background-size: 100% 100%;
      margin-right: 0.05rem;
      position: relative;
      .imgItem {
        width: 1rem;
        height: 1rem;
        position: absolute;
        left: 0.38rem;
        top: 0.75rem;
      }
      .giftName {
        position: absolute;
        height: 0.5rem;
        line-height: 0.25rem;
        bottom: 0.15rem;
        color: #ffebb6;
        font-size: 0.21rem;
        font-weight: 600;
        text-align: center;
        width: 1.75rem;
      }
      .excludeBtn {
        display: block;
        width: 1.66rem;
        height: 0.66rem;
        text-align: center;
        line-height: 0.66rem;
        background: url(../assets/img/excludeBtn.png);
        background-size: 100% 100%;
        position: absolute;
        bottom: -0.8rem;
        left: 0.05rem;
      }
    }
  }
  .cancelBtn {
    display: block;
    width: 2rem;
    height: 0.8rem;
    line-height: 0.8rem;
    background: url(../assets/img/cardBtn.png);
    background-size: 100% 100%;
    text-align: center;
    position: absolute;
    bottom: 0.2rem;
    left: 2.75rem;
    font-weight: 700;
    font-size: 0.28rem;
  }
  .succEx {
    width: 5.45rem;
    height: 6.37rem;
    background: url(../assets/img/carPup.png);
    background-size: 100% 100%;
    position: absolute;
    left: 1.05rem;
    top: 2.3rem;
    .tipsBox {
      margin: 2.8rem auto 0;
      p {
        text-align: center;
        &.exTitle {
          font-weight: 600;
          font-size: 0.32rem;
        }
        &.giftType {
          margin-top: 0.36rem;
          color: #fcf16a;
        }
        &.exTips {
          margin: 0.37rem auto 0.38rem;
          color: #ffe2a5;
          font-size: 0.24rem;
          font-weight: 600;
        }
      }
      .query {
        display: block;
        width: 2rem;
        height: 0.8rem;
        background: url(../assets/img/cardBtn.png);
        background-size: 100% 100%;
        text-align: center;
        line-height: 0.78rem;
        margin: 0 auto;
      }
    }
  }
}
</style>
