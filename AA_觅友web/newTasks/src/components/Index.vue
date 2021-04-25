<template>
  <div class="page pageIndex">
    <div class="app_top" :style="{background:'#7A68F8',height:navigatorHeight}"></div>
    <div class="top_bg"></div>
    <!-- <div class="tab" :style="{top:navigatorHeight}">
    </div> -->
    <p v-if="!newUser.length &&　!daily.length" class="noTasks">{{lang.tasks_over}}</p>
    <div class="tasksList" :style="{paddingTop:navigatorHeight2}">
      <div class="newUserTask" v-if="newUser.length">
        <div class="title"><em>{{lang.new_title}}</em> <i></i></div>
        <ul>
          <li v-for="(item,index) in newUser" :key="index">
            <div class="imgBg">
              <img :src="item.image" alt="" class="icon">
            </div>

            <div class="taskMsg">
              <div class="name">{{item.name}}</div>
              <div class="gift"><img :src="item.prizeImage" alt="" v-if="item.prizeImage"> {{item.prizeName}} x <i v-if="item.prizeNum">{{item.prizeNum}}</i></div>
            </div>
            <div class="status">
              <em class="get" v-if="item.status == 1" @click="getGiftItem('new',item,index)">{{lang.get}}</em>
              <em class="do" v-else-if="item.status == 0" @click="doTask(item)">{{lang.do_task}}</em>
              <!-- <em class="do" v-else-if="item.status == 2" @click="doTask(item)">{{lang.do_task}}</em> -->
            </div>
          </li>
        </ul>
      </div>
      <div class="dayTask" v-if="daily.length">
        <div class="title"> <em>{{lang.day_title}}</em> <i></i></div>
        <ul>
          <li v-for="(item,index) in daily" :key="index">
            <div class="imgBg">
              <img :src="item.image" alt="" class="icon">
            </div>
            <div class="taskMsg">
              <div class="name">{{item.name}}</div>
              <div class="gift"><img :src="item.prizeImage" alt="" v-if="item.prizeImage"> {{item.prizeName}} <i v-if="item.prizeNum">{{item.prizeNum}}</i></div>
            </div>
            <div class="status">
              <em class="get" v-if="item.id == 'D_2001'  && !new_ver" @click="getGiftItem(false,item,index)">{{lang.singIn}}</em>
              <em class="get" v-else-if="item.status == 1" @click="getGiftItem(false,item,index)">{{lang.get}}</em>
              <em class="do" v-else-if="item.status == 0" @click="doTask(item)">{{lang.do_task}}</em>
              <em class="ed" v-else-if="item.status == 2">{{lang.get_ed}}</em>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <!-- 完成任务奖励弹窗 -->
    <div class="mask" v-show="luckGiftPup">
      <transition name="slide">
        <div class="luckGift" v-if="luckGiftPup">
          <div class="title">
            <!-- {{lang.do_ed}}#{{getGiftObj.name}}# -->
            <strong>{{getGiftObj.name}}</strong>
          </div>
          <div class="luckGiftlist">
            <div class="giftItem">
              <i class="nums">x{{getGiftObj.prizeNum}}</i>
              <img :src="getGiftObj.prizeImage" alt="">
              <strong>{{getGiftObj.prizeName}} </strong>
            </div>
            <div class="ok" @click="luckGiftPup = false">{{lang.accept}}</div>
          </div>
          <!-- <p>收下並領取更多福利</p> -->
        </div>
      </transition>
    </div>
    <!-- 签到弹窗 -->
    <!-- <div class="mask">
      <transition name="slide">
        <div class="singIn">
          <div class="title"></div>
          <div class="singInGiftList">
            <div class="giftItme" v-for="(item,index) in list" :key="index">
                <img :src="item." alt="">
            </div>
          </div>
        </div>
      </transition>
    </div> -->
  </div>
</template>

<script>
import { getLangHtml, getTimeObj, getUrlString, getAppVer, getPlatform, getDeviceId } from "../utils";
import { setFullScreen, setStatusBarStyle, getStatusBarHeight, callAppNew } from '../utils/navigation';
import { getGift } from "../apis"
import { mapState } from "vuex"
import store from "../store"


window.refreshHomePage = function () {
  store.dispatch('getInitInfo');
}

