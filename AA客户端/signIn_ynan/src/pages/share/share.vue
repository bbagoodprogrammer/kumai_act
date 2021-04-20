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
        <div class="userTips">Liên tục điểm danh {{days}} ngày, cần bạn hỗ trợ, mau hỗ trợ nhé</div>
      </div>
      <strong v-else>
        Bạn liên tục điểm danh {{days}} ngày</br>
        Mời thành công 3 bạn bè hỗ trợ sẽ thêm 1 lần lật bài
      </strong>
    </div>
    <SharePeople :type="type" :list="list" :leftTime="leftTime" ref="sharePeople" />
    <div class="shareTips">
      <div class="shareBtn" v-if="isOver ||leftTime<=0">Mời mai thử lại</div>
      <div class="shareBtn" @click="share()" v-else> {{type==2?'Hỗ trợ ngay':'Mời bạn bè ngay'}} </div>
      <p class="verTips" v-if="type==2">Hỗ trợ cần cập nhật bản mới nhất</p>
      <div class="tips" v-if="type==2">
        <h6>Thể lệ hỗ trợ</h6>
        <p>1. Không thể hỗ trợ chính mình</br>
          2. Mỗi người mỗi ngày chỉ được hỗ trợ người khác 1 lần</br>
          3. Cần cập nhật bản mới nhất mới có thể hỗ trợ</br>
          4. Cần hỗ trợ trong thời hạn quy định, quá hạn không thể hỗ trợ, cần mời lại vào hôm sau
        </p>
      </div>
      <div class="tips" v-else>
        <h6>Thể lệ hỗ trợ</h6>
        <p>1. Không thể hỗ trợ chính mình</p>
        <p>2. Mỗi người mỗi ngày chỉ được hỗ trợ người khác 1 lần</p>
        <p>3. Cần cập nhật bản mới nhất mới có thể hỗ trợ</p>
        <p>4. Cần hỗ trợ trong thời hạn quy định, quá hạn không thể hỗ trợ, cần mời lại vào hôm sau</p>
      </div>
    </div>
    <Loading />
  </div>
</template>
<script>
import SharePeople from "../../components/SharePeople"
import getString from "../../utils/getString"
import APP from "../../utils/openApp"
import Loading from "../../components/Loading"
import api from "../../api/apiConfig"
import { mapState } from "vuex"
export default {
  components: { SharePeople, Loading },
  data () {
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
    iponeX () {
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
  created () {
    document.title = 'Mời bạn bè'
    this.type = getString('type')
    let shareInviteCode = getString('inviteCode')
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
    share () {
      const scheme = getString('app') == 'singall' ? 'HatKara' : getString('app')
      if (this.type == 2) {
        APP(`singnowapp://singnowapp.com/{"inviteCode":"${this.inviteCode}"}`, null, null, `${scheme}://inviteCode=${this.inviteCode}`)
      } else {
        var ios = navigator.userAgent.match(/iPhone|iPod|ios|iPad/i);
        var ua = navigator.userAgent;
        let token = getString("token")
        let uid = getString("uid")
        var data = {
          "share_title": `Đã điểm danh liên tục ${this.days} ngày`,
          "share_content": `Tôi đã điểm danh liên tục ${this.days} ngày, được lật bài nhận thưởng, cần bạn hỗ trợ, mau đến ngay`,
          "share_image": this.master.headImg,
          "link": `http://singnowapp.com/singIn_ynan_new/html/index3.php?inviteCode=${this.inviteCode}&type=2`,
          "image": this.master.headImg,
          "share_url": `http://singnowapp.com/singIn_ynan_new/html/index3.php?inviteCode=${this.inviteCode}&type=2`
        }
        if (ios) {
          if (window.shareOutside != undefined) {
            shareOutside(JSON.stringify(data))
          } else {
            location.href = `shareUserInfo://singnowapp.com/singIn_ynan_new/html/index3.php?inviteCode=${this.inviteCode}&type=2&shareText=Tôi đã điểm danh liên tục ${this.days} ngày, được lật bài nhận thưởng, cần bạn hỗ trợ, mau đến ngay&userImg=${this.master.headImg}&title=Đã điểm danh liên tục ${this.days} ngày`;
          }
        } else {
          javascript: JSInterface.shareOutside(JSON.stringify(data));
        }
      }
    },
    closeWeb () {
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
<style lang="scss">
body {
  background: #f2f2f2 url('../../assets/img/shareBg.png') no-repeat;
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
        background: url(../../assets/img/bArr.png);
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
@import '../../assets/scss/common.scss';
</style>
