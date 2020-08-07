<template>
  <div class="box">
    <!-- <div class="header">
      <i class="black" @click="closeWeb()"></i> 連續徽章說明
    </div> -->
    <div class="singTotalDay">
      <strong>Bạn đã điểm danh <em> {{data.days}} </em> ngày</strong>
      <span class="retroactive" :class="{black:!data.compensate.date}" @click="showP()">Bù</span>
    </div>
    <div class="badge">
      <!-- 個 -->
      <h3 class="title"><em>Huy chương điểm danh</em> <strong>({{actNum}}/{{maxLength}})</strong></h3>
      <div class="badBox">
        <span v-for="(item,index) in data.medalTask" :key="index">
          <img :src="item.url" alt="">
          <strong :class="{black:item.finish == 0}">Điểm danh {{item.days}} ngày</strong>
        </span>
      </div>
    </div>
    <div class="tips">
      <h6>Mô tả:</h6>
      <p>Mục này hiển thị số ngày bạn điểm danh liên tiếp gần đây nhất, nếu ngưng điểm danh sẽ tính lại từ đầu</p>
      <p>Huy chương điểm danh khi đạt đủ yêu cầu sẽ tự động nhận, huy chương đã nhận có thể xem và dùng trong mục Huy chương</p>
      <p>Nếu không cẩn thận gián đoạn điểm danh có thể dùng xu để bù. Mỗi lần bù 1 ngày, mỗi lần bù sẽ tốn thêm 20% số xu so với lần bù trước. Nếu lần đầu bù 1 ngày tốn 100 xu, vậy lần 2 bù 1 ngày tốn 120 xu, lần 3 tốn 140 xu, số xu được làm tròn, cứ thế tính tới. Mọi người vui lòng điểm danh đầy đủ, cố gắng đừng để gián đoạn điểm danh.</p>
      <p>Điểm danh bù không ảnh hưởng chu kỳ điểm danh 7 ngày</p>
    </div>
    <div class="mask" v-show="showPup">
      <transition name="slide">
        <div class="retroactivePup" v-if="showPup">
          <div class="title">Xác nhận tốn {{data.compensate.coins}} xu điểm danh bù?</div>
          <div class="tips">
            Bạn gần đây không điểm danh ngày:{{data.compensate.date}}
            </br>Sau khi bù, điểm danh liên tục {{data.compensate.days}} ngày
          </div>
          <div class="btnBox">
            <span class="re" @click="closeP()">Huỷ</span>
            <span class="ok" @click="sateSingUp()">Xác nhận</span>
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
        if (res.data.response_data) {
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
          this.toast(`Đã điểm danh bù, ngày điểm danh liên tục +1`)
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


