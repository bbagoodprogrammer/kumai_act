<template>
  <div class="page pageIndex">
    <div class="open">
      <div class="open_rule" @click="openRule()">{{lang.open_rule}}</div>
      <div class="open_record" @click="open_record">{{lang.open_record}}</div>
    </div>

    <div class="banner">
      <div class="notice_box">
        <notice />
      </div>
    </div>

    <div class="league_box">
      <div class="title" :class="{'salt_title':user_info.team=='salt','sweet_title':user_info.team=='sweet'}"></div>
      <div class="top"><i class="line"></i>
        <div class="my_info">
          <div class="avatar"><img :src="user_info.avatar" alt=""></div>
          <p>{{user_info.nick}}</p>
        </div>
        <div class="mid">
          <div class="icon">
            <p>{{lang.score}}</p>
            <p>{{user_info.score}}</p>
          </div>
          <p>{{lang.rank}}{{user_info.rank}}</p>
        </div>
        <div class="cp_info">
          <div class="avatar" v-if="user_info.cp_nick"><img :src="user_info.cp_avatar" alt=""></div>
          <div class="avatar" v-else><img src="../img/add.png" alt="" @click="open_invite()"></div>

          <p v-if="user_info.cp_nick">{{user_info.cp_nick}}</p>
          <p v-else>{{lang.future_your}}</p>
        </div>
      </div>
      <div class="invite" v-if="user_info.cp_nick&&user_info.cp_avatar" @click="openShare">{{lang.invite_friend}}</div>
      <div class="invite" v-else @click="openShare">{{lang.invite_fb}}</div>
      <p class="tips_cp">{{lang.tips_cp}}</p>
    </div>

    <div class="reward">
      <span>{{rcoins.f}}</span>
      <span>{{rcoins.e}}</span>
      <span>{{rcoins.d}}</span>
      <span>{{rcoins.c}}</span>
      <span>{{rcoins.b}}</span>
      <span>{{rcoins.a}}</span>
    </div>

    <div class="con">
      <div class="gifts">
        <div><img src="../img/gift1.png" alt="">
          <p>{{lang.gifts1}}</p>
        </div>
        <div><img src="../img/gift2.png" alt="">
          <p>{{lang.gifts2}}</p>
        </div>
        <div><img src="../img/gift3.png" alt="">
          <p>{{lang.gifts3}}</p>
        </div>
      </div>
      <div class="time_bg">
        <span>
          <strong>{{tday}}</strong>
          <em>{{lang.day}}</em></span>
        <span>
          <strong>{{thour}}</strong>
          <em>{{lang.hour}}</em></span>
        <span>
          <strong>{{tminute}}</strong>
          <em>{{lang.minute}}</em></span>
        <span>
          <strong>{{tsecond}}</strong>
          <em>{{lang.second}}</em>
        </span>
      </div>
      <div class="vs">
        <div class="clearfix">
          <div class="left">
            <p>{{lang.sweet_val}}</p>
            <p>{{sweet_score}}</p>
          </div>
          <div class="right">
            <p>{{lang.salt_val}}</p>
            <p>{{salt_score}}</p>
          </div>
        </div>
        <div class="progress">
          <div class="p_left" :style="{width:sweet_len+'%'}"><i></i></div>
          <div class="p_right" :style="{width:salt_len+'%'}"></div>
        </div>
      </div>
    </div>

    <div class="rank_box">
      <TabsScrollLoadList />
    </div>

    <transition name="bounce">
      <div class="pro_invite_cp" v-if="invite_cp_flag">
        <div class="inner">
          <div class="close" @click="invite_cp_flag=false"></div>
          <div class="title"></div>
          <div class="info">
            <span><img :src="AppCpInfo.avatar" alt=""></span>
            <span>
              <strong>{{lang.my_cp}}{{AppCpInfo.nick}}</strong>
              <strong><img :src="AppCpInfo.ringUrlFront"> <i>{{AppCpInfo.ringName}}</i></strong>
              <em>{{lang.score}}+{{AppCpInfo.sweet_value}}</em>
            </span>
          </div>
          <div class="btn" @click="getInvite()">{{lang.invite_people}}</div>
        </div>
      </div>
    </transition>

    <div class="pro_invitation" v-if="invite_res&&invite_res.uid&&!invitation_flag">
      <div class="inner">
        <div class="close" @click="invitation_flag=true"></div>
        <div class="title"></div>
        <div class="avatar">
          <img :src="invite_res.avatar" alt="">
        </div>
        <p class="word">
          <i>{{invite_res.nick}}</i>
          <i>{{lang.pro_invitation_tips}}</i>
        </p>
        <div class="btns">
          <span @click="reject()">{{lang.btn_reject}}</span>
          <span @click="accept()">{{lang.btn_accept}}</span>
        </div>
      </div>
    </div>

    <div class="pro_invite_success" v-if="invite_success_flag">
      <div class="inner">
        <div></div>
        <p v-html="lang.invite_success"></p>
      </div>
    </div>

    <div class="pro_recall" v-if="recall_flag">
      <div class="inner">
        <p v-html="lang.pro_recall_tips"></p>
      </div>
    </div>

    <div class="lost" v-if="lose_flag">
      <div class="inner">
        <p>{{lang.lose_title}}</p>
        <p>{{lang.lost_tips.replace('%t',result.team == "salt" ? lang.salt_team : lang.sweet_team).replace('%s',result.score)}}</p>
        <div>{{lang.ok}}</div>
      </div>
    </div>

    <div class="congratulation" v-if="congratulation_flag">
      <div class="inner">
        <p>{{lang.congratulation_title}}</p>
        <!-- <p>你所在{{result.team == "salt" ? "鹽係聯盟" : "甜係聯盟"}}以{{result.score}}甜蜜值勝出本次的“戀愛大作戰”活動，你和xxx共瓜分到xxx金幣，金幣獎勵已平均發放到各自的賬戶！</p> -->
        <p>{{lang.congratulation_tips.replace('%t',result.team == "salt" ? lang.salt_team : lang.sweet_team).replace('%s',result.score).replace('%n',user_info.cp_nick).replace('%c',result.coin)}}</p>
        <div>{{lang.ok}}</div>
      </div>
    </div>

    <div class="pro_sweet" v-if="sweet_flag">
      <div class="inner">
        <div class="title"></div>
        <div class="close" @click="sweet_flag=false"></div>
        <div class="data_box">
          <div class="data_list">
            <div class="scrollablecp">
              <inner-scroll-load-list :url="sweet_url" :parse="proDataSweet">
                <div slot-scope="{ list, loading, none }">
                  <div class="list" v-for="(item, index) in list" :key="index">
                    <i class="line"></i>
                    <span class="avatar">
                      <img :src="item.avatar" alt="">
                    </span>
                    <span class="info">
                      <strong>{{item.nick}}</strong>
                      <strong>{{item.time}}</strong>
                    </span>
                    <span class="gift">
                      <img :src="item.giftUrlFront" alt="">
                      <strong>{{item.giftName}}</strong>
                    </span>
                    <span class="score">
                      <strong>{{lang.score}}</strong>
                      <strong>{{item.score}}</strong>
                    </span>
                  </div>
                  <div v-show="loading" class="sloading_inner">
                    {{ lang.loading }}
                  </div>
                  <div v-show="none" class="snone_inner">
                    {{lang.no_data}}
                  </div>
                </div>
              </inner-scroll-load-list>
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import Vue from 'vue'
import { mapState } from 'vuex'
import { reject, accept, invite, showCpInfo } from '../apis'
import TabsScrollLoadList from './TabsScrollLoadList'
import InnerScrollLoadList from './InnerScrollLoadList'
import Notice from './Notice'
import downTime from '../utils/downTime'
import { toast } from '../utils'
const ios = navigator.userAgent.match(/iPhone|iPod|ios|iPad/i)
export default {
  data () {
    return {
      timer: null,
      tday: '00',
      thour: '00',
      tminute: '00',
      tsecond: '00',
      AppCpInfo: {},
      congratulation_flag: false,
      lose_flag: false,
      invite_cp_flag: false,
      invitation_flag: false,
      invite_success_flag: false,
      recall_flag: false,
      sweet_url: '',
      sweet_flag: false,
    }
  },
  computed: {
    ...mapState([
      'activity_status',
      'data',
      'invite_res',
      'result',
      'rcoins',
      'salt_score',
      'sweet_score',
      'user_info',
      'sweet_len',
      'salt_len',
    ]),
  },
  mounted () {
    this.timer = setInterval(() => {
      const t = downTime('time')
      if (t) {
        this.tday = t.day
        this.thour = t.hour
        this.tminute = t.minute
        this.tsecond = t.second
      }
    }, 1000)
  },
  methods: {
    openRule () {
      this.$router.push('/rule')
    },
    open_record () {
      this.sweet_flag = !0
      this.sweet_url =
        '/index.php?signture=innerserver&action=cpLove.history&from={from}&uid={uid}&token={token}'
    },
    proDataSweet (data) {
      return data.response_data.list || []
    },
    //邀请的人，没有进入戒指页
    async open_invite () {
      //测试数据
      // var response_data = {
      //     list: {
      //         uid: '10013112',
      //         avatar: 'http://udatefile.cat1314.com/uc/img/head_10013112_1606287292.png?wsSecret=47851fcbc283f9fed6c1e8fed9ab49a9&wsTime=1606752000',
      //         nick: '考虑考虑',
      //         ringName: '鲜花戒子',
      //         ringUrlFront:
      //             'http://udatefile.cat1314.com/uc/img/image_goods_1602660955.png?wsSecret=ca216c59fa68340c247d9badb66d93e5&wsTime=1606752000',
      //         sweet_value: '50',
      //     },
      // }
      // this.invite_cp_flag = true;
      // this.AppCpInfo = response_data.list;

      const res = await showCpInfo()
      if (res.data) {
        const { response_status, response_data } = res.data
        if (response_status.error === '') {
          this.invite_cp_flag = true
          this.AppCpInfo = response_data.list
        } else if (response_status.code == '20026') {
          toast(lang.relieve)
        } else if (response_status.code == '20020') {
          this.recall_flag = true
          setTimeout(() => {
            this.recall_flag = false
            if (ios) {
              sendJsData('app://headwearShop')
            } else {
              JSInterface.sendJsData('app://cpHouse?toUid=' + uid)
            }
          }, 1000)
        } else {
          toast(response_status.error)
          setTimeout(() => {
            this.recall_flag = false
            if (ios) {
              sendJsData('app://headwearShop')
            } else {
              JSInterface.sendJsData('app://cpHouse?toUid=' + uid)
            }
          }, 2500)
        }
      }
    },

    async getInvite () {
      const res = await invite()
      if (res.data) {
        const { response_status, response_data } = res.data
        if (response_status.error === '') {
          this.invite_success_flag = true
          setTimeout(() => {
            this.invite_cp_flag = false
            this.invite_success_flag = false
          }, 1000)
        } else {
          toast(response_status.error)
        }
      }
    },
    async reject () {
      const res = await reject()
      if (res.data) {
        const { response_status, response_data } = res.data
        if (response_status.error === '') {
          this.invitation_flag = true
          toast(lang.reject_tips)
        } else {
          toast(response_status.error)
        }
      }
    },
    async accept () {
      const res = await accept()
      if (res.data) {
        const { response_status, response_data } = res.data
        if (response_status.error === '') {
          this.invitation_flag = true
          toast(lang.accept_tips)
          this.$store.dispatch('getInitInfo')
        } else {
          toast(response_status.error)
        }
      }
    },
    shareApp (t) {
      try {
        ios ? window.share(JSON.stringify(t)) : JSInterface.share(JSON.stringify(t))
      } catch (t) { }
    },
    openShare () {
      let host = AREA == 'vn' ? 'chatstarapp.com' : location.host
      this.user_info.cp_nick
        ? this.shareApp({
          from: '2',
          url:
            host + '/static_html/2020/cpLove/share.html?uid=' +
            this.user_info.uid,
          title: this.lang.share_title,
          desc: this.lang.share_desc1,
          image: host + '/static_html/2020/cpLove/share.jpg',
        })
        : this.shareApp({
          from: '2',
          url:
            host + '/static_html/2020/cpLove/share.html?uid=' +
            this.user_info.uid,
          title: this.lang.share_title,
          desc: this.lang.share_desc2,
          image: host + '/static_html/2020/cpLove/share.jpg',
        })
    },
  },
  components: {
    TabsScrollLoadList,
    Notice,
    InnerScrollLoadList,
  },
}
</script>

