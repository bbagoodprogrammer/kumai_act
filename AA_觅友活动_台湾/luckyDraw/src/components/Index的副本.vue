<template>
  <div id="apps">
    <div class="main_container">
      <div class="title">{{lang.title}}</div>

      <div class="inner">
        <div class="btn">
          <div class="rank" @click="openRank()">
            <span class="open_rank"></span>
          </div>
          <div class="left">
            <span class="open_record" @click="openRecord()"></span>
            <span class="open_rule" @click="openRule()"></span>
          </div>
        </div>

        <div class="turntable_box">
          <ul id="rotary_table">
            <li
              v-for="(item, index) in awards"
              :key="index"
              :class="['award' + index, { active: index == current }]"
              class="award"
            >
              <i class="val">{{ item.award_value }}</i>
              <img v-if="item.award_type == 0" src="../img/gift.png" alt />
              <img v-else :src="item.award_img" alt />
              <div
                class="mask"
                :class="{ breathe: is_breathe }"
                v-if="index == current"
              ></div>
              <div
                class="mask1"
                :class="{ breathe: is_breathe }"
                v-if="index == current"
              ></div>
            </li>
            <div id="start-btn"></div>
          </ul>
        </div>

        <div class="mainTab">
          <span @click="start(1)">
            <i>{{lang.draw1}}</i>
            <img src="../img/coins.png" alt="" />
            <i>{{ costs[1] }}</i>
          </span>
          <span @click="start(10)">
            <i>{{lang.draw10}}</i>
            <img src="../img/coins.png" alt="" />
            <i>{{ costs[10] }}</i>
          </span>
        </div>
      </div>

      <van-popup
        v-model="rule_show"
        position="bottom"
        round
        @close="closeRuleVan()"
        :style="{ height: '6.16rem' }"
        :close-on-click-overlay="false"
      >
        <div class="rule_box">
          <i class="close" @click="closeRuleVan()"></i>
          <p class="pro_title">{{lang.rule_title}}</p>
          <div class="rule_con">
            <ul>
              <li v-for="(item, i) in lang.rule" :key="i">
                <span>{{ i + 1 }}</span>
                <span>{{ item }}</span>
              </li>
            </ul>
          </div>
        </div>
      </van-popup>

      <van-popup
        v-model="record_show"
        position="bottom"
        round
        @close="closeRecordVan()"
        :close-on-click-overlay="false"
        :style="{ height: '9.78rem' }"
      >
        <div class="record_box">
          <i class="close" @click="closeRecordVan()"></i>
          <p class="pro_title">{{lang.record_title}}</p>
          <div class="record_con scrollable" v-if="record_show">
            <inner-scroll-load-list
              :url="record_url"
              :parse="proDataParseRecord"
              :reset="reset"
            >
              <div slot-scope="{ list, loading, none, end }">
                <record-item
                  v-for="(item, index) in list"
                  :info="item"
                  :key="index"
                />
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

      <van-popup
        v-model="rank_show"
        position="bottom"
        round
        @close="closeRankVan()"
        :close-on-click-overlay="false"
        :style="{ height: '9.78rem' }"
      >
        <div class="rank_box">
          <i class="hang1"></i>
          <i class="hang2"></i>
          <i class="hang3"></i>
          <i class="tag"></i>
          <i class="close" @click="closeRankVan()"></i>
          <p class="pro_title">{{lang.rank_title}}</p>
          <div class="rank_inner">
            <div class="rank_con scrollable scrollableRank" v-if="rank_show">
              <inner-scroll-load-list
                :url="rank_url"
                :parse="proDataParseRank"
                :reset="reset"
              >
                <div slot-scope="{ list, loading, none, end }">
                  <rank-item
                    v-for="(item, index) in list"
                    :info="item"
                    :key="index"
                  />
                  <div v-show="loading" class="sloading_inner">
                    {{ lang.loading }}
                  </div>
                  <div v-show="none" class="snone_inner">
                    {{ lang.no_data }}
                  </div>
                  <div v-show="end" class="send_inner"></div>
                </div>
              </inner-scroll-load-list>
            </div>
          </div>
        </div>
      </van-popup>

      <!-- <transition name="bounce"> -->
      <van-popup v-model="balance_show" :close-on-click-overlay="false">
        <!-- <div class="balance_inner" v-if="balance_show"> -->
        <div class="balance">
          <i class="pro_close" @click="balance_show = false"></i>
          <p v-html="lang.balance_tips"></p>
          <div class="pro_btn" @click="goValue()">{{lang.go_value}}</div>
        </div>
        <!-- </div> -->
      </van-popup>
      <!-- </transition> -->

      <van-popup v-model="gift_flag" :close-on-click-overlay="false">
        <div
          class="pro_gift"
          :class="{
            pro_gift2: res_awards.length < 6 && res_awards.length > 1,
            pro_gift3: res_awards.length > 6,
          }"
        >
          <p class="title">{{lang.awards_title}}</p>
          <div class="gift_lists">
            <div class="list" v-for="(item, i) in show_awards" :key="i">
              <span v-if="item.award_type == 0">
                <img src="../img/gift.png" alt />
              </span>
              <span v-else>
                <img :src="item.award_img" alt="" />
              </span>
              <p>
                <span>x{{ item.award_num }}</span>
                <span v-if="item.award_type == 0">+{{ item.award_value }}</span>
                <span v-else>+{{ item.award_days }}days</span>
              </p>
            </div>
          </div>
          <div class="pro_btn" @click="gift_flag = false">{{lang.ok}}</div>
        </div>
      </van-popup>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import store from "../store";
