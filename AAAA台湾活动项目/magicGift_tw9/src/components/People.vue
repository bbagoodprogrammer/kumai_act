<template>
  <div class="words" :class="{active:activateState === 0}">
    <div class="wardsSample">
      <p>按報名後發佈作品或在K房送特定禮物的人次排名</br>
        <span> 同一用戶送禮，僅計入1次</span></p>
    </div>
    <div class="wordsList" v-if="activateState !== 0">
      <div class="listTop">
        <div class="listItem" :class="'top'+ (index+1)" v-for="(item,index) in top" @click="goPersonalMsg(item.uid)" :key=index>
          <span>{{item.rank}}</span>
          <div class="userBox">
            <div class="imgBox">
              <img :src="require(`../assets/img/user${item.rank}.png`)" alt="" class="img1">
              <img v-lazy="item.avatar" alt="" class="img2">
            </div>
            <div class="userMsg">
              <p class="name">{{item.nick}}</p>
            </div>
          </div>
          <div class="wardsMsg">
            <i></i>
            <em>{{item.score}}</em>
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
            </div>
          </div>
          <div class="wardsMsg">
            <i></i>
            <em>{{item.score}}</em>
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
    ...mapState(["peopelArr", "activateState"]),
    top() {
      if (this.peopelArr !== []) {
        return this.peopelArr.slice(0, 3)
      }
    },
    bottom() {
      if (this.peopelArr !== []) {
        return this.peopelArr.slice(3)
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
  padding-top: 0.13rem;
  &.active {
    padding-bottom: 1.8rem;
  }
  .wardsSample {
    width: 7.5rem;
    p {
      text-align: center;
      font-weight: 500;
      font-size: 0.24rem;
      color: #99ffec;
      span {
        text-align: center;
        font-weight: 500;
        font-size: 0.24rem;
        display: block;
        color: #fffbba;
        margin: 0.25rem 0 0.4rem 0;
      }
    }
    // .wards {
    //   height: 1.72rem;
    //   .img {
    //     background: url(../assets/img/ward1.png) no-repeat;
    //     background-size: contain;
    //     width: 4.75rem;
    //     height: 1.4rem;
    //     margin: 0.2rem auto 0;
    //   }
    //   .wardName {
    //     width: 4.75rem;
    //     margin: 0.15rem auto 0;
    //     display: flex;
    //     color: #ffb26d;
    //     em {
    //       display: inline-block;
    //       width: 33.3%;
    //       text-align: center;
    //       font-size: 80%;
    //     }
    //   }
    // }
    // .fansong {
    //   font-size: 80%;
    //   color: #6ffff3;
    //   text-align: center;
    //   line-height: 0.5rem;
    // }
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
    .listBottom {
    }
    .listItem {
      height: 1.24rem;
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
        width: 4.2rem;
        height: 1rem;
        display: flex;
        align-items: center;
        .imgBox {
          width: 1.2rem;
          height: 1.1rem;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 50;
          position: relative;
          img {
            margin: 0rem auto;
            width: 0.86rem;
            height: 0.86rem;
            border: 0.04rem solid #cc592a;
          }
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
          margin-left: 0.16rem;
          .name {
            width: 2.5rem;
            font-size: 85%;
            max-width: 2.5rem;
            overflow: hidden;
            text-overflow: ellipsis; //超出部分以省略号显示
            white-space: nowrap;
          }
          .charm {
            height: 0.33rem;
            font-size: 93%;
            // color: #ffde79;
            line-height: 0.33rem;
            margin-top: 0.15rem;
          }
        }
      }
      .wardsMsg {
        height: 0.4rem;
        display: flex;
        justify-content: space-between;
        line-height: 0.4rem;
        i {
          display: block;
          width: 0.37rem;
          height: 0.45rem;
          background: url(../assets/img/charm.png);
          background-size: 100% 100%;
        }
        em {
          color: #fff4bb;
          font-size: 93%;
          margin: 0.07rem 0 0 0.1rem;
          font-weight: 700;
        }
        > span {
          margin-left: 0.2rem;
          padding-left: 0.43rem;
          width: 0.45rem;
        }
      }
    }
  }
}
</style>
