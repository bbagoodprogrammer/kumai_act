<template>
  <div class="page pageIndex">
    <div class="init" v-if="type == 1">
      <img src="../img/fb_Img.png" alt="" class="fbImg">
      <h3>{{lang.fb_rebinding}}</h3>
      <p>{{lang.fb_rebinding_tip1}}</p>
      <p>{{lang.fb_rebinding_tip2}}</p>
      <!-- <div class="fb-login-button" data-width="" data-size="large" data-button-type="continue_with" data-layout="default" data-auto-logout-link="false" data-use-continue-as="true"></div> -->
      <div class="loginBtn" @click="login()">{{lang.retrieve_uid}}</div>
      <p class="tips" v-html="lang.suc_tips1"></p>
      <div class="lastTips">{{lang.last_tips1}}</div>
    </div>
    <div class="type_2" v-else-if="type == 2 || type == 3 || type == 4">
      <div class="topB_Bg" :class="{type_4:type== 4}">
        <div class="userMsg" v-if="type == 2 || type ==3">
          <img v-lazy="avatar" alt="" class="userAv">
          <div class="userNick">{{nick}}</div>
          <div class="userUid">uid {{uid}}</div>
        </div>
        <div class="binding" v-if="type== 2">
          <div class="go" @click="bind()">{{lang.re_bind}}</div>
          <p class="tips" v-html="lang.re_bind_tips"></p>
        </div>
        <div class="lockTips" v-else-if="type == 3" v-html="lang.binded_tips1" @click="em_click($event)">
          <!-- 該賬戶已被綁定，<br />
          請聯繫<em @click="goUser()">uid10</em> -->
        </div>
        <div class="noAccount" v-else-if="type == 4" v-html="lang.binded_tips2" @click="em_click($event)">
          <!-- 未檢測到有舊賬號哦！<br />
          重試或聯繫<em @click="goUser()">uid10</em> -->
        </div>
      </div>
      <div class="again" @click="type = 1">
        {{lang.binded_tips3}}
      </div>
    </div>
    <div class="type_3" v-else-if="type == 5">
      <img src="../img/login_suc.png" alt="" class="login_suc">
      <p class="suc_title">{{lang.bind_suc_tips1}}</p>
      <p class="suc_tips" v-html="lang.bind_suc_tips2"></p>
    </div>
    <div id="status"></div>
  </div>
</template>

