<template>
  <div id="apps appIndexView">
    <div class="main_container">
      <!-- 自定义抽奖时间 -->
      <!-- <div class="choose" @click="test_choose=true">
        测试
      </div>
      <div class="choose_inner" v-if="test_choose">
        转动圈数：<input type="tel" v-model="cycle">
        转动秒数（1000=1秒)：<input type="tel" v-model="duration">
        10次后转动秒数（1000=1秒)：<input type="tel" v-model="five_duration">
        10次后闪动秒数（1000=1秒)：<input type="tel" v-model="five_blink">
        <span @click="chooseTest()">ok</span>
      </div> -->
      <ScrollNotice />
      <pro :txt="pro_txt" />

      <div class="open">
        <span @click="openRule()"></span>
        <span @click="openDetails()"></span>
        <span @click="openTask()"></span>
      </div>

      <div class="inner">
        <div class="turntable_box">
          <div class="marquee">
            <span class="notice_icon"></span>
            <div class="notice_con">
              <!-- <ScrollNotice /> -->
            </div>
          </div>
          <div class="leftfree">
            <span>{{lang.leftfree}} <i>{{ chance }}</i></span>
            <span>（<em>{{ changes[temp % 3] }}</em><img src="../img/icon_bean.png" alt="" />{{lang.times}}）
            </span>
          </div>

          <ul id="rotary_table">
            <li v-for="(item, index) in show_prizes" :key="index" :class="['award' + index, { active: index == current }]" class="award">
              <img :src="getImg(item)" alt="" />
              <p>{{ getName(item) }}</p>
              <div class="mask" :class="{ breathe: is_breathe }" v-if="index == current"></div>
            </li>
            <div id="start-btn" @click="start(1)"></div>
          </ul>

          <div class="five" @click="start(5)">
            {{lang.has}} <img src="../img/bean.png" alt="" /> : <i>{{ beans }}</i>
          </div>

          <div class="change" @click="change()"></div>
        </div>
      </div>

    </div>
    <van-popup v-model="ong_flag" :close-on-click-overlay="false">
      <div class="pro_one" v-if="ong_flag">
        <i class="close" @click="ong_flag = false"></i>
        <div class="light"></div>
        <div class="title"></div>
        <div class="award_img">
          <img :src="getImg(res_awards[0])" alt="" />
        </div>
        <p class="award_name">{{ getName(res_awards[0]) }}</p>
        <p class="txt" v-html="one_tips"></p>
      </div>
    </van-popup>

    <van-popup v-model="five_flag" :close-on-click-overlay="false">
      <div class="pro_five">
        <i class="close" @click="five_flag = false"></i>
        <div class="light"></div>
        <div class="title"></div>
        <p class="tips">{{lang.five_title}}</p>
        <ul class="award_img">
          <li v-for="(item, index) in res_awards" :key="index">
            <span class="img">
              <img :src="getImg(item)" alt="" />
            </span>
            <p>{{ getName(item) }}</p>
          </li>
        </ul>
        <p class="txt" v-html="lang.five_tips"></p>
      </div>
    </van-popup>

    <van-popup v-model="details_show" @close="closeRecordVan()" :close-on-click-overlay="false">
      <div class="record_box">
        <i class="close" @click="closeRecordVan()"></i>
        <i class="light"></i>
        <div class="title"></div>
        <div class="total">
          <p>
            {{lang.total_beans}}<span class="giveBeans">{{ prize_beans }}</span>
          </p>
          <p>
            {{lang.total_coins}}<span class="giveCoins">{{ prize_coins }}</span>
          </p>
        </div>
        <div class="prize_title"></div>
        <p class="time"><span>{{lang.lucky_time}}</span><span>{{lang.lucky_prize}}</span></p>
        <div class="record_con scrollable" v-if="details_show">
          <inner-scroll-load-list :url="details_url" :parse="proDataParseRecord" :reset="reset">
            <div slot-scope="{ list, loading, none, end }">
              <p class="list" v-for="(item, index) in list" :info="item" :key="index">
                <span>{{ format(item.time) }}</span>
                <span>{{ getName(item.prize) }}</span>
              </p>
              <div v-show="loading" class="sloading_inner">
                {{ lang.loading }}
              </div>
              <div v-show="none" class="snone_inner">{{ lang.no_data }}</div>
              <div v-show="end" class="send_inner"></div>
            </div>
          </inner-scroll-load-list>
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script>
import { mapState } from "vuex";
import store from "../store";
import { getUrlString, toast, getTimeObj } from "../utils";
import { lotteryForGrids } from "../utils/lottery";
import ScrollNotice from "./ScrollNotice";
import InnerScrollLoadList from "./InnerScrollLoadList";
import Pro from "./Pro";
import { open } from "../apis";
const uid = getUrlString("uid");
const token = getUrlString("token");
const lang = getUrlString("lang");
const ios = navigator.userAgent.match(/iPhone|iPod|ios|iPad/i);

