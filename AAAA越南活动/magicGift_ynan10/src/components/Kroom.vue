<template>
  <div class="kroom" :class="{active:activateState === 0}">
    <div class="wardsSample">
      <p class="rankTips">Xếp hạng theo mị lực nhận tại phòng Kara từ những quà sau </p>
      <div class="wards">
        <!-- <img src="../assets/img/ward2.png" alt="">
        <div class="giftName">
          <span>Dừa Lạnh</span>
          <span>Ghế Bãi Biển</span>
          <span>Nhà Ven Biển</span>
        </div> -->
        <div class="wardItem">
          <img src="../assets/img/ward4.png" alt="">
          <strong>Bánh Rán</strong>
        </div>
        <div class="wardItem">
          <img src="../assets/img/ward5.png" alt="">
          <strong>Cửa Thần Kỳ</strong>
        </div>
        <div class="wardItem">
          <img src="../assets/img/ward6.png" alt="">
          <strong>Máy Thời Gian</strong>
        </div>
      </div>
      <p class="fansong">Tặng quà trên cho thí sinh dự thi tại phòng Karra,</br> người tặng sẽ nhận lại 5% số xu vào sáng sớm hôm sau</p>
    </div>
    <div class="wordsList" v-if="activateState !== 0">
      <div class="listTop">
        <div class="listItem" :class="'top'+ (index+1)" v-for="(item,index) in top" @click="goPersonalMsg(item.uid)" :key=index>
          <span>{{item.rank}}</span>
          <div class="userBox">
            <div class="imgBox">
              <img :src="require(`../assets/img/user1.png`)" alt="" class="img1" v-if="item.rank ==1">
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
              <strong>x{{item2.total}}</strong>
            </span>
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
              <!-- <p class="id">UID:{{item.uid}}</p> -->
              <p class="charm">{{item.score}}</p>
            </div>
          </div>
          <div class="wardsMsg">
            <span v-for="(item2,index) in item.gifts" :key="index">
              <img :src="item2.img" alt="" class="giftImg">
              <strong>x{{item2.total}}</strong>
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
    ...mapState(["kRoomArr", "activateState"]),
    top() {
      if (this.kRoomArr !== []) {
        return this.kRoomArr.slice(0, 3)
      }
    },
    bottom() {
      if (this.kRoomArr !== []) {
        return this.kRoomArr.slice(3)
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
.kroom {
  &.active {
    padding-bottom: 1.8rem;
  }
  .wardsSample {
    width: 7.5rem;
    .rankTips {
      width: 7rem;
      margin: 0.3rem auto 0;
      text-align: center;
      color: rgba(191, 251, 255, 1);
      font-size: 0.22rem;
      font-weight: 500;
      line-height: 0.3rem;
    }
    .wards {
      width: 5.2rem;
      margin: 0.29rem auto 0.08rem;
      display: flex;
      .wardItem {
        width: 1.6rem;
        img {
          display: block;
          width: 1.25rem;
          height: 1.25rem;
          margin: 0 auto;
        }
        strong {
          display: block;
          margin-top: 0.15rem;
          font-size: 0.22rem;
          color: rgba(195, 191, 255, 1);
          text-align: center;
          font-weight: 500;
        }
      }
    }
    .fansong {
      padding: 0 0.5rem;
      font-size: 80%;
      color: #fffabf;
      text-align: center;
      font-weight: 500;
      margin-top: 0.1rem;
    }
  }
  .wordsList {
    margin: 0.25rem 0.15rem 0;
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
        width: 1rem !important;
        height: 1.14rem !important;
        left: 0.105rem;
        top: -0.11rem;
        border: none;
      }
      .top1 {
        > span {
          background: url(../assets/img/top1.png);
          background-size: 100% 100%;
        }
      }
      .top2 {
        > span {
          background: url(../assets/img/top2.png);
          background-size: 100% 100%;
        }
      }
      .top3 {
        > span {
          background: url(../assets/img/top3.png);
          background-size: 100% 100%;
        }
      }
    }
    .listItem {
      height: 1.2rem;
      display: flex;
      align-items: center;
      margin-top: 0.05rem;
      border-bottom: 0.015rem solid rgba(79, 50, 205, 1);
      > span {
        display: block;
        margin: 0 0 0 0.1rem;
        width: 0.75rem;
        height: 0.65rem;
        text-align: center;
        color: rgba(255, 187, 141, 1);
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
            border: 0.03rem solid rgba(255, 238, 120, 1);
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
            color: rgba(255, 252, 239, 1);
          }
          .id {
            color: rgba(41, 255, 247, 1);
            font-size: 75%;
            height: 0.3rem;
          }
          .charm {
            margin-top: 0.1rem;
            height: 0.33rem;
            font-size: 0.28rem;
            color: rgba(41, 255, 247, 1);
            line-height: 0.33rem;
            font-weight: 500;
          }
        }
      }
      .wardsMsg {
        width: 3rem;
        display: flex;
        font-weight: 700;
        font-size: 80%;
        margin-top: 0.4rem;
        > span {
          margin-right: 0.1rem;
          width: 1rem;
          display: flex;
          align-items: center;
          img {
            width: 0.4rem;
            height: 0.4rem;
            margin: 0 auto;
          }
          strong {
            color: rgba(255, 248, 171, 1);
            font-size: 0.22rem;
            font-weight: 600;
            text-align: center;
            margin-top: 0.05rem;
          }
        }
      }
    }
  }
}
</style>