export default {
  data () {
    return {
      navigatorHeight: 0,
      navigatorHeight2: 0,
      //   tasks: {
      //     "newUser": [//新人任务
      //       {
      //         "id": "N_4004",//任务标识，领取奖励时，要带上
      //         "image": "http://XXX",//最左侧图标
      //         "name": "相簿上傳三張照片",//任务名称
      //         "prizeName": "金豆",//奖品名称
      //         "prizeImage": "http://XXX",//奖品图片
      //         "prizeNum": 2,//奖品数量，如50金豆，则该处为50
      //         "status": 1,//0为未完成，1为待领取，2为已领取
      //         "iosJump": "XXX",//ios的跳转页
      //         "androidJump": "XXX",//android的跳转页
      //       },
      //       {
      //         "id": "N_4001",
      //         "image": "http://XXX",
      //         "name": "追蹤3個朋友",
      //         "prizeName": "金豆",
      //         "prizeImage": "http://XXX",
      //         "prizeNum": 2,
      //         "status": 1,
      //         "iosJump": "XXX",
      //         "androidJump": "XXX",
      //       }
      //     ],
      //     "daily": [//日常任务
      //       {
      //         "id": "D_2001",
      //         "image": "http://XXX",
      //         "name": "每日签到",
      //         "prizeName": "金豆",
      //         "prizeImage": "http://XXX",
      //         "prizeNum": 2,
      //         "status": 1,
      //         "iosJump": "XXX",
      //         "androidJump": "XXX"
      //       }
      //     ]
      //   },
      luckGiftPup: false,
      new_ver: false,
      getGiftObj: {}
    }
  },
  computed: {
    ...mapState(['newUser', 'daily'])
  },
  created () {
    const pt = getPlatform();
    const ver = getAppVer();
    if ((pt == 'android' && ver >= 967) || (pt == 'ios' && ver >= 179)) {  //新舊版本區分
      this.new_ver = true
    }
    if ((pt == 'ios' && ver >= 165) || pt == 'android') {
      setFullScreen(true);
      this.navigatorHeight = getStatusBarHeight() + 'px';
      this.navigatorHeight2 = getStatusBarHeight() + 20 + 'px';
    }
  },
  methods: {
    getGiftItem (is_new, item, index) {
      var ios = navigator.userAgent.match(/iPhone|iPod|ios|iPad/i);
      const ver = getAppVer();
      const pt = getPlatform();
      let devId = ''
      if ((pt == 'ios' && ver >= 179) || pt == 'android') {
        devId = getDeviceId() || ''
      }
      getGift(item.id, devId).then(res => {
        if (res.data.response_data) {
          if (this.new_ver) {
            this.getGiftObj = item
            this.luckGiftPup = true
          } else {
            this.toast(this.lang.get_suc)
          }
          if (is_new) {
            this.vxc('setTaskStatus', {
              type: 1,
              index
            })
          } else {
            this.vxc('setTaskStatus', {
              type: 0,
              index
            })
          }
        } else {
          this.toast(res.data.response_status.error)
        }
      })
    },
    doTask (item) {
      const ios = navigator.userAgent.match(/iPhone|iPod|ios|iPad/i);
      try {
        if (ios) {
          console.log(item.iosJump)
          sendJsData(item.iosJump);
        } else {
          console.log(item.androidJump)
          javascript: JSInterface.sendJsData(item.androidJump);
        }
      } catch (e) {
        console.log(e)
      }
    }
  }
}
</script>

