<template>
  <div class="friendInivat">
    <i class="close" @click="closeFriendList()"></i>
    <div class="title"></div>
    <ul class="scrollable">
      <li v-for="(item,index) in invite_users" :key="index" @click="listClick(index)">
        <img v-lazy="item.avatar" alt="" class="userAvatar">
        <div class="msg">
          <div class="nick">{{item.nick}}</div>
          <div class="status">
            邀請你領取鹿寶寶
          </div>
        </div>
        <div class="statusBtn">
          <em :class="{act:index==actindex}"></em>
        </div>
      </li>
    </ul>
    <div class="singUp">
      <div class="btn" @click="singUp()"></div>
      <p>僅可接受一名好友的邀請，接受後該好友可獲得 <i></i> x10獎勵</p>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      actindex: 0
    }
  },
  props: ["invite_users"],
  methods: {
    listClick(index) {
      this.actindex = index
    },
    singUp() {
      this.$parent.singUp(this.invite_users[this.actindex].uid)
    },
    closeFriendList(){
      this.$emit('closeFriendList')
    }
  }
}
</script>
<style lang="scss" scoped>
.friendInivat {
  width: 6.88rem;
  height: 8.8rem;
  background: url(../assets/img/invitationedBg.png);
  background-size: 100% 100%;
  position: absolute;
  top: 1.8rem;
  left: 0.31rem;
  .title {
    width: 2.51rem;
    height: 0.58rem;
    background: url(../assets/img/friendInivat.png);
    background-size: 100% 100%;
    margin: 0.48rem auto 0;
  }
  .noData {
    text-align: center;
    margin-top: 0.4rem;
    color: #316501;
  }
  ul {
    margin-top: 0.25rem;
    width: 6.3rem;
    height: 5.3rem;
    margin: 0.35rem auto 0;
    overflow-x: hidden;
    overflow-y: scroll;
    -webkit-overflow-scrolling: touch;
    -webkit-overflow-scrolling: auto;
    li {
      height: 1.24rem;
      padding: 0 0.17rem 0 0.3rem;
      display: flex;
      align-items: center;
      background: rgba(226, 255, 194, 1);
      border: 0.04rem solid rgba(202, 255, 148, 1);
      // box-shadow: -1px 1px 31px 1px rgba(255, 255, 255, 0.75);
      border-radius: 0.1rem;
      margin-bottom: 0.18rem;
      .userAvatar {
        width: 0.65rem;
        height: 0.65rem;
        border-radius: 50%;
        border: 0.02rem solid #f8fc6a;
        margin-left: 0.05rem;
      }
      .msg {
        width: 3.5rem;
        margin-left: 0.15rem;
        .nick {
          font-size: 0.32rem;
          color: #3a7007;
          font-weight: bold;
        }
        .status {
          font-size: 0.24rem;
          color: #619035;
          font-weight: 500;
        }
      }
      .statusBtn {
        margin-left: 0.8rem;
        em {
          display: block;
          width: 0.34rem;
          height: 0.34rem;
          background: url(../assets/img/select.png);
          background-size: 100% 100%;
          &.act {
            background: url(../assets/img/select2.png);
            background-size: 100% 100%;
          }
        }
      }
    }
  }
  .singUp {
    margin-top: 0.15rem;
    .btn {
      width: 4.18rem;
      height: 1.02rem;
      background: url(../assets/img/singUp2.png);
      background-size: 100% 100%;
      margin: 0 auto 0;
    }
    p {
      text-align: center;
      margin: 0.22rem auto;
      font-size: 0.18rem;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 0.18rem;
      color: #48850f;
      i {
        display: block;
        width: 0.32rem;
        height: 0.34rem;
        background: url(../assets/img/waterIcon.png);
        background-size: 100% 100%;
      }
    }
  }
  .close {
    display: block;
    width: 0.32rem;
    height: 0.32rem;
    background: url(../assets/img/close.png);
    background-size: 100% 100%;
    position: absolute;
    right: 0.1rem;
    top: -0.5rem;
  }
}
</style>
