<template>
  <div class="words" :class="{active:activateState === 0}">
    <div class="wardsSample">
      <p class="rankTips"> <strong>Ini akan menurut nilai pesona hadiah berikutnya yang didapatkan dari nyanyian yg diposting setelah pendaftaran untuk melakukan peringkat.</strong> </p>
      <div class="wards">
        <div class="wardItem">
          <img src="../assets/img/ward1.png" alt="">
          <strong>Cangkir lucu</strong>
        </div>
        <div class="wardItem">
          <img src="../assets/img/ward2.png" alt="">
          <strong>Korsel</strong>
        </div>
        <div class="wardItem">
          <img src="../assets/img/ward3.png" alt="">
          <strong>Mobil mini</strong>
        </div>
      </div>
      <p class="fansong">Mengantar hadiah yg atas kepada nyanyian yg ikut acara, pengguna yg mengantar hadiah akan dikembalikan 5% koin emas yg harga hadiahnya pada pukul 24:00 hari ini.</p>
    </div>
    <div class="wordsList" v-if="activateState !== 0">
      <div class="listTop">
        <div class="listItem" :class="'top'+ (index+1)" v-for="(item,index) in top" @click="goPersonalMsg(item.uid)" :key=index>
          <span>{{item.rank}}</span>
          <div class="userBox">
            <div class="imgBox">
              <img :src="require(`../assets/img/user${item.rank}.png`)" alt="" class="img1">
              <img v-lazy=" item.avatar" alt="" class="img2">
            </div>
            <div class="userMsg">
              <p class="name">{{item.nick}}</p>
              <!-- <p class="id">UID:{{item.uid}}</p> -->
              <p class="charm">{{item.score}}</p>
            </div>
          </div>
          <div class="wardsMsg">
            <!-- :style="{'backgroundImage': 'url('+item2.img+')',backgroundSize:'contain',backgroundRepeat:'no-repeat'}" -->
            <span v-for="(item2,index) in item.gifts" :key="index">
              <img :src="item2.img" alt="" class="giftImg">
              <strong>{{item2.total}}</strong>
            </span>
          </div>
        </div>
      </div>
      <div class="listBottom">
        <div class="listItem" v-for="(item,index) in bottom" @click="goPersonalMsg(item.uid)" :key=index>
          <span>{{item.rank}}</span>
          <div class="userBox">
            <div class="imgBox">
              <img src="../assets/img/defaluteBor.png" class="img1" alt="">
              <img v-lazy="item.avatar" alt="" class="img2">
            </div>
            <div class="userMsg">
              <p class="name">{{item.nick}}</p>
              <!-- <p class="id">UID:{{item.uid}}</p> -->
              <p class="charm">{{item.score}}</p>
            </div>
          </div>
          <div class="wardsMsg">
            <span v-for="(item2,index) in item.gifts" :key="index">
              <img :src="item2.img" alt="" class="giftImg">
              <strong>{{item2.total}}</strong>
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex"
export default {
  computed: {
    ...mapState(["worksArr", "activateState"]),
    top() {
      if (this.worksArr !== []) {
        return this.worksArr.slice(0, 3)
      }
    },
    bottom() {
      if (this.worksArr !== []) {
        return this.worksArr.slice(3)
      }
    }
  },
  methods: {
    goPersonalMsg(id) {
      location.href = `uid:${id}`
    }
  }
}
</script>

