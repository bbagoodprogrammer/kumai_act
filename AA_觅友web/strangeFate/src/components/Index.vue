<template>
  <div class="page pageIndex appView">
    <div
      class="banner"
      :style="{ 'background-image': 'url(' + images.bg + ')' }"
    >
      <div class="open_right">
        <img src="../img/open_rule.png" @click="openRule()" alt="" />
        <img src="../img/open_record.png" @click="openRecord()" alt="" />
      </div>
      <div class="open_left">
        <span
          @click="openComeList()"
          :style="{ 'background-image': 'url(' + images.open_rank + ')' }"
        ></span>
        <span
          @click="openRank()"
          :style="{ 'background-image': 'url(' + images.open_list + ')' }"
        ></span>
      </div>

      <div
        v-if="status == 2"
        @click="toggle(1)"
        class="icon"
        :style="{ 'background-image': 'url(' + images.icon_befall + ')' }"
      ></div>
      <div
        v-if="status == 1"
        @click="toggle(2)"
        class="icon"
        :style="{ 'background-image': 'url(' + images.icon_bless + ')' }"
      ></div>

      <!-- svga -->
      <div class="svga_hit" v-show="status == 1">
        <svga-preview :url="svgaArr.befall" ref="child1" :isLoop="false" />
      </div>
      <div class="svga_hit" v-show="status == 2">
        <svga-preview :url="svgaArr.bless" ref="child10" :isLoop="is_play" />
      </div>

      <div class="mid">
        <div class="round">
          <span v-if="status == 1 && !befall.isOK"
            ><img src="../img/one.png" alt=""
          /></span>
          <span v-if="status == 1 && befall.isOK"
            ><img :src="images.done" alt=""
          /></span>
          <span v-if="status == 2 && !bless.isOK"
            ><img :src="images.unopen" alt=""
          /></span>
          <span v-if="status == 2 && bless.isOK">
            <em>{{ ttminute }}:</em>
            <em>{{ ttsecond }}</em>
          </span>

          <span v-if="status == 1" class="span2"
            ><img :src="images.fate_befall" alt=""
          /></span>
          <span v-if="status == 2" class="span2"
            ><img :src="images.fate_bless" alt=""
          /></span>
        </div>
        <div class="bg">
          <span
            ><strong v-html="status == 1 ? befall.value : bless.value"></strong>
            <strong>{{ lang.value }}</strong></span
          >
          <span>
            <strong v-show="status == 1" :style="{ width: len + 'rem' }">
              <i></i>
            </strong>
            <strong
              v-show="status == 2"
              :style="{ width: len_bless + 'rem' }"
              class="blessBg"
            >
              <i></i>
            </strong>
          </span>
          <span
            ><strong v-html="status == 1 ? befall.limit : bless.limit"></strong>
            <strong>{{ lang.dist }}</strong></span
          >
        </div>
        <p class="tips">{{ lang.tips }}</p>
        <div class="btn" @click="sendRoomGift()">{{ lang.sendRoomGift }}</div>
        <div class="reward">
          <div class="tab">
            <span @click="mainTabClick(1)" :class="{ cur: cur == 1 }"
              ><i>{{lang.tab1}}</i> <em v-if="cur == 1"></em
            ></span>
            <span @click="mainTabClick(2)" :class="{ cur: cur == 2 }"
              ><i>{{lang.tab2}}</i> <em v-if="cur == 2"></em
            ></span>
            <span @click="mainTabClick(3)" :class="{ cur: cur == 3 }"
              ><i>{{lang.tab3}}</i> <em v-if="cur == 3"></em
            ></span>
          </div>
          <div class="list">
            <div class="main" v-if="cur == 1">
              <div class="cell">
                <div>
                  <span>
                    <img v-if="status == 1" :src="images.reward3" alt="" />
                    <img v-if="status == 2" :src="images.reward7" alt="" />
                  </span>
                  <span v-if="status == 1">
                    <strong>{{lang.cell1.title}}</strong> <em>{{lang.cell1.tips}}</em>
                  </span>
                  <span v-if="status == 2">
                    <strong>{{lang.h_cell1.title}}</strong> <em>{{lang.h_cell1.tips}}</em>
                  </span>
                </div>
              </div>
              <div class="cell">
                <div>
                  <span>
                    <img v-if="status == 1" :src="images.reward4" alt="" />
                    <img v-if="status == 2" :src="images.reward8" alt="" />
                  </span>
                  <span v-if="status == 1">
                    <strong>{{lang.cell2.title}}</strong> <em>{{lang.cell2.tips}}</em>
                  </span>
                  <span v-if="status == 2">
                    <strong>{{lang.h_cell2.title}}</strong> <em>{{lang.h_cell2.tips}}</em>
                  </span>
                </div>
              </div>
            </div>
            <div class="main" v-if="cur == 2">
              <div class="cell">
                <div>
                  <span>
                    <strong v-if="status == 1">
                      <img :src="images.reward1" alt="" />
                      <i>
                        <img src="../img/x5.png" alt="" />
                      </i>
                    </strong>
                    <strong v-if="status == 2">
                      <img :src="images.reward5" alt="" />
                    </strong>
                  </span>
                  <span v-if="status == 1">
                    <strong>{{lang.cell3.title}}</strong> <em>{{lang.cell3.tips}}</em>
                  </span>
                  <span v-if="status == 2">
                    <strong>{{lang.h_cell3.title}}</strong> <em>{{lang.h_cell3.tips}}</em>
                  </span>
                </div>
              </div>
              <div class="cell">
                <div>
                  <span
                    ><img v-if="status == 1" :src="images.reward2" alt="" />
                    <img v-if="status == 2" :src="images.reward6" alt=""
                  /></span>
                  <span v-if="status == 1"
                    ><strong>{{lang.cell4.title}}</strong> <em>{{lang.cell4.tips}}</em></span
                  >
                  <span v-if="status == 2"
                    ><strong>{{lang.h_cell4.title}}</strong> <em>{{lang.h_cell4.tips}}</em></span
                  >
                </div>
              </div>
            </div>
            <div class="main" v-if="cur == 3">
              <div class="cell">
                <div>
                  <span>
                    <img v-if="status == 1" :src="images.reward2" alt="" />
                    <img v-if="status == 2" :src="images.reward6" alt="" />
                  </span>
                  <span v-if="status == 1">
                    <strong>{{lang.cell4.title}}</strong> <em>{{lang.cell4.tips}}</em>
                  </span>
                  <span v-if="status == 2">
                    <strong>{{lang.h_cell4.title}}</strong> <em>{{lang.h_cell4.tips}}</em>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { init } from "../apis";
