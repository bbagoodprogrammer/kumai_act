<template>
  <div class="share">
    <div class="header" :class="iponeX">
      <!--  -->
      <!-- <i class="black" @click="closeWeb()"></i>邀請好友 -->
    </div>
    <div class="singInDay" :class="{mHeigth:type==2}">
      <div class="userMsg" v-if="type==2">
        <div class="userAv">
          <img v-lazy="master.headImg" alt="" class="av">
          <strong>{{master.nick}}</strong>
        </div>
        <div class="userTips">{{lang.share_day.replace('$',days)}}</div>
      </div>
      <strong v-html=" lang.share_threeDay.replace('$',days)" v-else>

      </strong>
    </div>
    <SharePeople :type="type" :list="list" :leftTime="leftTime" ref="sharePeople" />
    <div class="shareTips">
      <div class="shareBtn" v-if="isOver ||leftTime<=0">{{lang.share_tmor}}</div>
      <div class="shareBtn" @click="share()" v-else> {{type==2?lang.share_help:lang.share_shareFriend}} </div>
      <p class="verTips" v-if="type==2">{{lang.share_tips1}}</p>
      <div class="tips">
        <h6>{{lang.share_tips2}}</h6>
        <p>{{lang.share_tips3}} </br>
          {{lang.share_tips4}} </br>
          {{lang.share_tips5}}</br>
          {{lang.share_tips6}}</p>
      </div>
      <!-- <div class="tips" v-else>
        <h6>{{lang.share_tips2}}</h6>
        <p>{{lang.share_tips3}}</p>
        <p>{{lang.share_tips4}}</p>
        <p>3、需要更新新版本，才可成功助力</p>
        <p>4、助力需要限時完成，超出時間後無法助力，需明天重新發起邀請</p>
      </div> -->
    </div>
    <!-- <Loading /> -->
  </div>
</template>
<script>
import SharePeople from "./SharePeople"
import { getUrlString } from "../utils"
import APP from "../utils/openApp"
import api from "../apis"
import { mapState } from "vuex"
export default {
  components: { SharePeople },
  data() {
    return {
      type: null,
      inviteCode: null,
      master: {},
      list: [],
      days: null,
      leftTime: 0
    }
  },
  computed: {
    ...mapState(['isOver']),
    iponeX() {
      // var u = navigator.userAgent;
      // var isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
      // if (isIOS) {
      //   if (screen.height == 812 && screen.width == 375) {
      //     return `iponeX`
      //   } else {
      //     return false
      //   }
      // }
      if (/IOS/gi.test(navigator.userAgent) && (screen.height == 812 && screen.width == 375)) {
        return `iponeX`
      }
      return false
    }
  },
  created() {
    document.title = this.lang.share_title
    this.type = getUrlString('type')
    let shareInviteCode = getUrlString('inviteCode')
    if (shareInviteCode) {
      this.inviteCode = shareInviteCode
      api.queryShre(this.inviteCode).then(res => {
        if (res.data.response_data.master) {
          const { master, list, days, leftTime } = res.data.response_data
          this.master = master
          this.list = list
          this.days = days
          this.leftTime = leftTime
        } else {
          this.toast(res.data.response_status.error)
        }
      })
    } else {
      api.gerKey().then(res => {
        this.inviteCode = res.data.response_data.key
        api.queryShre(this.inviteCode).then(res => {
          if (res.data.response_data.master) {
            const { master, list, days, leftTime, timestamp } = res.data.response_data
            this.master = master
            this.list = list
            this.days = days
            if (new Date(timestamp * 1000).getHours() < 21) {
              this.leftTime = leftTime
            } else {
              this.leftTime = 0
              this.vxc('setIsOver', true)
            }
          } else {
            this.toast(res.data.response_status.error)
          }
        })
      })
    }
  },
  methods: {
    share() {
      if (this.type == 2) {
        APP(`hsing://17sing.tw/{"inviteCode":"${this.inviteCode}"}`, null, null, `Gaoge://inviteCode=${this.inviteCode}`)
      } else {
        var ios = navigator.userAgent.match(/iPhone|iPod|ios|iPad/i);
        var ua = navigator.userAgent;
        let token = getUrlString("token")
        let uid = getUrlString("uid")
        var data = {
          "share_title": this.lang.share_signDays.replace('$', this.days),
          "share_content": this.lang.share_con.replace('$', this.days),
          "share_image": this.master.headImg,
          "link": `http://17sing.tw/singIn_tw_new/html/index3.php?inviteCode=${this.inviteCode}&type=2`,
          "image": this.master.headImg,
          "share_url": `http://17sing.tw/singIn_tw_new/html/index3.php?inviteCode=${this.inviteCode}&type=2`
        }
        if (ios) {
          if (window.shareOutside != undefined) {
            shareOutside(JSON.stringify(data))
          } else {
            location.href = `shareUserInfo://17sing.tw/singIn_tw_new/html/index3.php?inviteCode=${this.inviteCode}&type=2&shareText=${this.lang.share_con.replace('$', this.days)}&userImg=${this.master.headImg}&title=${this.lang.share_signDays.replace('$', this.days)}`;
          }
        } else {
          javascript: JSInterface.shareOutside(JSON.stringify(data));
        }
      }
    },
    closeWeb() {
      var u = navigator.userAgent;
      var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
      var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
      try {
        if (isAndroid) {
          window.JSInterface.closeWeb();
        } else {
          closeWeb();
        }
      } catch (e) {

      }
    }
  }
}
</script>
<style lang="scss" scoped>
body {
  background: #f2f2f2 url("../img/shareBg.png") no-repeat;
  background-size: 100% auto;
  .share {
    .header {
      height: 1.18rem;
      line-height: 1.18rem;
      font-size: 0.36rem;
      text-align: center;
      position: relative;
      .black {
        display: block;
        width: 0.18rem;
        height: 0.32rem;
        background: url(../img/bArr.png);
        background-size: 100% 100%;
        position: absolute;
        left: 0.28rem;
        top: 0.28rem;
      }
      &.iponeX {
        height: 1.6rem;
        line-height: 1.6rem;
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
// @import "../../assets/scss/common.scss";
</style>
