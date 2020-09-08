<template>
  <div class="words" :class="{active:activateState === 0}">
    <div class="wardsBg">
      <div class="wardsSample">
        <p>الترتيب حسب قيمة السحر للأعمال من الهدايا المتلقاة التالية</p>
        <div class="wards">
          <div class="img">
            <span class="img1"></span>
            <span class="img2"></span>
            <span class="img3"></span>
          </div>
          <div class="wardName">
            <em>ضد فيروس</em>
            <em>سائل غسل اليدين</em>
            <em>بدلة واقية</em>
          </div>
        </div>
        <div class="fansong">ستعيد إليك 5٪ من العملات الذهبية من الهدايا التالية في الصباح</div>
      </div>
    </div>

    <div class="wordsList" v-if="activateState !== 0">
      <div class="listTop">
        <div class="listItem" :class="'top'+ (index+1)" v-for="(item,index) in top" @click="goPersonalMsg(item.uid)" :key=index>
          <span>{{item.rank}}</span>
          <div class="userBox">
            <div class="imgBox">
              <img :src="require(`../assets/img/${item.rank}.png`)" alt="" class="img1">
              <img v-lazy="item.avatar" alt="" class="img2">
            </div>
            <div class="userMsg">
              <p class="name">{{item.nick}}</p>
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
              <img src="../assets/img/defaultImgBg.png" alt="" class="img1">
              <img v-lazy="item.avatar" alt="" class="img2">
            </div>
            <div class="userMsg">
              <p class="name">{{item.nick}}</p>
              <p class="charm">{{item.score}}</p>
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
  padding-top: 0.26rem;
  &.active {
    padding-bottom: 1.8rem;
  }
  .wardsBg {
    width: 7.18rem;
    padding-top: 0.8rem;
    height: 5.02rem;
    background: url(../assets/img/wardBg.png);
    background-size: 100% 100%;
    margin: -0.3rem auto 0;
  }
  .wardsSample {
    width: 5.94rem;
    height: 4.66rem;
    background: url(../assets/img/shanhu.png);
    background-size: 100% 100%;
    margin: 0 auto;
    p {
      text-align: center;
      color: rgba(84, 237, 255, 1);
      font-size: 0.25rem;
      font-weight: 500;
      height: 0.75rem;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 0 0.3rem;
    }
    .wards {
      .img {
        width: 5.11rem;
        height: 1.57rem;
        margin: 0.45rem auto 0;
        padding: 0 0.1rem;
        // background: url(../assets/img/wards1.png);
        // background-size: 100% 100%;
        display: flex;
        justify-content: space-between;
        span {
          display: inline-block;
          width: 1.5rem;
          height: 1.5rem;
        }
        .img1 {
          background: url(../assets/img/img1.png);
          background-size: 100% 100%;
        }
        .img2 {
          background: url(../assets/img/img2.png);
          background-size: 100% 100%;
        }
        .img3 {
          background: url(../assets/img/img3.png);
          background-size: 100% 100%;
        }
      }
      .wardName {
        width: 5.31rem;
        margin: 0.13rem auto 0;
        display: flex;
        color: #be88ff;
        em {
          display: inline-block;
          width: 33.3%;
          text-align: center;
          font-size: 80%;
          font-weight: bold;
        }
        em:first-child {
          margin-left: 0.1rem;
        }
        em:nth-child(2) {
          margin-left: 0.1rem;
        }
      }
    }
    .fansong {
      font-size: 80%;
      color: rgba(84, 237, 255, 1);
      text-align: center;
      margin-top: 0.2rem;
      font-weight: bold;
      padding: 0 0.35rem;
    }
  }
  .wordsList {
    width: 6.48rem;
    margin: 0.26rem auto;
    padding: 0.3rem 0.16rem 1.6rem;
    background: url(../assets/img/listBg.png) no-repeat;
    background-size: 100% auto;
    padding-top: 0.3rem;
    .listTop {
      .userBox {
        .userMsg {
          margin-left: 0;
        }
      }
      .listItem {
        > span {
          display: block;
          width: 0.84rem;
          height: 0.73rem;
          text-indent: -999rem;
        }
        .img1 {
          width: 1.11rem !important;
          height: 1.25rem !important;
          top: -0.2rem;
        }
      }
      .top1 {
        // background: url(../assets/img/top1Bg.png);
        // background-size: 100% 100%;
        > span {
          background: url(../assets/img/top1.png);
          background-size: 100% 100%;
        }
      }
      .top2 {
        // background: url(../assets/img/top2Bg.png);
        // background-size: 100% 100%;
        > span {
          background: url(../assets/img/top2.png);
          background-size: 100% 100%;
        }
      }
      .top3 {
        // background: url(../assets/img/top2Bg.png);
        // background-size: 100% 100%;
        > span {
          background: url(../assets/img/top3.png);
          background-size: 100% 100%;
        }
      }
    }
    .listItem {
      height: 1.24rem;
      background: url(../assets/img/listItem.png);
      background-size: 100% 100%;
      display: flex;
      align-items: center;
      margin-bottom: 0.07rem;
      > span {
        width: 0.84rem;
        text-align: center;
        color: #fffea4;
        font-size: 120%;
      }
      .userBox {
        // width: 6rem;
        height: 1rem;
        display: flex;
        align-items: center;
        .imgBox {
          width: 1.09rem;
          height: 1.09rem;
          z-index: 50;
          margin-left: 0.09rem;
          position: relative;
          .img1 {
            width: 1.09rem;
            height: 1.09rem;
            z-index: 999;
            position: absolute;
          }
          .img2 {
            width: 1rem;
            height: 1rem;
            border-radius: 50%;
            position: absolute;
            top: 0.045rem;
            left: 0.045rem;
          }
        }
        .userMsg {
          width: 1.8rem;
          margin-left: 0.16rem;
          .name {
            font-size: 0.26rem;
            max-width: 1.8rem;
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
            font-size: 0.24rem;
            // color: #fdf3c2;
            line-height: 0.33rem;
            margin-top: 0.15rem;
            font-weight: 700;
            color: rgba(142, 62, 254, 1);
          }
        }
      }
      .wardsMsg {
        width: 2.56rem;
        display: flex;
        // padding-right:.5rem;
        color: #7a2b00;
        font-weight: 700;
        font-size: 80%;
        > span {
          margin-left: 0.1rem;
          width: 0.78rem;
          img {
            width: 0.54rem;
            height: 0.54rem;
            display: block;
            margin: 0 auto;
          }
          strong {
            display: block;
            color: RGBA(46, 250, 244, 1);
            font-size: 0.24rem;
            font-weight: 700;
            text-align: center;
          }
        }
      }
    }
  }
}
</style>