import SvgaPreview from "./SvgaPreview";
import downTime from "../utils/downTime";
import { pageInited, appClose, callApp, toast } from "../utils";
const ios = navigator.userAgent.match(/iPhone|iPod|ios|iPad/i);
export default {
  data() {
    return {
      cur: 2,
      status: 0,
      svgaArr: {
        befall:
          "http://fstatic.cat1314.com/uc/svga/3a9adb99d312cf44e70fb6bb117b8495_1616728734.svga",
        bless:
          "http://fstatic.cat1314.com/uc/svga/6041af9d0a4ab79e66d275055ec059f3_1616731026.svga",
      },
      befall: {},
      bless: {},
      len: 0,
      len_bless: 0,
      total_status: 0,
      is_play: false,
      timer: null,
      ttday: "00",
      tthour: "00",
      ttminute: "00",
      ttsecond: "00",
    };
  },
  mounted() {
    this.init();
  },
  computed: {
    ...mapState(["loading"]),
  },

  methods: {
    init() {
      (async () => {
        const res = await init();
        if (res.data) {
          const { response_status, response_data } = res.data;
          if (response_status.error === "") {
            // response_data.status = 2;
            // response_data.befall = {
            //   isOK: false,
            //   limit: 10000,
            //   value: 3000,
            // }
            // response_data.bless = {
            //   isOK: true,
            //   limit: 20000,
            //   surplus: 343,
            //   value: 3439,
            // }
            if (response_data.status == 2 && response_data.bless.surplus != 0) {
              downTime("ttime", response_data.bless.surplus); //倒计时
              clearInterval(this.timer);
              this.timer = setInterval(() => {
                const tt = downTime("ttime");
                if (tt) {
                  this.ttday = tt.day;
                  this.tthour = tt.hour;
                  this.ttminute = tt.minute;
                  this.ttsecond = tt.second;
                  if (
                    tt.hour == "00" &&
                    tt.minute == "00" &&
                    tt.second == "00"
                  ) {
                    const tt = downTime("ttime");
                    this.init();
                  } else {
                  }
                } else {
                }
              }, 1000);
            }
            if (response_data.status == 2) {
              this.is_play = true;
            }
            this.status = response_data.status;
            this.total_status = response_data.status;
            this.befall = response_data.befall;
            this.bless = response_data.bless;
            setTimeout(() => {
              (this.len =
                (response_data.befall.value / response_data.befall.limit) *
                4.8),
                (this.len_bless =
                  (response_data.bless.value / response_data.bless.limit) *
                  4.8);
            }, 30);
          } else {
          }
        }
      })();
    },
    appClose,
    sendRoomGift () {
      this.appClose();
      if(ios){
        sendJsData("app://sendRoomGift")
      }else{
        JSInterface.sendJsData("app://sendRoomGift");
      }
    },
    closeWeb() {
      this.appClose();
    },
    mainTabClick(t) {
      this.cur = t;
    },
    openRule() {
      this.$router.push("/rule");
    },
    openComeList() {
      this.$router.push("/comeList?status=" + this.status);
    },
    openRecord() {
      this.$router.push("/record");
    },
    openRank() {
      this.$router.push("/rankGroups");
    },
    toggle(t) {
      this.status = t;
    },
  },
  components: {
    SvgaPreview,
  },
};
</script>