import { getUrlString, toast } from "../utils";
import { lotteryForGrids } from "../utils/lottery";
import { draw } from "../apis";
import InnerScrollLoadList from "./InnerScrollLoadList";
import RecordItem from "./RecordItem";
import RankItem from "./RankItem";
const uid = getUrlString("uid");
const token = getUrlString("token");
const lang = getUrlString("lang");
const ios = navigator.userAgent.match(/iPhone|iPod|ios|iPad/i);

export default {
  data() {
    return {
      is_go:true,
      is_breathe: false,
      record_flag: false,
      rule_show: false,
      record_show: false,
      record_url: "",
      rank_show: false,
      rank_url: "",
      reset: false,
      balance_show: false,
      gift_flag: false,
      awards_test: [
        // 图片名字与ID
        { id: 0, name: 1000 },
        { id: 1, name: 2234 },
        { id: 2, name: 323 },
        { id: 3, name: 4235 },
        { id: 4, name: 523 },
        { id: 5, name: 6235 },
        { id: 6, name: 7353 },
        { id: 7, name: 823 },
        { id: 8, name: 9234 },
        { id: 9, name: 103 },
        { id: 10, name: 1123 },
        { id: 11, name: 122 },
      ],
      current: 0, // 当前索引值
      speed: 100, // 时间->速度
      diff: 10, // 基数
      award: {}, // 抽中的奖品
      time: 0, // 当前时间戳
      timer: null, // 定时器
      ten_times: 0,
      time1: 2,
      time2: 2.5,
      count: 1,
      res: [1, 2, 5, 6, 8, 3, 6, 3, 5, 8],
      res_awards: [],
      show_awards:[],
      st1:0,
      et2:0,
    };
  },
  computed: {
    ...mapState(["loading", "awards", "costs"]),
  },
  mounted() {
    this.$store.dispatch("getInitInfo");
    this.$store.dispatch("getDrawCost");
  },
  methods: {
    closeRuleVan() {
      this.rule_show = false;
    },

    closeRecordVan() {
      this.record_show = false;
    },

    closeRankVan() {
      this.rank_show = false;
    },

    goValue(){
      location.href = 'walletConfig://';
    },

    openRule() {
      this.rule_show = true;
    },
    openRecord() {
      this.record_show = true;
      this.record_url =
        "/index.php?action=LuckyDraw.getDrawHistory&uid={uid}&token={token}&from_pos={from_pos}&start={from}";
    },
    openRank() {
      this.rank_show = true;
      this.rank_url =
        "/index.php?action=LuckyDraw.getTodayRank&uid={uid}&token={token}&from_pos={from_pos}&start={from}";
    },
    proDataParseRecord(data) {
      if (!data.response_status.code) {
        return data.response_data || [];
      } else {
        return [];
      }
    },
    proDataParseRank(data) {
      if (!data.response_status.code) {
        return data.response_data || [];
      } else {
        return [];
      }
    },

    mergeArr(arr) {
        var newArr = [];
        arr.forEach((item) => {
          var dataItem = item;
          if (newArr.length > 0) {
            var filterValue = newArr.filter((v) => {
              return v.idx == dataItem.idx;
            });
            if (filterValue.length > 0) {
              newArr.forEach((n) => {
                if (n.idx == filterValue[0].idx) {
                  n.award_days = filterValue[0].award_days + dataItem.award_days;
                  n.award_num = filterValue[0].award_num + dataItem.award_num;
                }
              });
            } else {
              newArr.push(dataItem);
            }
          } else {
            newArr.push(dataItem);
          }
        });
        return newArr;
      },
    // 开始抽奖
    async start(count) {

      // lotteryForGrids(12,4,(index)=>{
      //   this.current = index;
      // },()=>{
      //   console.log('333');
      // },this.current);
      // lotteryForGrids(12,4,()=>{},()=>{},4);
      // return;
      // this.st1 = Date.now();
      // if(!this.is_go){
      //   return;
      // }
      // this.speed = 100;
      // this.time1 = 2;
      // this.time2 = 2.5;
      // this.is_go = false;
      // this.res_awards = [];
      // this.count = count;

      //============
      this.res_awards = [
        {
          award_days: 80,
          award_img:
            "http://ufile.supervoice-app.com/uc/car/picture_1562728739.png",
          award_name: "coin",
          award_num: 1,
          award_type: 0,
          award_value: 100,
          idx: 1,
        },
        {
          award_days: 80,
          award_img:
            "http://ufile.supervoice-app.com/uc/car/picture_1562728739.png",
          award_name: "coin",
          award_num: 1,
          award_type: 0,
          award_value: 100,
          idx: 4,
        },
        {
          award_days: 60,
          award_img:
            "http://ufile.supervoice-app.com/uc/avatar_frame/pic_url_1612777514.png",
          award_name: "coin",
          award_num: 1,
          award_type: 0,
          award_value: 100,
          idx: 7,
        },
        {
          award_days: 40,
          award_img:
            "http://ufile.supervoice-app.com/uc/car/picture_1562728739.png",
          award_name: "coin",
          award_num: 1,
          award_type: 0,
          award_value: 100,
          idx: 8,
        },
        {
          award_days: 10,
          award_img:
            "http://ufile.supervoice-app.com/uc/car/picture_1562728671.png",
          award_name: "coin",
          award_num: 1,
          award_type: 0,
          award_value: 100,
          idx: 2,
        },
        {
          award_days: 80,
          award_img:
            "http://ufile.supervoice-app.com/uc/car/picture_1562728739.png",
          award_name: "coin",
          award_num: 1,
          award_type: 0,
          award_value: 100,
          idx: 3,
        },
        {
          award_days: 0,
          award_img: "http://ufile.supervoice-app.com/uc/car/picture_1562728739.png",
          award_name: "coin",
          award_num: 1,
          award_type: 0,
          award_value: 100,
          idx: 4,
        },
        {
          award_days: 0,
          award_img: "http://ufile.supervoice-app.com/uc/avatar_frame/pic_url_1610012163.png",
          award_name: "coin",
          award_num: 1,
          award_type: 0,
          award_value: 100,
          idx: 10,
        },
        {
          award_days: 0,
          award_img: "http://ufile.supervoice-app.com/uc/car/picture_1562728739.png",
          award_name: "coin",
          award_num: 1,
          award_type: 0,
          award_value: 100,
          idx: 11,
        },
        {
          award_days: 0,
          award_img: "http://ufile.supervoice-app.com/uc/car/picture_1562728739.png",
          award_name: "coin",
          award_num: 1,
          award_type: 0,
          award_value: 100,
          idx: 9,
        },
      ];

      //cycle 圈数duration时间
      lotteryForGrids(12,this.res_awards[4].idx,(index)=>{
        this.current = index;
      },()=>{
        console.log('333');
      },this.current,3,3000);


      console.log(this.mergeArr(this.res_awards));
      this.show_awards = this.mergeArr(this.res_awards);
      this.getLottery();
      this.time = Date.now();
      return;
      //============

      const res = await draw(this.count);
      if (res.data) {
        const { response_status, response_data } = res.data;
        if (response_status.error === "") {
          console.log(response_data);
          
          this.res_awards = response_data.awards;
          this.show_awards = this.mergeArr(this.res_awards);
          this.getLottery();
          this.time = Date.now();
        }else if(response_status.code==10022) {
          this.balance_show = true;
          this.is_go = true;
        }else {
          toast(response_status.error);
          this.is_go = true;
        }
      }
      // 开始抽奖
      // this.getLottery();
      // this.speed = 100;
      // this.diff = 10;
    },
    // 调接口获取奖品
    getLottery() {
      // const res = await draw(this.count);
      // if (res.data) {
      //   const { response_status, response_data } = res.data;
      //   if (response_status.error === "") {
      //     this.time = Date.now();
      //     var randomNum = String(response_data.awards[0].idx);
      //     this.award.award_name = response_data.awards[0].idx;
      //     this.award.id = randomNum;
      //     this.res_awards = response_data.awards;
      //     this.move();
      //   } else {
      //     toast(response_status.error);
      //   }
      // }
      // return;
      // this.ten_times++;
      // setTimeout(() => {
      // console.log(this.res_awards,this.ten_times,this.ten_times-1);
      // console.log(this.ten_times);
      // var randomNum = String(this.res_awards[this.ten_times - 1].idx);
      // this.award.award_name = randomNum;
      // this.award.id = randomNum;
      // this.move();
      // }, 500);
    },
    // 开始转动
    move() {
      this.timer = setTimeout(() => {
        this.current++;
        if (this.current > 11) {
          this.current = 0;
        }
        // 若抽中的奖品id存在，则开始减速转动
        if (this.award.id && (Date.now() - this.time) / 1000 > this.time1) {
          console.log(Date.now()-this.st1);
          // this.speed -= this.diff/5; // 转动减速
          // 若转动时间超过5秒，并且奖品id等于小格子的奖品id，则停下来
          if ((Date.now() - this.time) / 1000 > this.time2 &&this.award.id == this.awards[this.current].id) {
            clearTimeout(this.timer);
            this.is_breathe = true;
            setTimeout(() => {
              this.is_breathe = false;
              if (this.count == 10) {
                if (this.ten_times >= this.res_awards.length) {
                  this.gift_flag = true;
                  this.is_go = true;
                  console.log(Date.now()-this.st1);
                } else {
                  this.getLottery();
                  this.time = Date.now();
                  this.speed = 20;
                  this.time1 = 0.2;
                  this.time2 = 0.2;
                }
              } else {
                console.log(Date.now()-this.st1);
                this.gift_flag = true;
                this.is_go = true;
              }
            }, 350);
            return;
          }
        } else {
          // 若抽中的奖品不存在，则加速转动
          // console.log("+++");
          //乘以倍数越大，越快，可用于十次
          // this.speed -= this.diff*3
        }

        this.move();
      }, this.speed);
    },
  },
  components: {
    InnerScrollLoadList,
    RecordItem,
    RankItem,
  },
};
</script>

