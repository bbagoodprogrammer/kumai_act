<template>
  <div class="page pageIndex login_html" onselectstart="return false;" v-loading.fullscreen.lock="fullscreenLoading">
    <!-- <i class="logo"></i> -->
    <img src="../img/logo.png" alt="" class="logo">
    <div class="loginCon">
      <img src="../img/login_bg.png" alt="" class="login_bg">
      <div class="login_input">
        <div class="login_title">
          AGENT LOGIN
        </div>
        <input type="text" v-model="userAccount" placeholder="Account/Uid" class="userAccount">
        <input type="password" v-model="userPassword" placeholder="Password" class="userPassword">
        <div class="login_btn" @click="login()">LOGIN</div>
        <div class="errTips">{{errStr}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { login } from "../apis"

export default {
  data () {
    return {
      userAccount: '',
      userPassword: '',
      errStr: '',
      fullscreenLoading: false
    }
  },
  created () {
    this.keyupSubmit();
    window.getSelection ? window.getSelection().removeAllRanges() : document.selection.empty();
  },
  methods: {
    login () {
      this.errStr = ''
      if (!this.userAccount) {
        this.errStr = `account is empty`
        return
      } else if (!this.userPassword) {
        this.errStr = `password is empty`
        return
      }
      this.fullscreenLoading = true
      login(this.userAccount, this.userPassword).then(res => {
        this.fullscreenLoading = false
        if (res.data.response_status.code == 0) {
          const token = res.data.response_data.token
          const aid = res.data.response_data.aid
          const nick = res.data.response_data.nick
          //   this.$router.push({ path: '/admin', query: { token, aid } })
          location.href = `./index.html?token=${token}&aid=${aid}&nick=${nick}#/admin`
        } else {
          this.errStr = res.data.response_status.error
        }
      })
    },
    keyupSubmit () {
      document.onkeydown = (e) => {
        let _key = window.event.keyCode;
        //!this.clickState是防止用户重复点击回车
        if (_key === 13 && !this.clickState) {
          this.login();
        }
      };
    },
  }
}
</script>

<style lang="scss" scoped>
body {
  background: rgba(63, 18, 87, 1);
}
.login_html {
  background: rgba(63, 18, 87, 1);
}
.logo {
  width: 158px;
  height: 48px;
  position: absolute;
  top: 30px;
  left: 50px;
}
.pageIndex {
  //   padding: $page-padding;
  display: flex;
  align-items: center;
  justify-content: center;
  .loginCon {
    width: 540px;
    height: 350px;
    background: #FFFFFF;
    border-radius: 10px;
    display: flex;
    margin-top: -65px;
    .login_bg {
      width: 220px;
      height: 350px;
    }
    .login_input {
      padding: 0 40px;
      .login_title {
        font-size: 24px;
        font-weight: bold;
        color: rgba(126, 54, 255, 1);
        margin-top: 58px;
      }
      .userAccount,
      .userPassword {
        width: 215px;
        height: 40px;
        background: #FFFFFF;
        border: 1px solid #DDDDDD;
        border-radius: 4px;
        padding: 0 0.11rem 0 0.14rem;
        color: rgba(112, 112, 112, 1);
        font-size: 14px;
      }
      .userAccount {
        margin: 0.4rem 0 0.2rem;
      }
      input::placeholder {
        font-size: 14px;
        color: #ccc;
      }
      input[type='password'] {
        // letter-spacing: 0.5px;
        // font-size: 32px;
        // line-height: 1;
        color: rgba(18, 18, 18, 1);
      }
      .login_btn {
        cursor: default;
        user-select: none;
        width: 240px;
        height: 40px;
        background: #7E36FF;
        border-radius: 4px;
        margin-top: 30px;
        text-align: center;
        line-height: 40px;
        color: #fff;
        font-size: 14px;
      }
      .login_btn:hover {
        background: #8D4DFF;
      }
      .login_btn:active {
        background: #7E36FF;
      }
      .errTips {
        font-size: 14px;
        text-align: center;
        color: #F65939;
        margin-top: 10px;
      }
    }
  }
}
@media screen and (max-width: 750px) {
  .logo {
    display: none;
  }
}
</style>