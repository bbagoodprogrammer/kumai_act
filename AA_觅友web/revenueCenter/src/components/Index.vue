<template>
  <div class="page pageIndex">
    <div class="app_top" :style="{background:'#7A68F8',height:navigatorHeight}"></div>
    <div class="top_bg"></div>
    <div class="tab" :style="{top:navigatorHeight}">
      <span class="tab1" :class="{act:type == 1}" @click="tabClick(1)">{{lang.tab1}}</span>
      <span class="tab2" :class="{act:type == 2}" @click="tabClick(2)">{{lang.tab2}}</span>
      <i class="question" @click="goTips()"></i>
    </div>
    <div class="pangCon" :style="{paddingTop:navigatorHeight2}">
      <div class="userMasonry">
        <div class="title">{{type == 1?lang.user_score1 :lang.user_score2}}</div>
        <div class="userNums">
          <i class="icon" :class="{blue:type == 2}"> </i>
          <strong>{{nowData.balance}}</strong>
          <i class="arr" @click="goHistory()"></i>
        </div>
        <div class="score">
          <div class="day">
            <strong>{{lang.day_get}}</strong>
            <em>{{nowData.daily_income}}</em>
          </div>
          <div class="total">
            <strong>{{lang.totle_get}}</strong>
            <em>{{nowData.consume>=0?Number(nowData.consume) + Number(nowData.reflect) + Number(nowData.balance):''}}</em>
          </div>
        </div>
      </div>
      <ul class="getGiftList">
        <li v-for="(item,index) in nowData.goods_list" :key="index">
          <i class="look" v-if="item.url_resource && (item.type == 0 || item.type == 1)" @click="svgaLook(item)">{{lang.lookIng}}</i>
          <img :src="item.url_front" alt="">
          <div class="name">{{getNameStr(item)}}</div>
          <div class="price" @click="getGiftItem(item)">
            <i :class="{blue:type == 2}"></i>
            <em>{{item.price}}</em>
          </div>
        </li>
      </ul>
      <p class="listLoading" v-show="loading">loading...</p>
    </div>
    <!-- svga预览 -->
    <div class="mask" v-show="showSvga" @click="closeSvga()">
      <canvas id="gift_show" />
    </div>
    <!-- 兑换确认弹窗 -->
    <div class="mask" v-show="showLuckGift">
      <transition name="slide">
        <div class="getGiftQuery" v-if="showLuckGift">
          <img :src="act_gfit.url_front" alt="">
          <p class="buyTips">{{lang.query_title}}<br /><strong> {{getNameStr(act_gfit)}}</strong></p>
          <div class="ok" @click="buy()">{{lang.ok}}</div>
          <div class="cancel" @click="showLuckGift = false">{{lang.cancel}}</div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import { getLangHtml, getTimeObj, getUrlString, getAppVer, getPlatform, getDeviceId } from "../utils";
import { setFullScreen, setStatusBarStyle, getStatusBarHeight, callAppNew } from '../utils/navigation';
import { getInitInfo, getGift } from "../apis"
import { Downloader, Parser, Player } from 'svga.lite'

const downloader = new Downloader()
const parser = new Parser({ disableWorker: true })


