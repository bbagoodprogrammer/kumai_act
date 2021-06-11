<template>
  <div class="page pageIndex appView" style="min-height: 736px">
    <div class="content" :style="{'background-image':'url('+images.banner+')'}">
      <div class="btn btnRule" @click="openRule()"></div>
      <div class="btn btnClose" @click="closeWeb()"></div>
      <div class="notices">
        <img src="../img/notice.png" alt="" />
        <notice />
      </div>
      <div class="lucky_box">
        <div class="lucky">
          <div class="gift_list_box">
            <div
              class="arrow"
              :class="{
                arrow0: mainTab == 0,
                arrow1: mainTab == 1,
                arrow2: mainTab == 2,
              }"
            ></div>
            <div class="gift_list_inner">
              <h3>{{lang.tips}}</h3>
              <div class="gift_list">
                <div
                  class="scroll scroll_long"
                  :style="{ width: gifts_list.length * 1.28 + 'rem' }"
                  v-if="gifts_list.length > 6"
                >
                  <div
                    class="list"
                    v-for="(item, index) in gifts_list"
                    :key="index"
                  >
                    <p><img :src="item.gift_img" alt="" /></p>
                    <p>{{ item.gift_name }}</p>
                    <p>
                      <img src="../img/coin.png" alt="" />
                      <span>{{ item.gift_value }}</span>
                    </p>
                  </div>
                </div>
                <div class="scroll" v-else>
                  <div
                    class="list"
                    v-for="(item, index) in gifts_list"
                    :key="index"
                  >
                    <p><img :src="item.gift_img" alt="" /></p>
                    <p>{{ item.gift_name }}</p>
                    <p>
                      <img src="../img/coin.png" alt="" />
                      <span>{{ item.gift_value }}</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="sign_box" v-if="box_detail">
            <div
              class="sign_box_list"
              @click.prevent="mainTabClick(0, box_detail[0].lucky_box_type)"
              :class="{ current: mainTab == 0 }"
            >
              <div class="bling"></div>
              <div class="inner">
                <p><img src="../img/lucky.png" alt="" /></p>
                <p>{{lang.lucky_box}}</p>
                <p>
                  <img src="../img/coin.png" alt="" />
                  <span>{{ box_detail[0].lucky_box_cost }}</span>
                </p>
              </div>
            </div>
            <div
              class="sign_box_list"
              @click.prevent="mainTabClick(1, box_detail[1].lucky_box_type)"
              :class="{ current: mainTab == 1 }"
            >
              <div class="bling"></div>
              <div class="inner">
                <p><img src="../img/lucky_higt.png" alt="" /></p>
                <p>{{lang.lucky_higt_box}}</p>
                <p>
                  <img src="../img/coin.png" alt="" />
                  <span>{{ box_detail[1].lucky_box_cost }}</span>
                </p>
              </div>
            </div>
            <div
              class="sign_box_list"
              @click.prevent="mainTabClick(2, box_detail[2].lucky_box_type)"
              :class="{ current: mainTab == 2 }"
            >
              <div class="bling"></div>
              <div class="inner">
                <p><img src="../img/lucky_super.png" alt="" /></p>
                <p>{{lang.lucky_super_box}}</p>
                <p>
                  <img src="../img/coin.png" alt="" />
                  <span>{{ box_detail[2].lucky_box_cost }}</span>
                </p>
              </div>
            </div>
          </div>
          <div class="bottom">
            <div class="send_out">
              <div class="send_box">
                <div class="send_box_inner" @click="openSends()">
                  <span>{{lang.send}}</span>
                  <span><img :src="getAvatar(avatar)" alt="" /></span>
                  <span></span>
                </div>
                <div class="view_send_inner" v-if="send_flag">
                  <ul>
                    <li
                      :class="[activeClass == index ? 'current' : '']"
                      @click="getItem(list[index], index)"
                      v-for="(item, index) in list"
                      :key="index"
                    >
                      <span>
                        <img :src="item.avatar" alt="" />
                        <img :src="getNum( parseInt(item.pos) + 1)" alt="" />
                      </span>
                      <span>{{ item.nick }}</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div class="send" @click="sendLuckyBox()">{{lang.sendLuckyBox}}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import Notice from "./Notice";
