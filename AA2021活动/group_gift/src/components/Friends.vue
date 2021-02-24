<template>
  <div class="friendList">
    <i class="close" @click="closeFriend()"></i>
    <div class="title">好友</div>
    <div class="selectFriend">
      <input type="text" v-model="s_uid" class="s_input">
      <div class="selectTips" v-if="!s_uid"><i></i><span>搜索</span></div>
    </div>
    <ul class='scrollable'>
      <li v-for="(item,index) in list" :key="index" :class="'rank' + item.rank">
        <img v-lazy="item.avatar" alt="" @click="goUser(item.uid)">
        <div class="msg">
          <div class="nick">{{item.nick}}</div>
          <div class="uid">UID {{item.uid}}</div>
        </div>
        <div class="score">
          邀請好友
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  data() {
    return {
      s_uid: null,
      showNoCoiosPup: false,
      list: [
        {
          uid: 123,
          avatar: '',
          rank: 1,
          score: 999,
          nick: 'xxxx'
        },
        {
          uid: 123,
          avatar: '',
          rank: 1,
          score: 999,
          nick: 'xxxx'
        },
        {
          uid: 123,
          avatar: '',
          rank: 1,
          score: 999,
          nick: 'xxxx'
        },
        {
          uid: 123,
          avatar: '',
          rank: 1,
          score: 999,
          nick: 'xxxx'
        }
      ]
    }
  },
  mounted() {
    this.scrollable = this.$el.querySelector('.scrollable');
    if (this.scrollable) {
      this.scrollable.addEventListener('scroll', this.onScroll);
    }
  },
  methods: {
    onScroll() {
      console.log('xxx')
      const scrollToBottom = this.scrollable.scrollTop + this.scrollable.clientHeight >= this.scrollable.scrollHeight - 10;
      if (scrollToBottom) { //滾動加載，沒有加載完成
        if (this.loaded) return
        if (this.more) {
          this.more = false
          getList(this.hList.length, 'more').then(res => {
            this.more = true
            if (res.data.response_data.list.length === 0) {
              this.loaded = true
            } else {
              this.$emit('addhList', res.data.response_data.list)
            }
          })
        }
      }
    },
    closeFriend() {
      this.$parent.showFriends = false
    }
  }
}
</script>
<style lang="scss" scoped>
.friendList {
  width: 6.6rem;
  height: 6.38rem;
  background: #ffffff;
  border-radius: 0.12rem;
  position: relative;
  .title {
    height: 1rem;
    line-height: 1rem;
    font-size: 0.32rem;
    color: rgba(133, 90, 55, 1);
    text-align: center;
  }
  .selectFriend {
    width: 5.93rem;
    height: 0.64rem;
    background: rgba(177, 177, 177, 0.1);
    border-radius: 0.32rem;
    margin: 0.1rem auto 0;
    display: flex;
    align-items: center;
    justify-content: center;
    .s_input {
      position: absolute;
      border: none;
      background: none;
      z-index: 1;
    }
    .selectTips {
      display: flex;
      align-items: center;
      font-size: 0.26rem;
      i {
        width: 0.26rem;
        height: 0.26rem;
        background: url(../img/selectIcon2.png);
        background-size: 100% 100%;
        margin-right: 0.1rem;
      }
    }
  }
  ul {
    // width: 7.02rem;
    background: #ffffff;
    border-radius: 0.12rem;
    margin: 0 auto;
    max-height: 4.4rem;
    overflow-y: scroll;
    li {
      height: 1.4rem;
      display: flex;
      align-items: center;
      color: rgba(133, 90, 55, 1);
      font-size: 0.32rem;
      position: relative;
      img {
        width: 0.88rem;
        height: 0.88rem;
        border-radius: 50%;
        margin: 0 0.16rem 0 0.32rem;
      }
      .msg {
        width: 3.5rem;
        .nick {
          font-size: 0.32rem;
          color: rgba(133, 90, 55, 1);
        }
        .uid {
          font-size: 0.26rem;
          color: rgba(133, 90, 55, 1);
        }
      }
      .score {
        width: 1.56rem;
        height: 0.56rem;
        background: linear-gradient(-90deg, #ff885a, #ff6957);
        border-radius: 0.28rem;
        text-align: center;
        line-height: 0.56rem;
        font-size: 0.26rem;
        color: #fff;
      }
    }
    li::before {
      content: "";
      display: block;
      width: 5.1rem;
      height: 0.015rem;
      position: absolute;
      bottom: 0;
      right: 0.3rem;
      background: RGBA(255, 229, 226, 1);
    }
  }
  .close {
    display: block;
    width: 0.27rem;
    height: 0.27rem;
    background: url(../img/close.png);
    background-size: 100% 100%;
    position: absolute;
    top: 0.32rem;
    right: 0.26rem;
  }
}
</style>