<style lang="scss">
body {
  background: transparent;
}
#app {
  background: #200267;
}
.main_container {
  width: 7.5rem;
  height: 10.38rem;
  position: relative;
  .title {
    z-index: 1;
    width: 7.5rem;
    height: 1.41rem;
    background: url("../img/title_index.png") no-repeat;
    background-size: 100% 100%;
    position: relative;
    font-size: 0.5rem;
    font-weight: 500;
    color: #ffffff;
    display: flex;
    justify-content: center;
    align-items: center;
    text-shadow: #1d47bd -0.02rem 0 0, #1d47bd 0 1px 0, #1d47bd -0.02rem 0 0,
      #1d47bd 0 -0.02rem 0;
    -webkit-text-shadow: #1d47bd 1px 0 0, #1d47bd 0 1px 0, #1d47bd -0.02rem 0 0,
      #1d47bd 0 -0.02rem 0;
  }
  .inner {
    width: 7.5rem;
    height: 9.78rem;
    background: url("../img/bg_index.png") no-repeat;
    background-size: 100% 100%;
    margin: -0.8rem auto 0;
    padding-top: 0.51rem;
    box-sizing: border-box;
    position: relative;
    .btn {
      height: 0.8rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 0.51rem;
      position: relative;
      z-index: 2;
      > div {
        font-size: 0;
      }
      span {
        display: inline-block;
        width: 0.8rem;
        height: 0.8rem;
        background-repeat: no-repeat;
        background-size: 100%;
      }
      .open_rank {
        background-image: url("../img/open_rank.png");
      }
      .open_record {
        background-image: url("../img/open_record.png");
      }
      .open_rule {
        background-image: url("../img/open_rule.png");
      }
    }
  }
  // 作用: 禁用弹窗里的滑动影响页面滑动
  &.prohibit {
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
  .turntable_box {
    margin: 0 auto;
    padding-top: 0.14rem;
    #rotary_table {
      width: 6.44rem;
      height: 6.44rem;
      position: relative;
      margin: 0 auto;
      .award {
        width: 1.61rem;
        height: 1.61rem;
        text-align: center;
        float: left;
        position: absolute;
        overflow: hidden;
        background: url("../img/gift_bg.png") no-repeat;
        background-size: 100% 100%;
        .val {
          width: 1.1rem;
          height: 0.35rem;
          display: flex;
          justify-content: center;
          align-items: center;
          position: absolute;
          background: url("../img/txt.png") no-repeat;
          background-size: 100% 100%;
          top: 0;
          left: 50%;
          margin-left: -0.55rem;
          font-size: 0.22rem;
          color: #64ecff;
          text-align: center;
          z-index: 1;
        }
        img {
          position: absolute;
          width: 1.04rem;
          height: 1.04rem;
          top: 0.36rem;
          left: 50%;
          margin-left: -0.52rem;
          z-index: 1;
        }
        &.active {
          .mask {
            width: 1.55rem;
            height: 1.54rem;
            position: absolute;
            background: url("../img/choose.png") no-repeat;
            background-size: 100% 100%;
            top: 50%;
            left: 50%;
            margin: -0.775rem 0 0 -0.775rem;
            &.breathe {
              animation: breathe 0.1s infinite;
            }
          }
          .mask1 {
            width: 1.61rem;
            height: 1.61rem;
            position: absolute;
            background: url("../img/gift_bg_ac.png") no-repeat;
            background-size: 100% 100%;
            top: 50%;
            left: 50%;
            margin: -0.805rem 0 0 -0.805rem;
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
          top: 0;
          left: 1.61rem;
        }
        &.award2 {
          top: 0;
          left: 3.22rem;
        }
        &.award3 {
          top: 0;
          right: 0rem;
        }
        &.award4 {
          top: 1.61rem;
          right: 0rem;
        }
        &.award5 {
          top: 3.22rem;
          right: 0rem;
        }
        &.award6 {
          bottom: 0;
          right: 0rem;
        }
        &.award7 {
          bottom: 0;
          left: 3.22rem;
        }
        &.award8 {
          bottom: 0;
          left: 1.61rem;
        }
        &.award9 {
          bottom: 0;
          left: 0;
        }
        &.award10 {
          bottom: 1.61rem;
          left: 0;
        }
        &.award11 {
          bottom: 3.22rem;
          left: 0;
        }
      }
      #start-btn {
        position: absolute;
        width: 3.2rem;
        height: 3.2rem;
        background: url("../img/centre.png") no-repeat;
        background-size: 100% 100%;
        top: 50%;
        left: 50%;
        margin: -1.6rem 0 0 -1.6rem;
      }
    }
  }

  .mainTab {
    text-align: center;
    margin-top: 0.42rem;
    display: flex;
    justify-content: space-between;
    padding: 0 0.54rem;
    span {
      width: 3.16rem;
      height: 0.91rem;
      background: url("../img/btn1.png") no-repeat;
      background-size: 100% 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      i,
      img {
        display: inline-block;
        vertical-align: middle;
      }
      i:nth-of-type(1) {
        font-size: 0.26rem;
        font-weight: 600;
        color: #ffffff;
        padding: 0 0.2rem;
      }
      i:nth-of-type(2) {
        font-size: 0.26rem;
        color: #ffffff;
      }
      img {
        width: 0.26rem;
        height: 0.26rem;
        margin: 0 0.11rem;
      }
    }
  }

  .van-popup {
    position: absolute;
  }

  .van-popup--bottom {
    bottom: 0;
    left: 0;
    width: 100%;
  }

  .pro_title {
    margin: 0 auto;
    width: 3.18rem;
    height: 0.71rem;
    text-align: center;
    box-sizing: border-box;
    line-height: 0.64rem;
    background: url("../img/title.png") no-repeat;
    background-size: 100% 100%;
    font-size: 0.32rem;
    font-weight: 500;
    color: #ffffff;
    text-shadow: 0 0.06rem 0.06rem rgba(26, 42, 136, 0.2);
    position: relative;
    z-index: 1;
  }

  .close {
    width: 0.22rem;
    height: 0.32rem;
    background: url("../img/arrow.png") no-repeat;
    background-size: 100% 100%;
    position: absolute;
    left: 0.4rem;
    top: 0.4rem;
    z-index: 2;
  }

  .rule_box {
    width: 7.5rem;
    height: 6.16rem;
    background: url("../img/bg_rule.png") no-repeat;
    background-size: 100% 100%;
    position: relative;
    .rule_con {
      width: 7.5rem;
      padding: 0.65rem 0.55rem 0;
      box-sizing: border-box;
      ul {
        li {
          display: flex;
          margin-bottom: 0.4rem;
          span {
            display: inline-block;
          }
          span:nth-of-type(1) {
            width: 0.54rem;
            height: 0.54rem;
            line-height: 0.54rem;
            text-align: center;
            background: url("../img/num.png") no-repeat;
            background-size: 100% 100%;
            font-size: 0.24rem;
            color: #ffffff;
            margin-top: -0.1rem;
          }
          span:nth-of-type(2) {
            width: 6rem;
            font-size: 0.26rem;
            line-height: 0.4rem;
            color: #fff;
            padding: 0 .1rem;
            box-sizing: border-box;
          }
        }
      }
    }
  }

  .van-popup--bottom.van-popup--round {
    background: transparent;
  }

  .record_box,
  .rank_box {
    width: 7.5rem;
    height: 9.78rem;
    background: url("../img/bg_rank.png") no-repeat;
    background-size: 100% 100%;
    position: relative;
    overflow: hidden;
    .tag {
      position: absolute;
      top: 0.01rem;
      display: inline-block;
      width: 7.5rem;
      height: 1.7rem;
      background: url("../img/lucky_bg.png") no-repeat;
      background-size: 100% 100%;
      z-index: 2;
    }
    .record_con,
    .rank_con {
      height: 8.5rem;
      overflow: auto;
      margin: 0 auto;
      p {
        color: #fff;
      }
    }
  }

  .record_box {
    background-image: url("../img/bg_rank1.png");
  }

  .rank_box {
    .pro_title {
      position: absolute;
      z-index: 1;
      top: 0;
      left: 50%;
      margin-left: -1.59rem;
    }
    .rank_inner {
      // height: 8.5rem;
      padding-top: 1.3rem;
      box-sizing: border-box;
    }
    .rank_con {
      height: 8.3rem;
      position: relative;
    }
    .hang1 {
      display: inline-block;
      width: 4.71rem;
      height: 0.28rem;
      position: absolute;
      left: 50%;
      margin-left: -2.355rem;
      bottom: -0.08rem;
      z-index: 2;
      background: url("../img/hang1.png") no-repeat;
      background-size: 100% 100%;
    }
    .hang2 {
      display: inline-block;
      width: 0.29rem;
      height: 4.71rem;
      position: absolute;
      top: 50%;
      margin-top: -2.355rem;
      left: -0.05rem;
      z-index: 2;
      background: url("../img/hang2.png") no-repeat;
      background-size: 100% 100%;
    }
    .hang3 {
      display: inline-block;
      width: 0.29rem;
      height: 4.71rem;
      position: absolute;
      top: 50%;
      margin-top: -2.355rem;
      right: -0.05rem;
      z-index: 2;
      background: url("../img/hang3.png") no-repeat;
      background-size: 100% 100%;
    }
  }

  .rank_top {
    height: 5.1rem;
    position: relative;
    .tag {
      position: absolute;
      top: -0rem;
      display: inline-block;
      width: 7.5rem;
      height: 5.6rem;
      background: url("../img/lucky_bg.png") no-repeat;
      background-size: 100% 100%;
    }
  }

  .van-popup {
    background: transparent;
  }

  // .balance_inner {
  //   position: fixed;
  //   left: 0;
  //   top: 0;
  //   right: 0;
  //   bottom: 0;
  //   background: rgba(0, 0, 0, 0.5);
  //   z-index: 10000;
  //   display: flex;
  //   justify-content: center;
  //   align-items: center;
  .balance {
    width: 4.21rem;
    height: 2.91rem;
    background: url("../img/pro.png") no-repeat;
    background-size: 100% 100%;
    position: relative;
    p {
      font-size: 0.26rem;
      color: #ffffff;
      line-height: 0.4rem;
      text-align: center;
      padding-top: 0.69rem;
    }
  }
  // }

  .pro_gift {
    width: 5.19rem;
    height: 4.31rem;
    background: url("../img/pro_gift1.png") no-repeat;
    background-size: 100% 100%;
    position: relative;
    box-sizing: border-box;
    padding-top: 0.01rem;
    &.pro_gift2 {
      height: 5.55rem;
      background-image: url("../img/pro_gift2.png");
      .gift_lists {
        height: 3.94rem;
        text-align: left;
      }
    }
    &.pro_gift3 {
      height: 6.99rem;
      background-image: url("../img/pro_gift2.png");
      .gift_lists {
        height: 5.1rem;
        overflow: auto;
        text-align: left;
      }
    }
    .title {
      width: 3.18rem;
      height: 0.71rem;
      text-align: center;
      box-sizing: border-box;
      line-height: 0.64rem;
      background: url("../img/title.png") no-repeat;
      background-size: 100% 100%;
      margin: 0 auto;
      font-size: 0.32rem;
      font-weight: 500;
      color: #ffffff;
      text-shadow: 0 0.06rem 0.06rem rgba(26, 42, 136, 0.2);
      position: relative;
    }
    .gift_lists {
      // display: flex;
      // justify-content: center;
      // align-items: center;
      height: 2.7rem;
      width: 4.8rem;
      text-align: center;
      padding-top: .3rem;
      padding-bottom: .1rem;
      margin: 0 auto;
      font-size: 0;
      box-sizing: border-box;
      .list {
        display: inline-block;
        vertical-align: text-top;
        font-size: 0;
        // margin: 0 .1rem .29rem;
        margin: 0 0.1rem 0rem;
        text-align: center;
        width: 1.4rem;
        >span{
          display: inline-block;
          width: 1.2rem;
          margin-bottom: .09rem;
        }
        img {
          width: 1.2rem;
        }
        p {
          line-height: 1;
          font-size: 0;
          span {
            line-height: 1;
          }
          span:nth-of-type(1) {
            font-size: 0.2rem;
            font-weight: 500;
            color: #ffffff;
            line-height: 0.32rem;
            text-shadow: #39c1f7 -0.01rem 0 0, #39c1f7 0 1px 0,
              #39c1f7 -0.01rem 0 0, #39c1f7 0 -0.01rem 0;
            -webkit-text-shadow: #39c1f7 1px 0 0, #39c1f7 0 1px 0,
              #39c1f7 -0.01rem 0 0, #39c1f7 0 -0.01rem 0;
            padding: 0 0.05rem;
          }
          span:nth-of-type(2) {
            font-size: 0.2rem;
            font-weight: 500;
            color: #ffffff;
            line-height: 0.32rem;
            text-shadow: #6f3d93 -0.01rem 0 0, #6f3d93 0 1px 0,
              #6f3d93 -0.01rem 0 0, #6f3d93 0 -0.01rem 0;
            -webkit-text-shadow: #6f3d93 1px 0 0, #6f3d93 0 1px 0,
              #6f3d93 -0.01rem 0 0, #6f3d93 0 -0.01rem 0;
          }
        }
      }
    }
  }

  .pro_btn {
    width: 2.72rem;
    height: 0.73rem;
    display: flex;
    justify-content: center;
    align-items: center;
    background: url("../img/btn2.png") no-repeat;
    background-size: 100% 100%;
    font-size: 0.28rem;
    flex-wrap: 500;
    color: #ffffff;
    position: absolute;
    left: 50%;
    margin-left: -1.36rem;
    bottom: 0.28rem;
  }
  .pro_close {
    width: 0.2rem;
    height: 0.2rem;
    background: url("../img/close.png") no-repeat;
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
}
</style>