import { pageInited, appClose, callApp, toast } from "../utils";
export default {
  data() {
    return {
      mainTab: 0,
      activeClass: -1,
      send_flag: false,
      list: [],//
      avatar: "",
      send_data: {
        toUid: 0,
        boxType: 1,
        modeType: 1,
      },
    };
  },
  mounted() {
    pageInited();
    this.$store.dispatch("getBillBoard");
    this.$store.dispatch("getLuckyBoxDetail");
    // 默认进来传第一个人的信息
    // var tempData = {
    //   uids: [
    //     {
    //       uid: "11",
    //       avatar: "http://udatefile.cat1314.com/uc/img/image_1621319054.png",
    //       nick: "魂淡1",
    //       pos:0,
    //     },
    //   ],
    // };
    // this.send_data.toUid = tempData.uids[0].uid;
    // this.avatar = tempData.uids[0].avatar;
    // console.log(this.avatar);
    // return;
    callApp("getMicUids");
    window.setMicUids = async (res) => {
      //定义回调函数，让客户端来执行，获取productList数据
      var tempData = JSON.parse(res);
      if (tempData.uids && tempData.uids.length > 0) {
        this.send_data.toUid = tempData.uids[0].uid;
        this.avatar = tempData.uids[0].avatar;
      }
    };
  },
  computed: {
    ...mapState(["loading", "sendres", "box_detail", "gift_flag"]),
    gifts_list() {
      if (this.box_detail) {
        return this.box_detail[this.mainTab].gift_list;
      }
      return [];
    },
  },

  methods: {
    appClose,
    closeWeb(){
      this.appClose()
    },
    openRule() {
      this.$router.push("/rule");
    },
    getAvatar(url) {
      return url ? url : require("../img/avatar.png");
    },
    mainTabClick(tab, type) {
      this.mainTab = tab;
      this.send_data.boxType = type;
    },
    getNum(i) {
      return require("../img/" + i + ".png");
    },
    openSends() {
      let _this = this;
      callApp("getMicUids");
      window.setMicUids = async (res) => {
        //定义回调函数，让客户端来执行，获取productList数据
        // res = '{"mode":"1","uids":[{"uid":"10012627","nick":"DL-girl","pos":"2","avatar":"http:\/\/udatefile.cat1314.com\/uc\/img\/head_10012627_1582965017.png_medium?wsSecret=39424519bf351547ac7002a00b6317a7&wsTime=1598284800"},{"uid":"10013224","nick":"DL-1235","pos":"3","avatar":"http:\/\/udatefile.cat1314.com\/uc\/img\/head_10013224_1597645258.png_medium?wsSecret=ec3b02715283ba852918da19d21e7c77&wsTime=1598284800"}]}'
        _this.list = JSON.parse(res).uids;
        if(_this.list.length>0){
          _this.send_flag = !_this.send_flag;
        }else{
          toast(this.lang.no_people_mic);
        }
      };
    },
    getItem(obj, index) {
      this.send_flag = false;
      this.activeClass = index;
      this.send_data.toUid = obj.uid;
      this.avatar = obj.avatar;
    },
    sendLuckyBox() {
      if (!this.send_data.toUid) {
        // toast("暫無人在麥上，無法贈送");
        toast(this.lang.no_mic);
      } else {
        callApp("sendLuckyBox", this.send_data);
        window.onLuckyBoxRsp = (res) => {
          //定义回调函数，让客户端来执行，获取productList数据
          res = JSON.parse(res);
          if (res.rescode == 200) {
            //成功
            this.appClose();
          } else if (res.rescode == 10022) {
            //金币不足，客户端处理
          } else {
            toast(res.reason);
          }
        };
      }
    },
  },
  components: {
    Notice,
  },
};
</script>

