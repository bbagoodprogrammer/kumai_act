<template>
  <div class="page pageIndex">
    <div class="init" v-if="type == 1">
      <img src="../img/fb_Img.png" alt="" class="fbImg">
      <h3>FB重新綁定</h3>
      <p>由於FB協議變更，部分用戶的FB賬號與uid已解綁，使用FB登入時，會創建全新的uid。</p>
      <p>出現FB登入到新uid的用戶，可通過此頁面找回舊uid，並重新綁定</p>
      <!-- <div class="fb-login-button" data-width="" data-size="large" data-button-type="continue_with" data-layout="default" data-auto-logout-link="false" data-use-continue-as="true"></div> -->
      <div class="loginBtn" @click="login()">找回uid</div>
      <p class="tips">*在成功找回舊賬號後，<br />當前登錄的新賬號將會被註銷</p>
      <p class="lastTips">為了你的賬戶安全，本鏈接請勿分享予他人</p>
    </div>
    <div class="type_2" v-else-if="type == 2 || type == 3 || type == 4">
      <div class="topB_Bg">
        <div class="userMsg" v-if="type == 2 || type ==3">
          <img v-lazy="avatar" alt="" class="userAv">
          <div class="userNick">{{nick}}</div>
          <div class="userUid">uid {{uid}}</div>
        </div>
        <div class="binding" v-if="type== 2">
          <div class="go" @click="bind()">重新綁定</div>
          <p class="tips">*重新綁定後，FB可登入舊有uid<br />已創建的新uid將註銷。請謹慎操作</p>
        </div>
        <div class="lockTips" v-else-if="type == 3">
          該賬戶已被綁定，<br />
          請聯繫<em @click="goUser()">uid10</em>
        </div>
        <div class="noAccount" v-else-if="type == 4">
          未檢測到有舊賬號哦！<br />
          重試或聯繫<em @click="goUser()">uid10</em>
        </div>
      </div>
      <div class="again" @click="type = 1">
        賬號錯了，重新找回
      </div>
    </div>
    <div class="type_3" v-else-if="type == 5">
      <img src="../img/login_suc.png" alt="" class="login_suc">
      <p class="suc_title">賬戶成功找回</p>
      <p class="suc_tips">重新登錄後即可使用原賬號<br />補償稍後會發送到</p>
    </div>
    <div id="status"></div>
  </div>
</template>

