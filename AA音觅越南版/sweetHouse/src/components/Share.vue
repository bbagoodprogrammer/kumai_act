<template>
  <div class="share">
    <div class="share1" v-if="shareType!=2">
      <div class="shareCon">
        <div class="userMsg">
          <img v-lazy="info.avatar" alt="">
          <div class="msg">
            <div class="nick">{{info.nick}}</div>
            <div class="tips">tạo nhiều đồ ngọt，</div>
            <p class="tips">Điểm<em>{{score}}</em> </p>
          </div>
        </div>
        <img src="../assets/img/share/share1Img.png" alt="" class="share1Img">
        <h6>Nhận quà đặc biệt</h6>
        <div class="gift">
          <span v-for="(item,index) in giftArr" :key="index">
            <img :src="require(`../assets/img/gift/${item.type}.png`)" alt="">
            <strong>{{item.name}}</strong>
          </span>
        </div>
        <div class="downApp" @click="downApp()"></div>
      </div>
    </div>
    <div class="share2" v-else>
      <div class="shareCon">
        <div class="tips">
          <p> Tôi mới khai trương cửa hàng đồ ngọt, chế biến rất nhiều món ngon, mau tới cùng tham gia ~</p>
        </div>
        <div class="house">
          <p class="houseName">Gian hàng đồ ngọt của<em>{{nick}}</em></p>
        </div>
        <h6>Nhận quà đặc biệt</h6>
        <div class="gift">
          <span v-for="(item,index) in giftArr" :key="index">
            <img :src="require(`../assets/img/gift/${item.type}.png`)" alt="">
            <strong>{{item.name}}</strong>
          </span>
        </div>
        <div class="singUpBtn" @click="downApp()"></div>
      </div>
    </div>
  </div>
</template>
<script>
import getString from "../utils/getString"
import api from "../api/apiConfig"
import APP from "../utils/openApp"
export default {
  data() {
    return {
      nick: '',
      score: 0,
      shareType: 1,
      info: {},
      giftArr: [
        {
          type: 4,
          name: 'Khung ảnh'
        },
        {
          type: 5,
          name: 'Xe vào phòng'
        },
        {
          type: 6,
          name: 'xu'
        }
      ]
    }
  },
  created() {
    this.shareType = getString('type')
    if (this.shareType != 2) {
      this.uid = getString('uid')
      this.score = getString('score')
      api.share(1, this.score).then(res => {
        this.info = res.data.response_data.info
      })
    } else {
      this.nick = getString('nick')
    }
  },
  methods: {
    downApp() {
      APP()
    }
  }
}
</script>
<style lang="scss">
.share {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}
.share1 {
  .shareCon {
    width: 7.1rem;
    height: 10.59rem;
    background: url(../assets/img/share/share1Bg.png);
    background-size: 100% 100%;
    .userMsg {
      height: 1.75rem;
      display: flex;
      align-items: center;
      img {
        width: 1.09rem;
        height: 1.09rem;
        border-radius: 50%;
        border: 0.03rem solid #fff;
        margin-left: 0.53rem;
      }
      .msg {
        .nick {
          font-size: 0.34rem;
          font-weight: 800;
        }
        .tips {
          font-size: 0.24rem;
          em {
            font-size: 0.24rem;
            color: rgba(255, 21, 60, 1);
          }
        }
      }
    }
    .msg {
      margin-left: 0.1rem;
    }
    .share1Img {
      display: block;
      width: 6.1rem;
      height: 4.25rem;
      margin: 0.4rem auto 0;
    }
    h6 {
      text-indent: 0.6rem;
      font-weight: 600;
    }
    .gift {
      padding: 0 0.55rem;
      display: flex;
      justify-content: space-between;
      margin-top: 0.15rem;

      span {
        img {
          width: 1.73rem;
          height: 1.73rem;
          display: block;
        }
        strong {
          display: block;
          text-align: center;
          margin-top: 0.1rem;
          color: rgba(212, 62, 25, 1);
        }
      }
    }
    .downApp {
      width: 3.98rem;
      height: 0.86rem;
      background: url(../assets/img/share/share1Btn.png);
      background-size: 100% 100%;
      margin: 0.25rem auto 0;
    }
  }
}
.share2 {
  .shareCon {
    width: 7.1rem;
    height: 9.8rem;
    background: url(../assets/img/singUp/sBg.png);
    background-size: 100% 100%;
    position: relative;
    padding-top: 1.37rem;
    .house {
      width: 6.1rem;
      height: 4.04rem;
      background: url(../assets/img/singUp/house.png);
      background-size: 100% 100%;
      margin: 0 auto;
      padding-top: 0.2rem;
      margin-top: 0.17rem;
      .houseName {
        width: 3.8rem;
        margin: 0 auto;
        text-align: center;
        line-height: 0.6rem;
        font-size: 0.32rem;
        color: rgba(215, 55, 18, 1);
        font-weight: 600;
        display: flex;
        justify-content: center;
        em {
          font-size: 0.32rem;
          font-weight: 600;
          display: block;
          max-width: 1.6rem;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
      }
    }
    .tips {
      p {
        padding: 0 0.64rem;
        font-size: 0.34rem;
        font-weight: 500;
        text-align: center;
      }
    }
    h6 {
      text-indent: 0.6rem;
      font-weight: 600;
    }
    .gift {
      padding: 0 0.55rem;
      display: flex;
      justify-content: space-between;
      margin-top: 0.25rem;
      span {
        img {
          width: 1.73rem;
          height: 1.73rem;
          display: block;
        }
        strong {
          display: block;
          text-align: center;
          margin-top: 0.1rem;
        }
      }
    }
    .singUpBtn {
      width: 3.66rem;
      height: 0.86rem;
      background: url(../assets/img/share/share2Btn.png);
      background-size: 100% 100%;
      margin: 0.3rem auto 0;
    }
  }
}
</style>