export default {
  data () {
    return {
      pro_txt: "",
      show_prizes: [],
      ten_cycle: 1,
      five_duration: 375,
      five_blink: 395,
      test_choose: false,
      is_go: true,
      is_breathe: false,
      reset: false,
      gift_flag: false,
      cycle: 5,//你想转多少圈
      duration: 3000,//你想转cycle用多久
      current_gift: 0, // 当前索引值
      current: -1, // 当前索引值
      five_times: 0,
      count: 1,
      res_awards: [],
      changes: {
        0: 100,
        1: 300,
        2: 500,
      },
      temp: 0,
      ong_flag: false,
      five_flag: false,
      details_show: false,
      prize_beans: 0,//抽奖记录金豆
      prize_coins: 0,//抽奖记录金币
      one_tips: '',//单次抽奖底部提示说明
    };
  },
  computed: {
    ...mapState(["loading", "prizes", "costs", "step", "beans", "chance", "stime", "etime"]),
  },
  watch: {
    prizes (val) {
      this.show_prizes = val[100];
    },
  },
  mounted () {
    console.log(_images)
    this.$store.dispatch("getInitInfo");
  },
  methods: {

    closePro () {
      this.pro_txt = "";
    },

    openRule () {
      this.$router.push("/rule?stime=" + this.stime + '&etime=' + this.etime);
    },

    openDetails () {
      this.details_show = true;
      this.details_url =
        "/index.php?action=luckyDraw.history&uid={uid}&token={token}&signture=innerserver&from={from}";
    },
    proDataParseRecord (data) {
      if (!data.response_status.code) {
        this.prize_beans = data.response_data.beans;
        this.prize_coins = data.response_data.coins;
        return data.response_data.list || [];
      } else {
        return [];
      }
    },

    format (t) {
      return this.lang.time
        .replace("%y", getTimeObj(t).year)
        .replace("%mo", getTimeObj(t).month)
        .replace("%d", getTimeObj(t).day)
        .replace("%h", getTimeObj(t).hour)
        .replace("%m", getTimeObj(t).minute)
        .replace("%s", getTimeObj(t).second);
      // var e = new Date(1000 * t);
      // return (
      //   e.getFullYear() +
      //   "年" +
      //   (e.getMonth() + 1) +
      //   "月" +
      //   e.getDate() +
      //   "日" +
      //   (e.getHours() >= 10 ? e.getHours() : "0" + e.getHours()) +
      //   ":" +
      //   (e.getMinutes() >= 10 ? e.getMinutes() : "0" + e.getMinutes()) +
      //   ":" +
      //   (e.getSeconds() > 10 ? e.getSeconds() : "0" + e.getSeconds())
      // );
    },

    openTask () {
      if (AREA == 'tw') {
        location.href = "http://act.udateapp.com/html/task/index.html?uid=" + uid + "&token=" + token + "&lang=" + lang
      } else if (AREA == 'vn') {
        location.href = "http://act.alochatapp.com/html/task/index.html?uid=" + uid + "&token=" + token + "&lang=" + lang
      } else if (AREA == 'id') {
        location.href = "http://act.newstarapp.com/html/task/index.html?uid=" + uid + "&token=" + token + "&lang=" + lang
      }

    },
    getImg (item) {
      if (item.type == "coin") {
        return require("../img/coin.png");
      } else if (item.type == "bean") {
        return require("../img/bean.png");
      } else if (item.type == "coupon") {
        return require("../img/coupon.png");
      } else if (item.type == "rebate") {
        if (item.target == "150") {
          return _images.rebate150
        }
        if (item.target == "300") {
          return _images.rebate300
        }
        if (item.target == "500") {
          return _images.rebate500
        }
      } else {
        return item.image;
      }
    },
    getName (item) {
      if (item.type == "coin") {
        this.one_tips = this.lang.pro_tips[item.type].replace('%s', item.count)
        return this.lang.tips_coin.replace('%s', item.count);
      } else if (item.type == "bean") {
        this.one_tips = this.lang.pro_tips[item.type].replace('%s', item.count)
        return this.lang.tips_bean.replace('%s', item.count);
      } else if (item.type == "coupon") {
        this.one_tips = this.lang.pro_tips[item.type].replace('%s', item.ratio)
        return this.lang.tips_coupon.replace('&s', item.ratio);
      } else if (item.type == "rebate") {
        this.one_tips = this.lang.pro_tips[item.type].replace(/\%s/g, item.target).replace(/\%d/g, item.back)
        return this.lang.tips_rebate;
      } else if (item.type == "car") {
        this.one_tips = this.lang.pro_tips[item.type].replace('%s', item.name).replace('%s', item.day)
        return this.lang.tips_car.replace(/\%name/g, item.name).replace(/\%day/g, item.day);
      } else if (item.type == "gift") {
        this.one_tips = this.lang.pro_tips[item.type].replace('%s', item.name)
        return this.lang.tips_gift.replace(/\%name/g, item.name).replace(/\%price/g, item.price);
      } else if (item.type == "frame") {
        this.one_tips = this.lang.pro_tips[item.type].replace('%s', item.name)
        return this.lang.tips_frame.replace(/\%name/g, item.name).replace(/\%day/g, item.day);
      }
    },
    chooseTest () {
      this.test_choose = false;
    },

    closeRecordVan () {
      this.details_show = false;
    },

    proDataParseRank (data) {
      if (!data.response_status.code) {
        return data.response_data || [];
      } else {
        return [];
      }
    },

    // 开始抽奖
    async start (count) {
      this.count = count;
      if (this.step == 0) {
        this.pro_txt = this.lang.status_not_start;
        return;
      }
      if (this.step == 2) {
        this.pro_txt = this.lang.status_end;
        return;
      }

      if (this.chance <= 0 || this.chance < count) {
        this.pro_txt = this.lang.no_chance;
        return;
      }

      //============
      if (!this.is_go) {
        return;
      }
      this.current_gift = 0;
      this.is_go = false;
      this.res_awards = [];


      //测试数据
      // this.res_awards11 = [
      //   {
      //     day: 1,
      //     id: 17,
      //     image:
      //       "http://udatefile.cat1314.com/uc/img/image_goods_1591694665.png",
      //     name: "霓虹光潮",
      //     order: 2,
      //     pid: 12,
      //     price: 0,
      //     type: "frame",
      //     v: 200,
      //   },
      //   {
      //     day: 1,
      //     id: 17,
      //     image:
      //       "http://udatefile.cat1314.com/uc/img/image_goods_1591694665.png",
      //     name: "霓虹光潮",
      //     order: 2,
      //     pid: 12,
      //     price: 0,
      //     type: "frame",
      //     v: 200,
      //   },
      //   {
      //     day: 1,
      //     id: 17,
      //     image:
      //       "http://udatefile.cat1314.com/uc/img/image_goods_1591694665.png",
      //     name: "霓虹光潮",
      //     order: 2,
      //     pid: 12,
      //     price: 0,
      //     type: "frame",
      //     v: 200,
      //   },
      //   {
      //     day: 1,
      //     id: 17,
      //     image:
      //       "http://udatefile.cat1314.com/uc/img/image_goods_1591694665.png",
      //     name: "霓虹光潮",
      //     order: 2,
      //     pid: 12,
      //     price: 0,
      //     type: "frame",
      //     v: 200,
      //   },
      //   {
      //     day: 1,
      //     id: 17,
      //     image:
      //       "http://udatefile.cat1314.com/uc/img/image_goods_1591694665.png",
      //     name: "霓虹光潮",
      //     order: 2,
      //     pid: 12,
      //     price: 0,
      //     type: "frame",
      //     v: 200,
      //   },
      // ];


      // this.$store.commit(
      //   "updateus_beans",
      //   this.count * parseInt(this.changes[this.temp % 3])
      // );
      // this.$store.commit("updateus_chance", this.count);
      // this.getLottery();
      // return;

      //============

      const res = await open(this.count, this.changes[this.temp % 3]);
      if (res.data) {
        const { response_status, response_data } = res.data;
        if (response_status.error === "") {
          this.$store.commit("updateus_beans", this.count * parseInt(this.changes[this.temp % 3]));
          this.$store.commit("updateus_chance", this.count);
          this.res_awards = response_data.prizes;
          this.getLottery();
        } else {
          toast(response_status.error);
          this.is_go = true;
        }
      }
    },
    // 调接口获取奖品
    getLottery () {
      this.move();
    },
    // 开始转动
    move () {
      lotteryForGrids(
        8,
        this.res_awards[this.current_gift].order - 1,
        (index) => {
          this.current = index;
        },
        () => {
          this.current_gift++;
          if (this.count == 5) {
            this.five_times++;
            if (this.five_times < 5) {
              this.is_breathe = true;
              setTimeout(() => {
                this.is_breathe = false;
                this.cycle = this.ten_cycle;
                this.duration = this.five_duration;
                this.getLottery();
              }, this.five_blink);
            } else {
              //弹窗
              setTimeout(() => {
                this.five_flag = true;
                this.is_go = true;
                this.five_times = 0;
                this.cycle = 5;
                this.duration = 3000;
              }, 500);
            }
          } else {
            setTimeout(() => {
              this.ong_flag = true;
            }, 500);
          }
          this.is_go = true;
        },
        this.current,
        this.cycle,
        this.duration
      );
    },
    change () {
      this.temp++,
        (this.show_prizes = this.prizes[this.changes[this.temp % 3]]);
    },
  },
  components: {
    ScrollNotice,
    InnerScrollLoadList,
    Pro,
  },
};
</script>

