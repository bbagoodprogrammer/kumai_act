<template>
  <div class="words" :class="{active:activateState === 0}">
    <div class="wardsSample">
      <p>Xếp hạng theo số người tặng quà yêu cầu cho bài hát đăng sau khi báo danh hoặc tại phòng Kara</br>
        <span> Cùng 1 người tặng quà chỉ tính 1 lần</span></p>
    </div>
    <div class="wordsList" v-if="activateState !== 0">
      <div class="listTop">
        <div class="listItem" :class="'top'+ (index+1)" v-for="(item,index) in top" @click="goPersonalMsg(item.uid)" :key=index>
          <span>{{item.rank}}</span>
          <div class="userBox">
            <div class="imgBox">
              <img :src="require(`../assets/img/user1.png`)" alt="" class="img1">
              <img v-lazy="item.avatar" alt="" class="img2">
            </div>
            <div class="userMsg">
              <p class="name">{{item.nick}}</p>
            </div>
          </div>
          <div class="wardsMsg">
            <em>{{item.score}}</em>
          </div>
        </div>
      </div>
      <div class="listBottom">
        <div class="listItem" v-for="(item,index) in bottom" @click="goPersonalMsg(item.uid)" :key=index>
          <span>{{item.rank}}</span>
          <div class="userBox">
            <div class="imgBox">
              <img v-lazy="item.avatar" alt="" class="img2">
            </div>
            <div class="userMsg">
              <p class="name">{{item.nick}}</p>
            </div>
          </div>
          <div class="wardsMsg">
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
    background: url(../assets/img/sh.png) no-repeat;
    background-size: 100% 2.1rem;
    p {
      width: 5.86rem;
      text-align: center;
      font-weight: 500;
      font-size: 0.24rem;
      color: #ffed6a;
      margin: 0 auto;
      span {
        text-align: center;
        font-weight: 500;
        font-size: 0.24rem;
        display: block;
        margin: 0.11rem 0 0.14rem 0;
        color: #fff;
      }
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
        width: 1.2rem !important;
        height: 1.1rem !important;
        left: 0.03rem;
        top: 0.01rem;
      }
      .img2 {
        border: none !important;
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
        color: #63ffe2;
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
          width: 1.2rem;
          height: 1.1rem;
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
            width: 0.86rem;
            height: 0.86rem;
            border-radius: 50%;
            border: 0.03rem solid #fff;
          }
        }
        .userMsg {
          width: 1.94rem;
          margin-left: 0.16rem;
          .name {
            font-size: 0.26rem;
            max-width: 2.1rem;
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
            padding-left: 0.35rem;
            background: url(../assets/img/charm.png) no-repeat;
            background-size: 0.28rem 100%;
            font-size: 0.24rem;
            color: #fff88d;
            line-height: 0.33rem;
            font-weight: 500;
          }
        }
      }
      .wardsMsg {
        height: 0.33rem;
        padding-left: 0.35rem;
        background: url(../assets/img/charm.png) no-repeat;
        background-size: 0.28rem 100%;
        font-size: 0.24rem;
        color: #fff88d;
        line-height: 0.33rem;
        font-weight: 500;
        margin-left: 1rem;
      }
    }
  }
}
</style>
