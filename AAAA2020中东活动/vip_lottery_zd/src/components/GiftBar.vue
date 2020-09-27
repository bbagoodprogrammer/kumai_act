<template>
  <div class="bar">
    <div class="title">
      <i class="left"></i>
      <strong>معدل تقدم المرة لكشط صورة</strong>
      <i class="que" @click="showTips()"></i>
      <i class="right"></i>
    </div>
    <div class="num"> المرات التي وصلت إليها : <em>{{userMsg.lottery_times}}</em></div>
    <div class="barItem">
      <div v-for="(item,index) in tasks" :key="index">
        <span class="ed" v-if="item.status == 2">تم الاستلام</span>
        <span class="get" v-else-if="userMsg.lottery_times >= item.target" @click="getGift(index)">الاستلام</span>
        <span class="no" v-else>لم يصل</span>
        <strong>{{item.target}} مرات</strong>
      </div>
    </div>
    <div class="mask" v-show="showLuckGift">
      <transition name="slide">
        <div class="luckGift" v-if="showLuckGift">
          <span class="title"></span>
          <i class="close" @click="closeLuck()"></i>
          <p class="luckTips">{{lang.main5}}</p>
          <div class="giftItem">
            <span v-for="(item,index) in giftArr" :key="index">
              <img :src="item.pimg" alt="">
              <strong>{{item.pname}}</strong>
            </span>
          </div>
          <span class="ok" @click="closeLuck()">{{lang.main6}}</span>
        </div>
      </transition>
    </div>
    <div class="mask" v-show="showGiftTips">
      <transition name="slide">
        <div class="giftTips" v-show="showGiftTips">
          <i class="close" @click="closeGiftTips()"></i>
          <span class="title"></span>
          <h5>معدل تقدم المرة لكشط صورة</h5>
          <p>1. يُظهر شريط التقدم عدد المرات الإجمالي لكشط صورة للمستخدم أثناء النشاط. عند الوصول إلى العدد المقابل من الكشط ، يمكن استلام المكافآت المقابلة. وكلما أكثر مرات كشط صورة ، كانت المكافأة أحسن ~</p>
          <p>2. يمكن التحقق من تفاصيل المكافأة في تفاصيل الاستلام أعلاه. سيتم وصول المكافأة تلقائيًا إلى حقيبة حسابك. يرجى التحقق ~</p>
        </div>
      </transition>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex"
import api from "../api/apiConfig"
export default {
  data() {
    return {
      showLuckGift: false,
      showGiftTips: false,
      giftArr: []
    }
  },
  computed: {
    ...mapState(['userMsg', 'tasks'])
  },
  methods: {
    getGift(index) {
      api.getGift(this.tasks[index].target).then(res => {
        if (res.data.response_status.code == 0) {
          this.showLuckGift = true
          this.giftArr = res.data.response_data.prizes
          this.vux('setSuc', index)
        } else {
          this.toast(res.data.response_status.error)
        }
      })
    },
    closeLuck() {
      this.showLuckGift = false
    },
    showTips() {
      this.showGiftTips = true
    },
    closeGiftTips() {
      this.showGiftTips = false
    }
  }
}
</script>
<style lang="scss">
.title {
  display: flex;
  align-items: center;
  justify-content: center;
  color: rgba(255, 241, 173, 1);
  font-size: 0.4rem;
  font-weight: bold;
  margin: 0.3rem 0 0.15rem;
  .left,
  .right {
    width: 1.01rem;
    height: 0.27rem;
    background: url(../assets/img/left.png);
    background-size: 100% 100%;
  }
  .right {
    background: url(../assets/img/left.png);
    background-size: 100% 100%;
  }
  .que {
    width: 0.32rem;
    height: 0.32rem;
    background: url(../assets/img/que.png);
    background-size: 100% 100%;
    margin: 0 0.16rem;
  }
}
.num {
  text-align: center;
  em {
    font-size: 0.4rem;
    color: rgba(255, 241, 173, 1);
    font-weight: normal;
  }
}
.barItem {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 0.2rem;
  margin-top: 0.2rem;
  span {
    width: 1.15rem;
    height: 0.57rem;
    display: block;
    font-size: 0.27rem;
    text-align: center;
    line-height: 0.57rem;
    &.ed {
      color: rgba(255, 241, 173, 1);
      background: url(../assets/img/status1.png);
      background-size: 100% 100%;
    }
    &.get {
      color: rgba(174, 72, 0, 1);
      background: url(../assets/img/status2.png);
      background-size: 100% 100%;
    }
    &.no {
      color: rgba(98, 98, 98, 1);
      background: url(../assets/img/status3.png);
      background-size: 100% 100%;
    }
  }
  strong {
    display: block;
    text-align: center;
    color: rgba(255, 241, 173, 1);
    font-size: 0.27rem;
  }
}
.luckGift {
  width: 6.21rem;
  height: 5.48rem;
  background: url(../assets/img/pup1.png);
  background-size: 100% 100%;
  position: absolute;
  left: 0.69rem;
  top: 4.2rem;
  .title {
    width: 5.49rem;
    height: 2.07rem;
    background: url(../assets/img/pupTitle.png);
    background-size: 100% 100%;
    position: absolute;
    left: 0.36rem;
    top: -2.07rem;
  }
  .close {
    display: block;
    width: 0.8rem;
    height: 0.8rem;
    background: url(../assets/img/close.png);
    background-size: 100% 100%;
    position: absolute;
    right: 0;
    top: -1rem;
    z-index: 100;
  }
  .luckTips {
    padding: 0 0.3rem;
    font-size: 0.36rem;
    font-weight: bold;
    margin: 0.65rem auto 0.3rem;
    text-align: center;
  }
  .giftItem {
    padding: 0 0.36rem;
    display: flex;
    align-items: center;
    justify-content: center;
    span {
      width: 1.6rem;
      height: 1.6rem;
      background: url(../assets/img/giftBg.png);
      background-size: 100% 100%;
      margin-right: 0.15rem;
      img {
        width: 1.2rem;
        height: 1.2rem;
        display: block;
        margin: 0.21rem auto;
      }
    }
    strong {
      font-weight: 500;
      font-size: 0.24rem;
      color: #ffe6ce;
      display: block;
      text-align: center;
    }
  }
  .ok {
    display: block;
    width: 2.43rem;
    height: 0.8rem;
    background: url(../assets/img/goVip.png);
    background-size: 100% 100%;
    margin: 0.84rem auto;
    color: #ae4800;
    font-size: 0.34rem;
    text-align: center;
    line-height: 0.8rem;
  }
}
.giftTips {
  width: 5.23rem;
  height: 5rem;
  padding: 0.41rem 0.38rem 0;
  background: url(../assets/img/myTask.png);
  background-size: 100% 100%;
  position: absolute;
  left: 0.76rem;
  top: 3.2rem;
  .title {
    width: 5.49rem;
    height: 2.07rem;
    background: url(../assets/img/pupTitle.png);
    background-size: 100% 100%;
    position: absolute;
    left: 0.25rem;
    top: -2.3rem;
  }
  .close {
    display: block;
    width: 0.8rem;
    height: 0.8rem;
    background: url(../assets/img/close.png);
    background-size: 100% 100%;
    position: absolute;
    right: 0;
    top: -1rem;
    z-index: 100;
  }
  h5 {
    text-align: center;
    font-size: 0.34rem;
    margin: 0.2rem 0 0.5rem;
  }
}
</style>