<style lang="scss">
.appIndexView {
  font-size: 0.3rem;
  color: #000;
  background: url('../img/line.png');
  background-repeat: repeat-y;
  background-size: contain;
}
.open {
  width: 1.3rem;
  position: fixed;
  right: 0;
  top: 0.74rem;
  text-align: right;
  z-index: 10;
  span {
    display: inline-block;
    width: 1.3rem;
    height: 0.54rem;
    background-repeat: no-repeat;
    background-size: 100% 100%;
  }
}
.main_container {
  width: 7.5rem;
  height: 12.06rem;
  position: relative;
  padding: 2.56rem 0 0;
  box-sizing: border-box;
  .turntable_box {
    width: 7.5rem;
    height: 10.84rem;
    background: url('../img/machine.png') no-repeat;
    background-size: 100% 100%;
    padding-top: 1.22rem;
    position: relative;
    box-sizing: border-box;
    .marquee {
      width: 5rem;
      height: 0.8rem;
      position: absolute;
      top: 0.03rem;
      left: 1.1rem;
      display: -ms-flexbox;
      display: flex;
      -ms-flex-align: center;
      align-items: center;
      .notice_icon {
        display: inline-block;
        vertical-align: middle;
        width: 0.32rem;
        height: 0.32rem;
        background: url('../img/notice.png') no-repeat;
        background-size: 100% 100%;
        margin: 0 0.1rem;
      }
      .notice_con {
        width: 5rem;
        display: inline-block;
        vertical-align: middle;
        height: 0.5rem;
        line-height: 0.5rem;
        overflow: hidden;
        position: relative;
      }
    }
    .leftfree {
      width: 4.5rem;
      height: 0.4rem;
      background: linear-gradient(0deg, #fa493a, #f94d3d);
      border-radius: 0.19rem;
      margin: 0 auto;
      font-size: 0;
      text-align: center;
      span {
        font-size: 0.24rem;
        color: #fff;
        display: inline-block;
        i {
          color: #fff150;
          font-size: 0.3rem;
        }
        img {
          width: 0.24rem;
          height: 0.24rem;
          display: inline-block;
        }
        em {
          font-size: 0.24rem;
        }
      }
    }
    #rotary_table {
      width: 5.7rem;
      height: 5.7rem;
      position: relative;
      margin: 0.37rem auto 0;
      .award {
        width: 1.8rem;
        height: 1.8rem;
        background: url('../img/gift_bg.png') no-repeat;
        background-size: 100% 100%;
        display: inline-block;
        text-align: center;
        padding: 0.12rem 0;
        position: absolute;
        box-sizing: border-box;
        > img {
          height: 1.1rem;
        }
        p {
          font-size: 0.2rem;
          color: #855204;
          padding-top: 0.08rem;
        }
        &.active {
          .mask {
            width: 1.8rem;
            height: 1.8rem;
            position: absolute;
            background: url('../img/choose.png') no-repeat;
            background-size: 100% 100%;
            top: 0;
            left: 0;
            &.breathe {
              animation: breathe 0.1s infinite;
            }
          }
        }

        @keyframes breathe {
          0% {
            opacity: 0.2;
          }
          100% {
            opacity: 1;
          }
        }

        &.award0 {
          top: 0;
          left: 0;
        }
        &.award1 {
          left: 50%;
          margin-left: -0.9rem;
        }
        &.award2 {
          right: 0;
        }
        &.award3 {
          right: 0;
          top: 1.95rem;
        }
        &.award4 {
          right: 0;
          top: 3.9rem;
        }
        &.award5 {
          left: 50%;
          margin-left: -0.9rem;
          top: 3.9rem;
        }
        &.award6 {
          left: 0;
          top: 3.9rem;
        }
        &.award7 {
          left: 0;
          top: 1.95rem;
        }
      }
      #start-btn {
        position: absolute;
        width: 1.8rem;
        height: 1.8rem;
        left: 50%;
        margin-left: -0.9rem;
        top: 1.95rem;
      }
    }
    .five {
      width: 3.4rem;
      height: 0.94rem;
      color: #a85e27;
      padding-top: 0.4rem;
      text-align: center;
      margin: 0.4rem auto 0;
      font-size: 0.24rem;
      box-sizing: border-box;
      i {
        color: #a85e27;
      }
      img {
        width: 0.24rem;
        height: 0.24rem;
        display: inline-block;
        vertical-align: middle;
      }
    }
    .change {
      width: 0.88rem;
      height: 0.85rem;
      position: absolute;
      right: 0.75rem;
      top: 8.1rem;
    }
  }
}

