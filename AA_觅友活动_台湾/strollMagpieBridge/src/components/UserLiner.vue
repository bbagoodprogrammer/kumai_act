<template>
  <div class="userLiner" :class="{noCp:!owner.is_reg}">
    <div class="liner" v-if="owner.is_reg">
      <div class="linght"></div>
      <div class="hearScore">
        <div class="lv" v-if="lv ">{{lang.scoreName}}</div>
        <div class="score">{{owner.score >= 1000? `${owner.score / 1000}k` : owner.score }}</div>
      </div>
      <div class="linerItem">
        <div class="left" :style="{width:linerWidth + '%'}">
          <div class="imgBox" :class="{max:linerWidth >= 35}">
            <img v-lazy="owner.avatar" alt="">
          </div>
        </div>
        <div class="right" :style="{width:linerWidth + '%'}">
          <div class="imgBox" :class="{max:linerWidth >= 35}">
            <img v-lazy="owner.cp_avatar" alt="">
          </div>
        </div>
      </div>
    </div>
    <div class="noCp" v-else>
      <div class="imgBox_l">
        <img v-lazy="owner.avatar" alt="">
      </div>
      <i class="hear"></i>
      <div class="imgBox_r" @click="setFriend()">
        <i class="add"></i>
        <em>{{lang.setCp}}</em>
      </div>
    </div>
    <div class="titleList">
      <div class="titleItem" v-for="(item,index) in titles" :key="index">
        <img :src="item.image" alt="">
        <div class="titleName">
          <div class="name">Lv{{index +1 }} <em>{{item.name}}</em></div>
          <div class="score">{{lang.scoreName}}：{{item.score}}</div>
        </div>
        <i class="status" v-if="item.num > 0"></i>
      </div>
    </div>
  </div>
</template>

<script>

import { mapState } from "vuex"
export default {
  computed: {
    ...mapState(['titles', 'owner', 'target_score']),
    lv () {
      if (this.titles[1]) {
        if (this.titles[1].num) {
          return 2
        } else if (this.titles[0].num) {
          return 1
        } else {
          return 0
        }
      }
    },
    linerWidth () {
      return this.owner.score / this.target_score / 2 * 100
    }
  },
  methods: {
    setFriend () {
      this.$parent.$refs.footer.showFriendList()
    }
  }
}
</script>

<style lang="scss">
.userLiner {
  width: 7.37rem;
  height: 4.07rem;
  padding-top: 1.83rem;
  background: url(../img/userLiner.png);
  background-size: 100% 100%;
  position: relative;
  z-index: 2;
  margin: 0 auto;
  &.noCp {
    padding-top: 0.18rem;
    height: 5.72rem;
    .titleList {
      margin-top: 0.2rem;
    }
  }
  .liner {
    width: 6.68rem;
    height: 0.27rem;
    position: relative;
    margin: 0 auto;
    .hearScore {
      width: 1.42rem;
      height: 1.42rem;
      background: url(../img/hearScore.png);
      background-size: 100% 100%;
      position: absolute;
      top: -0.61rem;
      left: 2.63rem;
      z-index: 3;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      .lv {
        text-align: center;
        font-size: 0.22rem;
        color: #AB1B7A;
      }
      .score {
        font-size: 0.34rem;
        text-shadow: #EE57B9 1px 0 0, #EE57B9 0 1px 0, #EE57B9 -1px 0 0,
          #EE57B9 0 -1px 0;
      }
    }
    .linght {
      width: 100%;
      height: 100%;
      background: url(../img/linerBg.png);
      background-size: 100% 100%;
      position: absolute;
      left: 0;
      top: 0;
      z-index: 2;
    }
    .linerItem {
      width: 100%;
      height: 100%;
      position: absolute;
      left: 0;
      top: 0;
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-radius: 0.15rem;
      > div {
        max-width: 50%;
        height: 100%;
        border-radius: 0.15rem;
        position: relative;
        .imgBox {
          width: 1.13rem;
          height: 1.23rem;
          padding-top: 0.02rem;
          background: url(../img/avBg.png);
          background-size: 100% 100%;
          position: absolute;
          top: -1.3rem;
          right: -0.5rem;
          img {
            width: 1.1rem;
            height: 1.1rem;
            border-radius: 50%;
            margin-left: 0.01rem;
          }
        }
        &.left {
          background-image: linear-gradient(#5199f6, #9fedf2);
          .imgBox {
            &.max {
              right: 0.5rem;
            }
          }
        }
        &.right {
          background-image: linear-gradient(#ff88ef, #ff6b7a);
          .imgBox {
            left: -0.5rem;
            &.max {
              left: 0.5rem;
            }
          }
        }
      }
    }
  }
  .noCp {
    width: 4.73rem;
    height: 2.41rem;
    background: rgba(8, 13, 130, 0.15);
    border-radius: 0.1rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 0 auto;
    padding: 0 1.07rem;
    .imgBox_l,
    .imgBox_r {
      width: 1.59rem;
      height: 1.59rem;
      display: flex;
      align-items: center;
      justify-content: center;
      img {
        width: 1.3rem;
        height: 1.3rem;
      }
    }
    .imgBox_l {
      background: url(../img/avBg2.png);
      background-size: 100% 100%;
    }
    .imgBox_r {
      background: url(../img/avBg3.png);
      background-size: 100% 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      i {
        width: 0.37rem;
        height: 0.37rem;
        background: url(../img/add.png);
        background-size: 100% 100%;
      }
      em {
        margin-top: 0.05rem;
        font-size: 0.24rem;
        color: rgba(189, 158, 255, 1);
      }
    }
    .hear {
      width: 1.42rem;
      height: 1.42rem;
      background: url(../img/hearScore.png);
      background-size: 100% 100%;
    }
  }
  .titleList {
    width: 6.87rem;
    margin: 0.74rem auto 0;
    .titleItem {
      height: 1.32rem;
      background: url(../img/titleItem.png);
      background-size: 100% 100%;
      display: flex;
      align-items: center;
      margin-bottom: 0.11rem;
      position: relative;
      > img {
        width: 2.32rem;
        height: 0.54rem;
        margin-left: 0.25rem;
      }
      .titleName {
        margin-left: 0.54rem;
        .name {
          font-size: 0.28rem;
          color: #D721BF;
          em {
            font-size: 0.28rem;
          }
        }
        .score {
          color: #A583D3;
          font-size: 0.26rem;
        }
      }
      .status {
        width: 0.55rem;
        height: 0.55rem;
        background: url(../img/set.png);
        background-size: 100% 100%;
        position: absolute;
        top: 0.37rem;
        right: 0.3rem;
      }
    }
  }
}
</style>