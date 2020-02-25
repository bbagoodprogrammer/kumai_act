<template>
  <div class="words" :class="{active:activateState === 0}">
    <div class="wardsSample">
      <p>按報名後發佈作品收到以下禮物魅力值排名</br>送禮者凌晨返金幣數的5%金幣</p>
      <div class="wards">
        <div class="img"></div>
        <div class="wardName">
          <em>珍珠奶茶</em>
          <em>誘惑烤肉</em>
          <em>暖心火鍋</em>
        </div>
      </div>
    </div>
    <div class="wordsList" v-if="activateState !== 0">
      <div class="listTop">
        <div class="listItem" :class="'top'+ (index+1)" v-for="(item,index) in top" @click="goPersonalMsg(item.uid)" :key=index>
          <span>{{item.rank}}</span>
          <div class="userBox">
            <div class="imgBox">
              <!-- <img src="../assets/img/sunmmer.png" alt="" class="img1" v-if="index ===0"> -->
              <img v-lazy="item.avatar" alt="" class="img2">
            </div>
            <div class="userMsg">
              <p class="name">{{item.nick}}</p>
              <!-- <p class="id">UID:{{item.uid}}</p> -->
              <p class="charm">{{item.score}}</p>
            </div>
          </div>
          <div class="wardsMsg">
            <span v-for="(item2,index) in item.gifts" :style="{'backgroundImage': 'url('+item2.img+')',backgroundSize:'contain',backgroundRepeat:'no-repeat'}" :key=index>{{item2.total}}</span>
            <!-- <span class="cun">150</span>
                        <span class="car">180</span> -->
          </div>
        </div>
      </div>
      <div class="listBottom">
        <div class="listItem" v-for="(item,index) in bottom" @click="goPersonalMsg(item.uid)" :key=index>
          <span>{{item.rank}}</span>
          <div class="userBox">
            <div class="imgBox">
              <img v-lazy="item.avatar" alt="">
            </div>
            <div class="userMsg">
              <p class="name">{{item.nick}}</p>
              <!-- <p class="id">UID:{{item.uid}}</p> -->
              <p class="charm">{{item.score}}</p>
            </div>
          </div>
          <div class="wardsMsg">
            <span v-for="(item2,index) in item.gifts" :style="{'backgroundImage': 'url('+item2.img+')',backgroundSize:'contain',backgroundRepeat:'no-repeat'}" :key=index>{{item2.total}}</span>
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
  padding-top: 0.13rem;
  &.active {
    padding-bottom: 1.8rem;
  }
  .wardsSample {
    width: 7.5rem;
    height: 3rem;
    // background: url(../assets/img/shanhu.png);
    background-size: 100% 100%;
    p {
      text-align: center;
      color: #ffed6a;
    }
    .wards {
      height: 1.72rem;
      .img {
        background: url(../assets/img/ward1.png) no-repeat;
        background-size: contain;
        width: 4.75rem;
        height: 1.4rem;
        margin: 0.2rem auto 0;
      }
      .wardName {
        width: 4.75rem;
        margin: 0.15rem auto 0;
        display: flex;
        color: #ffb26d;
        em {
          display: inline-block;
          width: 33.3%;
          text-align: center;
          font-size: 80%;
        }
      }
    }
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
          width: 0.84rem;
          height: 0.73rem;
          text-indent: -999rem;
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
        // background: url(../assets/img/top3Bg.png);
        // background-size: 100% 100%;
        > span {
          background: url(../assets/img/top3.png);
          background-size: 100% 100%;
        }
      }
    }
    .listItem {
      height: 1.24rem;
      // background: url(../assets/img/listItem.png);
      background-size: 100% 100%;
      display: flex;
      align-items: center;
      margin-top: 0.05rem;
      border-bottom: 0.02rem solid #e9663d;
      > span {
        width: 0.5rem;
        margin: 0 0.2rem 0 0.25rem;
        text-align: center;
        color: #ff8840;
        font-size: 120%;
      }
      .userBox {
        width: 3rem;
        height: 1rem;
        display: flex;
        align-items: center;
        .imgBox {
          width: 1.2rem;
          height: 1.1rem;
          // background: url(../assets/img/sunmmer.png);
          // background-size: 100% 100%;
          z-index: 50;
          position: relative;
          img {
            display: block;
            margin: 0rem auto;
            width: 0.86rem;
            height: 0.86rem;
            border-radius: 50%;
            border: 3px solid rgba(239, 181, 80, 1);
          }
          // .img1 {
          //   width: 0.93rem;
          //   height: 1.04rem;
          //   z-index: 999;
          //   position: absolute;
          //   margin: 0;
          // }
          .img2 {
            // display: inline-block;
            width: 0.86rem;
            height: 0.86rem;
            // position: absolute;
            // top: 0.15rem;
            // left: 0.05rem;
          }
        }
        .userMsg {
          .name {
            font-size: 85%;
            max-width: 1.7rem;
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
            color: #ffde79;
            line-height: 0.33rem;
            margin-top: 0.15rem;
          }
        }
      }
      .wardsMsg {
        height: 0.4rem;
        display: flex;
        justify-content: space-between;
        // padding-right:.5rem;
        color: #ffde79;
        font-size: 80%;
        line-height: 0.4rem;
        > span {
          margin-left: 0.2rem;
          padding-left: 0.43rem;
          width: 0.45rem;
        }
        // > span:first-child {
        //   margin-left: 0;
        //   background: url(../assets/img/Coconut.png) no-repeat;
        //   background-size: contain;
        // }
        // > span:nth-child(2) {
        //   background: url(../assets/img/Watergun.png) no-repeat;
        //   background-size: contain;
        // }
        // > span:nth-child(3) {
        //   background: url(../assets/img/car.png) no-repeat;
        //   background-size: contain;
        // }
      }
    }
  }
}
</style>