.van-popup {
  position: absolute !important;
  background: transparent !important;
  overflow-y: inherit !important;
}

.pro_one {
  position: relative;
  width: 6.02rem;
  height: 7.02rem;
  background: url('../img/pro_one.png');
  background-size: 100% 100%;
  z-index: 3;
  padding-top: 1.82rem;
  box-sizing: border-box;
  .light {
    position: absolute;
    width: 4.8rem;
    height: 1.56rem;
    background: url('../img/light.png');
    background-size: 100% 100%;
    top: -1.6rem;
    left: 50%;
    margin-left: -2.4rem;
  }
  .close {
    position: absolute;
    width: 0.66rem;
    height: 0.66rem;
    background: url('../img/close.png');
    background-size: 100% 100%;
    right: -0.16rem;
    top: -0.16rem;
  }
  & > .title {
    width: 4rem;
    height: 1.32rem;
    position: absolute;
    top: -0.8rem;
    left: 50%;
    margin-left: -2rem;
  }
  .award_img {
    width: 1.4rem;
    height: 1.1rem;
    margin: 0 auto;
    text-align: center;
    img {
      height: 1.1rem;
    }
  }
  .award_name {
    width: 4.02rem;
    height: 0.6rem;
    line-height: 0.6rem;
    background: url('../img/award_name.png');
    background-size: 100% 100%;
    margin: 0.8rem auto 0;
    text-align: center;
    color: #fff;
    font-size: 0.26rem;
  }
  .txt {
    font-size: 0.28rem;
    line-height: 0.4rem;
    color: #98500e;
    text-align: center;
    padding: 0.4rem 0.24rem 0;
  }
}

