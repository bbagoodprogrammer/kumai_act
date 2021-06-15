<template>
  <div class="page pageIndex">
    <div
      class="app_top"
      :style="{ background: '#7A68F8', height: navigatorHeight }"
    ></div>
    <div class="propsList" :style="{ paddingTop: navigatorHeight }">
      <div class="con" v-if="prize">
        <p class="tips" v-html="lang.tips.replace('%s',type==1?lang.gift_rank:lang.charm_rank)">
        </p>
        <div class="reward">
          <p class="title"><span></span> <span>{{lang.rank_reward}}</span> <span></span></p>
          <div>
            <div class="first">
              <h3>{{lang.no1}}</h3>
              <h5><i>{{prize[1][0].name}}</i></h5>
              <div class="reward_img">
                <img
                  :src="prize[1][0].url"
                  alt=""
                />
              </div>
            </div>
            <div class="other">
              <div class="secong">
                <div class="left">
                  <h3>{{lang.no2}}</h3>
                  <h5><i>{{prize[2][0].name}}</i></h5>
                </div>
                <div class="reward_img">
                  <img
                  :src="prize[2][0].url"
                    alt=""
                  />
                </div>
              </div>
              <div class="third">
                <div class="left">
                  <h3>{{lang.no3}}</h3>
                  <h5><i>{{prize[3][0].name}}</i></h5>
                </div>
                <div class="reward_img">
                  <img
                  :src="prize[3][0].url"
                    alt=""
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="rank_box">
          <p class="title">
            <span></span> <span>{{lang.past}}</span> <span></span>
          </p>
          <div class="ranking" v-if="ulist.length>0">
            <div class="rank_list" v-for="(item,i) in ulist" :key="i" :class="{other_list:i>0}">
              <div class="top1" v-if="i==0">
                <div class="top_bg">
                  <div class="avatar">
                    <span class="crown"></span> <span class="rank"></span>
                    <img
                      :src="item.avatar"
                      alt=""
                    />
                  </div>
                </div>
                <p class="nick">{{item.nick}}</p>
              </div>
              <div class="other" v-else>
                <div class="inner" :class="{third:i==2}">
                  <div class="avatar">
                    <span class="crown"></span> <span class="rank"></span>
                    <img
                      :src="item.avatar"
                      alt=""
                    />
                  </div>
                  <p class="nick">{{item.nick}}</p>
                  <p class="dics">{{type==1?lang.dist_gift:lang.dist_charm}}:{{item.value}}</p>
                </div>
              </div>
            </div>
          </div>
          <div v-else class="nodata">{{lang.no_data}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  getLangHtml,
  getTimeObj,
  getUrlString,
  getAppVer,
  getPlatform,
} from "../utils";
import {
  setFullScreen,
  setStatusBarStyle,
  getStatusBarHeight,
  callAppNew,
} from "../utils/navigation";
import { mapState } from "vuex";
import { getInitInfo } from "../apis";
const type = getUrlString('type');
export default {
  data() {
    return {
      type:type,
      navigatorHeight: 0,
      navigatorHeight2: 0,
      //   topNums: {
      //     1: '第一名',
      //     2: '第二名',
      //     3: '第三名'
      //   }
    };
  },
  computed: {
    ...mapState(["prize", "ulist"]),
    topNums() {
      return this.lang.topNums;
    },
  },
  mounted() {
    setTimeout(() => {
      const pt = getPlatform();
      const ver = getAppVer();
      if ((pt == "ios" && ver >= 165) || pt == "android") {
        setFullScreen(true);
        //  - document.getElementsByClassName('tab')[0].clientHeight
        this.navigatorHeight = getStatusBarHeight() + "px";
        this.navigatorHeight2 = getStatusBarHeight() * 1 + 14 + "px";
      }
    }, 200);
  },

  methods: {},
};
</script>