<style lang="scss">
body{
  background: transparent;
}
.pageIndex {
  color: #333;
  background: transparent;
}
.content {
  height: 9.32rem;
  // background: url("../img/banner.png");

  background-size: 100% 100%;
  padding-top: 2.29rem;
  box-sizing: border-box;
  position: relative;
  .btn {
    display: inline-block;
    text-indent: -1000rem;
    position: absolute;
    z-index: 1;
    &.btnRule {
      left: 0.29rem;
      top: 0.3rem;
      width: 0.34rem;
      height: 0.34rem;
      background: url("../img/rule.png");
      background-size: 100% 100%;
    }
    &.btnClose {
      top: 0;
      right: 0;
      width: 0.96rem;
      height: 0.96rem;
      background: url("../img/close.png");
      background-size: 100% 100%;
    }
  }
  .notices {
    width: 7.5rem;
    height: 0.4rem;
    box-sizing: border-box;
    position: relative;
    > img {
      display: inline-block;
      width: 0.28rem;
      height: 0.24rem;
      position: absolute;
      top: 0.08rem;
      left: 0.44rem;
    }
  }
  .lucky_box {
    .lucky {
      margin-top: 0.24rem;
      position: relative;
      .gift_list_box {
        width: 7.02rem;
        height: 2.24rem;
        position: relative;
        margin: 0 auto;
        .arrow {
          position: absolute;
          bottom: -0.24rem;
          width: 0.65rem;
          height: 0.24rem;
          background: url("../img/down.png") no-repeat;
          background-size: 100% 100%;
          z-index: 2;
          &.arrow0 {
            left: 0.79rem;
          }
          &.arrow1 {
            left: 3.15rem;
          }
          &.arrow2 {
            right: 0.79rem;
          }
        }
        .gift_list_inner {
          width: 7.02rem;
          height: 2.24rem;
          background: #fff;
          box-shadow: 0 0.01rem 0.07rem 0 rgba(255, 122, 146, 0.48);
          border-radius: 0.16rem;
          margin: 0 auto;
          position: relative;
          h3 {
            font-family: PingFang SC;
            font-size: 0.22rem;
            font-weight: 600;
            color: #333;
            line-height: 0.28rem;
            padding: 0.19rem 0 0.24rem 0.19rem;
          }
          .gift_list {
            position: relative;
            width: 7.02rem;
            overflow: scroll;
            .scroll_long {
              .list {
                margin-right: 0.1rem;
              }
            }
            .list {
              display: inline-block;
              width: 1.17rem;
              text-align: center;
              p:first-of-type {
                img {
                  width: 0.74rem;
                  height: 0.74rem;
                }
              }
              p:nth-of-type(2) {
                font-size: 0.22rem;
                color: #333;
                line-height: 0.28rem;
                max-width: 1.17rem;
                white-space: nowrap;
                text-overflow: ellipsis;
                overflow: hidden;
              }
              p:nth-of-type(3) {
                span,
                img {
                  display: inline-block;
                  vertical-align: middle;
                }
                img {
                  width: 0.2rem;
                  height: 0.2rem;
                }
                span {
                  font-size: 0.18rem;
                  color: #747474;
                  line-height: 0.28rem;
                }
              }
            }
          }
        }
      }
      .sign_box {
        text-align: center;
        margin-top: 0.25rem;
        font-size: 0;
        .sign_box_list {
          display: inline-block;
          vertical-align: middle;
          width: 2.11rem;
          height: 2.5rem;
          background: url("../img/sign.png") no-repeat;
          background-size: 100% 100%;
          text-align: center;
          margin-right: 0.28rem;
          position: relative;
          &.sign_box_list:last-child {
            margin-right: 0rem;
          }
          .inner {
            width: 2.11rem;
            height: 2.5rem;
            display: flex;
            align-items: center;
            // justify-content: center;
            flex-direction: column;
            margin-right: 0.19rem;
            font-size: 0;
          }
          &.current {
            width: 2.29rem;
            height: 2.71rem;
            background: url("../img/sign_ac.png") no-repeat;
            background-size: 100% 100%;
            position: relative;
            .bling {
              width: 1.6rem;
              height: 1.37rem;
              background: url("../img/bling.png") no-repeat;
              background-size: 100% 100%;
              position: absolute;
              left: 50%;
              margin-left: -0.8rem;
              top: 0.36rem;
            }
            .inner {
              width: 2.29rem;
              height: 2.71rem;
            }
            p:nth-of-type(1) {
              margin-top: 0.26rem;
            }
            p:nth-of-type(2) {
              color: #fff;
              line-height: 0.32rem;
              font-weight: 600;
              font-size: 0.24rem;
            }
            p:nth-of-type(3) {
              span {
                font-size: 0.22rem;
                color: #fff;
              }
            }
          }
          p:nth-of-type(1) {
            margin-top: 0.15rem;
            width: 1.6rem;
            height: 1.37rem;
            img {
              width: 1.6rem;
              height: 1.37rem;
            }
          }
          p:nth-of-type(2) {
            font-size: 0.22rem;
            color: #fff;
            color: #c05718;
            line-height: 0.32rem;
          }
          p:nth-of-type(3) {
            margin-top: -0.08rem;
            img,
            span {
              display: inline-block;
              vertical-align: middle;
            }
            img {
              width: 0.2rem;
              height: 0.2rem;
            }
            span {
              font-size: 0.22rem;
              font-weight: 600;
              color: #c05718;
              line-height: 0.32rem;
            }
          }
        }
      }
      .bottom {
        margin-top: 0.11rem;
        > div {
          display: inline-block;
          vertical-align: middle;
        }
        .send_out {
          width: 1.85rem;
          height: 0.54rem;
          margin: 0 0.19rem 0 0.37rem;
          font-size: 0;
        }
        .send_box {
          width: 1.85rem;
          height: 0.54rem;
          background: rgba(0, 0, 0, 0.3);
          border-radius: 0.27rem;
          font-size: 0;
          .send_box_inner {
            width: 1.85rem;
            height: 0.54rem;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          span {
            display: inline-block;
            vertical-align: middle;
          }
          span:nth-of-type(1) {
            font-size: 0.24rem;
            color: #fff;
            line-height: 0.32rem;
          }
          span:nth-of-type(2) {
            margin: 0 0.25rem 0 0.09rem;
            img {
              width: 0.4rem;
              height: 0.4rem;
              border-radius: 50%;
            }
          }
          span:nth-of-type(3) {
            width: 0.19rem;
            height: 0.1rem;
            background: url("../img/up.png") no-repeat;
            background-size: 100% 100%;
          }
        }
        .send {
          width: 2.94rem;
          height: 0.84rem;
          line-height: 0.32rem;
          text-align: center;
          background: url("../img/send.png") no-repeat;
          background-size: 100% 100%;
          font-size: 0.32rem;
          font-family: PingFang SC;
          font-weight: 700;
          color: #cb5e00;
          padding-top: 0.24rem;
          box-sizing: border-box;
        }

        .view_send_inner {
          width: 1.85rem;
          background: rgba(0, 0, 0, 0.6);
          border-radius: 0.08rem;
          position: absolute;
          bottom: 0.74rem;
          left: 0.37rem;
          padding: 0.05rem 0;
          box-sizing: border-box;
          z-index: 3;
          ul {
            li {
              height: 0.5rem;
              line-height: 0.5rem;
              // font-size: 0;
              span {
                display: inline-block;
                vertical-align: middle;
                &:first-of-type {
                  margin: 0 0.01rem 0 0.05rem;
                  width: 0.4rem;
                  height: 0.4rem;
                  border-radius: 50%;
                  position: relative;
                  img {
                    &:nth-of-type(1) {
                      width: 0.4rem;
                      height: 0.4rem;
                      border-radius: 50%;
                    }
                    &:nth-of-type(2) {
                      width: 0.2rem;
                      height: 0.2rem;
                      position: absolute;
                      bottom: 0;
                      right: 0;
                    }
                  }
                }
                &:nth-of-type(2) {
                  font-size: 0.27rem;
                  font-family: PingFang SC;
                  color: #fff;
                  max-width: 1.35rem;
                  white-space: nowrap;
                  text-overflow: ellipsis;
                  overflow: hidden;
                  margin: 0;
                }
              }
              &.current {
                background: rgba(255, 237, 88, 0.5);
              }
            }
          }
        }
      }
    }
  }
}
.header {
  padding: 0.24rem 0;
  color: #fff;
  text-align: center;
  position: relative;
  i {
    display: inline-block;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    width: 0.77rem;
    background: url("../img/arrow.png") 50% no-repeat;
    background-size: 0.17rem 0.28rem;
  }
  strong {
    font-size: 0.42rem;
    font-weight: 700;
  }
}
</style>