<template>
  <div class="words" :class="{active:activateState === 0}">
    <div class="wardsSample">
      <p>Xếp hạng theo số người tặng quà yêu cầu cho bài hát đăng sau khi báo danh hoặc tại phòng Kara,Cùng 1 người tặng quà chỉ tính 1 lần</p>
    </div>
    <div class="wordsList" v-if="activateState !== 0">
      <div class="listTop">
        <div class="listItem" :class="'top'+ (index+1)" v-for="(item,index) in top" @click="goPersonalMsg(item.uid)" :key=index>
          <span>{{item.rank}}</span>
          <div class="userBox">
            <div class="imgBox">
              <img src="../assets/img/shi.png" alt="" class="img1" v-if="item.rank ==1">
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
              <!-- <img src="../assets/img/shi.png" alt="" class="img1" v-if="item.rank"> -->
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
  padding-top: 0.33rem;
  &.active {
    padding-bottom: 1.8rem;
  }
  .wardsSample {
    width: 7.5rem;
    margin-bottom: 0.3rem;
    background-size: 100% 100%;
    p {
      text-align: center;
      color: #fceeb8;
      font-weight: 600;
      font-size: 0.24rem;
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
          width: 0.75rem;
          height: 0.65rem;
          text-indent: -999rem;
        }
      }
      .top1 {
        background: url(../assets/img/top1Bg.png);
        background-size: 100% 100%;
        > span {
          background: url(../assets/img/top1.png);
          background-size: 100% 100%;
        }
        .img2 {
          border: none !important;
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
        background: url(../assets/img/top3Bg.png);
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
      background: url(../assets/img/top4Bg.png);
      background-size: 100% 100%;
      display: flex;
      align-items: center;
      margin-top: 0.05rem;
      border-bottom: 0.02rem solid #e9663d;
      > span {
        display: block;
        margin: 0 0 0 0.1rem;
        width: 0.75rem;
        height: 0.65rem;
        line-height: 0.65rem;
        color: #ffc0ee;
        font-size: 0.36rem;
        font-style: italic;
        font-weight: 800;
        text-align: center;
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
            border-radius: 50%;
            border: 0.04rem solid #cc592a;
          }
          .img1 {
            width: 0.94rem;
            height: 0.96rem;
            z-index: 999;
            position: absolute;
            border: none;
            // top: 0.06rem;
            // left: 0.05rem;
          }
          .img2 {
            display: block;
            width: 0.86rem;
            height: 0.86rem;
            border: 0.04rem solid #fff;
          }
        }
        .userMsg {
          .name {
            width: 2.5rem;
            font-size: 85%;
            max-width: 2.5rem;
            overflow: hidden;
            text-overflow: ellipsis; //超出部分以省略号显示
            white-space: nowrap;
            color: #ffedff;
          }
          .charm {
            height: 0.33rem;
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
        line-height: 0.4rem;
        i {
          display: block;
          width: 0.39rem;
          height: 0.44rem;
          background: url(../assets/img/charm.png);
          background-size: 100% 100%;
        }
        em {
          color: #fff88c;
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
