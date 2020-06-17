<template>
  <div class="words" :class="{active:activateState === 0}">
    <div class="wardsSample">
      <p>ترتيب حسب عدد الأشخاص الذين يعطونك هذه الهدايا المحددة في غرفة الغناء أو لأعمالك
        <em>إذا هناك شخص ما يعطيك هذه الهدايا مرات، يحصى شخصا واحدا فقط لترتيبك</em>
      </p>
      <!-- <div class="wards">
        <div class="img"></div>
        <div class="wardName">
          <em>珍珠奶茶</em>
          <em>誘惑烤串</em>
          <em>暖心火鍋</em>
        </div>
      </div> -->
      <!-- <p class="fansong">向參賽作品送以上禮物，送禮者凌晨返金幣數的5%金幣</p> -->
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
              <!-- <p class="id">UID:{{item.uid}}</p> -->
              <!-- <p class="charm">{{item.score}}</p> -->
            </div>
          </div>
          <div class="wardsMsg">
            <i></i>
            <em>{{item.score}}</em>
            <!-- <span v-for="(item2,index) in item.gifts" :style="{'backgroundImage': 'url('+item2.img+')',backgroundSize:'contain',backgroundRepeat:'no-repeat'}" :key=index>{{item2.total}}</span> -->
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
              <img src="../assets/img/defaultImgBg.png" alt="" class="img1">
              <img v-lazy="item.avatar" alt="" class="img2">
            </div>
            <div class="userMsg">
              <p class="name">{{item.nick}}</p>
              <!-- <p class="id">UID:{{item.uid}}</p> -->
              <!-- <p class="charm">{{item.score}}</p> -->
            </div>
          </div>
          <div class="wardsMsg">
            <i></i>
            <em>{{item.score}}</em>
            <!-- <span v-for="(item2,index) in item.gifts" :style="{'backgroundImage': 'url('+item2.img+')',backgroundSize:'contain',backgroundRepeat:'no-repeat'}" :key=index>{{item2.total}}</span> -->
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
    // height: 3rem;
    // background: url(../assets/img/shanhu.png);
    background-size: 100% 100%;
    p {
      font-weight: bold;
      text-align: center;
      color: #db97b4;
      em {
        display: block;
        text-align: center;
        font-size: 0.24rem;
        font-weight: bold;
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
      height: 1.24rem;
      background: url(../assets/img/listItem.png);
      background-size: 100% 100%;
      display: flex;
      align-items: center;
      margin-bottom: 0.23rem;
      > span {
        width: 0.5rem;
        margin: 0 0.2rem 0 0.25rem;
        text-align: center;
        color: #fffea4;
        font-size: 120%;
      }
      .userBox {
        width: 4.2rem;
        height: 1rem;
        display: flex;
        align-items: center;
        .imgBox {
          width: 1.09rem;
          height: 1.09rem;
          margin-left: 0.09rem;
          z-index: 50;
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
          .name {
            width: 2.5rem;
            font-size: 85%;
            max-width: 2.5rem;
            font-weight: 700;
            overflow: hidden;
            text-overflow: ellipsis; //超出部分以省略号显示
            white-space: nowrap;
          }
          // .id {
          //   color: #86edf1;
          //   font-size: 75%;
          //   height: 0.3rem;
          // }
          .charm {
            height: 0.33rem;
            // padding-left: 0.35rem;
            // background: url(../assets/img/charm.png) no-repeat;
            // background-size: 0.28rem 100%;
            font-size: 93%;
            color: #ffe65a;
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
        color: #ffe65a;
        font-size: 93%;
        line-height: 0.4rem;
        i {
          display: block;
          width: 0.39rem;
          height: 0.44rem;
          background: url(../assets/img/charm.png);
          background-size: 100% 100%;
          margin-left: 0.15rem;
        }
        em {
          font-weight: 700;
          margin-top: 0.07rem;
        }
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
