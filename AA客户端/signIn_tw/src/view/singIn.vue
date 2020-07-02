<template>
  <div class="box">
    <!-- <div class="header">
      <i class="black" @click="closeWeb()"></i> 連續徽章說明
    </div> -->
    <div class="singTotalDay">
      <strong>你已連續簽到<em> {{data.days}} </em>天</strong>
      <span class="retroactive" :class="{black:!data.compensate.date}" @click="showP()">補簽</span>
    </div>
    <div class="badge">
      <h3 class="title"><em>連簽徽章</em> <strong>({{actNum}}/{{maxLength}}個)</strong></h3>
      <div class="badBox">
        <span v-for="(item,index) in data.medalTask" :key="index">
          <img :src="item.url" alt="">
          <strong :class="{black:item.finish == 0}">連簽{{item.days}}天</strong>
        </span>
      </div>
    </div>
    <div class="tips">
      <h6>說明：</h6>
      <p>這裡展示你最近一次連續簽到的天數，如有斷簽，則重新計算</p>
      <p>連簽徽章，當連簽天數達到要求即可自動獲得，已獲得的徽章可在我的徽章查看並佩戴使用</p>
      <p>當用戶不小心漏簽時，可花費金幣進行補簽，每次可補簽1天，每次補簽花費金幣數會比上次補簽提高約20%，如第一次補一天花費100金幣，第二次補簽一天花費120金幣，第三次補簽一天花費140金幣，個位數抹零取整，如此類推。請大家注意連續簽到，儘量避免漏簽補簽哦。</p>
      <p>補簽不影響7天簽到周期</p>
    </div>
    <div class="mask" v-show="showPup">
      <transition name="slide">
        <div class="retroactivePup" v-if="showPup">
          <div class="title">是否花費{{data.compensate.coins}}金幣進行補簽？</div>
          <div class="tips">
            你最近漏簽的日期：{{data.compensate.date}}
            </br> 補簽後，連續簽到天數爲{{data.compensate.days}}天
          </div>
          <div class="btnBox">
            <span class="re" @click="closeP()">取消</span>
            <span class="ok" @click="sateSingUp()">確定</span>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import api from "../api/apiConfig"
export default {
  data() {
    return {
      showPup: false,
      data: {
        compensate: {}
      }
    }
  },
  created() {
    this.getDefaultData()
  },
  computed: {
    actNum() {
      let num = 0
      for (let key in this.data.medalTask) {
        if (this.data.medalTask[key].finish == 1) {
          num++
        }
      }
      return num
    },
    maxLength() {
      if (this.data.medalTask) {
        return Object.keys(this.data.medalTask).length
      }
    }
  },
  methods: {
    getDefaultData(val) { //初始化
      api.getDefault().then(res => {
        if (res.status == 200) {
          this.data = res.data.response_data
        } else {
          this.toast(res.data.response_status.error)
        }
      })
    },
    sateSingUp() {
      api.sateSingIn().then(res => {
        if (res.data.response_data && res.data.response_data.msg == 'ok') {
          this.getDefaultData()
          this.toast(`補簽成功,連簽天數+1`)
          this.showPup = false
        } else {
          this.toast(res.data.response_status.error)  //`補簽失敗，請確保賬戶金幣充足`
          this.showPup = false
        }
      })
    },
    showP() {
      if (!this.data.compensate.date) return
      this.showPup = true
    },
    closeP() {
      this.showPup = false
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
<style lang='scss'>
body::-webkit-scrollbar {
  width: 0;
}
body {
  background: #f2f2f2;
}
.box {
  max-width: 750px;
  overflow-x: hidden;
  position: relative;
  margin: auto;
  .header {
    height: 0.88rem;
    line-height: 0.88rem;
    // background: #fff;
    font-size: 0.36rem;
    text-align: center;
    position: relative;
    color: #111111;
    .black {
      display: block;
      width: 0.18rem;
      height: 0.32rem;
      background: url(../assets/img/arr.png);
      background-size: 100% 100%;
      position: absolute;
      left: 0.28rem;
      top: 0.28rem;
    }
  }
  .singTotalDay {
    margin-top: 0.2rem;
    height: 1rem;
    line-height: 1rem;
    font-size: 0.32rem;
    color: #111111;
    background: #fff;
    display: flex;
    justify-content: space-between;
    align-items: center;
    strong {
      text-indent: 0.28rem;

      em {
        font-size: 0.45rem;
        color: #ff6a3e;
        font-weight: 600;
        vertical-align: bottom;
      }
    }
    .retroactive {
      width: 1.22rem;
      height: 0.64rem;
      line-height: 0.64rem;
      font-size: 0.26rem;
      color: #fff;
      text-align: center;
      background: rgba(255, 106, 62, 1);
      margin-right: 0.3rem;
      border-radius: 0.5rem;
      &.black {
        background: #ccc;
      }
    }
  }
  .badge {
    height: 7.3rem;
    background: #fff;
    margin-top: 0.2rem;
    .title {
      height: 0.8rem;
      line-height: 0.8rem;
      padding-left: 0.28rem;
      em {
        font-weight: 800;
        font-size: 0.3rem;
        color: #111111;
      }
      strong {
        text-align: center;
        color: #999;
        font-size: 0.24rem;
        vertical-align: bottom;
        margin-left: 0.1rem;
      }
    }
    .badBox {
      padding: 0 0.53rem;
      display: flex;
      flex-wrap: wrap;
      // justify-content: space-between;
      span {
        width: 33%;
        height: 2rem;
        img {
          width: 1.4rem;
          height: 1.4rem;
          display: block;
          margin: 0.03rem auto;
        }
        strong {
          display: block;
          color: #111111;
          font-size: 0.24rem;
          text-align: center;
          margin-top: 0.04rem;
          &.black {
            opacity: 0.4;
          }
        }
      }
    }
  }
  > .tips {
    color: #999999;
    padding: 0.3rem 0.32rem 0 0.28rem;
    p {
      margin-top: 0.13rem;
      font-size: 0.24rem;
    }
  }
  .retroactivePup {
    width: 5.2rem;
    height: 2.81rem;
    background: rgba(255, 255, 255, 1);
    border-radius: 0.12rem;
    position: relative;
    .title {
      color: #111111;
      font-size: 0.36rem;
      margin: 0.35rem auto 0;
      text-align: center;
    }
    .tips {
      font-size: 0.24rem;
      color: #666;
      text-align: center;
      margin-top: 0.12rem;
    }
    .btnBox {
      width: 100%;
      height: 0.8rem;
      position: absolute;
      bottom: 0;
      border-top: 0.15px solid #dddddc;
      display: flex;
      span {
        flex: 1;
        text-align: center;
        line-height: 0.8rem;
        font-size: 0.28rem;
        &.re {
          color: #111;
        }
        &.ok {
          color: #ff693e;
          border-left: 0.15px solid #dddddc;
        }
      }
    }
  }
}
</style>