<style lang="scss" scoped>
.words {
  &.active {
    padding-bottom: 1.8rem;
  }
  .wardsSample {
    width: 7.5rem;
    .rankTips {
      text-align: center;
      margin-top: 0.09rem;
      strong {
        display: inline-block;
        height: 0.39rem;
        line-height: 0.25rem;
        padding: 0 0.19rem;
        font-weight: 600;
        text-align: center;
        font-size: 0.22rem;
      }
    }
    .wards {
      width: 5.31rem;
      display: flex;
      justify-content: space-between;
      margin: 0.19rem auto 0.1rem;
      .wardItem {
        width: 1.6rem;
        img {
          display: block;
          width: 1.6rem;
          height: 1.6rem;
        }
        strong {
          display: block;
          margin-top: 0.09rem;
          font-size: 80%;
          text-align: center;
          font-weight: 500;
        }
      }
    }
    .fansong {
      padding: 0 0.25rem;
      font-size: 80%;
      color: #b5f7ff;
      text-align: center;
      line-height: 0.3rem;
      font-weight: 500;
    }
  }
  .wordsList {
    margin: 0.05rem 0.15rem 0;
    padding-bottom: 1.6rem;
    .listTop {
      .userBox {
        .userMsg {
          margin-left: 0;
        }
      }
      .listItem {
        > span {
          display: block;
          margin: 0 0 0 0.1rem;
          width: 0.75rem;
          height: 0.65rem;
          text-indent: -999rem;
        }
      }
      .img1 {
        width: 1.11rem !important;
        height: 1.25rem !important;
        top: -0.15rem;
      }
      .top1 {
        background: url(../assets/img/top1Bg.png);
        background-size: 100% 100%;
        > span {
          background: url(../assets/img/top1.png);
          background-size: 100% 100%;
        }
      }
      .top2 {
        background: url(../assets/img/top2Bg.png);
        background-size: 100% 100%;
        > span {
          background: url(../assets/img/top2.png);
          background-size: 100% 100%;
        }
      }
      .top3 {
        background: url(../assets/img/top2Bg.png);
        background-size: 100% 100%;
        > span {
          background: url(../assets/img/top3.png);
          background-size: 100% 100%;
        }
      }
    }
    .listItem {
      height: 1.2rem;
      background: url(../assets/img/top3Bg.png);
      background-size: 100% 100%;
      display: flex;
      align-items: center;
      margin-top: 0.05rem;
      > span {
        display: block;
        margin: 0 0 0 0.1rem;
        width: 0.75rem;
        height: 0.65rem;
        text-align: center;
        color: #aeedff;
        font-size: 0.36rem;
        font-style: italic;
        font-weight: 700;
        line-height: 0.65rem;
      }
      .userBox {
        width: 3.3rem;
        height: 1rem;
        display: flex;
        align-items: center;
        .imgBox {
          width: 1rem;
          height: 1.1rem;
          margin-left: 0.05rem;
          z-index: 50;
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          .img1 {
            width: 1.09rem;
            height: 1.09rem;
            z-index: 999;
            position: absolute;
            border: none;
          }
          .img2 {
            width: 1rem;
            height: 1rem;
            border-radius: 50%;
          }
        }
        .userMsg {
          width: 3.3rem;
          margin-left: 0.16rem;
          .name {
            font-size: 0.26rem;
            max-width: 2.2rem;
            font-weight: 700;
            overflow: hidden;
            text-overflow: ellipsis; //超出部分以省略号显示
            white-space: nowrap;
          }
          .id {
            color: #86edf1;
            font-size: 75%;
            height: 0.3rem;
          }
          .charm {
            height: 0.33rem;
            // padding-left: 0.35rem;
            // background: url(../assets/img/charm.png) no-repeat;
            // background-size: 0.28rem 100%;
            font-size: 93%;
            // color: #fdf3c2;
            line-height: 0.33rem;
            margin-top: 0.15rem;
            font-weight: 500;
          }
        }
      }
      .wardsMsg {
        width: 2.86rem;
        display: flex;
        // padding-right:.5rem;
        color: #7a2b00;
        font-weight: 700;
        font-size: 80%;
        > span {
          margin-left: 0.1rem;
          width: 0.88rem;
          img {
            width: 0.54rem;
            height: 0.54rem;
            display: block;
            margin: 0 auto;
          }
          strong {
            display: block;
            color: #fff4bb;
            font-size: 0.24rem;
            font-weight: 600;
            text-align: center;
          }
        }
      }
    }
  }
}
</style>