<style lang="scss">
.pageIndex {
  .app_top {
    width: 100%;
    position: fixed;
    z-index: 5;
    &.app_top_fit {
      position: fixed;
      background-color: #10093C;
    }
  }
  .tab {
    width: 100%;
    height: 0.88rem;
  }
  img {
    display: block;
    width: 100%;
  }
  .noTasks {
    width: 100%;
    position: absolute;
    top: 2rem;
    text-align: center;
  }
  .tasksList {
    padding: 0 0.3rem 0.28rem 0.3rem;
    .newUserTask,
    .dayTask {
      background: #fff;
      border-radius: 0.3rem;
      padding: 0.4rem 0.36rem;
      margin-bottom: 0.2rem;
      .title {
        font-size: 0.32rem;
        color: rgba(44, 43, 54, 1);
        position: relative;
        margin-bottom: 0.22rem;
        em {
          font-weight: 600;
          position: relative;
          z-index: 2;
        }
        i {
          display: block;
          width: 1.34rem;
          height: 0.1rem;
          background: linear-gradient(
            90deg,
            #7A68F8 0%,
            rgba(122, 104, 248, 0.37) 63%,
            rgba(122, 104, 248, 0.36) 65%,
            rgba(122, 104, 248, 0) 100%
          );
          opacity: 1;
          border-radius: 0.1rem;
          position: absolute;
          z-index: 1;
          bottom: 0.02rem;
        }
      }
      li {
        width: 6.54rem;
        height: 1.48rem;
        background: #FFFFFF;
        border-radius: 0.2rem;
        display: flex;
        align-items: center;
        .imgBg {
          width: 0.92rem;
          height: 0.92rem;
          background: #F5F5F9;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-right: 0.2rem;
          .icon {
            width: 0.56rem;
            height: 0.56rem;
          }
        }

        .taskMsg {
          width: 3.7rem;
          overflow: hidden;
          .name {
            color: rgba(44, 43, 54, 1);
            font-size: 0.28rem;
            font-weight: 600;
          }
          .gift {
            display: flex;
            align-items: center;
            font-size: 0.28rem;
            color: rgba(255, 161, 67, 1);
            margin-top: 0.08rem;
            img {
              width: 0.4rem;
              height: 0.4rem;
              margin-right: 0.1rem;
            }
            i {
              font-size: 0.28rem;
            }
          }
        }
        .status {
          width: 1.36rem;
          height: 0.6rem;
          em {
            display: block;
            width: 100%;
            height: 100%;
            line-height: 0.6rem;
            text-align: center;
            color: #fff;
            border-radius: 0.3rem;
            font-size: 0.26rem;
            display: flex;
            align-items: center;
            justify-content: center;
            &.do {
              box-sizing: border-box;
              border: 0.02rem solid #7A68F8;
              color: rgba(122, 104, 248, 1);
            }
            &.get {
              background: linear-gradient(90deg, #7A68F8 0%, #9585FF 100%);
            }
            &.ed {
              color: rgba(140, 137, 149, 1);
            }
          }
        }
      }
    }
  }
  .luckGift {
    width: 5.96rem;
    height: 4.92rem;
    padding-top: 1.5rem;
    background: linear-gradient(180deg, #FFFAEB 0%, #FFF2CF 100%);
    border-radius: 0.3rem;
    position: relative;
    .title {
      width: 5.96rem;
      height: 2.44rem;
      background: url(../img/luckGift.png);
      background-size: 100% 100%;
      position: absolute;
      top: -1.42rem;
      strong {
        font-size: 0.32rem;
        font-weight: 600;
        color: #fff;
        width: 5rem;
        height: 0.9rem;
        position: absolute;
        left: 0.48rem;
        bottom: 0.2rem;
        text-align: center;
      }
    }
    .giftItem {
      width: 2.46rem;
      height: 2.62rem;
      background: rgba(255, 161, 67, 0.12);
      opacity: 1;
      border-radius: 0.2rem;
      margin: 0 auto;
      padding-top: 0.28rem;
      position: relative;
      i {
        position: absolute;
        right: 0;
        top: 0;
        padding: 0 0.1rem;
        height: 0.48rem;
        text-align: center;
        line-height: 0.48rem;
        background: #FFA143;
        border-radius: 0 0.2rem 0 0.2rem;
        font-size: 0.28rem;
        color: #fff;
      }
      img {
        width: 1.6rem;
        height: 1.6rem;
        margin: 0 auto;
      }
      strong {
        display: block;
        text-align: center;
        height: 0.45rem;
        font-size: 0.32rem;
        line-height: 0.45rem;
        color: #2C2B36;
        margin-top: 0.16rem;
      }
    }
    .ok {
      width: 3.3rem;
      height: 0.88rem;
      background: linear-gradient(90deg, #7A68F8 0%, #9585FF 100%);
      border-radius: 0.46rem;
      text-align: center;
      line-height: 0.88rem;
      color: #ffff;
      font-size: 0.32rem;
      margin: 0.61rem auto 0;
    }
    p {
      font-size: 0.28rem;
      color: rgba(140, 137, 149, 1);
      margin: 0.4rem auto 0;
      text-align: center;
    }
  }
  .singIn {
    width: 6.42rem;
    height: 6.55rem;
    background: linear-gradient(180deg, #FFFAEB 0%, #FFF2CF 100%);
    border-radius: 0 0 0.3rem 0.3rem;
    position: relative;
    .title {
      width: 6.42rem;
      height: 3.2rem;
      position: absolute;
      top: -3.2rem;
    }
  }
}
.top_bg {
  width: 100%;
  overflow: hidden;
  height: 3.5rem;
  position: absolute;
  top: 0;
  z-index: -1;
}
.top_bg::after {
  content: '';
  width: 120%;
  height: 3rem;
  position: absolute;
  left: -10%;
  top: 0;
  z-index: -1;
  border-radius: 0 0 60% 60%;
  background: #7A68F8;
}
</style>