<script>
import { getFbInfo, againBind } from "../apis"
import { getDeviceId, getUrlString } from "../utils"
import axios from "axios";
const isIOS = navigator.userAgent.match(/iPhone|iPod|ios|iPad/i);
export default {
  data () {
    return {
      type: 5,  // 1 初始FB登錄頁面 2登錄后找到賬號未綁定 3FB登陸後找到賬號已綁定 4找不到賬號 5綁定成功提示
      //   type_title: {
      //     1: '\u200E',
      //     2: '已找到原來綁定的uid',
      //     3: 'Facebook賬號找回',
      //     4: '未找到已綁定uid',
      //     5: 'Facebook賬號找回'
      //   },
      uid: '',
      avatar: '',
      nick: '',
      token: '',
      oldToken: ''
    }
  },
  watch: {
    type (val) {
      document.title = this.type_title[val]
    }
  },
  computed: {
    // accessToken () {
    //   return window.accessToken || ''
    // },
    // userID () {
    //   return window.userID || ''
    // },
    type_title () {
      return this.lang.type_title
    }
  },
  created () {
    let fb1uid = getUrlString("fb1uid") || "";
    if (fb1uid) {
      if (fb1uid > 0) {
        getFbInfo(fb1uid).then(res => {
          if (res.data.response_data) {
            const { oldToken, token, avatar, nick, uid, fb2status } = res.data.response_data
            this.oldToken = oldToken
            this.token = token
            this.avatar = avatar
            this.nick = nick
            this.uid = fb1uid
            if (fb2status) {
              this.type = 3
            } else {
              this.type = 2
            }
          }
          //   else {
          //     this.toast(res.data.response_status.error)
          //   }
        })
      } else if (fb1uid == -3) {
        this.type = 4
      } else {
        this.toast(this.lang.err_tips)
      }
    }
  },
  methods: {
    login () {
      // if (!this.accessToken) {
      const uid = getUrlString("uid") || "";
      const token = getUrlString("token") || "";
      let client_id = AREA == 'vn' ? "1418697961633279" : "402501240591895"
      let redirect_uri = AREA == 'vn' ? `https://act.chatstarapp.com/index.php?action=login.fb1Login` : `https://act.udateapp.com/index.php?action=login.fb1Login`;//获取Facebook用户信息后回调地址,客户服务器的链接（此处为示例）
      let state = JSON.stringify({
        uid, token, client_id
      })
      location.href = `https://www.facebook.com/v10.0/dialog/oauth?client_id=${client_id}&redirect_uri=${encodeURIComponent(redirect_uri)}&state=${state}`
      // const lang = getUrlString("lang") || "";
      // let client_id = isIOS ? "402501240591895" : "532601534077009"
      // let redirect_uri = `https://act.udateapp.com/html/fb_login/index.html`;//获取Facebook用户信息后回调地址,客户服务器的链接（此处为示例）
      // let state = btoa(JSON.stringify({
      //   uid, token, lang
      // }))
      // location.href = `https://www.facebook.com/v10.0/dialog/oauth?client_id=${client_id}&redirect_uri=${encodeURIComponent(redirect_uri)}&state=${state}`
      //   } else {
      //     this.loginBg()
      //   }
      //PC版FB登陆
      //   FB.login(response => {
      //     alert(response.status)
      //     if (response.status === "connected") { //已登錄
      //       alert(`${response.authResponse.userID},${response.authResponse.accessToken}`)
      //       let devId = getDeviceId() || ''
      //       loginBg(devId, response.authResponse.userID, response.authResponse.accessToken).then(res => {
      //         if (res.data.response_status.code == 0) {
      //           const { uid, avatar, nick, token } = res.data.response_data
      //           alert(uid)
      //           if (uid) {
      //             this.uid = uid
      //             this.avatar = avatar
      //             this.nick = nick
      //             this.token = token
      //             this.type = 2
      //           } else {
      //             this.type = 4
      //           }
      //         } else {
      //           this.toast(res.data.response_status.error)
      //         }
      //       })
      //     } else {
      //       this.toast(this.lang.login_fail)
      //     }
      //     // handle the response 
      //   });
    },
    // loginBg () {
    //   let devId = getDeviceId() || ''
    //   //let devId = ''
    //   loginBg(devId, this.userID, this.accessToken).then(res => {
    //     if (res.data.response_data) {
    //       const { uid, avatar, nick, token, fb2status } = res.data.response_data
    //       console.log(uid)
    //       if (uid) {
    //         this.uid = uid
    //         this.avatar = avatar
    //         this.nick = nick
    //         this.token = token
    //         if (!fb2status) {
    //           this.type = 2
    //         } else {
    //           this.type = 3
    //         }

    //       } else {
    //         this.type = 4
    //       }
    //     } else {
    //       this.toast(res.data.response_status.error)
    //     }
    //   })
    // },
    bind () {
      againBind(this.oldToken, this.token).then(res => {
        if (res.data.response_data) {
          this.type = 5
          if (isIOS) {
            sendJsData('app://logout');
          } else {
            javascript: JSInterface.sendJsData('app://logout');
          }
        } else {
          this.toast(this.lang.bind_fail)
        }
      })
    },
    em_click (event) {
      if (event.target.nodeName === 'EM') {
        this.goUser()
      }
    },
    goUser () { //跳转
      if (isIOS) {
        sendJsData('app://userInfo?uid=' + 10);
      } else {
        javascript: JSInterface.sendJsData('app://userInfo?uid=' + 10);
      }
    },
  }
}
</script>

