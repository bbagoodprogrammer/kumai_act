<template>
  <div class="taskList">
    <div class="title">{{lang.taskTitle}}</div>
    <div class="list">
      <div class="tab">
        <span class="time">{{lang.detailTime}}</span>
        <span class="code">{{lang.taskCode}}</span>
        <span class="state">{{lang.detailState}}</span>
      </div>
      <div class="listItem">
        <p v-if="taskList.length == 0" class="noData">{{lang.noData}}</p>
        <ul class="scrollable">
          <li v-for="(item,index) in taskList" :key="index">
            <span class="time">{{getTime(item.add_time)}}</span>
            <span class="code">{{item.invite_code}}</span>
            <span class="state">
              <em v-if="item.status == 2" class="end">{{lang.giftEnd}}</em>
              <em class="lingqu" v-else-if="item.status == 1" @click="getGift(item.id,index)">{{lang.coinsTwo}}</em>
              <em v-else-if="item.status == 0" class="rev" @click="share(item.invite_code)">{{lang.goShare}}</em>
            </span>
          </li>
        </ul>
      </div>
    </div>
    <loading />
    <transition name="slide">
      <msg-toast :msg="tastMsg" @closeToast="closeToast()" v-show="showT"></msg-toast>
    </transition>
    <!-- 邀请弹窗 -->
    <div class="mask" v-show="showShare">
      <transition name="slide">
        <div class="shareCon" v-show="showShare">
          <span class="title"></span>
          <i class="close" @click="closeShare()"></i>
          <p class="shareTitle">{{lang.shareTips}}</p>
          <textarea type="text" v-model.trim="shareLink" class="shareLink" onfocus="this.select()" onmouseover="this.focus()" autofocus="autofocus" ref="link"></textarea>
        </div>
      </transition>
    </div>
  </div>