<script>
import { loginBg, againBind } from "../apis"
import { getDeviceId, getUrlString } from "../utils"
import axios from "axios";
const isIOS = navigator.userAgent.match(/iPhone|iPod|ios|iPad/i);
export default {
  data () {
    return {
      type: 1,  // 1 初始FB登錄頁面 2登錄后找到賬號未綁定 3FB登陸後找到賬號已綁定 4找不到賬號 5綁定成功提示
      type_title: {
        1: '\u200E',
        2: '已找到原來綁定的uid',
        3: 'Facebook賬號找回',
        4: '未找到已綁定uid',
        5: 'Facebook賬號找回'
      },
      uid: '',
      avatar: '',
      nick: '',
      token: '',
    }
  },
  watch: {
    type (val) {
      document.title = this.type_title[val]
    }
  },
  computed: {
    accessToken () {
      return window.accessToken || ''
    },
    userID () {
      return window.userID || ''
    }
  },
  created () {
    let state = getUrlString("state") || "";
    if (state) {
      let userMsg = JSON.parse(atob(state))
      location.href = `https://act.udateapp.com/html/fb_login/index.html?uid=${userMsg.uid}&token=${userMsg.token}&lang=${userMsg.lang}`
    }
  },
  methods: {
    login () {
      if (!this.accessToken) {
        const uid = getUrlString("uid") || "";
        const token = getUrlString("token") || "";
        const lang = getUrlString("lang") || "";
        let client_id = isIOS ? "402501240591895" : "532601534077009"
        let redirect_uri = `https://act.udateapp.com/html/fb_login/index.html`;//获取Facebook用户信息后回调地址,客户服务器的链接（此处为示例）
        let state = btoa(JSON.stringify({
          uid, token, lang
        }))
        // console.log(`https://www.facebook.com/v10.0/dialog/oauth?client_id=${client_id}&redirect_uri=${encodeURIComponent(redirect_uri)}&state=${state}`)
        // debugger
        location.href = `https://www.facebook.com/v10.0/dialog/oauth?client_id=${client_id}&redirect_uri=${encodeURIComponent(redirect_uri)}&state=${state}`
      } else {
        this.loginBg()
      }
      //PC版FB登陆
      // FB.login(function (response) {
      //   alert(response.status)
      //   if(response.status === "connected"){ //已登錄
      //   alert(`${response.authResponse.userID},${response.authResponse.accessToken}`)
      //      let  devId = getDeviceId() || ''
      //       loginBg(devId,response.authResponse.userID,response.authResponse.accessToken).then(res=>{
      //         if(res.data.response_status.code == 0){
      //             const {uid,avatar,nick,token}  = res.data.response_data
      //             alert(uid)
      //             if(uid){
      //               this.uid = uid
      //               this.avatar = avatar
      //               this.nick = nick
      //               this.token = token
      //               this.type = 2
      //             }else{
      //               this.type = 4
      //             }
      //         }else{
      //            this.toast(res.data.response_status.error)
      //         }
      //       })
      //   }else{
      //     this.toast(`登錄失敗`)
      //   }
      //   // handle the response 
      // });
    },
    loginBg () {
      let devId = getDeviceId() || ''
      //let devId = ''
      loginBg(devId, this.userID, this.accessToken).then(res => {
        if (res.data.response_data) {
          const { uid, avatar, nick, token, fb2status } = res.data.response_data
          console.log(uid)
          if (uid) {
            this.uid = uid
            this.avatar = avatar
            this.nick = nick
            this.token = token
            if (!fb2status) {
              this.type = 2
            } else {
              this.type = 3
            }

          } else {
            this.type = 4
          }
        } else {
          this.toast(res.data.response_status.error)
        }
      })
    },
    bind () {
      againBind(this.token).then(res => {
        if (res.data.response_data) {
          this.type = 5
          if (isIOS) {
            sendJsData('app://logout');
          } else {
            javascript: JSInterface.sendJsData('app://logout');
          }
        } else {
          this.toast(`綁定失敗，請稍後再試！`)
        }
      })
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
    margin: 1.67rem auto 0;
  }
  .loginBtn {
    width: 5rem;
    height: 0.88rem;
    background: linear-gradient(90deg, #7A68F8 0%, #9585FF 100%);
    border-radius: 0.44rem;
    text-align: center;
    line-height: 0.88rem;
    margin: 0.72rem auto 0;
  }
  .init {
    img {
      display: block;
    }
    h3 {
      height: 0.45rem;
      font-size: 0.32rem;
      font-weight: 600;
      line-height: 0.7rem;
      color: #2C2B36;
      text-align: center;
      margin: 0.4rem 0 0.24rem;
    }
    p {
      margin: 0 auto;
      width: 6.5rem;
      height: 0.8rem;
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
      font-size: 0.26rem;
      color: rgba(188, 187, 199, 1);
      margin-top: 2.16rem;
    }
  }
  .type_2 {
    .topB_Bg {
      width: 6.7rem;
      height: 3.84rem;
      background: rgba(122, 104, 248, 0.04);
      border-radius: 0.3rem;
      margin: 0.98rem auto 0;
      position: relative;
      padding-top: 1.14rem;
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
        margin-top: 0.6rem;
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
      margin: 4.5rem auto 0;
    }
  }
  .type_3 {
    .login_suc {
      display: block;
      width: 2.16rem;
      height: 2.16rem;
      margin: 3.52rem auto 0;
    }
    .suc_title {
      height: 0.45rem;
      line-height: 0.48rem;
      font-size: 0.32rem;
      color: #2C2B36;
      font-weight: 600;
      text-align: center;
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