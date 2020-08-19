<template>
  <div class="page pageHistoryDetail">
    <div class="title"><i class="back" @click="$router.go(-1)"></i> {{actItem.end_date}}</div>
    <div class="luckUser">
      <div class="title">抽到了大獎！</div>
      <div class="userMsg">
        <div class="imgBox">
          <span class="bg"></span>
          <img :src="actItem.winner_avatar" alt="">
        </div>
        <div class="userName">
          <div class="nick">{{actItem.winner_nick}}</div>
          <div class="gift">獎品： <img :src="actItem.prise_pic" alt=""> x1</div>
        </div>
      </div>
    </div>
    <div class="sGift">
      <span class="gift">抽獎資格: <img :src="actItem.ticket_gpic" alt=""> x1</span>
      <span>發起者: {{actItem.creator_nick}}</span>
    </div>
    <div class="list">
      <div class="total">參與人數: {{total?total:0}}</div>
      <ul class="scrollable">
        <li v-for="(item,index) in list " :key="index">
          <img :src="item.avatar" alt="">
          <div class="msg">
            <div class="nick">{{item.nick}}</div>
            <div class="tips">送出{{item.ticket_count}}份禮物，獲得{{item.ticket_count}}個抽獎機會</div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { lang } from './config';
import { getHistory } from "./apis"
export default {
  data() {
    return {
      actItem: {},
      list: [],
      total: 0,
      id: 0,
      loaded: false,
      more: true
    }
  },
  computed: {
    lang: () => lang,
  },
  created() {
    const item = this.$route.params.item
    this.actItem = item
    this.id = item.id
    getHistory(item.id, 0).then(res => {
      console.log(res)
      this.total = res.data.response_data.total
      this.list = res.data.response_data.list
      // [
      //   {
      //     "uid": 15,
      //     "nick": "15name",
      //     "avatar": "http://img.17sing.tw/uc/img/head_2233806_1515642245.png",
      //     "ticket_count": 10
      //   },
      //   {
      //     "uid": 6200105,
      //     "nick": "点",
      //     "avatar": "http://img.17sing.tw/uc/img/head_2233806_1515642255.png",
      //     "ticket_count": 5
      //   }
      // ]

    })
  },
  mounted() {
    this.scrollable = this.$el.querySelector('.scrollable');
    if (this.scrollable) {
      this.scrollable.addEventListener('scroll', this.onScroll);
    }
  },
  methods: {
    onScroll() {
      const scrollToBottom = this.scrollable.scrollTop + this.scrollable.clientHeight >= this.scrollable.scrollHeight - 10;
      if (scrollToBottom) { //滾動加載，沒有加載完成
        if (this.loaded) return
        if (this.more) {
          this.more = false
          getHistory(this.id, this.list.length).then(res => {
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
  }
};
</script>

<style lang="scss">
.pageHistoryDetail {
  width: 7.5rem;
  height: 9.88rem;
  background: linear-gradient(
    0deg,
    rgba(84, 173, 255, 1) 0%,
    rgba(122, 75, 255, 1) 100%
  );
  border-radius: 0.32rem 0.32rem 0 0;
  display: flex;
  flex-direction: column;
  > .title {
    height: 1rem;
    text-align: center;
    line-height: 1rem;
    font-size: 0.42rem;
    font-weight: 600;
    position: relative;
    // border-bottom: 1px solid RGBA(133, 149, 255, 1);
    .back {
      display: block;
      width: 0.17rem;
      height: 0.29rem;
      background: url(./img/back2.png);
      background-size: 100% 100%;
      position: absolute;
      top: 0.36rem;
      left: 0.3rem;
    }
  }
}
.luckUser {
  width: 5.85rem;
  height: 2.6rem;
  background: url(./img/luckUserBg.png);
  background-size: 100% 100%;
  margin: 0.08rem auto 0;
  .title {
    font-size: 0.32rem;
    color: rgba(255, 246, 94, 1);
    font-size: 0.32rem;
    height: 0.82rem;
    line-height: 0.95rem;
    text-align: center;
  }
  .userMsg {
    display: flex;
    justify-content: center;
    align-items: center;
    .imgBox {
      width: 1.48rem;
      height: 1.4rem;
      position: relative;
      .bg {
        width: 100%;
        height: 100%;
        background: url(./img/luckAv.png);
        background-size: 100% 100%;
        position: absolute;
      }
      img {
        width: 1.2rem;
        height: 1.2rem;
        border-radius: 50%;
        position: absolute;
        top: 0.1rem;
        left: 0.14rem;
      }
    }
    .userName {
      .gift {
        display: flex;
        align-items: center;
        font-size: 0.24rem;
        color: rgba(255, 255, 255, 0.8);
        .nick {
          font-size: 0.32rem;
        }
        img {
          width: 0.48rem;
          height: 0.47rem;
        }
      }
    }
  }
}
.sGift {
  width: 6.9rem;
  height: 0.48rem;
  background: url(./img/luckBg.png);
  background-size: 100% 100%;
  margin: 0.03rem auto 0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.24rem;
  span {
    display: flex;
    align-items: center;
    img {
      width: 0.36rem;
      height: 0.36rem;
      margin: 0 0.1rem;
    }
    &.gift {
      margin-right: 0.6rem;
    }
  }
}
.list {
  flex: 1;
  width: 6.9rem;
  margin: 0.18rem auto;
  border-top: 1px solid rgba(255, 255, 255, 0.2);
  display: flex;
  flex-direction: column;
  .total {
    color: rgba(255, 255, 255, 0.6);
    font-size: 0.24rem;
    height: 0.39rem;
    line-height: 0.4rem;
  }
  ul {
    flex: 1;
    overflow-x: hidden;
    overflow-y: scroll;
    -webkit-overflow-scrolling: touch;
    -webkit-overflow-scrolling: auto;
    li {
      height: 1.2rem;
      display: flex;
      align-items: center;
      border-bottom: 1px solid rgba(255, 255, 255, 0.2);
      img {
        width: 0.7rem;
        height: 0.7rem;
        border-radius: 50%;
      }
      .msg {
        margin-left: 0.11rem;
        .nick {
        }
        .tips {
          font-size: 0.24rem;
          color: rgba(255, 255, 255, 0.7);
        }
      }
    }
  }
}
</style>