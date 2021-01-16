<template>
  <div class="box">
    <div class="shareBar" v-if="isShare">
      <div class="bar" @click="downApp()"></div>
    </div>
    <div class="header">
      <div class="tipsBox" :class="{top:isShare}">
        <span class="ruleTips" @click="goRule()"></span>
        <span class="ruleTips mt" @click="showRule = true"></span>
      </div>
    </div>
    <ul class="list">
      <li v-for="(item,index) in list" :key="index">
        <div class="rankTitle" :class="'rank' + (index+1)"></div>
        <div class="users">
          <div class="userMsg">
            <div class="avBox" @click="goUser(item.uid)">
              <img v-lazy="item.avatar" alt="" class="av">
            </div>
            <div class="msg">
              <div class="nick">{{item.nick}}</div>
              <div class="score">Điểm debut:<i></i>{{item.score}}</div>
            </div>
            <div class="follow" :class="{ed:item.attension}" @click="follow(item.uid,index,item.attension)"></div>
          </div>
          <div class="songMsg" @click="goSong(item.sid)">
            <div class="songCon">
              <div class="songImgBox">
                <i class="start"></i>
                <img :src="item.cover" class="songImg" alt="">
              </div>

              <div class="songDesc">
                <div class="desc">{{item.work_name}}</div>
                <div class="recollections">{{item.recollections}}</div>
              </div>
            </div>
          </div>
          <div class="fans">
            <div class="title"></div>
            <ul>
              <li v-for="(item2,index2) in item.guard" :key="index2">
                <div class="avBox" @click="goUser(item2.uid)">
                  <span :class="{top1:index2 == 0}" class="avBg"></span>
                  <img v-lazy="item2.avatar" alt="">
                </div>
                <strong><i></i> {{item2.score}}</strong>
              </li>
            </ul>
          </div>
        </div>
      </li>
    </ul>
    <div class="mask" v-show="showRule">
      <transition name="slide">
        <div class="rule" v-show="showRule">
          <i class="close" @click="showRule = false"></i>
          <h5 class="mt">Thời gian</h5>
          <p class="txtc">Ngày 19/1/2021 đến ngày 25/1/2021</p>
          <h5>Thể lệ</h5>
          <p>1、Tính theo điểm mị quà xu tặng cho tác phẩm thí sinh debut trong thời gian sự kiện, trở thành fan hạng đầu của 1 thí sinh debut sẽ nhận thưởng fan hạng đầu.</p>
          <p>2、Trong thời gian sự kiện, nếu thí sinh xóa tác phẩm, xem như hủy bỏ tư cách, thưởng fan cũng sẽ bị hủy bỏ.</p>
          <h5>Phần thưởng </h5>
          <p>Mỗi fan hạng đầu sẽ nhận 1 phần thưởng, bao gồm quà Giọng Ca Ưu Tú(39 xu)*5 + Giúp Bạn Debut(520 xu) *1</p>
        </div>
      </transition>
    </div>
    <!-- <div href="" class="refresh circle" @click.prevent="refrsh()" :style="{transform:'rotate('+rotatePx+'deg)'}"></div> -->
  </div>
</template>

<script>