export default {
  data () {
    return {
      navigatorHeight: 0,
      navigatorHeight2: 0,
      act_gfit: {},
      type: 1,
      data1: {
        // "balance": 0,      // 当前账号钻石
        // "consume": 0,      // 消费钻石(总消费consume+reflect)
        // "reflect": 0,      // 提现钻石(总消费consume+reflect)
        // "daily_income": 0, // 今天获取钻石
        // "goods_list": [    // 兑换商品列表
        //   {
        //     "id": 7,    // 兑换ID
        //     "name": "100金币", // 奖励名称
        //     "url_front": "",    // 奖励图片
        //     "url_resource": "http://fstatic.cat1314.com/uc/svga/7ee9ed39dc372ec43b5a8849823ba870_1616383211.svga", // 预览图，如果为空不能预览
        //     "price": 1000, // 兑换花费
        //     "num": 100, // 个数
        //     "days": 0,  // 天数（金币，戒子没有天数）
        //     "type": 4 //类型 =0头像框 =1座驾 =2戒子 =3背包礼物 =4金币
        //   },
        //   {
        //     "id": 7,    // 兑换ID
        //     "name": "100金币", // 奖励名称
        //     "url_front": "",    // 奖励图片
        //     "url_resource": '', // 预览图，如果为空不能预览
        //     "price": 1000, // 兑换花费
        //     "num": 100, // 个数
        //     "days": 0,  // 天数（金币，戒子没有天数）
        //     "type": 4 //类型 =0头像框 =1座驾 =2戒子 =3背包礼物 =4金币
        //   }
        // ]

      },
      data2: {
        // "balance": 0,      // 当前账号钻石
        // "consume": 0,      // 消费钻石(总消费consume+reflect)
        // "reflect": 0,      // 提现钻石(总消费consume+reflect)
        // "daily_income": 0, // 今天获取钻石
        // "goods_list": [    // 兑换商品列表
        //   {
        //     "id": 7,    // 兑换ID
        //     "name": "100金币", // 奖励名称
        //     "url_front": "",    // 奖励图片
        //     "url_resource": "http://fstatic.cat1314.com/uc/svga/7ee9ed39dc372ec43b5a8849823ba870_1616383211.svga", // 预览图，如果为空不能预览
        //     "price": 1000, // 兑换花费
        //     "num": 100, // 个数
        //     "days": 0,  // 天数（金币，戒子没有天数）
        //     "type": 4 //类型 =0头像框 =1座驾 =2戒子 =3背包礼物 =4金币
        //   },
        //   {
        //     "id": 7,    // 兑换ID
        //     "name": "100金币", // 奖励名称
        //     "url_front": "",    // 奖励图片
        //     "url_resource": '', // 预览图，如果为空不能预览
        //     "price": 1000, // 兑换花费
        //     "num": 100, // 个数
        //     "days": 0,  // 天数（金币，戒子没有天数）
        //     "type": 4 //类型 =0头像框 =1座驾 =2戒子 =3背包礼物 =4金币
        //   }]

      },
      loaded2: false,
      loading: false,
      showSvga: false,
      player: {},
      showLuckGift: false
    }
  },
  //   created () {

  //   },
  mounted () {
    console.log(AREA)
    setTimeout(() => {
      const pt = getPlatform();
      const ver = getAppVer();
      if ((pt == 'ios' && ver >= 165) || pt == 'android') {
        setFullScreen();
        // - document.getElementsByClassName('tab')[0].clientHeight
        this.navigatorHeight = getStatusBarHeight() - document.getElementsByClassName('tab')[0].clientHeight + 'px'; // 88為APPtitle高度
        this.navigatorHeight2 = getStatusBarHeight() * 1 + 20 + 'px';

      }
      this.init(1)
    }, 0)

  },
  computed: {
    nowData () {
      if (this.type == 1) {
        return this.data1
      } else {
        return this.data2
      }
    },
    filderArr1 () {
      if (this.data1.goods_list) {
        let svgaArr = []
        this.data1.goods_list.forEach(element => {
          if (element.url_resource) {
            svgaArr.push(element)
          }
        });
        return svgaArr
      }
    },
    filderArr2 () {
      if (this.data2.goods_list) {
        let svgaArr = []
        this.data2.goods_list.forEach(element => {
          if (element.url_resource) {
            svgaArr.push(element)
          }
        });
        return svgaArr
      }
    }
  },
  methods: {
    init (val) {
      getInitInfo(val).then(res => {
        if (res.data.response_data) {
          if (val == 1) {
            this.data1 = res.data.response_data
            // this.downloaderData(this.filderArr1)
          } else {
            this.loading = false
            this.data2 = res.data.response_data
            // this.downloaderData(this.filderArr2)
          }
        } else {
          this.toast(res.data.response_status.error)
        }
      })
    },
    tabClick (val) {
      this.type = val
      if (val == 2 && !this.loaded2) {
        this.loaded2 = true
        this.loading = true
        this.init(0)
      }
    },
    getGiftItem (item) {
      console.log(item)
      this.act_gfit = item
      this.showLuckGift = true
    },
    buy () {
      if (this.type == 1 && Number(this.data1.balance) >= Number(this.act_gfit.price) || this.type == 2 && Number(this.data2.balance) >= Number(this.act_gfit.price)) {
        getGift(this.type == 1 ? 1 : 0, this.act_gfit.id).then(res => {
          if (res.data.response_data) {
            this.toast(this.lang.get_suc)
            this.showLuckGift = false
            const { balance, consume, reflect, daily_income } = res.data.response_data
            if (this.type == 1) {
              this.$set(this.data1, 'balance', balance)
              this.$set(this.data1, 'consume', consume)
              this.$set(this.data1, 'reflect', reflect)
              this.$set(this.data1, 'daily_income', daily_income)
            } else {
              this.$set(this.data2, 'balance', balance)
              this.$set(this.data2, 'consume', consume)
              this.$set(this.data2, 'reflect', reflect)
              this.$set(this.data2, 'daily_income', daily_income)
            }
          } else {
            this.toast(res.data.response_status.error)
          }
        })
      } else {
        if (this.type == 1) {
          this.toast(this.lang.get_cancel_tips1)
        } else {
          this.toast(this.lang.get_cancel_tips2)
        }
      }

    },
    async svgaLook (item) {
      if (item.type == 0 || item.type == 1) {  //頭像框座駕預覽
        const ios = navigator.userAgent.match(/iPhone|iPod|ios|iPad/i);
        const url = encodeURI(item.url_resource)
        try {
          if (ios) {
            sendJsData(`app://svgaPreview?resoure_url=${url}&type=${item.type == 0 ? 0 : 1}`);
          } else {
            javascript: JSInterface.sendJsData(`app://svgaPreview?resoure_url=${url}&type=${item.type == 0 ? 0 : 1}`);
          }
        } catch (e) {
          console.log(e)
        }
      }

      //   if (item.data) { 本地播放svga预览逻辑，因后端不支持解压zip格式，所以改成使用app提供的接口播放
      //     this.showSvga = true
      //     const newCanvas = document.getElementById('gift_show')
      //     this.player = new Player(newCanvas)
      //     await this.player.mount(item.data)
      //     this.player.start()
      //   } else {
      //     this.toast('資源未加載完成,請稍後再試！')
      //   }
    },
    closeSvga () {
      this.showSvga = false
      this.player.clear()
    },
    downloaderData (arr) {
      return new Promise((res, rej) => {
        let PromiseArr = []
        for (let i = 0; i < arr.length; i++) {
          PromiseArr.push(this.loadSvgaData(arr[i]))
        }
        Promise.all(PromiseArr).then((values) => {
          res(values)
        })
      })
    },
    loadSvgaData (fileItem) {
      return new Promise((resolve, reject) => {
        ; (async () => {
          const fileData = await downloader.get(fileItem.url_resource);
          const data = await parser.do(fileData);
          fileItem.data = data
          console.log(this.nowData)
          resolve(data);
        })()
      });
    },
    getNameStr (item) {
      if (item.days) {
        return `${item.name} *${item.days}${this.lang.day}`
      } else if (item.num) {
        return `${item.name}`
      }
    },
    goHistory () {
      const uid = getUrlString('uid')
      const token = getUrlString('token')
      const lang = getUrlString('lang')
      const ios = navigator.userAgent.match(/iPhone|iPod|ios|iPad/i);
      let test = ''
      if (_test) {
        test = 't.'
      }
      try {
        if (AREA == 'tw') {
          if (ios) {
            sendJsData(`http://${test}act.udateapp.com/html/revenueCenter/history.html?uid=${uid}&token=${token}&lang=${lang}&type=${this.type}`);
          } else {
            javascript: JSInterface.sendJsData(`http://${test}act.udateapp.com/html/revenueCenter/history.html?uid=${uid}&token=${token}&lang=${lang}&type=${this.type}`);
          }
        } else if (AREA == 'vn') {
          if (ios) {
            sendJsData(`http://${test}act.alochatapp.com/html/revenueCenter/history.html?uid=${uid}&token=${token}&lang=${lang}&type=${this.type}`);
          } else {
            javascript: JSInterface.sendJsData(`http://${test}act.alochatapp.com/html/revenueCenter/history.html?uid=${uid}&token=${token}&lang=${lang}&type=${this.type}`);
          }
        }

      } catch (e) {
        console.log(e)
      }
    },
    goTips () {
      const ios = navigator.userAgent.match(/iPhone|iPod|ios|iPad/i);
      let test = ''
      if (_test) {
        test = 't.'
      }
      try {
        if (AREA == 'tw') {
          if (ios) {
            sendJsData(`http://${test}act.udateapp.com/html/revenueCenter/tips.html`);
          } else {
            javascript: JSInterface.sendJsData(`http://${test}act.udateapp.com/html/revenueCenter/tips.html`);
          }
        } else if (AREA == 'vn') {
          if (ios) {
            sendJsData(`http://${test}act.alochatapp.com/html/revenueCenter/tips.html`);
          } else {
            javascript: JSInterface.sendJsData(`http://${test}act.alochatapp.com/html/revenueCenter/tips.html`);
          }
        }

      } catch (e) {
        console.log(e)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.pageIndex {
  overflow-x: hidden;
  position: relative;
  .app_top {
    width: 100%;
    position: fixed;
    z-index: 5;
    &.app_top_fit {
      position: fixed;
      background-color: #10093C;
    }
  }
  #gift_show {
    width: 7.5rem;
    height: 7.5rem;
  }
  .listLoading {
    color: #2c2b36;
    text-align: center;
    margin-top: 0.3rem;
    font-size: 0.35rem;
  }
  img {
    display: block;
    width: 100%;
  }
  .top_bg {
    width: 100%;
    overflow: hidden;
    height: 4.6rem;
    position: absolute;
    top: 0;
    z-index: -1;
  }
  .top_bg::after {
    content: '';
    width: 120%;
    height: 4.6rem;
    position: absolute;
    left: -10%;
    top: 0;
    z-index: -1;
    border-radius: 0 0 60% 60%;
    background: #7A68F8;
  }
  .tab {
    width: 100%;
    height: 0.88rem;
    display: flex;
    align-items: center;
    justify-content: center;
    position: fixed;
    // top: 0;
    z-index: 5;
    background: #7A68F8;
    span {
      font-size: 0.34rem;
      position: relative;
      &.act {
        font-weight: 600;
      }
      &.act::after {
        content: '';
        display: block;
        width: 0.32rem;
        height: 0.08rem;
        background: linear-gradient(
          90deg,
          #FFFFFF 0%,
          rgba(255, 255, 255, 0) 100%
        );
        border-radius: 0.1rem;
        position: absolute;
        left: 40%;
        bottom: -0.1rem;
      }
    }
    .question {
      display: block;
      width: 0.48rem;
      height: 0.48rem;
      position: absolute;
      right: 0.3rem;
      top: 0.2rem;
      background: url(../img/question.png);
      background-size: 100% 100%;
    }
    .tab2 {
      margin-left: 0.6rem;
    }
  }

  .pangCon {
    width: 6.9rem;
    height: 20rem;
    // position: absolute;
    // top: 1.29rem;
    // left: 0.3rem;
    margin: 0 auto;
    .userMasonry {
      width: 6.9rem;
      height: 3.46rem;
      background: #FFFFFF;
      border-radius: 0.3rem;
      padding-top: 0.54rem;
      .title {
        height: 0.4rem;
        font-size: 0.28rem;
        line-height: 0.46rem;
        color: #8C8995;
        text-align: center;
      }
      .userNums {
        height: 0.98rem;
        margin-top: 0.1rem;
        display: flex;
        align-items: center;
        justify-content: center;
        color: rgba(44, 43, 54, 1);
        .icon {
          width: 0.66rem;
          height: 0.66rem;
          background: url(../img/masonry.png);
          background-size: 100% 100%;
          &.blue {
            background: url(../img/masonry2.png);
            background-size: 100% 100%;
          }
        }
        strong {
          font-size: 0.7rem;
          font-weight: 600;
          margin-left: 0.18rem;
        }
        .arr {
          width: 0.48rem;
          height: 0.48rem;
          background: url(../img/arr.png);
          background-size: 100% 100%;
          margin-left: 0.04rem;
        }
      }
      .score {
        width: 6.2rem;
        height: 1.2rem;
        margin: 0.28rem auto 0;
        display: flex;
        align-items: center;
        div {
          flex: 1;
          height: 1.04rem;
          text-align: center;
          padding-top: 0.16rem;
          strong {
            color: rgba(140, 137, 149, 1);
            font-size: 0.28rem;
            display: block;
          }
          em {
            color: rgba(44, 43, 54, 1);
            font-size: 0.36rem;
            display: block;
            margin-top: 0.06rem;
            font-weight: 600;
          }
        }
      }
    }
  }
  .getGiftList {
    margin-top: 0.2rem;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    li {
      width: 3.35rem;
      height: 4.16rem;
      padding-top: 0.62rem;
      background: #FFFFFF;
      border-radius: 0.3rem;
      position: relative;
      margin-bottom: 0.2rem;
      .look {
        font-size: 0.24rem;
        color: rgba(122, 104, 248, 1);
        position: absolute;
        right: 0.28rem;
        top: 0.21rem;
      }
      img {
        width: 2rem;
        height: 2rem;
        margin: 0 auto;
      }
      .name {
        min-height: 1.19rem;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 0.32rem;
        color: rgba(44, 43, 54, 1);
        text-align: center;
        font-size: 0.32rem;
        margin-top: 0.04rem;
      }
      .price {
        width: 1.86rem;
        height: 0.54rem;
        background: RGBA(241, 239, 255, 1);
        border-radius: 0.3rem;
        margin: 0 auto;
        display: flex;
        align-items: center;
        justify-content: center;
        color: rgba(44, 43, 54, 1);
        font-size: 0.26rem;
        i {
          width: 0.32rem;
          height: 0.32rem;
          background: url(../img/masonry.png);
          background-size: 100% 100%;
          margin-right: 0.1rem;
          &.blue {
            background: url(../img/masonry2.png);
            background-size: 100% 100%;
          }
        }
      }
    }
  }
}
.getGiftQuery {
  width: 6.18rem;
  height: 6.34rem;
  background: #FFFFFF;
  border-radius: 0.3rem;
  padding-top: 0.76rem;
  img {
    width: 2rem;
    height: 2rem;
    margin: 0 auto;
  }
  .buyTips {
    font-size: 0.32rem;
    color: rgba(44, 43, 54, 1);
    margin-top: 0.46rem;
    text-align: center;
    min-height: 0.9rem;
    strong {
      font-weight: 600;
    }
  }
  .ok {
    width: 3.3rem;
    height: 0.88rem;
    background: linear-gradient(90deg, #7A68F8 0%, #9585FF 100%);
    border-radius: 0.44rem;
    text-align: center;
    line-height: 0.88rem;
    margin: 0.52rem auto 0;
    font-size: 0.32rem;
  }
  .cancel {
    width: 3.3rem;
    height: 0.88rem;
    background: #FFFFFF;
    box-sizing: border-box;
    border: 0.01rem solid #BCBBC7;
    border-radius: 0.44rem;
    margin: 0.16rem auto 0;
    text-align: center;
    line-height: 0.88rem;
    color: rgba(188, 187, 199, 1);
    font-size: 0.32rem;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>