<style lang="scss">
body {
  background: transparent;
}
.page {
  box-sizing: border-box;
}
canvas {
  width: 100%;
}
.pageIndex {
  .banner {
    width: 7.5rem;
    height: 9.39rem;
    background-size: 100% 100%;
    position: relative;
    .open_right {
      position: absolute;
      top: 0.3rem;
      left: 0.3rem;
      font-size: 0;
      z-index: 1;
      img {
        display: inline-block;
        width: 0.34rem;
        height: 0.34rem;
      }
      img:first-of-type {
        margin-right: 0.25rem;
      }
    }
    .open_left {
      position: absolute;
      width: 1.72rem;
      top: 0.36rem;
      right: 0;
      font-size: 0;
      text-align: right;
      z-index: 1;
      span {
        display: inline-block;
      }
      span:first-of-type {
        width: 0.98rem;
        height: 0.57rem;
        text-align: center;
        background-size: 100% 100%;
        margin-bottom: 0.13rem;
      }
      span:nth-of-type(2) {
        width: 1.72rem;
        height: 0.6rem;
        line-height: 0.6rem;
        text-align: center;
        background-size: 100% 100%;
      }
    }
    .icon {
      position: absolute;
      width: 1.2rem;
      height: 1.2rem;
      right: 0.35rem;
      top: 1.95rem;
      background-size: 100% 100%;
      z-index: 1;
    }

    .svga_hit {
      width: 7.5rem;
      height: 5.2rem;
      position: absolute;
      top: 0.1rem;
      left: 0;
      z-index: 0;
    }

    .mid {
      padding-top: 4rem;
      position: relative;
      z-index: 0;
      .round {
        width: 1.63rem;
        height: 1.2rem;
        background: url("../img/round.png") no-repeat;
        background-size: 100% 100%;
        margin: 0 auto;
        text-align: center;
        span {
          display: block;
          margin: 0 auto;
          &:first-of-type {
            width: 1rem;
            height: 0.44rem;
            margin-bottom: 0.01rem;
            font-size: 0;
            display: -ms-flexbox;
            display: flex;
            -ms-flex-pack: center;
            justify-content: center;
            -ms-flex-align: center;
            align-items: center;
            img {
              width: 100%;
              height: 100%;
            }
            em {
              font-size: 0.28rem;
              font-weight: 700;
              color: #fff;
              line-height: 0.32rem;
              text-shadow: #ff5fd5 0.02rem 0 0, #ff5fd5 0 0.02rem 0,
                #ff5fd5 -0.02rem 0 0, #ff5fd5 0 -0.02rem 0;
            }
          }
        }
        .span2 {
          width: 1.2rem;
          height: 0.26rem;
          img {
            width: 100%;
            height: 100%;
          }
        }
      }
      .bg {
        width: 7.1rem;
        height: 0.74rem;
        background: #2d165e;
        border-radius: 0.1rem;
        margin: -0.42rem auto 0;
        display: -ms-flexbox;
        display: flex;
        -ms-flex-align: center;
        align-items: center;
        -ms-flex-pack: center;
        justify-content: center;
        span {
          display: inline-block;
          vertical-align: middle;
          &:nth-of-type(3) {
            strong {
              &:first-of-type {
                font-size: 0.2rem;
                color: hsla(0, 0%, 100%, 0.3);
                font-weight: 700;
                margin-bottom: 0.06rem;
              }
            }
          }
          &:nth-of-type(2) {
            width: 4.8rem;
            height: 0.17rem;
            background: #fff;
            border-radius: 0.08rem;
            position: relative;
            strong {
              position: absolute;
              width: 0;
              height: 100%;
              left: 0;
              top: 0;
              border-radius: 0.08rem;
              background: #78dff3;
              min-width: 0.4rem;
              max-width: 4.8rem;
              transition: width 1.5s;
              &.blessBg {
                background: #fd62d7;
              }
              &:before {
                content: "";
                width: 100%;
                height: 0.18rem;
                position: absolute;
                left: 0;
                top: 0;
                background: url("../img/progress_bg.png") no-repeat;
                background-size: 4.8rem 0.18rem;
              }
              i {
                width: 0.9rem;
                height: 0.74rem;
                background: url("../img/dot.png") no-repeat;
                background-size: 100% 100%;
                position: absolute;
                top: 50%;
                margin-top: -0.37rem;
                right: -0.2rem;
              }
            }
          }
        }
      }
      .bg span:first-of-type,
      .bg span:nth-of-type(3) {
        text-align: center;
        width: 1.13rem;
        line-height: 1;
        strong {
          display: block;
          text-align: center;
          width: 1.13rem;
          line-height: 1;
        }
        strong:nth-of-type(1) {
          font-size: 0.28rem;
          color: #fff8ea;
          font-weight: 700;
          margin-bottom: 0.04rem;
        }
      }
      .tips {
        text-align: center;
        color: hsla(0, 0%, 100%, 0.3);
        line-height: 1;
        font-weight: 700;
        font-size: 0.22rem;
        padding: 0.17rem 0.3rem 0.22rem;
      }
      .btn {
        width: 5rem;
        height: 0.78rem;
        line-height: 0.78rem;
        text-align: center;
        background: linear-gradient(0deg, #9383ff, #7b69f8);
        border-radius: 0.39rem;
        font-size: 0.32rem;
        color: #fff;
        font-weight: 700;
        margin: 0 auto 0.41rem;
      }
      .reward {
        .tab {
          text-align: center;
          margin-bottom: 0.31rem;
          font-size: 0;
          span {
            display: inline-block;
            width: 2.2rem;
            height: 0.32rem;
            line-height: 0.32rem;
            position: relative;
            i {
              font-size: 0.24rem;
              color: #fff;
              width: 2.2rem;
              height: 0.32rem;
              line-height: 0.32rem;
              top: 50%;
              left: 50%;
              margin: -0.16rem 0 0 -1.1rem;
              position: absolute;
            }
            em {
              display: inline-block;
              width: 2.5rem;
              height: 0.32rem;
              line-height: 0.32rem;
              background-image: url("../img/choose_bg.png");
              background-size: 100% 100%;
              text-align: center;
              position: absolute;
              top: 50%;
              left: 50%;
              margin: -0.16rem 0 0 -1.25rem;
            }
            &.cur {
              i {
                font-size: 0.28rem;
                font-weight: 700;
                color: #fff;
                background: linear-gradient(315deg, #78dff3, #8170fa);
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
              }
            }
          }
        }
        .list {
          .main {
            font-size: 0;
            padding-left: 0.26rem;
            .cell {
              display: inline-block;
              vertical-align: middle;
              & > div {
                display: -ms-flexbox;
                display: flex;
                -ms-flex-align: center;
                align-items: center;
                width: 3.4rem;
                height: 1.2rem;
                background: url("../img/reward_bg.png") no-repeat;
                background-size: 100% 100%;
                box-sizing: border-box;
                padding-left: 0.17rem;
                span {
                  display: inline-block;
                  &:first-of-type {
                    width: 1.4rem;
                    height: 1.4rem;
                    margin-right: 0.02rem;
                    strong {
                      display: inline-block;
                      width: 1.4rem;
                      height: 1.4rem;
                      position: relative;
                      & > img {
                        width: 1.4rem;
                        height: 1.4rem;
                      }
                      i {
                        position: absolute;
                        z-index: 1;
                        width: 0.5rem;
                        height: 0.28rem;
                        bottom: 0.3rem;
                        right: 0.1rem;
                        img {
                          width: 100%;
                          height: 100%;
                        }
                      }
                    }
                    img {
                      width: 1.4rem;
                      height: 1.4rem;
                    }
                  }
                  &:nth-of-type(2) {
                    text-align: left;
                    strong {
                      font-size: 0.28rem;
                      color: #fff;
                      font-weight: 700;
                    }
                    em {
                      font-size: 0.2rem;
                      color: hsla(0, 0%, 100%, 0.6);
                    }
                  }
                }
              }
              &:nth-of-type(2) {
                margin-left: 0.19rem;
              }
            }
          }
        }
      }
    }
    img {
      display: block;
      width: 100%;
    }
    .mid .bg span:first-of-type,
    .mid .bg span:nth-of-type(3) {
      text-align: center;
      width: 1.13rem;
      line-height: 1;
    }
    .mid .bg span:first-of-type strong,
    .mid .bg span:nth-of-type(3) strong {
      display: block;
    }
    .mid .bg span:first-of-type strong:nth-of-type(1),
    .mid .bg span:nth-of-type(3) strong:first-of-type {
      font-size: 0.28rem;
      color: #fff8ea;
      font-weight: 700;
      margin-bottom: 0.04rem;
    }
    .mid .bg span:first-of-type strong:nth-of-type(2),
    .mid .bg span:nth-of-type(3) strong:nth-of-type(2) {
      font-size: 0.2rem;
      color: hsla(0, 0%, 100%, 0.3);
      font-weight: 700;
    }
    .mid .bg span:nth-of-type(3) strong:first-of-type {
      font-size: 0.2rem;
      color: hsla(0, 0%, 100%, 0.3);
      font-weight: 700;
      margin-bottom: 0.06rem;
    }
    .mid .reward .list .main .cell > div span:nth-of-type(2) em,
    .mid .reward .list .main .cell > div span:nth-of-type(2) strong {
      display: block;
    }
  }
}
</style>