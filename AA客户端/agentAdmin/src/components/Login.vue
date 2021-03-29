<template>
  <div class="page pageIndex">
    <!-- <i class="logo"></i> -->
    <img src="../img/logo.png" alt="" class="logo">
    <div class="loginCon">
      <img src="../img/login_bg.png" alt="" class="login_bg">
      <div class="login_input">
        <div class="login_title">
          Agent login
        </div>
        <input type="text" v-model="userAccount" placeholder="Account/Uid" class="userAccount">
        <input type="password" v-model="userPassword" placeholder="Password" class="userPassword">
        <div class="login_btn">LOGIN</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      userAccount: '',
      userPassword: ''
    }
  }
}
</script>

<style lang="scss" scoped>
body {
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
        width: 240px;
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
        width: 240px;
        height: 40px;
        background: #7E36FF;
        border-radius: 4px;
        margin-top: 30px;
        text-align: center;
        line-height: 40px;
        color: #fff;
      }
      .login_btn:hover {
        background: #8D4DFF;
      }
    }
  }
}
</style>