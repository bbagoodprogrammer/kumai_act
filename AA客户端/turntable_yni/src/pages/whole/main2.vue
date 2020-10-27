<template>
  <div id="box">
    <div class="turnHeader">
      <div class="tabs">
        <span class="trun" :class="{act:shoCom=='Trun'}" @click="tabClick('Trun')">Roda Lucky</span>
        <span class="trunBox" :class="{act:shoCom=='Box'}" @click="tabClick('Box')">Peti harta kejutan</span>
        <i class="boxNum"> {{userMsg.lock_box>99?'···':userMsg.lock_box}}</i>
      </div>
    </div>
    <rool-msg :roolmsg="roolmsg"></rool-msg>
    <keep-alive>
      <component :is="shoCom"></component>
    </keep-alive>
    <Footer :type="2"></Footer>
    <Loading />
  </div>
</template>

<script>
import RoolMsg from "../../components/RoolMsg"
import Trun from "../../components/Trun"
import Box from "../../components/Box"
import Footer from "../../components/Footer"
import api from "../../api/apiConfig"
import Loading from "../../components/Loading"
import { mapState } from "vuex"
export default {
  components: { RoolMsg, Trun, Box, Footer, Loading },
  data() {
    return {
      shoCom: 'Trun',
      roolmsg: "",
    }
  },
  created() {
    window.addEventListener("pageshow", function () {
      if (sessionStorage.getItem("need-refresh")) {
        location.reload();
        sessionStorage.removeItem("need-refresh");
      }
    });
    this.getDefaultData()
  },
  computed: {
    ...mapState(["userMsg"])
  },
  mounted() {
    window.onload = () => {
      let mainHeight = document.getElementById('box').clientHeight
      this.$store.commit('setMainHeight', mainHeight)
      sessionStorage.setItem('pupHeight', mainHeight)
    }
  },
  methods: {
    getDefaultData() {
      api.getDefault(0).then(res => {
        const { response_data, response_status } = res.data
        this.roolmsg = response_data.top_record   //弹幕信息
        this.$store.commit('changGift_list', response_data.gift_list)  //转盘礼物配置
        this.$store.commit('changUserMsg', response_data.user_wallet)    //个人信息
        this.$store.commit('setVersion', response_data.is_ok_version)   //新舊版本標識
        sessionStorage.setItem('user_wallet', JSON.stringify(response_data.user_wallet))   //頁面用
        // this.userMsg = response_data.user_wallet
        this.$store.commit('setOpenType', 2)
      })
    },
    tabClick(val) {
      this.shoCom = val
      this.$store.commit('changShoCom', val)
      // let boxGiftList = sessionStorage.getItem('boxGiftBox')
      // if (val == 'Box' && !boxGiftList) {
      //   api.getDefault(1).then(res => {
      //     const { response_data, response_status } = res.data
      //     sessionStorage.setItem('boxGiftBox', JSON.stringify(response_data.gift_list))
      //     this.shoCom = val
      //     this.$store.commit('changShoCom', val)
      //   })
      // } else {
      //   this.shoCom = val
      //   this.$store.commit('changShoCom', val)
      // }
    },
  }
}
</script>

<style lang="scss">
body {
  width: 100%;
  height: 100%;
}
#box {
  max-width: 750px;
  width: 100%;
  height: 100%;
  position: absolute;
  overflow-x: hidden;
  background: url(../../assets/img/wholeBg.png) center 0 no-repeat;
  background-size: 100% 100%;
  .turnHeader {
    height: 1rem;
    border-bottom: 0.01rem solid #837cff;
    position: relative;
    .tabs {
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 1rem;
      span {
        flex: 1;
        height: 1rem;
        line-height: 1rem;
        font-size: 120%;
        font-weight: 600;
        text-align: center;
        position: relative;
      }
      .boxNum {
        width: 0.32rem;
        height: 0.32rem;
        padding: 0.01rem;
        line-height: 0.34rem;
        background: rgba(255, 86, 34, 1);
        border: 0.02rem solid rgba(255, 255, 255, 1);
        font-size: 70%;
        border-radius: 50%;
        position: absolute;
        top: 0.15rem;
        right: 0.16rem;
        text-align: center;
        color: #fff !important;
      }
      .act {
        color: #fef129;
      }
      .act::after {
        content: "";
        display: block;
        width: 0.6rem;
        height: 0.06rem;
        background: #fef129;
        border-radius: 0.03rem;
        position: absolute;
        bottom: 0;
        left: 1.58rem;
      }
    }
  }
  .trunCon {
    margin-top: 1.79rem !important;
  }
  .lackBox {
    margin-top: 1.99rem !important;
  }
}
@import "../../assets/scss/common.scss";
</style>