<style lang="scss">
.pageIndex {
  padding-bottom: 0.5rem;
  .open {
    width: 1.3rem;
    position: absolute;
    right: 0;
    top: 5.16rem;
    z-index: 2;
    > div {
      width: 1.3rem;
      height: 0.56rem;
      line-height: 0.56rem;
      text-align: center;
      background: url('../img/open.png') no-repeat;
      background-size: 100% 100%;
      font-size: 0.24rem;
      font-family: PingFang SC;
      color: #721c07;
      &:nth-of-type(2) {
        margin: 0.08rem 0;
      }
    }
  }
  .banner {
    width: 7.5rem;
    height: 8.06rem;
    background-repeat: no-repeat;
    background-size: 100% 100%;
  }

  .league_box {
    width: 6.99rem;
    height: 4.85rem;
    background-repeat: no-repeat;
    background-size: 100% 100%;
    margin: 0 auto;
    position: relative;
    .title {
      position: absolute;
      width: 6.21rem;
      height: 1.16rem;
      background-repeat: no-repeat;
      background-size: 100% 100%;
      left: 50%;
      margin-left: -3.105rem;
      top: -0.58rem;
      // &.salt_title {
      //     background-image: url('../img/salt_title.png');
      // }
      // &.sweet_title {
      //     background-image: url('../img/sweet_title.png');
      // }
    }
    .top {
      padding-top: 0.5rem;
      text-align: center;
      font-size: 0;
      position: relative;
      .line {
        display: inline-block;
        width: 4.43rem;
        height: 0.04rem;
        background: url('../img/line.png') 50% no-repeat;
        background-size: 100% 100%;
        position: absolute;
        left: 50%;
        margin-left: -2.215rem;
        top: 1.45rem;
        z-index: 0;
      }
      .mid {
        display: inline-block;
        vertical-align: bottom;
        width: 2.1rem;
        text-align: center;
        font-size: 0;
        padding: 0 0.61rem;
        position: relative;
        z-index: 1;
        .icon {
          width: 2.1rem;
          height: 1.83rem;
          background: url('../img/heard.png') 50% no-repeat;
          background-size: 100% 100%;
          p {
            &:first-of-type {
              font-size: 0.24rem;
              font-weight: 700;
              color: #ffc2a5;
              padding: 0.45rem 0 0;
              line-height: 0.28rem;
            }
            &:nth-of-type(2) {
              font-size: 0.34rem;
              font-weight: 700;
              color: #fff;
              font-family: PingFang SC;
            }
          }
        }
        & > p {
          font-size: 0.2rem;
          color: #fff;
        }
      }
      .cp_info,
      .my_info {
        display: inline-block;
        vertical-align: text-top;
        width: 1.34rem;
        position: relative;
        z-index: 1;
        .avatar {
          width: 1.34rem;
          height: 1.34rem;
          background: url('../img/avatar.png') 50% no-repeat;
          background-size: 100% 100%;
          text-align: center;
          box-sizing: border-box;
          padding-top: 0.1rem;
          img {
            width: 1.14rem;
            height: 1.14rem;
            border-radius: 50%;
          }
        }
        p {
          font-size: 0.24rem;
          color: #fff;
          text-align: center;
          padding-top: 0.17rem;
          max-width: 2rem;
          white-space: nowrap;
          text-overflow: ellipsis;
          overflow: hidden;
        }
      }
    }
    .invite {
      width: 5.76rem;
      height: 1.01rem;
      line-height: 0.9rem;
      background: url('../img/btn_invite.png') 50% no-repeat;
      background-size: 100% 100%;
      margin: 0.5rem auto 0;
      font-size: 0.42rem;
      color: #fff8e3;
      text-align: center;
    }
    .tips_cp {
      width: 5.63rem;
      height: 0.37rem;
      line-height: 0.37rem;
      background: url('../img/tips_cp.png');
      background-size: 100% 100%;
      border-radius: 0.1rem;
      color: #fff;
      font-size: 0.24rem;
      text-align: center;
      margin: 0.13rem auto 0;
    }
  }

  .reward {
    box-sizing: border-box;
    width: 7.02rem;
    height: 2.65rem;
    background: url('../img/score_bg.png') 50% no-repeat;
    background-size: 100% 100%;
    margin: 0.26rem auto 0;
    font-size: 0;
    text-align: center;
    padding-top: 1.15rem;
    position: relative;
    span {
      position: absolute;
      display: inline-block;
      vertical-align: middle;
      text-align: center;
      width: 0.74rem;
      height: 1rem;
      color: #7f3208;
      font-size: 0.82rem;
      font-weight: 700;
      &:first-of-type {
        left: 0.97rem;
      }

      &:nth-of-type(2) {
        left: 1.84rem;
      }

      &:nth-of-type(3) {
        left: 2.72rem;
      }

      &:nth-of-type(4) {
        left: 3.59rem;
      }

      &:nth-of-type(5) {
        left: 4.46rem;
      }

      &:nth-of-type(6) {
        left: 5.33rem;
      }

      &:nth-of-type(7) {
        left: 5.68rem;
      }
    }
  }

  .con {
    width: 7.02rem;
    height: 13.53rem;
    background: url('../img/contion.png') no-repeat;
    background-size: 100% 100%;
    margin: -0.3rem auto 0;
    .gifts {
      width: 7.02rem;
      padding-top: 0.4rem;
      display: -ms-flexbox;
      display: flex;
      -ms-flex-pack: center;
      justify-content: center;
      & > div {
        width: 2.04rem;
        text-align: center;
        font-size: 0;
        img {
          display: inline-block;
          width: 1.61rem;
          height: 1.61rem;
          margin-bottom: 0.08rem;
        }
        p {
          display: inline-block;
          width: 2.04rem;
          color: #fff;
          font-size: 0.24rem;
          font-family: PingFang SC;
        }
      }
    }
    .time_bg {
      width: 5.14rem;
      height: 0.76rem;
      margin: 0.2rem auto 0;
      background: url(../img/time_bg.png?e5f786);
      background-size: 100% 100%;
      display: -ms-flexbox;
      display: flex;
      -ms-flex-pack: center;
      justify-content: center;
      -ms-flex-align: center;
      align-items: center;
      span {
        font-size: 0;
        margin-right: 0.05rem;
        strong {
          color: #fff;
          font-size: 0.48rem;
          margin-right: 0.13rem;
        }
        em {
          color: #fef868;
          font-size: 0.22rem;
        }
        &:last-child {
          margin-right: 0;
        }
      }
    }
    .vs {
      width: 6.35rem;
      height: 2.1rem;
      background: url('../img/vs.png') 50% no-repeat;
      background-size: 100% 100%;
      margin: 0.26rem auto 0.17rem;
      text-align: center;
      .left,
      .right {
        display: inline-block;
        vertical-align: middle;
        width: 3rem;
        padding-top: 0.4rem;
        p {
          text-align: center;
          &:first-of-type {
            font-size: 0.22rem;
            font-weight: 700;
            color: #fff;
            padding-bottom: 0.05rem;
          }
          &:nth-of-type(2) {
            font-size: 0.54rem;
            color: #f9c33e;
          }
        }
      }
      .left {
        float: left;
      }
      .right {
        float: right;
      }
      .progress {
        width: 5.48rem;
        height: 0.23rem;
        background-image: url('../img/progress.png');
        background-size: 100% 100%;
        font-size: 0;
        text-align: center;
        margin: 0.14rem auto 0;
        padding: 0 0.05rem;
        box-sizing: border-box;
        & > div {
          display: inline-block;
          margin-top: 0.035rem;
        }
        .p_left {
          width: 30%;
          height: 0.16rem;
          background: url('../img/p_left.png') no-repeat;
          background-size: 5.39rem 0.16rem;
          position: relative;
          i {
            width: 0.75rem;
            height: 0.76rem;
            background: url('../img/dot.png') no-repeat;
            background-size: 100% 100%;
            position: absolute;
            right: -0.375rem;
            top: 50%;
            margin-top: -0.38rem;
          }
        }
        .p_right {
          width: 70%;
          height: 0.16rem;
          background: url('../img/p_right.png') 100% no-repeat;
          background-size: 5.48rem 0.16rem;
        }
      }
    }
  }

  .rank_box {
    margin: -7.6rem auto 0;
  }

  .pro_invite_cp {
    position: fixed;
    left: 0;
    top: 0;
    height: 100%;
    width: 100%;
    background-color: rgba(0, 0, 0, 0.7);
    z-index: 5;
    display: -ms-flexbox;
    display: flex;
    -ms-flex-align: center;
    align-items: center;
    -ms-flex-pack: center;
    justify-content: center;
    .inner {
      width: 6.99rem;
      height: 5.25rem;
      background: url('../img/pro_invite_cp.png');
      background-size: 100% 100%;
      position: relative;
      .title {
        width: 6.21rem;
        height: 1.16rem;
        background-repeat: no-repeat;
        background-size: 100% 100%;
        position: absolute;
        left: 50%;
        margin-left: -3.105rem;
        top: -0.508rem;
      }
      .close {
        width: 0.36rem;
        height: 0.37rem;
        background: url('../img/close.png');
        background-size: 100% 100%;
        position: absolute;
        left: 50%;
        margin-left: -0.18rem;
        bottom: -0.7rem;
      }
      .info {
        padding-top: 1.14rem;
        display: -ms-flexbox;
        display: flex;
        -ms-flex-align: center;
        align-items: center;
        padding-left: 0.78rem;
        span {
          display: inline-block;
          &:first-of-type {
            width: 2.27rem;
            height: 2.27rem;
            background: url('../img/gift_bg.png');
            background-size: 100% 100%;
            position: relative;
            margin-right: 0.39rem;
            img {
              width: 2.2rem;
              height: 2.2rem;
              border-radius: 0.45rem;
              position: absolute;
              top: 50%;
              left: 50%;
              margin: -1.1rem 0 0 -1.1rem;
            }
          }
          &:nth-of-type(2) {
            strong {
              &:first-of-type {
                font-size: 0.24rem;
                color: #fff;
              }
              &:nth-of-type(2) {
                margin: 0.09rem 0 0.25rem;
                img {
                  width: 0.99rem;
                  height: 1.02rem;
                }
                i {
                  font-size: 0.28rem;
                  color: #f9c33e;
                }
              }
            }
            em {
              width: 1.67rem;
              height: 0.37rem;
              line-height: 0.37rem;
              color: #fff;
              font-size: 0.23rem;
              text-align: center;
              background: url('../img/charm_bg.png');
              background-size: 100% 100%;
            }
          }
        }
      }
      .btn {
        width: 3.41rem;
        height: 0.75rem;
        line-height: 0.75rem;
        background: url('../img/btn.png');
        background-size: 100% 100%;
        text-align: center;
        font-size: 0.34rem;
        color: #8c4018;
        font-weight: 500;
        margin: 0 auto;
        position: absolute;
        left: 50%;
        margin-left: -1.705rem;
        bottom: 0.43rem;
      }
    }
  }
  .pro_invite_cp .inner .info span:nth-of-type(2) em,
  .pro_invite_cp .inner .info span:nth-of-type(2) strong {
    display: block;
  }
  .pro_invite_cp .inner .info span:nth-of-type(2) strong:nth-of-type(2) i,
  .pro_invite_cp .inner .info span:nth-of-type(2) strong:nth-of-type(2) img {
    display: inline-block;
    vertical-align: middle;
  }

  .pro_invitation {
    position: fixed;
    left: 0;
    top: 0;
    height: 100%;
    width: 100%;
    background-color: rgba(0, 0, 0, 0.7);
    z-index: 5;
    display: -ms-flexbox;
    display: flex;
    -ms-flex-align: center;
    align-items: center;
    -ms-flex-pack: center;
    justify-content: center;
    .inner {
      width: 6.99rem;
      height: 5.31rem;
      background: url('../img/pro_invitation.png');
      background-size: 100% 100%;
      position: relative;
      .title {
        width: 6.21rem;
        height: 1.16rem;
        background-repeat: no-repeat;
        background-size: 100% 100%;
        position: absolute;
        left: 50%;
        margin-left: -3.105rem;
        top: -0.508rem;
      }
      .close {
        width: 0.36rem;
        height: 0.37rem;
        background: url('../img/close.png');
        background-size: 100% 100%;
        position: absolute;
        left: 50%;
        margin-left: -0.18rem;
        bottom: -0.7rem;
      }
      .avatar {
        width: 1.89rem;
        height: 1.89rem;
        background: url('../img/gift_bg.png');
        background-size: 100% 100%;
        position: relative;
        margin: 0.72rem auto 0.3rem;
        img {
          width: 1.84rem;
          height: 1.84rem;
          border-radius: 0.45rem;
          position: absolute;
          top: 50%;
          left: 50%;
          margin: -0.92rem 0 0 -0.92rem;
        }
      }
      .word {
        padding: 0 0.6rem;
        text-align: center;
        margin-bottom: 0.5rem;
        i {
          &:first-of-type {
            font-size: 0.26rem;
            color: #f9c33e;
          }
          &:nth-of-type(2) {
            font-size: 0.26rem;
            color: #fff;
          }
        }
      }
      .btns {
        text-align: center;
        span {
          display: inline-block;
          vertical-align: middle;
          &:first-of-type {
            width: 2.4rem;
            height: 0.75rem;
            line-height: 0.75rem;
            font-size: 0.24rem;
            color: #fff;
          }
          &:nth-of-type(2) {
            width: 3.41rem;
            height: 0.75rem;
            line-height: 0.75rem;
            background: url('../img/btn.png');
            background-size: 100% 100%;
            text-align: center;
            font-size: 0.34rem;
            color: #8c4018;
            font-weight: 500;
          }
        }
      }
    }
  }

  .pro_invite_success {
    position: fixed;
    left: 0;
    top: 0;
    height: 100%;
    width: 100%;
    background-color: rgba(0, 0, 0, 0.7);
    z-index: 5;
    display: -ms-flexbox;
    display: flex;
    -ms-flex-align: center;
    align-items: center;
    -ms-flex-pack: center;
    justify-content: center;
    background-color: rgba(0, 0, 0, 0.2);
    .inner {
      width: 3.21rem;
      height: 1.64rem;
      background: url('../img/pro_invite_success.png');
      background-size: 100% 100%;
      position: relative;
      div {
        width: 0.7rem;
        height: 0.71rem;
        background: url('../img/gou.png');
        background-size: 100% 100%;
        margin: 0.17rem auto 0;
      }
      p {
        font-size: 0.18rem;
        color: #fff;
        text-align: center;
        padding-top: 0.1rem;
      }
    }
  }

  .pro_recall {
    position: fixed;
    left: 0;
    top: 0;
    height: 100%;
    width: 100%;
    background-color: rgba(0, 0, 0, 0.7);
    z-index: 5;
    background-color: rgba(0, 0, 0, 0.2);
    .inner {
      width: 3.21rem;
      height: 1.64rem;
      background: url('../img/pro_invite_success.png');
      background-size: 100% 100%;
      position: relative;
      p {
        font-size: 0.18rem;
        color: #fff;
        text-align: center;
        padding-top: 0.1rem;
      }
    }
  }
  .pro_recall,
  .pro_recall .inner {
    display: -ms-flexbox;
    display: flex;
    -ms-flex-align: center;
    align-items: center;
    -ms-flex-pack: center;
    justify-content: center;
  }

  .lost {
    position: fixed;
    left: 0;
    top: 0;
    height: 100%;
    width: 100%;
    background-color: rgba(0, 0, 0, 0.7);
    z-index: 5;
    display: -ms-flexbox;
    display: flex;
    -ms-flex-align: center;
    align-items: center;
    -ms-flex-pack: center;
    justify-content: center;
    .inner {
      width: 6.99rem;
      height: 3.67rem;
      background: url('../img/pro_lost.png');
      background-size: 100% 100%;
      position: relative;
      p {
        &:first-of-type {
          color: #f9c33e;
          font-size: 0.34rem;
          font-weight: 700;
          font-family: PingFang SC;
          text-align: center;
          padding: 0.56rem 0 0.33rem;
        }
        &:nth-of-type(2) {
          color: #fff;
          font-size: 0.22rem;
          font-family: PingFang SC;
          padding: 0 0.47rem;
          line-height: 0.32rem;
          text-align: center;
        }
      }
      & > div {
        width: 3.41rem;
        height: 0.75rem;
        line-height: 0.75rem;
        background: url('../img/btn.png');
        background-size: 100% 100%;
        text-align: center;
        font-size: 0.34rem;
        color: #8c4018;
        font-weight: 500;
        margin: 0 auto;
        position: absolute;
        left: 50%;
        margin-left: -1.705rem;
        bottom: 0.43rem;
      }
    }
  }

  .congratulation {
    position: fixed;
    left: 0;
    top: 0;
    height: 100%;
    width: 100%;
    background-color: rgba(0, 0, 0, 0.7);
    z-index: 5;
    display: -ms-flexbox;
    display: flex;
    -ms-flex-align: center;
    align-items: center;
    -ms-flex-pack: center;
    justify-content: center;
    .inner {
      width: 6.99rem;
      height: 4.31rem;
      background: url('../img/pro_congratulation.png');
      background-size: 100% 100%;
      position: relative;
      p {
        &:first-of-type {
          color: #f9c33e;
          font-size: 0.34rem;
          font-weight: 700;
          font-family: PingFang SC;
          text-align: center;
          padding: 0.56rem 0 0.33rem;
        }
        &:nth-of-type(3) {
          margin-top: 0.2rem;
        }
      }
      & > div {
        width: 3.41rem;
        height: 0.75rem;
        line-height: 0.75rem;
        background: url('../img/btn.png');
        background-size: 100% 100%;
        text-align: center;
        font-size: 0.34rem;
        color: #8c4018;
        font-weight: 500;
        margin: 0 auto;
        position: absolute;
        left: 50%;
        margin-left: -1.705rem;
        bottom: 0.43rem;
      }
    }
  }
  .congratulation .inner p:nth-of-type(2),
  .congratulation .inner p:nth-of-type(3) {
    color: #fff;
    font-size: 0.22rem;
    font-family: PingFang SC;
    padding: 0 0.47rem;
    line-height: 0.32rem;
  }

  .pro_sweet {
    position: fixed;
    left: 0;
    top: 0;
    height: 100%;
    width: 100%;
    background-color: rgba(0, 0, 0, 0.7);
    z-index: 5;
    display: -ms-flexbox;
    display: flex;
    -ms-flex-align: center;
    align-items: center;
    -ms-flex-pack: center;
    justify-content: center;
    .inner {
      width: 7.19rem;
      height: 7.04rem;
      background: url('../img/record_bg.png');
      background-size: 100% 100%;
      position: relative;
      .title {
        width: 6.21rem;
        height: 1.16rem;
        background-repeat: no-repeat;
        background-size: 100% 100%;
        position: absolute;
        left: 50%;
        margin-left: -3.105rem;
        margin-top: -0.58rem;
      }
      .close {
        width: 0.36rem;
        height: 0.37rem;
        background: url('../img/close.png');
        background-size: 100% 100%;
        position: absolute;
        left: 50%;
        margin-left: -0.18rem;
        bottom: -0.7rem;
      }
      .data_box {
        padding-top: 0.5rem;
      }
      .scrollablecp {
        height: 6.2rem;
        overflow: auto;
        box-sizing: border-box;
        &::-webkit-scrollbar {
          display: none;
        }
      }
      .list {
        padding: 0 0.4rem 0 0.33rem;
        height: 1.43rem;
        display: -ms-flexbox;
        display: flex;
        -ms-flex-align: center;
        align-items: center;
        position: relative;
        span {
          display: inline-block;
          box-sizing: border-box;
        }
        .line {
          width: 6.74rem;
          height: 0.02rem;
          background: url('../img/pro_line.png');
          background-size: 100% 100%;
          position: absolute;
          bottom: 0;
          left: 50%;
          margin-left: -3.37rem;
        }
        .avater {
          width: 0.98rem;
          height: 0.98rem;
          background: url('../img/bg_avatar.png');
          background-size: 100% 100%;
          position: relative;
          margin-right: 0.18rem;
          img {
            width: 0.92rem;
            height: 0.92rem;
            position: absolute;
            left: 50%;
            top: 50%;
            margin: -0.46rem 0 0 -0.46rem;
            border-radius: 50%;
          }
        }
        .info {
          margin-right: 0.25rem;
          strong {
            display: block;
            &:first-of-type {
              width: 1.8rem;
              max-width: 1.8rem;
              white-space: nowrap;
              text-overflow: ellipsis;
              overflow: hidden;
              color: #fff;
              font-size: 0.24rem;
              margin-bottom: 0.08rem;
            }
            &:nth-of-type(2) {
              color: #f493ff;
              font-size: 0.24rem;
            }
          }
        }
        .gift {
          width: 2rem;
          img {
            &:first-of-type {
              width: 0.56rem;
              height: 0.56rem;
            }
          }
          strong {
            font-size: 0.24rem;
            color: #f493ff;
            max-width: 1.2rem;
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
          }
        }
        .score {
          width: 1.2rem;
          text-align: right;
          padding-right: 0.1rem;
          strong {
            display: block;
            &:first-of-type {
              color: #f493ff;
              font-size: 0.24rem;
            }
            &:nth-of-type(2) {
              color: #fff;
              font-size: 0.24rem;
            }
          }
        }
      }
    }
  }
  .pro_sweet .inner .list .gift img,
  .pro_sweet .inner .list .gift strong {
    display: inline-block;
    vertical-align: middle;
  }
  .sloading_inner,
  .snone_inner {
    padding: 1rem 0;
    text-align: center;
    height: 5.8rem;
    color: #fff;
  }
}
</style>