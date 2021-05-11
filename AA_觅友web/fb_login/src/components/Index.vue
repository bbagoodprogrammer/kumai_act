<template>
  <div class="page pageIndex">
    <!-- <div class="fb-login-button" data-width="" data-size="large" data-button-type="continue_with" data-layout="default" data-auto-logout-link="false" data-use-continue-as="true"></div> -->
    <div class="loginBtn" @click="login()">開始賬號找回</div>
    <div id="status">
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    login () {
      FB.login(function (response) {
        console.log(response)
        // handle the response 
      });
    }
  }
}
</script>

<style lang="scss">
.pageIndex {
  .loginBtn {
    width: 5rem;
    height: 0.88rem;
    background: linear-gradient(90deg, #7A68F8 0%, #9585FF 100%);
    border-radius: 0.44rem;
    text-align: center;
    line-height: 0.88rem;
    margin: 0 auto;
  }
  img {
    display: block;
    width: 100%;
  }
}
</style>