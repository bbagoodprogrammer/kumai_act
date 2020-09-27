<template>
  <div class="pkMsg" :class="{no:no}">
    <div class="four">
      <div class="bgLiner" v-if="team.type == 1">
        <span><i></i></span>
        <span><i></i></span>
        <span><i></i></span>
        <span></span>
      </div>
      <div class="bgLiner" v-else>
        <span class="b2"><i></i></span>
        <span class="b2"></span>
      </div>
      <div class="userBox">
        <div class="userItem" v-for="(item,index) in team.team" :key="index">
          <i v-if="item &&item.type > 0" :class="{leader:item.type ==1}"></i>
          <img v-lazy="item.avatar" alt="" v-if="item">
          <img src="../assets/img/addIcon.png" alt="" v-else class="add">
          <div class="nick">{{item?item.nick:'待上席'}}</div>
        </div>
      </div>
    </div>
    <!-- <div class="pkTips">
      顯示隊員分佈情況，與隊長、隊員同組時顯示標籤
    </div>
    <div class="iconBox">
      <i class="leader"></i>
      <i class="dy"></i>
    </div> -->
  </div>
</template>
<script>
export default {
  props: ["team", "no"],
  methods: {
    closeTeam() {
      this.$parent.showTeam = false
    }
  }
}
</script>
<style lang="scss" scoped>
.pkMsg {
  width: 6.75rem;
  background: url(../assets/img/pkBg.png) left bottom no-repeat;
  background-size: 100% auto;
  padding-bottom: 0.17rem;
  margin: 0 auto;
  position: relative;
  &.no {
    background: none;
  }
}
.title {
  display: block;
  width: 1.09rem;
  height: 0.39rem;
  background: linear-gradient(90deg, #fe4428 0%, #f7526e 100%);
  border-radius: 0.19rem;
  position: absolute;
  font-size: 0.24rem;
  left: 1.19rem;
  top: -0.23rem;
  &.two {
    left: 0.26rem;
  }
}
.four {
  width: 6.55rem;
  height: 3.92rem;
  // background: rgba(255, 255, 255, 0.1);
  border-radius: 0.1rem;
  position: relative;
  margin: 0 auto;
  .bgLiner {
    width: 100%;
    height: 3.6rem;
    position: absolute;
    left: 0;
    top: 0;
    display: flex;
    justify-content: space-between;
    padding: 0.3rem 0 0.16rem;
    span {
      width: 1.6rem;
      height: 3.6rem;
      background: rgba(255, 255, 255, 0.1);
      border-radius: 0.1rem;
      position: relative;
      i {
        display: block;
        width: 0.64rem;
        height: 0.39rem;
        background: url(../assets/img/vs.png);
        background-size: 100% 100%;
        position: absolute;
        right: -0.32rem;
        top: 1.71rem;
      }
      &.b2 {
        width: 3.18rem;
        i {
          right: -0.4rem;
        }
      }
    }
  }
  &.min {
    width: 1.73rem;
    .userItem {
      width: 100%;
    }
    .userItem:first-child {
      margin-bottom: 0.1rem;
    }
    .noTips {
      margin-top: 0.05rem;
    }
  }
}
.userBox {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 0.3rem 0 0.16rem;
  .userItem {
    width: 1.6rem;
    height: 1.8rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: relative;
    i {
      display: block;
      width: 1.06rem;
      height: 0.31rem;
      background: url(../assets/img/dy.png);
      background-size: 100% 100%;
      position: absolute;
      top: 0.66rem;
      right: -0.05rem;
      &.leader {
        background: url(../assets/img/leader.png);
        background-size: 100% 100%;
      }
    }
    img {
      width: 1rem;
      height: 1rem;
      border-radius: 50%;
      display: block;
      margin: 0 auto;
    }
    .nick {
      height: 0.4rem;
      font-size: 0.24rem;
      margin-top: 0.05rem;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      text-align: center;
    }
  }
}
.noTips {
  font-size: 0.22rem;
  color: rgba(242, 193, 58, 1);
  text-align: center;
  margin-top: 0.2rem;
}
.pkTips {
  text-align: center;
  color: rgba(106, 194, 255, 1);
  font-size: 0.24rem;
  margin: 0.23rem 0 0.3rem;
}
.iconBox {
  text-align: center;
  .leader {
    display: inline-block;
    width: 1.06rem;
    height: 0.31rem;
    background: url(../assets/img/leader.png);
    background-size: 100% 100%;
  }
  .dy {
    display: inline-block;
    width: 1.06rem;
    height: 0.31rem;
    background: url(../assets/img/dy.png);
    background-size: 100% 100%;
    margin-left: 0.65rem;
  }
}
</style>