.pro_five {
  position: relative;
  width: 6.6rem;
  height: 7.7rem;
  background: url('../img/pro_five.png');
  background-size: 100% 100%;
  .light {
    position: absolute;
    width: 4.8rem;
    height: 1.56rem;
    background: url('../img/light.png');
    background-size: 100% 100%;
    top: -1.6rem;
    left: 50%;
    margin-left: -2.4rem;
  }
  .close {
    position: absolute;
    width: 0.66rem;
    height: 0.66rem;
    background: url('../img/close.png');
    background-size: 100% 100%;
    right: -0.16rem;
    top: -0.16rem;
  }
  & > .title {
    width: 4rem;
    height: 1.32rem;
    position: absolute;
    top: -0.8rem;
    left: 50%;
    margin-left: -2rem;
  }
  .tips {
    font-size: 0.4rem;
    color: #98500e;
    font-weight: 700;
    text-align: center;
    padding: 0.7rem 0 0.27rem;
  }
  .award_img {
    width: 6.6rem;
    margin: 0 auto;
    text-align: center;
    .li1 {
      animation: bounce 1s forwards;
    }
    .li2 {
      animation: bounce 1s 1s forwards;
    }
    .li3 {
      animation: bounce 1s 2s forwards;
    }
    .li4 {
      animation: bounce 1s 3s forwards;
    }
    .li5 {
      animation: bounce 1s 4s forwards;
    }
    li {
      display: inline-block;
      vertical-align: text-top;
      width: 1.8rem;
      margin-bottom: 0.2rem;
      text-align: center;
      // transform: scale(0);
      transform: scale(1);
    }
    .img {
      width: 1.5rem;
      height: 1.5rem;
      background: #efc39b;
      border-radius: 0.2rem;
      text-align: center;
      display: inline-block;
      img {
        height: 1.1rem;
        display: inline-block;
        margin-top: 0.2rem;
      }
    }
    p {
      text-align: center;
      font-size: 0.22rem;
      color: #98500e;
      padding: 0.16rem 0 0;
    }
  }
  .txt {
    font-size: 0.28rem;
    line-height: 0.4rem;
    color: #98500e;
    text-align: center;
    padding: 0.2rem 0.6rem 0;
  }
}

