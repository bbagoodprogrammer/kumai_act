<template>
  <div class="words" :class="{active:activateState === 0}">
    <div class="wardsSample">
      <p>ستعيد إليك 5٪ من العملات الذهبية من الهدايا التالية في الصباح</p>
      <div class="wards">
        <div class="img">
          <span class="img1"></span>
          <span class="img2"></span>
          <span class="img3"></span>
        </div>
        <div class="wardName">
          <em>حمص</em>
          <em>كباب</em>
          <em>كبس</em>
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
              <div class="userCharm">
                <p class="charm">{{item.score}}</p>
                <div class="wardsMsg">
                  <span v-for="(item2,index) in item.gifts" :key=index>
                    <em :style="{'backgroundImage': 'url('+item2.img+')',backgroundSize:'contain'}"></em>
                    {{item2.total}}
                  </span>
                </div>
              </div>
            </div>
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
              <div class="userCharm">
                <p class="charm">{{item.score}}</p>
                <div class="wardsMsg">
                  <span v-for="(item2,index) in item.gifts" :key=index>
                    <em :style="{'backgroundImage': 'url('+item2.img+')',backgroundSize:'contain'}"></em>
                    {{item2.total}}
                  </span>
                </div>
              </div>
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
        width: 4.95rem;
        margin: 0.15rem auto 0;
        display: flex;
        span {
          display: inline-block;
          width: 1.6rem;
          height: 1.6rem;
        }
        .img1 {
          margin-left: 0.1rem;
          background: url(../assets/img/img1.png);
          background-size: 100% 100%;
        }
        .img2 {
          margin-left: 0.1rem;
          background: url(../assets/img/img2.png);
          background-size: 100% 100%;
        }
        .img3 {
          background: url(../assets/img/img3.png);
          background-size: 100% 100%;
        }
      }
      .wardName {
        width: 4.95rem;
        margin: 0.15rem auto 0;
        display: flex;
        color: #224833;
        em {
          display: inline-block;
          width: 33.3%;
          text-align: center;
          font-size: 80%;
        }
        em:first-child {
          margin-left: 0.1rem;
        }
        em:nth-child(2) {
          margin-left: 0.1rem;
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
      border-bottom: 0.02rem solid #639160;
      > span {
        width: 0.5rem;
        margin: 0 0.2rem 0 0.25rem;
        text-align: center;
        color: #466e44;
        font-size: 120%;
      }
      .userBox {
        width: 6rem;
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
            margin: 0.05rem auto;
            width: 0.86rem;
            height: 0.86rem;
            border-radius: 50%;
            border: 3px solid #5b8159;
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
          flex: 1;
          .name {
            font-size: 85%;
            max-width: 4.7rem;
            overflow: hidden;
            text-overflow: ellipsis; //超出部分以省略号显示
            white-space: nowrap;
          }
          .id {
            color: #86edf1;
            font-size: 75%;
            height: 0.3rem;
          }
          .userCharm {
            display: flex;
            align-items: center;
            .wardsMsg {
              height: 0.4rem;
              margin-top: 0.15rem;
              display: flex;
              // justify-content: space-between;
              // padding-right:.5rem;
              color: #c9ff90;
              font-size: 80%;
              line-height: 0.4rem;
              flex: 1;
              padding: 0 0.05rem 0 0;
              > span {
                margin-right: 0.1rem;
                // padding-left: 0.43rem;
                // width: 0.45rem;
                width: 33.3%;
                em {
                  display: inline-block;
                  width: 0.39rem;
                  height: 0.39rem;
                  float: right;
                  margin-left: 0.05rem;
                }
              }
              > span:first-child {
                margin-right: 0rem;
              }
            }
            .charm {
              width: 1rem;
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
      }
    }
  }
}
</style>
