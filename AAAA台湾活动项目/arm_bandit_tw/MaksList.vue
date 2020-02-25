<template>
  <div class="makeList">
    <div class="listCon">
      <p v-if="redState == 1" class="listTile">قد استلام {{countedList.total_red_rnvelope}}/{{surplus}} مظروف أحمر، و{{countedList.total_coins}}/{{countedList.divide_coins}} عملة ذهبية</p>
      <p v-else>{{countedList.total_red_rnvelope}} مظروف أحمر، استيلاء عليها في <span>{{countedList.tm}}</span> ثوان</p>
      <ul class="listBox">
        <li v-for="(item,index) in countedList.open_record" :key="index">
          <div class="avatar">
            <img :src="item.avater" alt="">
          </div>
          <div class="nameBox">
            <span class="name">{{item.nick}}</span>
            <span class="uid">{{item.uid}}</span>
          </div>
          <div class="coinsBox">
            <span class="coins">{{item.coins}} عملة ذهبية</span>
            <span class="luck" v-if="item.is_lucky ==1 ">أفضل الحظ <i></i></span>
          </div>
          <!-- <div class="nameBox">عملة ذهبية {{item.coins}}</div> -->
          <!-- <div class="luck">
            <div v-if="item.is_lucky === 1">
              <span></span> أفضل الحظ
            </div>
          </div>
          <div class="msgBox">
            <div class="name">
              {{item.nick}}
            </div>
            <div class="time">
              {{item.tm}}
            </div>
          </div> -->
        </li>
      </ul>
      <!-- <span class="back" @click="back()">العودة</span> -->
      <a href="" class="cloas" @click.prevent="cloas()"></a>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex"
export default {
  data() {
    return {
    }
  },
  watch: {
  },
  computed: {
    ...mapState(["countedList"]),
    redState() {
      if (this.countedList.divide_red_rnvelope === 0) { //剩余0个红包
        return 0
      } else if (this.countedList.divide_red_rnvelope > 0) { //未发完
        return 1
      }
    },
    surplus() { //已领取
      return this.countedList.total_red_rnvelope * 1 - this.countedList.divide_red_rnvelope * 1
    }
  },
  methods: {
    back() {
      this.$emit('cloasList')
    },
    cloas() {
      this.$emit('cloasList')
    }
  }
}
</script>

<style lang="scss">
.makeList {
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  z-index: 1000;
  background: RGB(0, 0, 0, 0.8);
  direction: rtl;
  .listCon {
    width: 4.9rem;
    height: 6.39rem;
    padding: 0.29rem 0.32rem 0;
    background: url(../assets/img/makeListBg.png) no-repeat;
    background-size: contain;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    p {
      height: 0.8rem;
      font-size: 80%;
      color: #fff562;
      font-weight: bold;
      text-align: center;
    }
    .listBox {
      margin-top: 0.1rem;
      height: 5rem;
      overflow: hidden;
      overflow-y: scroll;
      -webkit-overflow-scrolling: touch;
      li {
        height: 1rem;
        border-bottom: 0.01rem solid #ff8e33;
        display: flex;
        align-items: center;
        .avatar {
          width: 0.6rem;
          height: 0.6rem;
          img {
            width: 0.6rem;
            height: 0.6rem;
            border-radius: 50%;
            border: 0.02rem solid #fde084;
          }
        }
        .nameBox {
          width: 2.26rem;
          height: 100%;
          white-space: nowrap;
          color: #fff562;
          font-size: 80%;
          margin-right: 0.15rem;
          .name {
            max-width: 2.26rem;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
          }
          span {
            line-height: 0.5rem;
            display: block;
            height: 50%;
          }
        }
        .coinsBox {
          color: #ffdc4f;
          font-size: 90%;
          flex: 1;
          span {
            height: 50%;
          }
        }
        .luck {
          display: flex;
          align-items: center;
          i {
            display: block;
            width: 0.3rem;
            height: 0.28rem;
            background: url(../assets/img/star.png);
            background-size: 100% 100%;
          }
        }
      }
    }
    .listBox::-webkit-scrollbar {
      width: 0.06rem;
      background: #b03e00;
    }
    .listBox::-webkit-scrollbar-thumb {
      background: #fec203;
    }
  }
  .cloas {
    display: block;
    width: 0.54rem;
    height: 0.54rem;
    background: url(../assets/img/cloas.png) no-repeat;
    background-size: contain;
    position: absolute;
    top: -0.8rem;
    right: 0rem;
  }
}
</style>
