<template>
  <div class="share">
    <div class="header"><i class="black"></i>邀請好友</div>
    <div class="singInDay" :class="{mHeigth:type==2}">
      <div class="userMsg" v-if="type==2">
        <div class="userAv">
          <img v-lazy="" alt="" class="av">
          <strong>xxxxxxxxxxx</strong>
        </div>
        <div class="userTips">已連續簽到100天，現在需要你的助力，快幫他助力吧</div>
      </div>
      <strong v-else>
        你已連續簽到XXX天</br>
        成功邀請3位好友助力可再翻牌一次
      </strong>
    </div>
    <SharePeople :type="type" />
    <div class="shareTips">
      <div class="shareBtn" @click="share()"> {{type==2?'幫他助力':'立即邀請好友'}} </div>
      <p class="verTips" v-if="type==2">助力需更新到最新版本</p>
      <div class="tips" v-if="type==2">
        <h6>助力規則：</h6>
        <p>1、不可自己給自己助力 </br>
          2、每個用戶僅可幫其他用戶助力一次 </br>
          3、需要更新新版本，成功調起歡歌app，才算成功助力 </br>
          4、助力需要限時完成，超出時間後無法助力，需明天重新發起邀請</p>
      </div>
      <div class="tips" v-else>
        <h6>說明：</h6>
        <p class="first">這裡展示你最近一次連續簽到的天數，如有斷簽，則重新計算</p>
        <p>連簽徽章，當連簽天數達到要求即可自動獲得，已獲得的徽章可在我的徽章查看並佩戴使用</p>
        <p>可花費金幣進行補簽，每次可補簽1天，每次補簽花費依次遞增，如第一次補一天花費100金幣，第二次補簽一天花費200金幣，如此類推。</p>
      </div>
    </div>
  </div>
</template>
<script>
import SharePeople from "../../components/SharePeople"
import getString from "../../utils/getString"
import APP from "../../utils/openApp"
export default {
  components: { SharePeople },
  data() {
    return {
      type: null
    }
  },
  created() {
    this.type = getString('type')
  },
  methods: {
    share() {
      if (this.type == 2) {
        APP()
      } else {
        var ios = navigator.userAgent.match(/iPhone|iPod|ios|iPad/i);
        var ua = navigator.userAgent;
        var data = {
          "share_title": `我已連續簽到${111}天`,
          "share_content": `我已在歡歌連續簽到${111}天啦，翻牌得獎品，需要你的助力，快來`,
          "share_image": "http://activity.17sing.tw/static_html/2020/signIn/share.jpg",
          "link": `http://activity.17sing.tw/static_html/2020/signIn/index.html?uid=${this.userMsg.uid}&code=${code}&v=2`,
          "image": "http://activity.17sing.tw/static_html/2020/signIn/share.jpg",
          "share_url": `http://activity.17sing.tw/static_html/2020/signIn/index.html?uid=${this.userMsg.uid}&code=${code}&v=2`
        }
        if (ios) {
          if (window.share != undefined) {
            share(JSON.stringify(data))
          } else {
            location.href = `shareUserInfo://activity.17sing.tw/static_html/2020/signIn.html&shareText=我已在歡歌連續簽到${111}天啦，翻牌得獎品，需要你的助力，快來&userImg=http://activity.17sing.tw/static_html/2020/signIn/share.jpg&title=我已連續簽到${111}天`;
          }
        } else {
          javascript: JSInterface.share(JSON.stringify(data));
        }
      }
    }
  }
}
</script>
<style lang="scss">
body {
  background: #f2f2f2 url("../../assets/img/shareBg.png") no-repeat;
  background-size: 100% auto;
  .share {
    .header {
      height: 0.88rem;
      line-height: 0.88rem;
      font-size: 0.36rem;
      text-align: center;
      position: relative;
      .black {
        display: block;
        width: 0.18rem;
        height: 0.32rem;
        background: url(../../assets/img/bArr.png);
        background-size: 100% 100%;
        position: absolute;
        left: 0.28rem;
        top: 0.28rem;
      }
    }
    .singInDay {
      height: 1.73rem;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-wrap: wrap;
      .userMsg {
        .userAv {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          margin-top: -0.1rem;
          .av {
            width: 1.38rem;
            height: 1.38rem;
            border-radius: 50%;
          }
        }
        strong {
          display: block;
          max-width: 1.4rem;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
        .userTips {
          font-size: 0.28rem;
          margin-top: 0.1rem;
        }
      }
      > strong {
        font-size: 0.32rem;
        line-height: 0.48rem;
        font-weight: 600;
        text-shadow: 0 0.03rem 0.06rem rgba(0, 0, 0, 0.16);
        text-align: center;
        margin-top: -0.2rem;
      }
      &.mHeigth {
        height: 2.47rem;
      }
    }
    .shareTips {
      padding-top: 0.4rem;
      .shareBtn {
        width: 5.8rem;
        height: 0.88rem;
        background: rgba(255, 106, 62, 1);
        border-radius: 0.53rem;
        text-align: center;
        margin: 0 auto;
        font-size: 0.36rem;
        line-height: 0.88rem;
      }
      .verTips {
        text-align: center;
        color: #999;
        font-size: 0.24rem;
        margin-top: 0.22rem;
      }
      > .tips {
        color: #999999;
        padding: 0.3rem 0.32rem 0 0.28rem;
        h6 {
          font-size: 0.28rem;
        }
        p {
          margin-top: 0.13rem;
          font-size: 0.26rem;
          &.first {
            margin-top: 0.02rem;
          }
        }
      }
    }
  }
}
@import "../../assets/scss/common.scss";
</style>