<style lang="scss">
.pageIndex {
  .fbImg {
    width: 1.36rem;
    height: 1.36rem;
    margin: 0 auto 0;
  }
  .loginBtn {
    width: 5rem;
    height: 0.88rem;
    background: linear-gradient(90deg, #7A68F8 0%, #9585FF 100%);
    border-radius: 0.44rem;
    text-align: center;
    line-height: 0.88rem;
    margin: 0.92rem auto 0;
  }
  .init {
    padding-top: 1.67rem;
    img {
      display: block;
    }
    h3 {
      padding: 0 1.2rem;
      height: 0.45rem;
      font-size: 0.32rem;
      font-weight: 600;
      line-height: 0.45rem;
      color: #2C2B36;
      text-align: center;
      margin: 0.4rem 0 0.24rem;
    }
    > p {
      margin: 0 auto;
      width: 6.5rem;
      min-height: 0.8rem;
      font-size: 0.28rem;
      font-family: PingFang SC;
      line-height: 0.4rem;
      color: #2C2B36;
      text-align: center;
      margin-bottom: 0.2rem;
    }
    .tips {
      margin-top: 0.6rem;
      font-size: 0.28rem;
      color: rgba(255, 81, 85, 1);
      line-height: 0.4rem;
    }
    .lastTips {
      width: 100%;
      text-align: center;
      font-size: 0.26rem;
      color: rgba(188, 187, 199, 1);
      position: absolute;
      bottom: 0.41rem;
    }
  }
  .type_2 {
    padding-top: 0.98rem;
    .topB_Bg {
      width: 6.7rem;
      min-height: 3.84rem;
      background: rgba(122, 104, 248, 0.04);
      border-radius: 0.3rem;
      margin: 0 auto;
      position: relative;
      padding-top: 1.14rem;
      &.type_4 {
        margin: 0.3rem auto 0;
      }
      .userAv {
        display: block;
        width: 1.48rem;
        height: 1.48rem;
        border-radius: 50%;
        position: absolute;
        left: 2.61rem;
        top: -0.5rem;
      }
      .userNick {
        max-width: 1.48rem;
        height: 0.45rem;
        font-size: 0.32rem;
        font-weight: 600;
        line-height: 0.48rem;
        color: #2C2B36;
        text-align: center;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        margin: 0 auto 0.02rem;
      }
      .userUid {
        width: 1.48rem;
        height: 0.33rem;
        font-size: 0.24rem;
        line-height: 0.48rem;
        color: #8C8995;
        margin: 0 auto;
        text-align: center;
      }
      .go {
        width: 3.3rem;
        height: 0.88rem;
        background: linear-gradient(90deg, #7A68F8 0%, #9585FF 100%);
        border-radius: 0.44rem;
        text-align: center;
        line-height: 0.88rem;
        margin: 0.56rem auto 0;
      }
      .tips {
        margin: 0.4rem 0;
        font-size: 0.28rem;
        color: rgba(255, 81, 85, 1);
        line-height: 0.4rem;
        text-align: center;
      }
    }
    .lockTips,
    .noAccount {
      font-size: 0.28rem;
      color: #FF5155;
      text-align: center;
      margin-top: 1.12rem;
      em {
        font-size: 0.28rem;
        color: #7A68F8;
      }
    }
    .noAccount {
      margin-top: 0.95rem;
    }
    .again {
      width: 5rem;
      height: 0.8rem;
      background: rgba(122, 104, 248, 0.06);
      border-radius: 0.44rem;
      color: rgba(122, 104, 248, 1);
      text-align: center;
      line-height: 0.8rem;
      font-size: 0.28rem;
      //   margin: 4.5rem auto 0;
      position: absolute;
      left: 1.25rem;
      bottom: 0.8rem;
    }
  }
  .type_3 {
    padding-bottom: 0.25rem;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    .login_suc {
      display: block;
      width: 2.16rem;
      height: 2.16rem;
      margin: 0 auto;
    }
    .suc_title {
      height: 0.45rem;
      line-height: 0.48rem;
      font-size: 0.32rem;
      color: #2C2B36;
      font-weight: 600;
      text-align: center;
      margin-top: 0.11rem;
    }
    .suc_tips {
      width: 5.74rem;
      height: 0.8rem;
      font-size: 0.28rem;
      line-height: 0.4rem;
      text-align: center;
      color: #5C5B67;
      margin: 0.1rem auto 0;
    }
  }
  .status {
    position: absolute;
    left: -10000rem;
  }
}
</style>