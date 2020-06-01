<template>
  <div class="wardstoast">
    <span class="title">تفاصيل اليانصيب</span>
    <div class="wardlist">
      <div class="wardContent" ref="wardContent">
        <ul ref="wardList" v-if="historyList.length > 0">
          <li v-for="(item,index) in historyList" :key="index">
            <div class="msgBox">
              <div class="coinsL">{{item.coins}} نقد الفتحة\مرة</div>
              <list-time :item="item.addtime"></list-time>
            </div>
            <div class="giftItem">
              <span class="gift1" v-html="wardsImgList[item.prize1]"></span>
              <span class="gift2" v-html="wardsImgList[item.prize2]"></span>
              <span class="gift3" v-html="wardsImgList[item.prize3]"></span>
            </div>
          </li>
        </ul>
        <p class="tips" v-else>ليس يوجد تسجيل اليانصيب الآن</p>
      </div>
      <a href="" class="close" @click.prevent="closeToast()"></a>
    </div>
  </div>
</template>

<script>
import wards from "../config/wards.js"
import ListTime from "../components/ListTime.vue"
export default {
  props: ['historyList'],
  data() {
    return {
      wardsImgList: wards
    }
  },
  methods: {
    // giftStr(val) {
    //   return val.replace(/\s*/g, "")
    // },
    closeToast() {
      this.$emit('closeWordToast')
    }
  },
  components: {
    ListTime
  }
}
</script>

<style lang="scss" scoped>
.wardstoast {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(#000, 0.8);
  z-index: 999;
  .title {
    position: absolute;
    top: 1.93rem;
    left: 2.8rem;
    z-index: 999;
    color: #fdfdac;
  }
  .wardlist {
    margin: 0 auto;
    width: 7.5rem;
    height: 9.16rem;
    background: url("../assets/img/taostBg.png");
    background-size: 100% 100%;
    position: relative;
    .close {
      display: block;
      width: 0.71rem;
      height: 0.71rem;
      bottom: -1rem;
      position: absolute;
      background: url(../assets/img/close.png);
      background-size: 100% 100%;
      left: 3.3rem;
    }
    .wardContent {
      position: absolute;
      width: 5.1rem;
      max-height: 5.3rem;
      padding-right: 0.1rem;
      top: 3rem;
      left: 1.2rem;
      overflow-x: hidden;
      overflow-y: scroll;
      -webkit-overflow-scrolling: touch;
      li {
        min-height: 1rem;
        padding: 0.06rem 0;
        // border-bottom: 0.01rem solid#823AB6;
        .msgBox {
          display: flex;
          align-items: center;
          .coinsL {
            width: 1.7rem;
            font-size: 80%;
            color: #fff1b8;
          }
          .time {
            font-size: 80%;
            color: #fdbea0;
            margin-left: 0.13rem;
          }
        }
        .giftItem {
          display: flex;
          font-size: 73%;
          color: #fff1b8;
          text-align: center;
          .gift1 {
            flex: 1;
          }
          .gift2 {
            flex: 1;
            margin: 0 0 0 0.25rem;
          }
          .gift3 {
            text-align: right;
            flex: 1;
          }
        }
      }
    }
    .wardContent::-webkit-scrollbar {
      width: 0.06rem;
      // background: #ffffff;
    }
    ::-webkit-scrollbar-thumb {
      width: 0.06rem;
      background: #ffffff;
    }
  }
  .tips {
    text-align: center;
    margin-top: 0.2rem;
  }
}
</style>
