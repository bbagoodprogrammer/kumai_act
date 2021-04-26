<template>
  <div class="friedList ">
    <i class="close" @click="closeFriendList()"></i>
    <div class="title"></div>
    <p v-if="list.length == 0" class="noData">Bạn nhiều, nuôi hưu nhanh hơn, kết bạn nào!</p>
    <ul class="scrollable">
      <li v-for="(item,index) in list" :key="index">
        <img v-lazy="item.avatar" alt="" class="userAvatar">
        <div class="msg">
          <div class="nick">{{item.nick}}</div>
          <div class="status" v-if="item.status == 0">
            Chưa nhận hưu con
          </div>
        </div>
        <div class="statusBtn">
          <em v-if="item.status == 0" class="shareGet" @click="share(item.uid,index)"></em>
          <em v-else-if="item.status == 1" class="shareGetEd"></em>
          <em v-else class="getEd">Đã mời</em>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
import api from "../api/apiConfig"
export default {
  data () {
    return {
      list: [],
      loaded: false,
      more: true
    }
  },
  created () {
    api.firendList(0).then(res => {
      this.list = res.data.response_data.list
    })
  },
  mounted () {
    this.scrollable = this.$el.querySelector('.scrollable');
    if (this.scrollable) {
      this.scrollable.addEventListener('scroll', this.onScroll);
    }
  },
  methods: {
    share (uid, index) {
      api.inivt(uid).then(res => {
        if (res.data.response_status.code == 0) {
          this.list[index].status = 1
        } else {
          this.toast(res.data.response_status.error)
        }
      })
    },
    onScroll () {
      const scrollToBottom = this.scrollable.scrollTop + this.scrollable.clientHeight >= this.scrollable.scrollHeight - 10;
      if (scrollToBottom) { //滾動加載，沒有加載完成
        if (this.loaded) return
        if (this.more) {
          this.more = false
          api.firendList(this.list.length, 'more').then(res => {
            this.more = true
            if (res.data.response_data.list.length === 0) {
              this.loaded = true
            } else {
              this.list = this.list.concat(res.data.response_data.list)
            }
          })
        }
      }
    },
    closeFriendList () {
      this.$emit('closeFriend')
    }
  }
}
</script>
<style lang="scss" scoped>
.friedList {
  width: 6.88rem;
  height: 8.8rem;
  background: url(../assets/img/invitationedBg.png);
  background-size: 100% 100%;
  position: absolute;
  top: 1.8rem;
  left: 0.31rem;
  .title {
    width: 2.02rem;
    height: 0.58rem;
    background: url(../assets/img/taskPup/friendTitle.png);
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
    height: 6.8rem;
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
        margin-left: 0.2rem;
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
        width: 1.32rem;
        height: 0.53rem;
        .shareGet {
          display: block;
          width: 1.32rem;
          height: 0.53rem;
          background: url(../assets/img/taskPup/shareGet.png);
          background-size: 100% 100%;
        }
        .shareGetEd {
          display: block;
          width: 1.32rem;
          height: 0.53rem;
          background: url(../assets/img/taskPup/shareGetEd.png);
          background-size: 100% 100%;
        }
        .getEd {
          text-align: center;
          color: #48850f;
          font-size: 0.24rem;
        }
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