</template>
<script>
import api from "../../api/apiConfig"
import loading from "../../components/Loading"
import { globalBus } from '../../utils/eventBus'
import MsgToast from "../../components/commonToast"
import getString from "../../utils/getString"
import getAppUaInfo from "../../utils/getAppUaInfo"
import getDate from "../../utils/getDate"
export default {
  components: { loading, MsgToast },
  data() {
    return {
      taskList: [],
      tastMsg: '',
      showT: false,
      loaded: false,
      more: true,
      showShare: false, //分享链接  
      code: '',//分享码
    }
  },
  created() {
    api.detail(8, 0).then(res => {
      this.taskList = res.data.response_data.list.reverse()
    })
    sessionStorage.setItem("need-refresh", true);
  },
  mounted() {
    this.scrollable = this.$el.querySelector('.scrollable');
    if (this.scrollable) {
      this.scrollable.addEventListener('scroll', this.onScroll);
    }
  },
  computed: {
    shareLink() {
      return `https://activity.wekarapp.com/static_html/2020/vip_lottery/index.html?code=${this.code}`
    }
  },
  methods: {
    getGift(id, index) {
      api.getRward(id).then(res => {
        if (res.data.response_status.code == 0) {
          this.taskList[index].status = 2
        } else {
          this.tastMsg = res.data.response_status.error
          this.showT = true
        }
      })
    },
    onScroll() {
      const scrollToBottom = this.scrollable.scrollTop + this.scrollable.clientHeight >= this.scrollable.scrollHeight - 10;
      if (scrollToBottom) { //滾動加載，沒有加載完成
        if (this.loaded) return
        if (this.more) {
          this.more = false
          api.detail(8, this.taskList.length, 'more').then(res => {
            this.more = true
            if (res.data.response_data.list.length === 0) {
              this.loaded = true
            } else {
              this.taskList = this.taskList.concat(res.data.response_data.list)
            }
          })
        }
      }
    },
    share(code) {
      var ios = navigator.userAgent.match(/iPhone|iPod|ios|iPad/i);
      var ua = navigator.userAgent;
      let uid = getString("uid")
      var data = {
        "share_title": "Saya sedang selesaikan tugas mesterius yg Mingguan Hak Isetimewat Member !",
        "share_content": "Tulis nomor undang menbantu saya kok!",
        "share_image": "https://activity.wekarapp.com/static_html/2020/vip_lottery/share.jpg",
        "link": `https://activity.wekarapp.com/static_html/2020/vip_lottery/index.html?uid=${uid}&code=${code}&v=2`,
        "image": "https://activity.wekarapp.com/static_html/2020/vip_lottery/share.jpg",
        "share_url": `https://activity.wekarapp.com/static_html/2020/vip_lottery/index.html?uid=${uid}&code=${code}&v=2`
      }
      if (ios) {
        this.code = code
        this.showShare = true
        this.$refs.link.select()
      } else {
        javascript: JSInterface.share(JSON.stringify(data));
      }
    },
    closeToast() {
      this.showT = false
    },
    closeShare() {
      this.showShare = false
    },
    getTime(tm) {
      return getDate(new Date(tm * 1000), '~')
    },
  }
}
</script>
<style lang="scss">
body {
  background-color: #7f28d9;
  .taskList {
    padding: 0.59rem 0.19rem 0;
    .title {
      text-align: center;
      font-size: 0.48rem;
      color: #faf9a7;
      font-weight: 600;
    }
    .list {
      width: 7.12rem;
      margin: 0.5rem auto;
      .tab {
        display: flex;
        padding: 0 0.24rem;
        span {
          color: #fff8a8;
          font-size: 0.26rem;
          text-align: center;
        }
        .time {
          width: 2.4rem;
        }
        .code {
          width: 2.4rem;
        }
        .state {
          flex: 1;
        }
      }
      .noData {
        text-align: center;
        font-weight: 600;
        margin-top: 1.5rem;
      }
      .listItem {
        margin-top: 0.15rem;
        min-height: 3.22rem;
        background: url(../../assets/img/listBg.png) no-repeat;
        background-size: 100% auto;
        padding: 0.28rem 0.24rem;
        ul {
          max-height: 8.6rem;
          overflow-x: hidden;
          overflow-y: scroll;
          -webkit-overflow-scrolling: touch;
          -webkit-overflow-scrolling: auto;
        }
        li {
          width: 6.65rem;
          height: 1.1rem;
          background: url(../../assets/img/taskListBg.png);
          background-size: 100% 100%;
          display: flex;
          text-align: center;
          line-height: 1.1rem;
          font-size: 0.24rem;
          margin-bottom: 0.06rem;
          .time {
            width: 2.4rem;
            font-size: 0.24rem;
            padding: 0 0.14rem;
            display: flex;
            align-items: center;
            justify-content: center;
            line-height: 0.3rem;
          }
          .code {
            width: 2rem;
            color: #ffe992;
          }
          .state {
            flex: 1;
            display: flex;
            align-items: center;
            justify-content: center;
            .end {
              color: #63ffe7;
              font-size: 0.24rem;
            }
            .lingqu,
            .rev {
              display: block;
              width: 1.65rem;
              height: 0.65rem;
              line-height: 0.2rem;
              display: flex;
              align-items: center;
              justify-content: center;
              background: url(../../assets/img/taskBtn.png);
              background-size: 100% 100%;
              color: #ae4800;
              font-size: 0.24rem;
              text-align: center;
              margin: 0 auto;
            }
          }
        }
      }
    }
  }
}
.shareCon {
  width: 6.21rem;
  height: 5.48rem;
  background: url(../../assets/img/pup1.png);
  background-size: 100% 100%;
  position: absolute;
  left: 0.69rem;
  top: 4.2rem;
  .title {
    width: 5.49rem;
    height: 2.07rem;
    background: url(../../assets/img/pupTitle.png);
    background-size: 100% 100%;
    position: absolute;
    left: 0.36rem;
    top: -2.07rem;
  }
  .close {
    display: block;
    width: 0.8rem;
    height: 0.8rem;
    background: url(../../assets/img/close.png);
    background-size: 100% 100%;
    position: absolute;
    right: 0;
    top: -1rem;
  }
  .shareTitle {
    font-size: 0.36rem;
    font-weight: bold;
    padding: 0 0.4rem;
    margin-top: 0.92rem;
    text-align: center;
  }
  .shareLink {
    outline: none;
    border: none;
    background: rgba(196, 39, 131, 0.5);
    border-radius: 0.2rem;
    width: 5.23rem;
    height: 1.15rem;
    margin: 0.41rem 0.5rem 0;
    color: #fff;
    text-align: center;
    padding: 0.4rem 0;
  }
}
@import "../../assets/scss/common.scss";
</style>