@keyframes bounce {
  0% {
    transform: scale(0);
  }

  to {
    transform: scale(1);
  }
}

.record_box {
  width: 6.6rem;
  height: 9.6rem;
  background: url('../img/pro_details.png') no-repeat;
  background-size: 100% 100%;
  box-sizing: border-box;
  padding: 0.96rem 0.46rem 0;
  .light {
    position: absolute;
    width: 4.8rem;
    height: 1.56rem;
    background: url('../img/light.png');
    background-size: 100% 100%;
    top: -1.6rem;
    left: 50%;
    margin-left: -2.4rem;
  }
  .close {
    position: absolute;
    width: 0.66rem;
    height: 0.66rem;
    background: url('../img/close.png');
    background-size: 100% 100%;
    right: -0.16rem;
    top: -0.16rem;
  }
  & > .title {
    width: 4rem;
    height: 1.32rem;
    position: absolute;
    top: -0.8rem;
    left: 50%;
    margin-left: -2rem;
  }
  .total {
    p {
      font-size: 0.28rem;
      color: #98500e;
      padding-bottom: 0.02rem;
    }
  }
  .prize_title {
    display: block;
    width: 1.4rem;
    height: 0.36rem;
    margin: 0.24rem auto;
  }
  .time {
    font-size: 0.28rem;
    height: 0.3rem;
    color: #98500e;
    margin-bottom: 0.15rem;
    display: flex;
    justify-content: space-between;
    span {
      font-size: 0.28rem;
      color: #98500e;
    }
  }
  .record_con {
    overflow: auto;
    height: 5.5rem;
    width: 5.6rem;
    .list {
      display: flex;
      justify-content: space-between;
      span {
        font-size: 0.28rem;
        color: #98500e;
      }
      span:nth-of-type(2) {
        width: 2rem;
        text-align: right;
      }
    }
  }
}

.pro_close {
  width: 0.2rem;
  height: 0.2rem;
  background: url('../img/close.png') no-repeat;
  background-size: 100% 100%;
  position: absolute;
  right: 0.26rem;
  top: 0.26rem;
}

.sloading_inner,
.snone_inner {
  color: #fff;
  font-size: 0.28rem;
  padding-top: 0.3rem;
  text-align: center;
}
.snone_inner {
  padding-top: 2rem;
}

//测试
.choose {
  position: absolute;
  width: 1rem;
  height: 0.5rem;
  line-height: 0.5rem;
  text-align: center;
  background-color: red;
  border-radius: 0.12rem;
  top: 0.3rem;
  left: 0.3rem;
  font-size: 0.3rem;
  z-index: 10;
  color: #fff;
}
.choose_inner {
  position: absolute;
  width: 5rem;
  height: 5rem;
  line-height: 0.5rem;
  text-align: center;
  background-color: red;
  border-radius: 0.12rem;
  top: 0.3rem;
  left: 0.3rem;
  z-index: 11;
  direction: ltr;
  input {
    display: block;
    margin: 0 auto;
    text-align: center;
  }
  span {
    display: block;
    width: 1rem;
    height: 0.5rem;
    line-height: 0.5rem;
    text-align: center;
    background-color: #ccc;
    border-radius: 0.12rem;
    margin: 0.2rem auto;
  }
}
</style>