import getString from "../utils/getString"
import APP from "../utils/openApp"
import api from "../api/apiConfig"
import ActFooter from "../components/ActFooter"
import MsgToast from "../components/commonToast"
import { globalBus } from '../utils/eventBus'
export default {
  components: { MsgToast, ActFooter },
  data() {
    return {
      isShare: false, //是否分享
      isMore: true,   //加载更多
      activite: 1,    //活动状态
      showT: false,  //提示弹窗显示
      tastMsg: "提示信息",  //基础弹窗提示信息
      userState: 0,   //用户状态（是否报名）
      rotatePx: 0,    //刷新旋转动画
      rotatec: 0,
      list: [],
      showRule: false
    }
  },
  created() {
    this.judgeShare()  //判断是否为分享环境,请求相应的接口 
    this.getDefaultData()
  },
  mounted() {
  },
  methods: {
    judgeShare() {//判断是否为分享环境,请求相应的接口 
      this.isShare = getString('token') ? false : true
      this.vxc('setShareState', this.isShare) //分享状态
    },
    getDefaultData(val) { //初始化
      api.getDefault().then(res => {
        const { response_status, response_data } = res.data
        if (response_status.code == 0) {
          console.log(res)
          this.list = response_data.list
        } else {
          this.toast(response_status.error)
        }
      })
    },
    downApp() {
      APP()
    },
    goRule() {
      let regstr = getString('token')
      let uid = getString('uid')
      location.href = `http://activity.singnowapp.com/static_html/2020/recruit/index.html?uid=${uid}&token=${regstr}`
    },
    goUser(uid) {
      location.href = `uid:${uid}`
    },
    goSong(sid) {
      location.href = 'songid:{"songlist":[' + sid + '],"index":0}';
    },
    follow(uid, index, attension) {
      if (attension) { return }
      api.appAttemsion(uid).then(res => {
        if (res.data.response_data) {
          this.list[index].attension = true
        } else {
          this.toast(res.data.response_status.error)
        }
      })
    },
  }
}
</script>
<style lang='scss'>
body::-webkit-scrollbar {
  width: 0;
}
.box {
  max-width: 750px;
  overflow-x: hidden;
  position: relative;
  margin: auto;
  background: RGBA(27, 14, 12, 1) url(../assets/img/banner.png) center 0
    no-repeat;
  background-size: 100% auto;
  .shareBar {
    position: fixed;
    z-index: 1000;
    top: 0;
    left: 0;
    right: 0;
    text-align: center;
    .bar {
      width: 7.5rem;
      height: 1.2rem;
      margin: auto;
      background: url(../assets/img/share_bar.png) no-repeat;
      background-size: 100% 100%;
    }
  }
  .header {
    height: 9.7rem;
    position: relative;
    .tipsBox {
      position: absolute;
      right: 0;
      top: 0.38rem;
      .ruleTips {
        display: block;
        width: 2.07rem;
        height: 0.62rem;
        background: url(../assets/img/tips1.png);
        background-size: 100% 100%;
      }
      .mt {
        background: url(../assets/img/tips2.png);
        background-size: 100% 100%;
        margin-top: 0.24rem;
      }
      &.top {
        top: 1.5rem;
      }
    }
  }
  .list {
    > li {
      margin-bottom: 0.71rem;
    }
    .rankTitle {
      width: 1.65rem;
      height: 0.35rem;
      margin: 0 auto;

      &.rank1 {
        background: url(../assets/img/title/1.png) no-repeat;
        background-size: 100% 100%;
      }
      &.rank2 {
        background: url(../assets/img/title/2.png) no-repeat;
        background-size: 100% 100%;
      }
      &.rank3 {
        background: url(../assets/img/title/3.png) no-repeat;
        background-size: 100% 100%;
      }
      &.rank4 {
        background: url(../assets/img/title/4.png) no-repeat;
        background-size: 100% 100%;
      }
      &.rank5 {
        background: url(../assets/img/title/5.png) no-repeat;
        background-size: 100% 100%;
      }
      &.rank6 {
        background: url(../assets/img/title/6.png) no-repeat;
        background-size: 100% 100%;
      }
      &.rank7 {
        background: url(../assets/img/title/7.png) no-repeat;
        background-size: 100% 100%;
      }

      &.rank8 {
        background: url(../assets/img/title/8.png) no-repeat;
        background-size: 100% 100%;
      }
      &.rank9 {
        background: url(../assets/img/title/9.png) no-repeat;
        background-size: 100% 100%;
      }
    }
    .users {
      width: 7.18rem;
      margin: 0 auto;
      .userMsg {
        height: 2.24rem;
        display: flex;
        align-items: center;
        background: url(../assets/img/top.png);
        background-size: 100% 100%;
        padding-top: 0.2rem;
        .avBox {
          width: 1.66rem;
          height: 1.66rem;
          background: url(../assets/img/avBg.png);
          background-size: 100% 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-left: 0.36rem;
          .av {
            width: 1.19rem;
            height: 1.19rem;
            border-radius: 50%;
          }
        }
        .msg {
          width: 2.5rem;
          margin-left: 0.27rem;
          white-space: nowrap;
          .nick {
            font-weight: bold;
            font-size: 0.36rem;
            color: #fffff5;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
          }
          .score {
            display: flex;
            align-items: center;
            font-size: 0.28rem;
            color: rgba(251, 232, 181, 1);
            margin-top: 0.1rem;
            i {
              width: 0.38rem;
              height: 0.3rem;
              background: url(../assets/img/scoreIcon.png);
              background-size: 100% 100%;
            }
          }
        }
        .follow {
          width: 1.54rem;
          height: 0.58rem;
          background: url(../assets/img/follow.png);
          background-size: 100% 100%;
          margin-left: 0.4rem;
          &.ed {
            background: url(../assets/img/follow2.png);
            background-size: 100% 100%;
          }
        }
      }
      .songMsg {
        position: relative;
        background: url(../assets/img/mid.png);
        background-size: 100% auto;
        .songCon {
          width: 6.72rem;
          background: #3e211c;
          border-radius: 0.12rem;
          margin: 0 auto;
          display: flex;
          // align-items: center;
          min-height: 1.83rem;
          padding: 0.15rem;
          .songImgBox {
            position: relative;
            margin: 0 0.15rem;
            width: 1.63rem;
            height: 1.64rem;
            .songImg {
              width: 1.63rem;
              height: 1.64rem;
              border-radius: 0.12rem;
            }
            .start {
              display: block;
              width: 0.4rem;
              height: 0.4rem;
              background: url(../assets/img/start.png);
              background-size: 100% 100%;
              position: absolute;
              bottom: 0.08rem;
              left: 0.08rem;
              z-index: 100;
            }
          }

          .songDesc {
            flex: 1;
            margin-right: 0.2rem;
            .desc {
            }
            .recollections {
              font-size: 0.26rem;
              min-height: 1.05rem;
              // overflow: hidden;
              // text-overflow: ellipsis;
              // display: -webkit-box;
              // -webkit-line-clamp: 3;
              // -webkit-box-orient: vertical;
              color: rgba(255, 255, 255, 0.8);
            }
          }
        }
      }
      .fans {
        height: 3.12rem;
        background: url(../assets/img/bottom.png);
        background-size: 100% 100%;
        padding-top: 0.6rem;
        .title {
          width: 2.09rem;
          height: 0.32rem;
          background: url(../assets/img/fansTitle.png);
          background-size: 100% 100%;
          margin-left: 0.37rem;
        }
        ul {
          padding: 0 0.47rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-top: 0.38rem;
          li {
            .avBox {
              width: 1.46rem;
              height: 1.46rem;
              position: relative;
              .avBg {
                width: 1.46rem;
                height: 1.46rem;
                position: absolute;
                z-index: 2;
                background: url(../assets/img/topItemBg.png);
                background-size: 100% 100%;
                &.top1 {
                  background: url(../assets/img/top1Av.png);
                  background-size: 100% 100%;
                }
              }
              img {
                width: 1.22rem;
                height: 1.22rem;
                border-radius: 50%;
                position: absolute;
                left: 0.12rem;
                top: 0.12rem;
              }
            }
            strong {
              display: flex;
              align-items: center;
              justify-content: center;
              i {
                width: 0.32rem;
                height: 0.28rem;
                background: url(../assets/img/heart.png);
                background-size: 100% 100%;
                margin-right: 0.06rem;
              }
            }
          }
        }
      }
    }
  }
}
.rule {
  width: 6.3rem;
  height: 6.07rem;
  padding: 0.6rem 0.44rem 0.3rem;
  background: url(../assets/img/cards.png);
  background-size: 100% 100%;
  position: relative;
  i {
    display: block;
    width: 0.28rem;
    height: 0.28rem;
    background: url(../assets/img/close.png);
    background-size: 100% 100%;
    position: absolute;
    top: 0.5rem;
    right: 0.3rem;
  }
  .txtc {
    color: rgba(251, 232, 181, 1);
    margin-top: 0.1rem;
  }
  h5 {
    font-size: 0.32rem;
    margin: 0.24rem 0 0.15rem;
  }
  p {
    font-size: 0.26rem;
  }
  .mt {
    margin: 0;
  }
}
</style>