<style lang="scss">
.pageIndex {
  background: rgba(122, 104, 248, 1);
  padding-bottom: 0.5rem;
  .app_top {
    width: 100%;
    z-index: 5;
    position: fixed;
    &.app_top_fit {
      position: fixed;
      background-color: #10093c;
    }
  }
  img {
    display: block;
    width: 100%;
  }
  .con {
    .tips {
      font-family: PingFang SC;
      line-height: 0.45rem;
      color: hsla(0, 0%, 100%, 0.61);
      padding: 0.3rem 0.3rem 0.6rem;
      text-align: center;
      font-size: 0.32rem;
    }
    .title {
      text-align: center;
      padding-bottom: 0.3rem;
      span {
        display: inline-block;
        vertical-align: middle;
        &:nth-of-type(2) {
          font-family: PingFang SC;
          font-weight: 700;
          line-height: 0.51rem;
          font-size: 0.36rem;
          padding: 0 0.3rem;
        }
      }
    }
    .reward {
      & > div {
        text-align: center;
        font-size: 0;
        & > div {
          display: inline-block;
          vertical-align: middle;
          h3 {
            font-size: 0.28rem;
            color: #333;
            line-height: 0.51rem;
            font-size: bold;
          }
          .reward_img {
            img {
              width: 1.4rem;
              height: 1.4rem;
            }
          }
        }
        .first {
          width: 3.35rem;
          height: 3.3rem;
          background: #fff;
          border-radius: 0.2rem;
          margin-right: 0.2rem;
          text-align: left;
          box-sizing: border-box;
          padding: 0.2rem 0 0 0.2rem;
          h5 {
            padding-bottom: 0.4rem;
          }
          .reward_img {
            img {
              &:first-of-type {
                margin-right: 0.15rem;
              }
            }
          }
        }
        .other {
          & > div {
            width: 3.35rem;
            height: 1.55rem;
            background: #fff;
            border-radius: 0.2rem;
            box-sizing: border-box;
            padding-top: 0.08rem;
            & > div {
              display: inline-block;
              vertical-align: middle;
            }
            .left {
              margin-right: 0.09rem;
              width: 1.75rem;
              box-sizing: border-box;
            }
          }
          .secong {
            margin-bottom: 0.2rem;
          }
        }
      }
    }
    .nodata {
      font-size: 0.3rem;
      color: #ccc;
      line-height: 0.33rem;
      text-align: center;
      padding: 0.6rem 0 0;
    }
    .rank_box {
      margin-top: 0.6rem;
      padding-bottom: 0.6rem;
      .ranking {
        width: 6.9rem;
        height: 6.32rem;
        background: #fff;
        border-radius: 0.2rem;
        margin: 0 auto;
        .top1 {
          text-align: center;
          .top_bg {
            width: 4rem;
            height: 2.62rem;
            background: url('../img/bling.png') no-repeat;
            background-size: 100% 100%;
            margin: 0 auto;
            text-align: center;
          }
          .avatar {
            width: 1.72rem;
            height: 1.72rem;
            position: relative;
            display: inline-block;
            margin-top: 0.83rem;
            .crown {
              width: 0.72rem;
              height: 0.63rem;
              background: url('../img/top1_crown.png')
                no-repeat;
              background-size: 0.72rem 0.63rem;
              position: absolute;
              left: 50%;
              margin-left: -0.36rem;
              top: -0.52rem;
            }
            .rank {
              width: 0.7rem;
              height: 0.7rem;
              background: url('../img/top1.png')
                no-repeat;
              background-size: 100% 100%;
              position: absolute;
              top: -0.45rem;
              left: -0.82rem;
            }
            img {
              width: 1.68rem;
              height: 1.68rem;
              border: 0.02rem solid #ffdb19;
              border-radius: 50%;
              position: relative;
              z-index: 1;
            }
          }
          .nick {
            font-size: 0.28rem;
            font-family: PingFang SC;
            line-height: 0.54rem;
            color: #333;
          }
        }
        .other_list {
          display: inline-block;
        }
        .other {
          margin-top: 0.6rem;
          text-align: center;
          .inner {
            display: inline-block;
            vertical-align: middle;
            width: 3.4rem;
            text-align: center;
            &.third {
              .avatar {
                .crown {
                  background-image: url('../img/top3_crown.png');
                }
                .rank {
                  background-image: url('../img/top3.png');
                }
              }
            }
            .avatar {
              width: 1.42rem;
              height: 1.42rem;
              position: relative;
              display: inline-block;
              .crown {
                width: 0.5rem;
                height: 0.5rem;
                background: url('../img/top2_crown.png')
                  no-repeat;
                background-size: 100% 100%;
                position: absolute;
                right: -0.04rem;
                top: -0.28rem;
              }
              .rank {
                width: 0.7rem;
                height: 0.7rem;
                background: url('../img/top2.png')
                  no-repeat;
                background-size: 100% 100%;
                position: absolute;
                top: -0.5rem;
                left: -0.6rem;
              }
              img {
                width: 1.38rem;
                height: 1.38rem;
                border: 0.02rem solid #c2d3ff;
                border-radius: 50%;
              }
            }
            .nick {
              font-size: 0.28rem;
              font-family: PingFang SC;
              line-height: 0.43rem;
              color: #333;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
              max-width: 3rem;
            }
            .dics {
              font-size: 0.26rem;
              font-family: PingFang SC;
              line-height: 0.48rem;
              color: #ccc;
            }
          }
        }
      }
    }
  }
  .con .title span:first-of-type,
  .con .title span:nth-of-type(3) {
    width: 0.3rem;
    height: 0.2rem;
    background: url('../img/titleIcon.png')
      no-repeat;
    background-size: 100% 100%;
  }
  .con .reward > div > div h5,
  .con .reward > div > div h5 i {
    font-size: 0.24rem;
    color: #ccc;
    line-height: 0.33rem;
  }
}
</style>