<template>
  <div class="list">
    <div class="title">推薦Star信息登記處</div>
    <div class="fromList">
      <div class="input1">
        <span>Star UID</span>
        <input type="text" v-model="suid" @input="setNick()">
      </div>
      <div class="input1">
        <span>Star 暱稱</span>
        <input type="text" v-model="sNick">
      </div>
      <div class="input2">
        <span>推薦TA的原因</span>
        <input type="text" maxlength="20" v-model="msg3" placeholder="唱功/擅長曲風或歌手/顏值超高...">
        <strong>{{msg3.length}}/20</strong>
      </div>
    </div>
    <div class="tipsList">
      <h5>推薦標準&要求</h5>
      <p>
        推薦名額有限，請認真搜尋各項都優質的Star才推薦哦<br />
        1.唱功：音準準確，節奏感強，氣息穩，能熟練使用歌唱技巧，咬字發音清晰，有自己的歌唱風格<br />
        2.顏值：顏值優質，上鏡自然，有鏡頭表現力<br />
        3.歡歌粉絲數不低於100<br />
        4.每次僅可提交一人，可提交多次，活動期間最多提交10次
      </p>
      <p> 以上維度官方將綜合評分，評審通過後系統將根據規則派發星探獎勵，同時通過小助手消息推送通知到您！</p>
    </div>
    <div class="commit" @click="push()">提交</div>
    <i class='fire'> </i>
    <loading />
    <msg-toast></msg-toast>
  </div>
</template>
<script>
import api from "../../api/apiConfig"
import loading from "../../components/Loading"
import getDate from "../../utils/getDate"
import MsgToast from "../../components/commonToast"

export default {
  components: { loading, MsgToast },
  data() {
    return {
      suid: '',
      sNick: '',
      msg3: '',
      loaded: false,
      more: true,
      timer: null
    }
  },
  created() {
    document.title = '推薦Star信息登記處'
  },
  methods: {
    setNick() {
      clearTimeout(this.timer)
      this.timer = setTimeout(() => {
        api.info(this.suid).then(res => {
          if (res.data.response_data.nick) {
            this.sNick = res.data.response_data.nick
          } else {
            this.toast('搜索不到此ID')
          }
        })
      }, 1000)
    },
    push() {
      if (this.suid == '') {
        this.toast('請填寫推薦人UID！')
      } else if (this.msg3 == '') {
        this.toast('請填寫推薦TA的原因！')
      } else {
        api.push(this.suid, this.msg3).then(res => {
          if (res.data.response_status.code == 0) {
            this.vxc('setToast', {
              title: '提交成功，感謝推薦',
              msg: '我們將盡快審核，審核通過將發送消息通知你！'
            })
          } else {
            this.vxc('setToast', {
              title: '抱歉，提交失敗',
              msg: res.data.response_status.error
            })
          }
        })
      }
    }
  }
}
</script>
<style lang="scss">
body {
  background-color: rgba(29, 22, 95, 1);
  padding-top: 0.32rem;
  .list {
    padding-top: 0.36rem;
  }
  .title {
    width: 7.13rem;
    height: 1.15rem;
    text-align: center;
    line-height: 1.35rem;
    background: url(../../assets/img/titleBg.png);
    background-size: 100% 100%;
    color: rgba(124, 250, 255, 1);
    font-size: 0.36rem;
    font-weight: 600;
    font-style: italic;
    text-shadow: rgba(16, 20, 77, 1) 0.02rem 0 0,
      rgba(16, 20, 77, 1) 0 0.02rem 0, rgba(16, 20, 77, 1) -0.02rem 0 0,
      rgba(16, 20, 77, 1) 0 -0.02rem 0;
    letter-spacing: 0.06rem;
    margin: 0 auto;
  }
  .fromList {
    margin-top: 0.22rem;
    input {
      background: none;
      border: none;
      outline: none;
    }
    input::placeholder {
      font-size: 0.22rem;
      color: rgba(255, 255, 255, 0.5);
    }
    > div {
      display: flex;
      align-items: center;
      margin: 0 auto;
      &.input1 {
        width: 6.36rem;
        height: 0.85rem;
        background: url(../../assets/img/input1.png);
        background-size: 100% 100%;
      }
      &.input2 {
        width: 6.36rem;
        height: 1.61rem;
        background: url(../../assets/img/input2.png);
        background-size: 100% 100%;
        position: relative;
        strong {
          position: absolute;
          bottom: 0.15rem;
          right: 0.15rem;
          color: rgba(128, 115, 255, 1);
          font-size: 0.22rem;
        }
      }
      span {
        width: 2rem;
        text-align: center;
        font-size: 0.26rem;
        color: rgba(254, 254, 184, 1);
      }
      input {
        width: 3rem;
        // flex: 1;
        // padding: 0 0.3rem 0 ;
        color: #fff;
        margin-left: 0.3rem;
      }
    }
  }
  .tipsList {
    padding: 0 0.72rem 0.62rem;
    margin-top: 0.56rem;
    h5 {
      color: rgba(254, 254, 184, 1);
      font-size: 0.26rem;
    }
    p {
      margin-top: 0.4rem;
      font-size: 0.22rem;
      color: rgba(208, 184, 237, 1);
    }
  }
  .commit {
    width: 3.61rem;
    height: 1.23rem;
    background: url(../../assets/img/singUpBtn.png);
    background-size: 100% 100%;
    text-align: center;
    line-height: 1.23rem;
    color: rgba(23, 26, 73, 1);
    font-size: 0.47rem;
    font-weight: 600;
    margin: 0.4rem auto 0;
  }
  .fire {
    display: block;
    width: 7.5rem;
    height: 1.57rem;
    background: url(../../assets/img/fire.png);
    background-size: 100% 100%;
    margin-top: 0.8rem;
  }
}
@import "../../assets/scss/common.scss";
</style>
